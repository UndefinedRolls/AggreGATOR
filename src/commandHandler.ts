import {getUserByName, User} from "./lib/db/users.js";
import {readConfig} from "./config.js";

type commandHandler = (
    cmdName: string,
    ...args: string[]
) => Promise<void>;

export type commandRegistry = Record<string, commandHandler>;

type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]) => Promise<void>;

export function middlewareLoggedIn(handler: UserCommandHandler): commandHandler {
    return async (cmd:string, ...args:string[]) => {

        const current_user = readConfig().currentUserName;

        const user = await getUserByName(current_user);
        if (!user){
            throw new Error(`User ${user} not found`)
        }
        await handler(cmd, user, ...args);
    }

}

export function registerCommand(registry:commandRegistry, cmdName:string, handler:commandHandler){
    registry[cmdName] = handler;
}

export async function runCommand(registry:commandRegistry, cmdName:string, ...args:string[]){
    await registry[cmdName](cmdName, ...args);
}

