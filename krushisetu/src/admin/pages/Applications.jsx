import {
    CheckCircle2,
    ChevronDown,
    Eye,
    FileText,
    Filter,
    RefreshCw,
    Search,
    XCircle,
    PencilLine
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getApplicatons } from "../api/adminApplicationsApi.js"



const Applications = () => {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("ALL")
    const [type, setType] = useState("ALL")

    const {
        data: response,
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["admin-applications"],
        queryFn: getApplicatons,
    })

    const applications = response?.data ?? []

    const filteredApplications = applications.filter((application) => {
        const searchValue = search.trim().toLowerCase()

        const matchesSearch =
            !searchValue ||
            application.reference_number
                ?.toLowerCase()
                .includes(searchValue)

        const matchesStatus =
            status === "ALL" || application.status === status

        const matchesType =
            type === "ALL" || application.application_type === type

        return matchesSearch && matchesStatus && matchesType
    })

    const getStatusStyle = (value) => {
        const styles = {
            NEW: "bg-blue-50 text-blue-700",
            IN_PROGRESS: "bg-amber-50 text-amber-700",
            RESOLVED: "bg-green-50 text-green-700",
            CLOSED: "bg-gray-100 text-gray-600",
        }

        return styles[value] || "bg-gray-100 text-gray-600"
    }

    const getStatusLabel = (value) => {
        const labels = {
            NEW: "New",
            IN_PROGRESS: "In Progress",
            RESOLVED: "Resolved",
            CLOSED: "Closed",
        }

        return labels[value] || value || "Unknown"
    }

    const getTypeLabel = (value) => {
        const labels = {
            FARMER: "Farmer",
            TRAINING: "Training",
            SERVICE: "Service",
            INTERNSHIP: "Internship",
            FPO: "FPO",
            PARTNERSHIP: "Partnership",
            VOLUNTEER: "Volunteer",
        }

        return labels[value] || value || "Application"
    }

    const formatDate = (value) => {
        if (!value) return "—"

        return new Date(value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    const getConsentLabel = (value) => {
        return Number(value) === 1 ? "Granted" : "Not Granted"
    }

    const getConsentStyle = (value) => {
        return Number(value) === 1
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">
                    <div className="mb-8">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                            Management
                        </p>

                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                    Applications
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                    View and manage all applications submitted
                                    through Krushisetu.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5">
                                <FileText
                                    size={17}
                                    className="text-green-700"
                                />

                                <span className="text-sm font-bold text-green-800">
                                    {isLoading
                                        ? "Loading..."
                                        : `${filteredApplications.length} Applications`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {isError && (
                        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-red-700">
                                    Unable to load applications.
                                </p>

                                <p className="mt-1 text-xs text-red-600">
                                    Please check the server connection and try
                                    again.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => refetch()}
                                disabled={isFetching}
                                className="inline-flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-all duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <RefreshCw
                                    size={16}
                                    className={
                                        isFetching ? "animate-spin" : ""
                                    }
                                />
                                Retry
                            </button>
                        </div>
                    )}

                    <div className="mb-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-lg shadow-gray-900/5 md:p-5">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                            <div className="relative min-w-0 flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search by reference number..."
                                    className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="relative">
                                    <select
                                        value={type}
                                        onChange={(event) =>
                                            setType(event.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold text-gray-600 outline-none transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-50 sm:w-48"
                                    >
                                        <option value="ALL">
                                            All Types
                                        </option>
                                        <option value="FARMER">
                                            Farmers
                                        </option>
                                        <option value="TRAINING">
                                            Training
                                        </option>
                                        <option value="SERVICE">
                                            Services
                                        </option>
                                        <option value="INTERNSHIP">
                                            Internships
                                        </option>
                                        <option value="FPO">FPO</option>
                                        <option value="PARTNERSHIP">
                                            Partnerships
                                        </option>
                                        <option value="VOLUNTEER">
                                            Volunteers
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>

                                <div className="relative">
                                    <select
                                        value={status}
                                        onChange={(event) =>
                                            setStatus(event.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold text-gray-600 outline-none transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-50 sm:w-48"
                                    >
                                        <option value="ALL">
                                            All Statuses
                                        </option>
                                        <option value="NEW">New</option>
                                        <option value="IN_PROGRESS">
                                            In Progress
                                        </option>
                                        <option value="RESOLVED">
                                            Resolved
                                        </option>
                                        <option value="CLOSED">
                                            Closed
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("")
                                        setType("ALL")
                                        setStatus("ALL")
                                    }}
                                    className="kr-hover-button inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600"
                                >
                                    <Filter size={17} />
                                    Reset
                                </button>

                                <button
                                    type="button"
                                    onClick={() => refetch()}
                                    disabled={isFetching}
                                    className="kr-hover-button inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 text-sm font-semibold text-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <RefreshCw
                                        size={17}
                                        className={
                                            isFetching ? "animate-spin" : ""
                                        }
                                    />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
                        {isLoading ? (
                            <div className="space-y-3 p-5 md:p-6">
                                {Array.from({ length: 5 }).map(
                                    (_, index) => (
                                        <div
                                            key={index}
                                            className="h-16 animate-pulse rounded-2xl bg-gray-50"
                                        />
                                    )
                                )}
                            </div>
                        ) : filteredApplications.length === 0 ? (
                            <div className="px-5 py-14 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText size={24} />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-green-950">
                                    {applications.length === 0
                                        ? "No applications yet"
                                        : "No applications found"}
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    {applications.length === 0
                                        ? "Applications will appear here when submissions are received."
                                        : "Try changing your search or filter criteria."}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-205">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400 md:px-6">
                                                Reference
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Type
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Consent
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Date
                                            </th>

                                            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredApplications.map(
                                            (application) => (
                                                <tr
                                                    key={application.id}
                                                    className="border-b border-gray-100 last:border-0 transition-colors duration-200 hover:bg-green-50/40"
                                                >
                                                    <td className="px-5 py-4 md:px-6">
                                                        <span className="text-sm font-bold text-green-950">
                                                            {application.reference_number ||
                                                                "—"}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="text-sm font-medium text-gray-600">
                                                            {getTypeLabel(
                                                                application.application_type
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold ${getConsentStyle(
                                                                application.consent
                                                            )}`}
                                                        >
                                                            {Number(
                                                                application.consent
                                                            ) === 1 ? (
                                                                <CheckCircle2
                                                                    size={14}
                                                                />
                                                            ) : (
                                                                <XCircle
                                                                    size={14}
                                                                />
                                                            )}

                                                            {getConsentLabel(
                                                                application.consent
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-xl px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                                                                application.status
                                                            )}`}
                                                        >
                                                            {getStatusLabel(
                                                                application.status
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(
                                                                application.created_at
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 text-right">
                                                        <Link
                                                            title="View Application"
                                                            to={`/admin/applications/${application.id}`}
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-green-100 hover:text-green-700"
                                                            aria-label="View application"
                                                        >
                                                            <Eye size={17} />
                                                        </Link>

                                                        <Link
                                                            title="Edit Application"
                                                            to={`/admin/applications/${application.id}/edit`}
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-green-100 hover:text-green-700"
                                                            aria-label="Edit application"
                                                        >
                                                            <PencilLine size={17} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Applications