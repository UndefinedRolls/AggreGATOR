import {db} from "./index.js";
import {users} from "./schema.js";
import {eq, sql} from "drizzle-orm"
export async function createUser(name:string){
    const [result] = await db.insert(users).values({name:name}).returning();
    return result;
}

export type User = typeof users.$inferSelect;

export async function getUserByName(name:string){
    const [result] = await db.select().from(users).where(eq(users.name, name));
    return result;
}

export async function resetUser(){
   return db.delete(users).returning();
}

export async function getUsers(){
    return db.select({user_name: users.name}).from(users);

}

export async function getUserByID(id:string){
    return db.select({user_name:users.name}).from(users).where(eq(users.id,id));
}
