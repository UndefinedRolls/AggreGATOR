import { createUser, getUserByName } from "./lib/db/users.js";
import { setUser } from "./config.js";
export async function handlerRegister(cmdName, ...args) {
    if (!args[0]) {
        throw new Error("No user name provided.  User not logged in");
    }
    const user = args[0];
    const record = await getUserByName(user);
    if (record) {
        throw new Error("User already exists.");
    }
    const new_user = await createUser(user);
    setUser(user);
    console.log(`User ${user} has added: ${JSON.stringify(new_user)}`);
}
