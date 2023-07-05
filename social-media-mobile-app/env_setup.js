const { networkInterfaces } = require("os");
const { existsSync, readFileSync, writeFileSync } = require("fs");

const nets = networkInterfaces();

const localIp = nets["Wi-Fi"][1].address;

const isEnvExists = existsSync(".env");

const envVars = (
  isEnvExists
    ? readFileSync(".env", "utf-8")
    : `GRAPHQL_URL=http://localhost:8000/graphql`
).replaceAll("localhost", localIp);

writeFileSync(".env", envVars, "utf-8");

console.log("Complete configuring IP");
