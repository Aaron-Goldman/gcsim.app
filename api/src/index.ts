import { Router } from "itty-router";

import Teams from "./handlers/teams";

const router = Router();

router.options(
  "*",
  () =>
    new Response(undefined, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "referer, origin, content-type, Access-Control-Allow-Origin",
      },
    })
);

router.get("/teams", Teams);

router.get("*", () => new Response("Not found", { status: 404 }));

export default {
  fetch: router.handle,
};
