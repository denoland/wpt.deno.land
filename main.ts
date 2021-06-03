import { handler } from "./src/handler.tsx";

addEventListener("fetch", (e) => {
  e.respondWith(handler(e.request));
});
