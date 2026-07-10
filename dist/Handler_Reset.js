import { resetUser } from "./lib/db/users.js";
export async function handlerReset(cmdName, ...args) {
    const cnt = await resetUser();
    const num_records = cnt.length;
    console.log(`Number of records deleted: ${num_records}`);
}
