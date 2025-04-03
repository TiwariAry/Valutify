'use server'

import {createAdminClient, createSessionClient} from "@/lib/appwrite";
import {ID} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {cookies} from "next/headers";

export const SignIn = async ({email, password} : signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);

        return parseStringify(response);
    }
    catch (error) {
        return null;
    }
}

export const SignUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;

    try {
        // Create a user account using appwrite
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`)
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount)
    }
    catch (error) {
        return null;
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user =  await account.get();

        console.log("GetLoggedInUser => ", user)

        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const {account} = await createSessionClient();

        (await cookies()).delete('appwrite-session');

        await account.deleteSession('current')
    }
    catch (error) {
        return null;
    }
}