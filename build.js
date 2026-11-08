#!/usr/bin/env node
const path = require("path");
const { build } = require("./src/engine");

try {
  build(__dirname);
  process.exit(0);
} catch (err) {
  console.error("❌ Build error:", err);
  process.exit(1);
}