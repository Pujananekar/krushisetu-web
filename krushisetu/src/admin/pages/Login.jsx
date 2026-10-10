import { useState } from "react";
import {
    Eye,
    EyeOff,
    Leaf,
    LockKeyhole,
    User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {
    adminLogin,
    getCurrentAdmin,
} from "../api/adminAuthApi.js";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const loginMutation = useMutation({
        mutationFn: adminLogin,

        onSuccess: async (data) => {
            console.log("Login response:", data);

            if (!data?.success) {
                setError(
                    data?.message ||
                        "Unable to sign in. Please try again."
                );

                return;
            }

            try {
                /*
                 * Verify that the server-side session was
                 * actually created successfully.
                 *
                 * The browser automatically sends the
                 * HTTP-only session cookie because
                 * axiosInstance uses withCredentials: true.
                 */
                const sessionData = await getCurrentAdmin();

                if (!sessionData?.success) {
                    setError(
                        "Login succeeded, but the admin session could not be verified."
                    );

                    return;
                }

                console.log(
                    "Logged in admin:",
                    sessionData?.admin
                );

                setError("");

                navigate("/admin/dashboard", {
                    replace: true,
                });
            } catch (sessionError) {
                console.error(
                    "Admin session verification error:",
                    sessionError
                );

                const sessionMessage =
                    sessionError?.response?.data?.message;

                setError(
                    sessionMessage ||
                        "Login succeeded, but the admin session could not be verified."
                );
            }
        },

        onError: (error) => {
            console.error(
                "Admin login error:",
                error
            );

            if (
                error?.response?.data?.message
            ) {
                setError(
                    error.response.data.message
                );

                return;
            }

            if (error?.request) {
                setError(
                    "Unable to connect to the server. Please try again."
                );

                return;
            }

            setError(
                "Something went wrong. Please try again."
            );
        },
    });

    const isLoading = loginMutation.isPending;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        setError("");

        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setError(
                "Please enter your username."
            );

            return;
        }

        if (!password) {
            setError(
                "Please enter your password."
            );

            return;
        }

        if (password.length < 8) {
            setError(
                "Password must contain at least 8 characters."
            );

            return;
        }

        loginMutation.mutate({
            username: trimmedUsername,
            password,
        });
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);

        if (error) {
            setError("");
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);

        if (error) {
            setError("");
        }
    };

    const handleForgotPassword = () => {
        if (isLoading) {
            return;
        }

        navigate("/admin/forgot-password");
    };

    return (
        <main className="min-h-dvh bg-[#f5f8f3]">
            <div className="grid min-h-dvh lg:grid-cols-[1.05fr_0.95fr]">

                {/* =====================================================
                    LEFT SIDE
                ====================================================== */}

                <section className="relative hidden overflow-hidden bg-green-950 lg:flex">
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-700/20 blur-3xl" />

                    <div className="absolute -bottom-40 -right-32 h-125 w-125 rounded-full bg-lime-500/10 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        {/* Logo */}

                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-black/20">
                                <Leaf
                                    size={25}
                                    strokeWidth={2}
                                />
                            </div>

                            <div>
                                <p className="text-lg font-bold tracking-tight text-white">
                                    Krushisetu
                                </p>

                                <p className="text-xs text-green-200/70">
                                    कृषीसेतू
                                </p>
                            </div>
                        </div>

                        {/* Content */}

                        <div className="max-w-xl">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
                                Administration Portal
                            </p>

                            <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                                Manage Krushisetu

                                <span className="block text-green-300">
                                    from one place.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-green-100/65">
                                Manage departments, government schemes,
                                training programs, resources, applications,
                                enquiries and other Krushisetu operations.
                            </p>
                        </div>

                        {/* Footer */}

                        <div>
                            <div className="mb-5 h-px w-full bg-white/10" />

                            <p className="text-xs text-green-200/50">
                                An initiative of Be The Change Foundation
                            </p>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    RIGHT SIDE
                ====================================================== */}

                <section className="flex min-h-dvh items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-md">

                        {/* Mobile Logo */}

                        <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-white shadow-md">
                                <Leaf size={22} />
                            </div>

                            <div>
                                <p className="text-lg font-bold text-green-950">
                                    Krushisetu
                                </p>

                                <p className="text-xs text-gray-500">
                                    Admin Portal
                                </p>
                            </div>
                        </div>

                        {/* Heading */}

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-950">
                                Welcome back
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Sign in to access the Krushisetu
                                administration panel.
                            </p>
                        </div>

                        {/* Error */}

                        {error && (
                            <div
                                role="alert"
                                aria-live="polite"
                                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-5"
                        >

                            {/* Username */}

                            <div>
                                <label
                                    htmlFor="admin-username"
                                    className="mb-2 block text-sm font-semibold text-gray-800"
                                >
                                    Username
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="admin-username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        value={username}
                                        onChange={
                                            handleUsernameChange
                                        }
                                        placeholder="Enter your username"
                                        disabled={isLoading}
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Password */}

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="admin-password"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={
                                            handleForgotPassword
                                        }
                                        className="text-xs font-semibold text-green-700 transition hover:text-green-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="relative">
                                    <LockKeyhole
                                        size={18}
                                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="admin-password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={
                                            handlePasswordChange
                                        }
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                                    />

                                    <button
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        disabled={isLoading}
                                        onClick={() =>
                                            setShowPassword(
                                                (current) =>
                                                    !current
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-700/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                        <span>
                                            Signing in...
                                        </span>
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </form>

                        {/* Security Notice */}

                        <div className="mt-8 rounded-xl border border-green-100 bg-green-50/70 px-4 py-3">
                            <p className="text-xs leading-5 text-green-900/65">
                                This portal is restricted to authorized
                                Krushisetu administrators and staff.
                            </p>
                        </div>

                        <p className="mt-8 text-center text-xs text-gray-400">
                            Krushisetu Administration
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}