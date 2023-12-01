import { Server, envs } from "./config";
import { AppRoutes } from "./routes";

(async()=> {
    main();
})();
  
  
async function main() {
    const server = new Server({
      port: 8080,
      routes: AppRoutes.routes,
    });
  
    server.start();
  }

