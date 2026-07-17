type commandHandler = (
    cmdName: string,
    ...args: string[]
) => Promise<void>;

export type commandRegistry = Record<string, commandHandler>;

export function registerCommand(registry:commandRegistry, cmdName:string, handler:commandHandler){
    registry[cmdName] = handler;
}

export async function runCommand(registry:commandRegistry, cmdName:string, ...args:string[]){
    await registry[cmdName](cmdName, ...args);
}

