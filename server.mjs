import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pem", "application/x-pem-file; charset=utf-8"],
]);

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, {
    "content-type": contentType,
    "cache-control": "no-store",
  });
  res.end(body);
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
    const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const filePath = resolve(root, `.${pathname}`);

    if (!filePath.startsWith(root)) {
      send(res, 403, "Forbidden");
      return;
    }

    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) {
      send(res, 404, "Not found");
      return;
    }

    const content = await readFile(filePath);
    send(res, 200, content, mimeTypes.get(extname(filePath)) ?? "application/octet-stream");
  } catch (error) {
    if (error?.code === "ENOENT") {
      send(res, 404, "Not found");
      return;
    }
    send(res, 500, `Server error: ${error.message}`);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`RSA demo site: http://127.0.0.1:${port}`);
});
