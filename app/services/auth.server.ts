import fs from "node:fs/promises";
import path from "node:path";
import { createCookie } from "@remix-run/node";

export type UserRole = "admin";

export type UserRecord = {
  id: string;
  email: string;
  password: string;
  role: UserRole;
};

type UserStore = {
  users: UserRecord[];
};

const USERS_FILE = path.join(process.cwd(), "app", "config", "users.json");

let usersCache: UserStore | null = null;

async function ensureUsersFile(): Promise<void> {
  try {
    await fs.access(USERS_FILE);
  } catch {
    const initial: UserStore = { users: [] };
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function loadUsers(): Promise<UserStore> {
  if (usersCache) return usersCache;
  await ensureUsersFile();
  const raw = await fs.readFile(USERS_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw) as UserStore;
    usersCache = parsed;
    return parsed;
  } catch {
    const fallback: UserStore = { users: [] };
    usersCache = fallback;
    return fallback;
  }
}

async function saveUsers(store: UserStore): Promise<void> {
  usersCache = store;
  await fs.writeFile(USERS_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function getAdminUser(): Promise<UserRecord | null> {
  const store = await loadUsers();
  return store.users.find((u) => u.role === "admin") ?? null;
}

export async function registerAdmin(email: string, password: string): Promise<UserRecord> {
  const store = await loadUsers();
  const existingAdmin = store.users.find((u) => u.role === "admin");
  if (existingAdmin) {
    throw new Error("Admin user already exists");
  }

  const newUser: UserRecord = {
    id: "admin",
    email,
    password,
    role: "admin",
  };

  store.users.push(newUser);
  await saveUsers(store);
  return newUser;
}

export async function verifyLogin(email: string, password: string): Promise<UserRecord | null> {
  const store = await loadUsers();
  const user = store.users.find((u) => u.email === email && u.role === "admin");
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}

type SessionPayload = {
  userId: string;
  role: UserRole;
};

export const userSessionCookie = createCookie("user_session", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 4, // 4 hours
});

export async function getSessionUser(request: Request): Promise<SessionPayload | null> {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  const parsed = (await userSessionCookie.parse(cookieHeader)) as SessionPayload | undefined;
  if (!parsed) return null;
  return parsed;
}

export async function requireUser(request: Request): Promise<SessionPayload> {
  const user = await getSessionUser(request);
  if (!user) {
    throw new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  return user;
}

export async function requireAdmin(request: Request): Promise<SessionPayload> {
  const user = await requireUser(request);
  if (user.role !== "admin") {
    throw new Response("Forbidden", {
      status: 403,
      statusText: "Forbidden",
    });
  }
  return user;
}

export async function createUserSession(user: UserRecord): Promise<string> {
  const payload: SessionPayload = { userId: user.id, role: user.role };
  return userSessionCookie.serialize(payload);
}

export async function destroyUserSession(): Promise<string> {
  return userSessionCookie.serialize("", { maxAge: 0 });
}
