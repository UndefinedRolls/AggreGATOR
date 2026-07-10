import {createUser, getUserByName} from "./lib/db/users.js";
import {setUser} from "./config.js";
export async function handlerRegister(cmdName:string, ...args:string[]): Promise<void>{
    if(args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const user = args[0];
    const record = await getUserByName(user);
    if (record){
        throw new Error("User already exists.");
    }
    const new_user = await createUser(user);

    setUser(user);
    console.log(`User ${user} has added: ${JSON.stringify(new_user)}`);

}