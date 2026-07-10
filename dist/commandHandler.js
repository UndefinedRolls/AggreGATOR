export function registerCommand(registry, cmdName, handler) {
    registry[cmdName] = handler;
}
export async function runCommand(registry, cmdName, ...args) {
    await registry[cmdName](cmdName, ...args);
}
