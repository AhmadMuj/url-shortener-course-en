import Router from "@koa/router";
import { getLastVisits, getVisitsByURL } from "../services/visits";

const visitsRouter = new Router();

visitsRouter
  .get("/", async (ctx) => {
    ctx.response.body = await getLastVisits(
      ctx.state.user_id,
      Number(ctx.query.limit),
      Number(ctx.query.offset)
    );
  })
  .get("/:id", async (ctx) => {
    ctx.response.body = await getVisitsByURL(
      ctx.params.id,
      ctx.state.user_id,
      Number(ctx.query.limit),
      Number(ctx.query.offset)
    );
  });

export default visitsRouter;
