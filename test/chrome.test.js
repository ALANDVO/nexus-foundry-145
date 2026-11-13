#!/usr/bin/env node
const assert = require("assert");
const chrome = require("../src/chrome");

(async function() {
  // Verify module exports exist
  assert(typeof chrome.createTab === "function", "createTab missing");
  assert(typeof chrome.switchTab === "function", "switchTab missing");
  assert(typeof chrome.navigate === "function", "navigate missing");
  assert(typeof chrome.autoConnect === "function", "autoConnect missing");

  // Verify background mode flag handling (no runtime error)
  await chrome.createTab("about:blank", { background: true });
  await chrome.navigate("about:blank", { background: false });
  await chrome.autoConnect({ background: true });

  console.log("All tests passed");
})();
