#!/usr/bin/env node

const {Builder, Capabilities} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let options = new chrome.Options();
options.addArguments(['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']);

const TIMEOUT_MS = 5000;

async function browse(url) {
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  await driver.manage().setTimeouts({
    pageLoad: TIMEOUT_MS,
    script: TIMEOUT_MS
  })
  try {
    await driver.get(url);
    await new Promise(resolve => setTimeout(resolve, TIMEOUT_MS));
  } catch (e) {
    console.log(url, e);
  } finally {
    await driver.quit();
  }
}

async function main() {
  await browse('http://localhost:22473/test-local.html')
}

console.log("Start worker......");
main()


