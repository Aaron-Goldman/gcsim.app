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

const paginate = (data: DBItem[], limit?: number, offset?: number) => {
  const start = offset || 0;
  const end = limit ? start + limit : undefined;
  const hasMore = !!end && end <= data.length;

  return { data: data.slice(start, end), hasMore };
};

export default class TeamsStore {
  data: DBItem[];
  constructor(data: DBItem[]) {
    this.data = data.sort((a, b) => {
      return b.dps / b.target_count - a.dps / a.target_count;
    });
  }
  async all(params: PaginationParams) {
    const { limit, offset } = params;

    return paginate(this.data, limit, offset);
  }

  async filter(params: FilterParams) {
    const { characters, weapons, searchString, limit, offset } = params;

    const filtered = this.data.filter((entry) => {
      const teamCharacters: string[] = [];
      const teamWeapons: string[] = [];

      entry.team.forEach((char) => {
        teamCharacters.push(char.name);
        teamWeapons.push(char.weapon);
      });

      //team needs to have every character in charFilter array
      if (characters && characters.length > 0) {
        const ok = characters.every((e) => teamCharacters.includes(e));
        if (!ok) {
          return false;
        }
      }

      //team needs to have every weapon in weaponFilter array
      if (weapons && weapons.length > 0) {
        const ok = weapons.every((e) => teamWeapons.includes(e));
        if (!ok) {
          return false;
        }
      }

      //check description or author matches search string
      if (searchString) {
        const searchRegex = new RegExp(searchString, "i");
        const ss = JSON.stringify(entry);

        if (!ss.match(searchRegex)) {
          return false;
        }
      }

      return true;
    });

    return paginate(filtered, limit, offset);
  }
}
