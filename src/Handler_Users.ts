import {getUsers} from "./lib/db/users.js";
import {readConfig} from "./config.js";

export async function handlerUsers(cmdName:string, ...args:string[]): Promise<void>{
    const cfg = readConfig();
    const current_user = cfg.currentUserName;
    console.log(`${cfg.dbUrl}`)
    const database = await getUsers();
    let print_str = ``;
    for (const record of database){
        const user_name = record.user_name;
        if (user_name === current_user){
            print_str += `* ${user_name} (current)\n`;
        }
        else{
            print_str += `* ${user_name}\n`;
        }
        
    }
    console.log(print_str);
}