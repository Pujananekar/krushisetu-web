import {
    ArrowUpRight,
    BriefcaseBusiness,
    CheckCircle2,
    Clock3,
    FileText,
    GraduationCap,
    Handshake,
    RefreshCw,
    Sprout,
    Users,
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { getDashboard } from "../api/adminDashboardApi.js"
import { Link } from "react-router-dom"

const applicationTypeConfig = {
    FARMER: {
        title: "Farmers",
        description: "Farmer registrations and support requests",
        icon: Sprout,
        href: "/admin/applications/",
    },
    TRAINING: {
        title: "Training",
        description: "Training and event applications",
        icon: GraduationCap,
        href: "/admin/applications/",
    },
    SERVICE: {
        title: "Services",
        description: "Agricultural service requests",
        icon: BriefcaseBusiness,
        href: "/admin/applications/",
    },
    INTERNSHIP: {
        title: "Internships",
        description: "Internship applications",
        icon: Users,
        href: "/admin/applications/",
    },
    FPO: {
        title: "FPO",
        description: "FPO applications and requests",
        icon: Handshake,
        href: "/admin/applications/fpo"   },
    PARTNERSHIP: {
        title: "Partnerships",
        description: "Partnership applications",
        icon: Handshake,
        href: "/admin/applications/",
    },
    VOLUNTEER: {
        title: "Volunteers",
        description: "Volunteer applications",
        icon: Users,
        href: "/admin/applications/",
    },
}

const statusConfig = {
    NEW: {
        label: "New",
        className: "bg-blue-50 text-blue-700",
    },
    IN_PROGRESS: {
        label: "In Progress",
        className: "bg-amber-50 text-amber-700",
    },
    RESOLVED: {
        label: "Resolved",
        className: "bg-green-50 text-green-700",
    },
    CLOSED: {
        label: "Closed",
        className: "bg-gray-100 text-gray-600",
    },
}

const formatApplicationType = (type) => {
    return (
        applicationTypeConfig[type]?.title ||
        type?.replaceAll("_", " ") ||
        "Application"
    )
}

const formatDate = (date) => {
    if (!date) return "—"

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const Dashboard = () => {
    const {
        data: response,
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: getDashboard,
    })

    const dashboard = response?.data

    const applicationStats = dashboard?.applications
    const enquiryStats = dashboard?.enquiries

    const stats = [
        {
            title: "Total Applications",
            value: applicationStats?.total ?? 0,
            description: "All applications",
            icon: FileText,
        },
        {
            title: "New Applications",
            value: applicationStats?.new ?? 0,
            description: "Awaiting review",
            icon: Clock3,
        },
        {
            title: "In Progress",
            value: applicationStats?.in_progress ?? 0,
            description: "Currently processing",
            icon: BriefcaseBusiness,
        },
        {
            title: "Resolved",
            value: applicationStats?.resolved ?? 0,
            description: "Successfully completed",
            icon: CheckCircle2,
        },
    ]

    const applicationTypes = dashboard?.applicationTypes ?? []
    const recentApplications = dashboard?.recentApplications ?? []

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">
                    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                Overview
                            </p>

                            <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                Dashboard Overview
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                Monitor applications and enquiries from one place.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="kr-hover-button inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RefreshCw
                                size={16}
                                className={isFetching ? "animate-spin" : ""}
                            />
                            Refresh
                        </button>
                    </div>

                    {isError && (
                        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
                            <p className="text-sm font-semibold text-red-700">
                                Unable to load dashboard data.
                            </p>

                            <p className="mt-1 text-xs text-red-600">
                                Please check the server connection and try again.
                            </p>
                        </div>
                    )}

                    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon

                            return (
                                <div
                                    key={stat.title}
                                    className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500">
                                                {stat.title}
                                            </p>

                                            <p className="mt-3 text-3xl font-black text-green-950">
                                                {isLoading ? (
                                                    <span className="inline-block h-9 w-16 animate-pulse rounded-lg bg-gray-100" />
                                                ) : (
                                                    stat.value
                                                )}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {stat.description}
                                            </p>
                                        </div>

                                        <div className="kr-hover-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <Icon size={21} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </section>

                    <section className="mt-8">
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                                    Applications
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-green-950">
                                    Application Categories
                                </h2>
                            </div>

                            <span className="hidden text-xs font-medium text-gray-400 sm:block">
                                Manage applications by category
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-44 animate-pulse rounded-3xl border border-gray-200 bg-white"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {applicationTypes.map((item) => {
                                    const config =
                                        applicationTypeConfig[
                                            item.application_type
                                        ]

                                    if (!config) return null

                                    const Icon = config.icon

                                    return (
                                        <Link
                                            key={item.application_type}
                                            to={config.href}
                                            className="kr-hover-card group rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="kr-hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                    <Icon size={21} />
                                                </div>

                                                <ArrowUpRight
                                                    size={19}
                                                    className="kr-hover-arrow text-gray-400"
                                                />
                                            </div>

                                            <div className="mt-5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <h3 className="kr-hover-title text-lg font-bold text-green-950">
                                                        {config.title}
                                                    </h3>

                                                    <span className="rounded-xl bg-green-50 px-3 py-1.5 text-sm font-black text-green-700">
                                                        {item.count}
                                                    </span>
                                                </div>

                                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                                    {config.description}
                                                </p>
                                            </div>

                                            <div className="kr-hover-line mt-5 h-1 w-8 rounded-full bg-green-600" />
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </section>

                    <section className="mt-8 grid gap-5 lg:grid-cols-2">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <div className="mb-5">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                                    Enquiries
                                </p>

                                <h2 className="mt-1 text-xl font-black text-green-950">
                                    Enquiry Overview
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-xs font-semibold text-gray-500">
                                        Total
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-green-950">
                                        {isLoading
                                            ? "—"
                                            : enquiryStats?.total ?? 0}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-blue-50 p-4">
                                    <p className="text-xs font-semibold text-blue-600">
                                        New
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-blue-800">
                                        {isLoading
                                            ? "—"
                                            : enquiryStats?.new ?? 0}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-amber-50 p-4">
                                    <p className="text-xs font-semibold text-amber-600">
                                        In Progress
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-amber-800">
                                        {isLoading
                                            ? "—"
                                            : enquiryStats?.in_progress ?? 0}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-green-50 p-4">
                                    <p className="text-xs font-semibold text-green-600">
                                        Resolved
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-green-800">
                                        {isLoading
                                            ? "—"
                                            : enquiryStats?.resolved ?? 0}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <div className="mb-5">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                                    Status
                                </p>

                                <h2 className="mt-1 text-xl font-black text-green-950">
                                    Application Status
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        label: "New",
                                        value: applicationStats?.new,
                                        className: "bg-blue-500",
                                    },
                                    {
                                        label: "In Progress",
                                        value: applicationStats?.in_progress,
                                        className: "bg-amber-500",
                                    },
                                    {
                                        label: "Resolved",
                                        value: applicationStats?.resolved,
                                        className: "bg-green-600",
                                    },
                                    {
                                        label: "Closed",
                                        value: applicationStats?.closed,
                                        className: "bg-gray-400",
                                    },
                                ].map((item) => {
                                    const total =
                                        applicationStats?.total || 0

                                    const percentage = total
                                        ? Math.round(
                                              (Number(item.value || 0) /
                                                  total) *
                                                  100
                                          )
                                        : 0

                                    return (
                                        <div key={item.label}>
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-semibold text-gray-600">
                                                    {item.label}
                                                </span>

                                                <span className="text-sm font-bold text-green-950">
                                                    {isLoading
                                                        ? "—"
                                                        : item.value ?? 0}
                                                </span>
                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${item.className}`}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
                        <div className="border-b border-gray-100 px-5 py-5 md:px-6">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                                Activity
                            </p>

                            <h2 className="mt-1 text-xl font-black text-green-950">
                                Recent Applications
                            </h2>
                        </div>

                        {isLoading ? (
                            <div className="space-y-3 p-5 md:p-6">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-14 animate-pulse rounded-2xl bg-gray-50"
                                    />
                                ))}
                            </div>
                        ) : recentApplications.length === 0 ? (
                            <div className="px-5 py-12 text-center md:px-6">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText size={24} />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-green-950">
                                    No applications yet
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                    Recent applications will appear here when submissions are received.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-190">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400 md:px-6">
                                                Reference
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Type
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Status
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentApplications.map(
                                            (application) => {
                                                const status =
                                                    statusConfig[
                                                        application.status
                                                    ]

                                                return (
                                                    <tr
                                                        key={application.id}
                                                        className="border-b border-gray-100 last:border-0 hover:bg-green-50/40"
                                                    >
                                                        <td className="px-5 py-4 md:px-6">
                                                            <span className="text-sm font-bold text-green-950">
                                                                {application.reference_number ||
                                                                    "—"}
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {formatApplicationType(
                                                                    application.application_type
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <span
                                                                className={`inline-flex rounded-xl px-3 py-1.5 text-xs font-bold ${
                                                                    status?.className ||
                                                                    "bg-gray-100 text-gray-600"
                                                                }`}
                                                            >
                                                                {status?.label ||
                                                                    application.status}
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4">
                                                            <span className="text-sm text-gray-500">
                                                                {formatDate(
                                                                    application.created_at
                                                                )}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Dashboard