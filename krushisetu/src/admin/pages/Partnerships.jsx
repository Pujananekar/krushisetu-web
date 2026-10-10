import {
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Filter,
    Handshake,
    Search,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Partnerships = () => {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("ALL")
    const [dateFilter, setDateFilter] = useState("ALL")

    const partnershipApplications = [
        {
            id: 1,
            reference: "KR-PAR-20260930-0001",
            organization: "GreenGrow Foundation",
            contactPerson: "Amit Kulkarni",
            mobile: "9876543210",
            partnershipType: "NGO Partnership",
            status: "NEW",
            date: "30 Sep 2026",
        },
        {
            id: 2,
            reference: "KR-PAR-20260928-0002",
            organization: "Maharashtra Rural Development Trust",
            contactPerson: "Priya Deshmukh",
            mobile: "9823456712",
            partnershipType: "Institutional Partnership",
            status: "IN_PROGRESS",
            date: "28 Sep 2026",
        },
        {
            id: 3,
            reference: "KR-PAR-20260926-0003",
            organization: "AgriFuture Foundation",
            contactPerson: "Vikas Shinde",
            mobile: "9765432189",
            partnershipType: "Agriculture Partnership",
            status: "RESOLVED",
            date: "26 Sep 2026",
        },
        {
            id: 4,
            reference: "KR-PAR-20260924-0004",
            organization: "Rural Development Network",
            contactPerson: "Sneha Pawar",
            mobile: "9898989898",
            partnershipType: "Community Partnership",
            status: "CLOSED",
            date: "24 Sep 2026",
        },
    ]

    const filteredApplications = partnershipApplications.filter(
        (application) => {
            const searchValue = search.toLowerCase()

            const matchesSearch =
                application.reference
                    .toLowerCase()
                    .includes(searchValue) ||
                application.organization
                    .toLowerCase()
                    .includes(searchValue) ||
                application.contactPerson
                    .toLowerCase()
                    .includes(searchValue) ||
                application.mobile.includes(searchValue) ||
                application.partnershipType
                    .toLowerCase()
                    .includes(searchValue)

            const matchesStatus =
                status === "ALL" || application.status === status

            return matchesSearch && matchesStatus
        }
    )

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

        return labels[value] || value
    }

    const resetFilters = () => {
        setSearch("")
        setStatus("ALL")
        setDateFilter("ALL")
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-500">
                            <Link
                                to="/admin/applications"
                                className="kr-hover-link"
                            >
                                Applications
                            </Link>

                            <ChevronRight size={15} />

                            <span className="text-green-700">
                                Partnerships
                            </span>
                        </div>

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <Handshake size={23} />
                                </div>

                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                    Applications
                                </p>

                                <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                    Partnership Applications
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                    View and manage partnership applications
                                    submitted through Krushisetu.
                                </p>
                            </div>

                            <div className="flex w-fit items-center gap-2 rounded-2xl bg-green-50 px-4 py-3">
                                <Handshake
                                    size={18}
                                    className="text-green-700"
                                />

                                <div>
                                    <p className="text-lg font-black leading-none text-green-900">
                                        {filteredApplications.length}
                                    </p>

                                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-green-700/70">
                                        Applications
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    placeholder="Search organization, contact person, reference or partnership type..."
                                    className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="relative">
                                    <select
                                        value={status}
                                        onChange={(event) =>
                                            setStatus(event.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold text-gray-600 outline-none transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-50 sm:w-44"
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

                                <div className="relative">
                                    <select
                                        value={dateFilter}
                                        onChange={(event) =>
                                            setDateFilter(event.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold text-gray-600 outline-none transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-50 sm:w-44"
                                    >
                                        <option value="ALL">
                                            All Dates
                                        </option>
                                        <option value="TODAY">Today</option>
                                        <option value="WEEK">
                                            This Week
                                        </option>
                                        <option value="MONTH">
                                            This Month
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="kr-hover-button inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600"
                                >
                                    <Filter size={17} />
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-290">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400 md:px-6">
                                            Reference
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Organization
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Contact Person
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Mobile
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Partnership Type
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
                                                        {
                                                            application.reference
                                                        }
                                                    </span>
                                                </td>

                                                <td className="max-w-65 px-5 py-4">
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {
                                                            application.organization
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="text-sm font-medium text-gray-600">
                                                        {
                                                            application.contactPerson
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="text-sm text-gray-600">
                                                        {application.mobile}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="text-sm text-gray-600">
                                                        {
                                                            application.partnershipType
                                                        }
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
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <CalendarDays
                                                            size={15}
                                                        />
                                                        {application.date}
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    <Link
                                                        to={`/admin/applications/${application.id}`}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-green-100 hover:text-green-700"
                                                        aria-label="View partnership application"
                                                    >
                                                        <Eye size={17} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {filteredApplications.length === 0 && (
                            <div className="px-5 py-14 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Handshake size={24} />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-green-950">
                                    No partnership applications found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Try changing your search or filter
                                    criteria.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                            <p className="text-sm text-gray-500">
                                Showing{" "}
                                <span className="font-bold text-gray-700">
                                    {filteredApplications.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-bold text-gray-700">
                                    {partnershipApplications.length}
                                </span>{" "}
                                applications
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={17} />
                                </button>

                                <span className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-sm font-bold text-white">
                                    1
                                </span>

                                <button
                                    type="button"
                                    disabled
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={17} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Partnerships