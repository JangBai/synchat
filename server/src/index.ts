import { createApp } from "./app.js";
import { createSocketServer } from "./socket/index.js";

const { app, server } = createApp();
createSocketServer(server);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
