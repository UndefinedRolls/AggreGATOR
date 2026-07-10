import { registerCommand, runCommand } from "./commandHandler.js";
import { handlerLogin } from "./Handler_Login.js";
import { argv } from "node:process";
import { handlerRegister } from "./Handler_Register.js";
import { handlerReset } from "./Handler_Reset.js";
import { handlerUsers } from "./Handler_Users.js";
async function main() {
    let cmdReg = {};
    registerCommand(cmdReg, "login", handlerLogin);
    registerCommand(cmdReg, "register", handlerRegister);
    registerCommand(cmdReg, "reset", handlerReset);
    registerCommand(cmdReg, "users", handlerUsers);
    const commandName = argv[2];
    if (commandName === undefined) {
        console.error("No command provided. Terminating.");
        process.exit(1);
    }
    const commands = argv.slice(3);
    try {
        await runCommand(cmdReg, commandName, ...commands);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            process.exit(1);
        }
        else {
            console.error(err);
        }
    }
    process.exit(0);
}
await main();
