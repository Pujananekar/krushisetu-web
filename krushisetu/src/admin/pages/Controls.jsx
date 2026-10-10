import {
    Bell,
    ChevronRight,
    Globe,
    LockKeyhole,
    Save,
    Settings,
    ShieldCheck,
    UserRound,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Controls = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        newApplications: true,
        applicationUpdates: true,
        contactEnquiries: true,
        maintenanceMode: false,
        publicApplications: true,
    })

    const handleToggle = (key) => {
        setSettings((current) => ({
            ...current,
            [key]: !current[key],
        }))
    }

    const Toggle = ({ enabled, onClick }) => {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-pressed={enabled}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
                    enabled ? "bg-green-700" : "bg-gray-300"
                }`}
            >
                <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
        )
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-500">
                            <Link
                                to="/admin/dashboard"
                                className="kr-hover-link"
                            >
                                Dashboard
                            </Link>

                            <ChevronRight size={15} />

                            <span className="text-green-700">
                                Admin Controls
                            </span>
                        </div>

                        <div>
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <Settings size={23} />
                            </div>

                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                Administration
                            </p>

                            <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                Admin Controls
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                Manage administrator preferences, website
                                controls, notifications and security settings.
                            </p>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid gap-6 xl:grid-cols-3">
                        {/* Profile */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5 xl:col-span-2">
                            <div className="mb-6 flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <UserRound size={20} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-black text-green-950">
                                        Administrator Profile
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage the administrator account
                                        information.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-bold text-gray-700">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        defaultValue="Admin"
                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        defaultValue="admin@krushisetu.org"
                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-gray-700">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        value="Administrator"
                                        readOnly
                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 text-sm font-semibold text-gray-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-gray-700">
                                        Account Status
                                    </label>

                                    <div className="flex h-12 items-center">
                                        <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                                            <span className="h-2 w-2 rounded-full bg-green-600" />
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    className="kr-hover-button inline-flex h-11 items-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                                >
                                    <Save size={17} />
                                    Save Profile
                                </button>
                            </div>
                        </section>

                        {/* Security */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <div className="mb-6 flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <LockKeyhole size={20} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-black text-green-950">
                                        Security
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage account security.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-4">
                                <p className="text-sm font-bold text-gray-800">
                                    Password
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Change the administrator account password.
                                </p>

                                <button
                                    type="button"
                                    className="kr-hover-button mt-4 inline-flex h-10 items-center rounded-xl border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 hover:border-green-200 hover:text-green-700"
                                >
                                    Change Password
                                </button>
                            </div>

                            <div className="mt-4 rounded-2xl bg-green-50 p-4">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck
                                        size={19}
                                        className="mt-0.5 shrink-0 text-green-700"
                                    />

                                    <div>
                                        <p className="text-sm font-bold text-green-900">
                                            Account Protected
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-green-800/70">
                                            Administrator security controls
                                            are enabled.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Notifications */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5 xl:col-span-2">
                            <div className="mb-6 flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <Bell size={20} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-black text-green-950">
                                        Notifications
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Control which administrative events
                                        generate notifications.
                                    </p>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                <div className="flex items-center justify-between gap-5 py-4 first:pt-0">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            Email Notifications
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Receive important administrative
                                            notifications by email.
                                        </p>
                                    </div>

                                    <Toggle
                                        enabled={settings.emailNotifications}
                                        onClick={() =>
                                            handleToggle(
                                                "emailNotifications"
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-5 py-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            New Applications
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Notify administrators when a new
                                            application is submitted.
                                        </p>
                                    </div>

                                    <Toggle
                                        enabled={settings.newApplications}
                                        onClick={() =>
                                            handleToggle("newApplications")
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-5 py-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            Application Updates
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Receive notifications when an
                                            application's status changes.
                                        </p>
                                    </div>

                                    <Toggle
                                        enabled={settings.applicationUpdates}
                                        onClick={() =>
                                            handleToggle(
                                                "applicationUpdates"
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-5 py-4 last:pb-0">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            Contact Enquiries
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Notify administrators about new
                                            contact enquiries.
                                        </p>
                                    </div>

                                    <Toggle
                                        enabled={settings.contactEnquiries}
                                        onClick={() =>
                                            handleToggle("contactEnquiries")
                                        }
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Website Controls */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <div className="mb-6 flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <Globe size={20} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-black text-green-950">
                                        Website Controls
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Control public website availability.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 p-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            Public Applications
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Allow visitors to submit
                                            applications.
                                        </p>
                                    </div>

                                    <Toggle
                                        enabled={settings.publicApplications}
                                        onClick={() =>
                                            handleToggle(
                                                "publicApplications"
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 p-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            Maintenance Mode
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Temporarily disable public access.
                                        </p>
                                    </div>

                                    <Toggle
                                        enabled={settings.maintenanceMode}
                                        onClick={() =>
                                            handleToggle("maintenanceMode")
                                        }
                                    />
                                </div>
                            </div>
                        </section>

                        {/* System Information */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5 xl:col-span-3">
                            <div className="mb-6 flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <Settings size={20} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-black text-green-950">
                                        System Information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Basic information about the Krushisetu
                                        administration system.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        Platform
                                    </p>

                                    <p className="mt-2 text-sm font-bold text-green-950">
                                        Krushisetu
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        Panel
                                    </p>

                                    <p className="mt-2 text-sm font-bold text-green-950">
                                        Admin Dashboard
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        Environment
                                    </p>

                                    <p className="mt-2 text-sm font-bold text-green-950">
                                        Production
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        Status
                                    </p>

                                    <p className="mt-2 flex items-center gap-2 text-sm font-bold text-green-700">
                                        <span className="h-2 w-2 rounded-full bg-green-600" />
                                        Operational
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Controls