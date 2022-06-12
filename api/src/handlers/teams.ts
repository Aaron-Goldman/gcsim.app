import { Request as RouterRequest, RouteHandler } from "itty-router";
import Store from "../TeamsStore";
import { DBItem } from "../types";

interface TeamsRequest extends RouterRequest {
  query: {
    chars?: string;
    weaps?: string;
    s?: string;
    limit?: string;
    offset?: string;
  };
}

const Teams: RouteHandler<TeamsRequest> = async (request) => {
  const { query } = request;

  const resp = await fetch("https://viewer.gcsim.workers.dev/gcsimdb");
  const data = await resp.json();

  const store = new Store(data as DBItem[]);

  const { s: searchString } = query;
  const characters = query.chars ? query.chars.split(",") : undefined;
  const weapons = query.weaps ? query.weaps.split(",") : undefined;
  const limit = Number(query.limit);
  const offset = Number(query.offset);

  const paginationParams = { limit, offset };

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    "Cache-Control": "s-maxage=86400",
  };

  let body;
  if (!characters && !weapons && !searchString) {
    console.log("all");
    body = JSON.stringify(await store.all(paginationParams));
  } else {
    const filterParams = {
      characters,
      weapons,
      searchString,
      ...paginationParams,
    };
    console.log("filter");
    body = JSON.stringify(await store.filter(filterParams));
  }

  return new Response(body, { headers: headers })
};

export default Teams;
