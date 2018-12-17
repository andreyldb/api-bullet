import Hapi from "hapi";

import { root, tasks, bullets } from "./routes";

const server = new Hapi.Server({
  port: process.env.PORT || 8000
});

const init = async () => {
  server.route([].concat(root).concat(tasks).concat(bullets));

  await server.start();
  console.log("Server is running");
};

init();
