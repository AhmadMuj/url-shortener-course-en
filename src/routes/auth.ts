import Router from "@koa/router";
import { login, register } from "../services/users";

const authRouter = new Router();

authRouter
  .post("/register", async (ctx) => {
    ctx.response.body = await register(ctx.request.body as any);
  })
  .post("/login", async (ctx) => {
    ctx.response.body = await login(ctx.request.body as any);
  });

export default authRouter;
