import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import {
    ArrowLeft,
    CheckCircle2,
    Loader2,
    Mail,
    ShieldCheck,
} from "lucide-react"

import axiosInstance from "../../api/axiosInstance.js"

const forgotPassword = async (email) => {
    const response = await axiosInstance.post(
        "/admin/forgot-password",
        {
            email,
        }
    )

    return response.data
}

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const {
        mutate,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: forgotPassword,

        onSuccess: (data) => {
            setSuccessMessage(
                data?.message ||
                    "If an account exists with this email, a password reset link has been sent."
            )

            setEmailError("")
        },

        onError: () => {
            setSuccessMessage("")
        },
    })

    const validateEmail = () => {
        const trimmedEmail = email.trim()

        if (!trimmedEmail) {
            setEmailError("Email address is required.")
            return false
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(trimmedEmail)) {
            setEmailError(
                "Please enter a valid email address."
            )
            return false
        }

        setEmailError("")
        return true
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setSuccessMessage("")

        if (!validateEmail()) {
            return
        }

        mutate(email.trim().toLowerCase())
    }

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
                        <ShieldCheck
                            size={32}
                            className="text-green-700"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Forgot Password?
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Enter your admin account email and
                        we'll send you a password reset link.
                    </p>

                </div>

                {/* Card */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

                    {successMessage ? (
                        <div>

                            {/* Success */}
                            <div
                                className="mb-6 flex items-start gap-3 rounded-2xl border p-4"
                                style={{
                                    backgroundColor:
                                        "#F0FDF4",
                                    borderColor:
                                        "#BBF7D0",
                                }}
                            >
                                <CheckCircle2
                                    size={21}
                                    className="mt-0.5 shrink-0 text-green-600"
                                />

                                <div>
                                    <p className="font-medium text-green-800">
                                        Check your email
                                    </p>

                                    <p className="mt-1 text-sm text-green-700">
                                        {successMessage}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                                <p>
                                    The password reset link is
                                    valid for 15 minutes.
                                </p>

                                <p className="mt-2">
                                    If you don't receive the
                                    email, check your spam or
                                    junk folder.
                                </p>
                            </div>

                            <Link
                                to="/admin/"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft size={18} />
                                Back to Login
                            </Link>

                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                        >

                            {/* Email */}
                            <div>

                                <label
                                    htmlFor="forgot-email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Admin Email
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="forgot-email"
                                        type="email"
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(
                                                event.target.value
                                            )

                                            if (
                                                emailError
                                            ) {
                                                setEmailError(
                                                    ""
                                                )
                                            }
                                        }}
                                        onBlur={
                                            validateEmail
                                        }
                                        placeholder="Enter your admin email"
                                        autoComplete="email"
                                        className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                                            emailError
                                                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                                : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                                        }`}
                                    />

                                </div>

                                {emailError && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {emailError}
                                    </p>
                                )}

                            </div>

                            {/* Backend Error */}
                            {isError && (
                                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error?.response?.data
                                        ?.message ||
                                        "Unable to process your request. Please try again."}
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
                                        Sending Reset Link...
                                    </>
                                ) : (
                                    <>
                                        <Mail size={18} />
                                        Send Reset Link
                                    </>
                                )}
                            </button>

                        </form>
                    )}

                    {/* Back to Login */}
                    {!successMessage && (
                        <Link
                            to="/admin/"
                            className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
                        >
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    )}

                </div>

                {/* Security Note */}
                <div className="mt-5 text-center text-xs text-gray-500">
                    <p>
                        For security reasons, we don't reveal
                        whether an email address is registered.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword