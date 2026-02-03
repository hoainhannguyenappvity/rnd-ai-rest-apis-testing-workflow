import { spawn } from "node:child_process";
import { openapi2numbering } from "./config/openapi.config.mjs";

const { command, args } = openapi2numbering;

const child = spawn("npx", [command, ...args],
    {
        stdio: 'inherit',
        shell: true,
    }
);

child.on("error", (err) => {
    console.error("The command won't run. Error:", err.message);
});

child.on("close", (code) => {
    if (code === 0) {
        console.log("Generate Postman collection successfully");
    } else {
        console.error(`Process exit code ${code}`);
    }
});