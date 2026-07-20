import { getUserByName } from "./lib/db/users.js";
import { readConfig } from "./config.js";
export function middlewareLoggedIn(handler) {
    return async (cmd, ...args) => {
        const current_user = readConfig().currentUserName;
        const user = await getUserByName(current_user);
        if (!user) {
            throw new Error(`User ${user} not found`);
        }
        await handler(cmd, user, ...args);
    };
}
export function registerCommand(registry, cmdName, handler) {
    registry[cmdName] = handler;
}
export async function runCommand(registry, cmdName, ...args) {
    await registry[cmdName](cmdName, ...args);
}
