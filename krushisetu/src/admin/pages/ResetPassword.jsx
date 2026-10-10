import { useEffect, useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import {
    ArrowLeft,
    CheckCircle2,
    Eye,
    EyeOff,
    KeyRound,
    Loader2,
    ShieldCheck,
    XCircle,
} from "lucide-react"

import axiosInstance from "../../api/axiosInstance.js"


const resetPassword = async (data) => {
    const response = await axiosInstance.post(
        "/admin/reset-password",
        data
    )

    return response.data
}


const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false)

    const [passwordError, setPasswordError] =
        useState("")

    const [confirmPasswordError, setConfirmPasswordError] =
        useState("")

    const [tokenError, setTokenError] =
        useState("")

    const [success, setSuccess] =
        useState(false)


    /*
    |--------------------------------------------------------------------------
    | Check reset token
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!token) {
            setTokenError(
                "This password reset link is invalid."
            )
        }
    }, [token])


    /*
    |--------------------------------------------------------------------------
    | Reset password mutation
    |--------------------------------------------------------------------------
    */

    const {
        mutate,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: resetPassword,

        onSuccess: () => {
            setSuccess(true)

            setPassword("")
            setConfirmPassword("")
        },
    })


    /*
    |--------------------------------------------------------------------------
    | Password validation
    |--------------------------------------------------------------------------
    */

    const validatePassword = () => {
        const value = password

        if (!value) {
            setPasswordError(
                "Password is required."
            )

            return false
        }

        if (value.length < 8) {
            setPasswordError(
                "Password must be at least 8 characters long."
            )

            return false
        }

        setPasswordError("")

        return true
    }


    /*
    |--------------------------------------------------------------------------
    | Confirm password validation
    |--------------------------------------------------------------------------
    */

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmPasswordError(
                "Please confirm your password."
            )

            return false
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(
                "Passwords do not match."
            )

            return false
        }

        setConfirmPasswordError("")

        return true
    }


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (event) => {
        event.preventDefault()

        setTokenError("")

        const passwordValid =
            validatePassword()

        const confirmPasswordValid =
            validateConfirmPassword()

        if (!token) {
            setTokenError(
                "This password reset link is invalid."
            )

            return
        }

        if (
            !passwordValid ||
            !confirmPasswordValid
        ) {
            return
        }

        mutate({
            token,
            password,
            confirmPassword,
        })
    }


    /*
    |--------------------------------------------------------------------------
    | Success state
    |--------------------------------------------------------------------------
    */

    if (success) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4 py-8"
                style={{
                    backgroundColor: "#F6FAF7",
                }}
            >
                <div className="w-full max-w-md">

                    <div className="text-center mb-8">

                        <div
                            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                            style={{
                                backgroundColor:
                                    "#DCFCE7",
                            }}
                        >
                            <CheckCircle2
                                size={32}
                                className="text-green-700"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Password Reset Successful
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Your Krushisetu admin password
                            has been changed successfully.
                        </p>

                    </div>


                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

                        <div
                            className="rounded-2xl border p-4"
                            style={{
                                backgroundColor:
                                    "#F0FDF4",
                                borderColor:
                                    "#BBF7D0",
                            }}
                        >
                            <div className="flex items-start gap-3">

                                <ShieldCheck
                                    size={21}
                                    className="mt-0.5 shrink-0 text-green-600"
                                />

                                <div>
                                    <p className="font-medium text-green-800">
                                        Password updated
                                    </p>

                                    <p className="mt-1 text-sm text-green-700">
                                        You can now log in using
                                        your new password.
                                    </p>
                                </div>

                            </div>
                        </div>


                        <Link
                            to="/admin"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            Go to Admin Login
                        </Link>

                    </div>

                </div>
            </div>
        )
    }


    /*
    |--------------------------------------------------------------------------
    | Invalid token state
    |--------------------------------------------------------------------------
    */

    if (tokenError) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4 py-8"
                style={{
                    backgroundColor: "#F6FAF7",
                }}
            >
                <div className="w-full max-w-md">

                    <div className="text-center mb-8">

                        <div
                            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                            style={{
                                backgroundColor:
                                    "#FEE2E2",
                            }}
                        >
                            <XCircle
                                size={32}
                                className="text-red-600"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Invalid Reset Link
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            This password reset link is
                            missing or invalid.
                        </p>

                    </div>


                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

                        <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                            <p>
                                Password reset links are valid
                                for only 15 minutes and can be
                                used only once.
                            </p>
                        </div>


                        <Link
                            to="/forgot-password"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            Request New Reset Link
                        </Link>


                        <Link
                            to="/"
                            className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
                        >
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>

                    </div>

                </div>
            </div>
        )
    }


    /*
    |--------------------------------------------------------------------------
    | Reset password form
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-8"
            style={{
                backgroundColor: "#F6FAF7",
            }}
        >
            <div className="w-full max-w-md">

                {/* Header */}

                <div className="text-center mb-8">

                    <div
                        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{
                            backgroundColor:
                                "#DCFCE7",
                        }}
                    >
                        <KeyRound
                            size={32}
                            className="text-green-700"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Reset Password
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Create a new password for your
                        Krushisetu admin account.
                    </p>

                </div>


                {/* Card */}

                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >

                        {/* Password */}

                        <div>

                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>

                            <div className="relative">

                                <KeyRound
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(
                                            event.target.value
                                        )

                                        if (
                                            passwordError
                                        ) {
                                            setPasswordError(
                                                ""
                                            )
                                        }
                                    }}
                                    onBlur={
                                        validatePassword
                                    }
                                    placeholder="Enter new password"
                                    autoComplete="new-password"
                                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                                        passwordError
                                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (value) =>
                                                !value
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            size={18}
                                        />
                                    ) : (
                                        <Eye
                                            size={18}
                                        />
                                    )}
                                </button>

                            </div>

                            {passwordError && (
                                <p className="mt-2 text-sm text-red-600">
                                    {passwordError}
                                </p>
                            )}

                            <p className="mt-2 text-xs text-gray-500">
                                Password must contain at least
                                8 characters.
                            </p>

                        </div>


                        {/* Confirm Password */}

                        <div className="mt-5">

                            <label
                                htmlFor="confirm-password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                                <KeyRound
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="confirm-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(event) => {
                                        setConfirmPassword(
                                            event.target.value
                                        )

                                        if (
                                            confirmPasswordError
                                        ) {
                                            setConfirmPasswordError(
                                                ""
                                            )
                                        }
                                    }}
                                    onBlur={
                                        validateConfirmPassword
                                    }
                                    placeholder="Confirm new password"
                                    autoComplete="new-password"
                                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                                        confirmPasswordError
                                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (value) =>
                                                !value
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff
                                            size={18}
                                        />
                                    ) : (
                                        <Eye
                                            size={18}
                                        />
                                    )}
                                </button>

                            </div>

                            {confirmPasswordError && (
                                <p className="mt-2 text-sm text-red-600">
                                    {confirmPasswordError}
                                </p>
                            )}

                        </div>


                        {/* Backend Error */}

                        {isError && (
                            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error?.response?.data
                                    ?.message ||
                                    "Unable to reset your password. Please try again."}
                            </div>
                        )}


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Resetting Password...
                                </>
                            ) : (
                                <>
                                    <ShieldCheck
                                        size={18}
                                    />
                                    Reset Password
                                </>
                            )}
                        </button>

                    </form>


                    {/* Back to Login */}

                    <Link
                        to="/admin"
                        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
                    >
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>

                </div>


                {/* Security Note */}

                <div className="mt-5 text-center text-xs text-gray-500">
                    <p>
                        Your reset link expires after 15 minutes
                        and can only be used once.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword