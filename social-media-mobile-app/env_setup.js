const { networkInterfaces } = require("os");
const { existsSync, readFileSync, writeFileSync } = require("fs");

const nets = networkInterfaces();

const localIp = nets["Wi-Fi"][1].address;

const env = readFileSync(".env.example", "utf-8").replaceAll(
  "localhost",
  localIp
);

writeFileSync(".env", env, "utf-8");

console.log("Complete configuring IP");
