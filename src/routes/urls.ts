import Router from "@koa/router";
import {
  createShortURL,
  deleteURL,
  getURLS,
  updateURL,
} from "../services/urls";

const urlsRouter = new Router();

urlsRouter
  .get("/", async (ctx) => {
    ctx.response.body = await getURLS(
      ctx.state.user_id,
      Number(ctx.request.query.limit),
      Number(ctx.request.query.offset)
    );
  })
  .post("/", async (ctx) => {
    ctx.response.body = await createShortURL(
      ctx.request.body as any,
      ctx.state.user_id
    );
  })
  .put("/:id", async (ctx) => {
    ctx.response.body = await updateURL(
      ctx.params.id,
      ctx.request.body as any,
      ctx.state.user_id
    );
  })
  .delete("/:id", async (ctx) => {
    ctx.response.body = await deleteURL(ctx.params.id, ctx.state.user_id);
  });

export default urlsRouter;
