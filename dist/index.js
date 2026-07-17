import { registerCommand, runCommand } from "./commandHandler.js";
import { handlerLogin } from "./Handler_Login.js";
import { argv } from "node:process";
import { handlerRegister } from "./Handler_Register.js";
import { handlerReset } from "./Handler_Reset.js";
import { handlerUsers } from "./Handler_Users.js";
import { handlerAgg } from "./Handler_Agg.js";
import { handlerAddFeed } from "./Handler_addFeed.js";
import { handlerFeeds } from "./Handler_feeds.js";
import { handlerFollow } from "./Handler_follow.js";
async function main() {
    let cmdReg = {};
    registerCommand(cmdReg, "login", handlerLogin);
    registerCommand(cmdReg, "register", handlerRegister);
    registerCommand(cmdReg, "reset", handlerReset);
    registerCommand(cmdReg, "users", handlerUsers);
    registerCommand(cmdReg, "agg", handlerAgg);
    registerCommand(cmdReg, "addfeed", handlerAddFeed);
    registerCommand(cmdReg, "feeds", handlerFeeds);
    registerCommand(cmdReg, "follow", handlerFollow);
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
