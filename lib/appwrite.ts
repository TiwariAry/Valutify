// All functions in this file are server actions
'use server'

import {Client, Account, Databases, Users} from "node-appwrite";
import { cookies } from "next/headers";
import {config} from "dotenv";

config();

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // '!' to let TS know we already have this defined
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    // Check if there is a session
    const session = (await cookies()).get("appwrite-session");
    if (!session || !session.value) {
        throw new Error("No session");
    }

    // If there is a session attach it ot the client then return a function to access to the session
    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },

        get database() {
            return new Databases(client)
        },

        get user() {
            return new Users(client)
        }
    };
}
