const express = require("express");
const serveStatic = require("serve-static");
const http = require("http");
const path = require("path");
const puppeteer = require("puppeteer");

const options = {
  port: 12345,
  sourceDir: path.normalize(`${process.cwd()}/public`)
};

const startServer = options => {
  const app = express().use("/", serveStatic(options.sourceDir));
  app.get("/307", function(request, response) {
    response.redirect(307, "/");
  });
  const server = http.createServer(app);
  server.listen(options.port);
  return server;
};

(async () => {
  const server = startServer(options);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:${options.port}`);
  const content = await page.content();
  console.log(content);

  await page.close();
  await browser.close();
  server.close();
})();
