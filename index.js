const express = require("express");
const serveStatic = require("serve-static");
const http = require("http");
const path = require("path");
const puppeteer = require("puppeteer");

const options = {
  port: 12345,
  sourceDir: path.normalize(`${process.cwd()}/public`)
}

const startServer = options => {
   const app = express()
     .use("/", serveStatic(options.sourceDir))
   const server = http.createServer(app);
   server.listen(options.port);
   return server;
 };

(async () => {
  const server = startServer(options)

  const browser = await puppeteer.launch();
  const page = await browser.newPage()

  //Start sending raw DevTools Protocol commands are sent using `client.send()`
  //First off enable the necessary "Domains" for the DevTools commands we care about
  const client = page._client
  await client.send('Page.enable')
  await client.send('DOM.enable')
  await client.send('CSS.enable')

  //Start tracking CSS coverage
  await client.send('CSS.startRuleUsageTracking')

  await page.goto(`http://localhost:${options.port}`)

  const rules = await client.send('CSS.takeCoverageDelta')
  const usedRules = rules.coverage.filter(rule => {
    return rule.used
  })
  console.log(usedRules)

  await page.close();
  await browser.close();
  server.close();
})();
