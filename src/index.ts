import "dotenv/config";
import Koa from "koa";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import { onDatabaseConnect } from "./config/knex";
import router from "./routes/index";

const app = new Koa();

app.use(cors());
app.use(helmet());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log("Database is connected");
    // Database is ready
    app.listen(Number(process.env.PORT), () =>
      console.log(`Server started with port ${process.env.PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

main();
