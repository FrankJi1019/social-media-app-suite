const { networkInterfaces } = require("os");
const { existsSync, readFileSync, writeFileSync } = require("fs");

const nets = networkInterfaces();

const localIp = nets["Wi-Fi"][1].address;

const env = readFileSync(".env", "utf-8").replaceAll(
  /((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}/g,
  localIp
);

writeFileSync(".env", env, "utf-8");

console.log("Complete configuring IP");
