import { setUser } from "./config";
import { getUserByName } from "./lib/db/users";
export async function handlerLogin(cmdName, ...args) {
    if (!args[0]) {
        throw new Error("No user name provided.  User not logged in");
    }
    const user = args[0];
    if (await getUserByName(user) === undefined) {
        throw new Error("User not found!");
    }
    setUser(user);
    console.log(`User ${user} has successfully logged in.`);
}
