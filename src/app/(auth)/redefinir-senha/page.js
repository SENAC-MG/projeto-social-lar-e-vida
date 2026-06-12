"use client";

import Link from "next/link";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import {
    resetPasswordAction,
    validateResetTokenAction,
} from "@/features/auth/actions/auth-actions";
import Button from "@/shared/ui/Button";
import { InputField } from "@/shared/ui/Input";

function RedefinirSenhaContent() {
    const searchParams = useSearchParams();
    const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function validateToken() {
            const result = await validateResetTokenAction(token);
            if (!mounted) return;
            setTokenValid(result.valid);
            setValidating(false);
        }

        validateToken();

        return () => {
            mounted = false;
        };
    }, [token]);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.set("token", token);
        formData.set("newPassword", newPassword);

        const result = await resetPasswordAction(formData);

        if (result.success) {
            toast.success(result.message);
            setNewPassword("");
        } else {
            toast.error(result.error);
        }

        setLoading(false);
    }

    if (validating) {
        return (
            <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
                <p className="text-sm text-foreground/70">Validando token de recuperação...</p>
            </main>
        );
    }

    if (!tokenValid) {
        return (
            <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
                <div className="w-full rounded-2xl border border-card-border bg-card p-6 shadow-sm">
                    <h1 className="text-xl font-bold text-foreground">Link inválido ou expirado</h1>
                    <p className="mt-2 text-sm text-foreground/60">
                        Solicite uma nova recuperação de senha para continuar.
                    </p>
                    <Link
                        href="/recuperar-senha"
                        className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
                    >
                        Solicitar nova recuperação
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
            <div className="w-full rounded-2xl border border-card-border bg-card p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-foreground">Redefinir senha</h1>
                <p className="mt-2 text-sm text-foreground/60">
                    Digite uma nova senha forte para sua conta.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="relative">
                        <Lock className="absolute left-3 top-[38px] h-4 w-4 text-foreground/40" />
                        <InputField
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            label="Nova senha"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            placeholder="Mínimo 8 caracteres"
                            inputClassName="pl-9 pr-9"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[36px] rounded p-1 text-foreground/50 transition-colors hover:text-foreground"
                            aria-label={showPassword ? "Ocultar" : "Mostrar"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Redefinindo..." : "Redefinir senha"}
                    </Button>
                </form>

                <Link
                    href="/"
                    className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
                >
                    Voltar para login
                </Link>
            </div>
        </main>
    );
}

export default function RedefinirSenhaPage() {
    return (
        <Suspense
            fallback={
                <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
                    <p className="text-sm text-foreground/70">Validando token de recuperação...</p>
                </main>
            }
        >
            <RedefinirSenhaContent />
        </Suspense>
    );
}
