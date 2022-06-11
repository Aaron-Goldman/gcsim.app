import { Request } from "itty-router";
import Store from "../TeamsStore";

const Teams = async (request) => {
  const { params, query, t } = request;

  const resp = await fetch("https://viewer.gcsim.workers.dev/gcsimdb");
  const data = await resp.json();
  console.log(data);
  const store = new Store(data);

  const { searchString } = query;
  const characters = query.chars ? query.chars.split(",") : undefined;
  const weapons = query.weaps ? query.weaps.split(",") : undefined;
  const limit = Number(query.limit);
  const offset = Number(query.offset);

  const paginationParams = { limit, offset };

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  };
  if (!characters && !weapons) {
    console.log("all");
    const body = JSON.stringify(await store.all(paginationParams));

    return new Response(body, { headers: headers });
  }
  const filterParams = {
    characters,
    weapons,
    searchString,
    t,
    ...paginationParams,
  };
  
  console.log("filter");
  const body = JSON.stringify(await store.filter(filterParams));

  return new Response(body, { headers: headers });
};

export default Teams;
