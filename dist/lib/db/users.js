import { db } from "./index.js";
import { users } from "./schema.js";
import { eq } from "drizzle-orm";
export async function createUser(name) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}
export async function getUserByName(name) {
    const [result] = await db.select().from(users).where(eq(users.name, name));
    return result;
}
export async function resetUser() {
    return db.delete(users).returning();
}
export async function getUsers() {
    return db.select({ user_name: users.name }).from(users);
}
export async function getUserByID(id) {
    return db.select({ user_name: users.name }).from(users).where(eq(users.id, id));
}
