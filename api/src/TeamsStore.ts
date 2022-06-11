import i18next from "i18next";
import InGameNames from "../../public/locales/IngameNames.json";
import { DBItem } from "./types";

interface PaginationParams {
  limit?: number;
  offset?: number;
}
interface FilterParams extends PaginationParams {
  characters?: string[];
  weapons?: string[];
  searchString?: string;
}

export default class TeamsStore {
  data: DBItem[];
  constructor(data: DBItem[]) {
    this.data = data.sort((a, b) => {
      return b.dps / b.target_count - a.dps / a.target_count;
    });
  }
  async all(params: PaginationParams) {
    const { limit, offset } = params;
    const start = offset || 0;
    const end = limit ? start + limit : undefined;

    return this.data.slice(start, end);
  }

  async filter(params: FilterParams) {
    i18next.init({
      resources: InGameNames,
    });
    const { characters, weapons, searchString, limit, offset } = params;
    const resp = await fetch("https://viewer.gcsim.workers.dev/gcsimdb");
    const data = await resp.json();

    const filtered = data.filter((entry) => {
      const teamCharacters: string[] = [];
      const teamWeapons: string[] = [];

      entry.team.forEach((char) => {
        teamCharacters.push(char.name);
        teamWeapons.push(char.weapon);
      });

      //team needs to have every character in charFilter array
      if (characters.length > 0) {
        const ok = characters.every((e) => teamCharacters.includes(e));
        if (!ok) {
          return false;
        }
      }

      //team needs to have every weapon in weaponFilter array
      if (weapons.length > 0) {
        const ok = weapons.every((e) => teamWeapons.includes(e));
        if (!ok) {
          return false;
        }
      }

      //check something in team matches search string
      let ss = JSON.stringify(entry);

      entry.team.forEach((c) => {
        ss += " " + i18next.t("game:character_names." + c.name);
        ss += " " + i18next.t("game:weapon_names." + c.weapon);
      });

      if (searchString !== "" && !ss.includes(searchString)) {
        return false;
      }

      return true;
    });

    return filtered;
  }
}
