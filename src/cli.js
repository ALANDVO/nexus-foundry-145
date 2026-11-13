#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const chrome = require("./src/chrome");

const envBackground = process.env.AGENT_BROWSER_BACKGROUND === "true" || process.env.AGENT_BROWSER_BACKGROUND === "1";

const argv = yargs(hideBin())
  .option("background", {
    type: "boolean",
    default: envBackground,
    description: "Open/switch/navigate in background mode",
  })
  .command("new [url]", "Create a new tab", (yargs) => {
    return yargs.option("url", { type: "string", description: "Initial URL" });
  }, async (argv) => {
    const background = argv.background !== undefined ? argv.background : envBackground;
    const url = argv.url || "";
    try {
      const result = await chrome.createTab(url, { background });
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("Error creating tab:", err.message);
      process.exit(1);
    }
  })
  .command("switch <targetId>", "Switch to a tab", (yargs) => {
    return yargs.option("background", { type: "boolean", default: envBackground });
  }, async (argv) => {
    const background = argv.background !== undefined ? argv.background : envBackground;
    try {
      const result = await chrome.switchTab(argv.targetId, { background });
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("Error switching tab:", err.message);
      process.exit(1);
    }
  })
  .command("navigate <url>", "Navigate to URL", (yargs) => {
    return yargs.option("background", { type: "boolean", default: envBackground });
  }, async (argv) => {
    const background = argv.background !== undefined ? argv.background : envBackground;
    try {
      const result = await chrome.navigate(argv.url, { background });
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("Error navigating:", err.message);
      process.exit(1);
    }
  })
  .command("auto-connect", "Auto-connect to existing Chrome", (yargs) => {
    return yargs.option("background", { type: "boolean", default: envBackground });
  }, async (argv) => {
    const background = argv.background !== undefined ? argv.background : envBackground;
    try {
      await chrome.autoConnect({ background });
      console.log("Auto-connect completed");
    } catch (err) {
      console.error("Error auto-connecting:", err.message);
      process.exit(1);
    }
  })
  .parse();
