"use server";

import { loginAction } from "@/features/auth/actions/auth-actions";

export async function login(email, senha) {
    return loginAction(email, senha);
}
