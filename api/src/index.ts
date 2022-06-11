import { Request, Router } from "itty-router";

import Teams from "./handlers/teams";
//import Team from './handlers/team';

const router = Router();

router.get("/", () => new Response("test"));

router.get("/api/teams", Teams);
//router.get('/api/teams/:id', Team)
router.get("*", () => new Response("Not found", { status: 404 }));

export default {
  fetch: router.handle,
};