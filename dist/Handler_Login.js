import { setUser } from "./config.js";
import { getUserByName } from "./lib/db/users.js";
export async function handlerLogin(cmdName, ...args) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const user = args[0];
    if (await getUserByName(user) === undefined) {
        throw new Error("User not found!");
    }
    setUser(user);
    console.log(`User ${user} has successfully logged in.`);
}
