import { useEffect, useRef, useState } from "react"
import { Bell, Menu, X } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { getCurrentAdmin } from "../api/adminAuthApi.js"

const ROLE_LABELS = {
    SUPER_ADMIN: "Super Admin",
    CONTENT_ADMIN: "Content Admin",
    SCHEME_MANAGER: "Scheme Manager",
    TRAINING_MANAGER: "Training Manager",
    PROGRAM_MANAGER: "Program Manager",
    CRM_SUPPORT: "CRM Support",
    MEDIA_MANAGER: "Media Manager",
    REPORT_VIEWER: "Report Viewer",
}

const getRoleLabel = (role) => {
    if (!role) {
        return "Administrator"
    }

    return (
        ROLE_LABELS[role] ||
        role
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            )
    )
}

const getInitial = (name) => {
    if (!name) {
        return "A"
    }

    return name.trim().charAt(0).toUpperCase()
}

const AdminTopbar = ({ onMenuClick }) => {
    const [notificationOpen, setNotificationOpen] =
        useState(false)

    const notificationRef = useRef(null)

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["admin-me"],
        queryFn: getCurrentAdmin,
        retry: false,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    })

    const admin = data?.admin || null

    const adminName =
        admin?.name || "Admin"

    const adminRole =
        getRoleLabel(admin?.role)

    const adminInitial =
        getInitial(admin?.name)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target
                )
            ) {
                setNotificationOpen(false)
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        )

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }
    }, [])

    return (
        <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 shadow-sm md:px-8 lg:px-10">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open sidebar"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700 lg:hidden"
                >
                    <Menu size={20} />
                </button>

                <div className="hidden sm:block">
                    <p className="text-xs font-medium text-gray-400">
                        Admin Panel
                    </p>

                    <p className="text-sm font-bold text-green-950">
                        Krushisetu Administration
                    </p>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
                {/* Notifications */}
                <div
                    ref={notificationRef}
                    className="relative"
                >
                    <button
                        type="button"
                        aria-label="Notifications"
                        aria-expanded={
                            notificationOpen
                        }
                        onClick={() =>
                            setNotificationOpen(
                                (current) =>
                                    !current
                            )
                        }
                        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${notificationOpen
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            }`}
                    >
                        <Bell size={19} />
                    </button>

                    {notificationOpen && (
                        <div className="absolute right-0 top-13 z-50 w-[340px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
                            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        Notifications
                                    </p>

                                    <p className="mt-0.5 text-xs text-gray-400">
                                        Recent system activity
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setNotificationOpen(
                                            false
                                        )
                                    }
                                    aria-label="Close notifications"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="px-4 py-8 text-center">
                                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <Bell size={19} />
                                </div>

                                <p className="mt-3 text-sm font-semibold text-gray-800">
                                    No notifications
                                </p>

                                <p className="mx-auto mt-1 max-w-[240px] text-xs leading-5 text-gray-500">
                                    New applications, enquiries
                                    and other admin activity will
                                    appear here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Current Admin */}
                <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-bold text-green-950">
                            {isLoading
                                ? "Loading..."
                                : adminName}
                        </p>

                        <p className="text-xs text-gray-500">
                            {isLoading
                                ? "..."
                                : adminRole}
                        </p>
                    </div>

                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-sm font-bold text-white shadow-md shadow-green-900/10"
                        title={`${adminName} - ${adminRole}`}
                    >
                        {adminInitial}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AdminTopbar