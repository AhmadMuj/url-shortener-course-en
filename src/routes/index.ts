import Router from "@koa/router";
import authRouter from "./auth";
import urlsRouter from "./urls";
import { requireAuthHandler } from "./middlewares";
import visitsRouter from "./visits";
import { resolveURL } from "../services/urls";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

router.use(
  "/urls",
  requireAuthHandler,
  urlsRouter.routes(),
  urlsRouter.allowedMethods()
);

router.use(
  "/visits",
  requireAuthHandler,
  visitsRouter.routes(),
  visitsRouter.allowedMethods()
);

router.get("/:id", async (ctx) => {
  const url = await resolveURL(ctx.params.id, ctx.request.ip);
  ctx.redirect(url);
});

export default router;
