import {
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Edit3,
    Eye,
    FileText,
    Filter,
    History,
    MoreHorizontal,
    Plus,
    Search,
    Send,
    XCircle,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Pages = () => {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("ALL")
    const [type, setType] = useState("ALL")
    const [dateFilter, setDateFilter] = useState("ALL")

    const pages = [
        {
            id: 1,
            title: "Home",
            slug: "/",
            type: "HOME",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "30 Sep 2026",
            updatedBy: "Admin",
        },
        {
            id: 2,
            title: "About Us",
            slug: "/about",
            type: "STATIC",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "29 Sep 2026",
            updatedBy: "Admin",
        },
        {
            id: 3,
            title: "About - Founder",
            slug: "/about/founder",
            type: "STATIC",
            status: "DRAFT",
            language: "English",
            updatedAt: "28 Sep 2026",
            updatedBy: "Admin",
        },
        {
            id: 4,
            title: "Departments",
            slug: "/departments",
            type: "DIRECTORY",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "27 Sep 2026",
            updatedBy: "Admin",
        },
        {
            id: 5,
            title: "Government Schemes",
            slug: "/schemes",
            type: "DIRECTORY",
            status: "IN_REVIEW",
            language: "English",
            updatedAt: "26 Sep 2026",
            updatedBy: "Scheme Manager",
        },
        {
            id: 6,
            title: "Training & Events",
            slug: "/training-events",
            type: "DIRECTORY",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "25 Sep 2026",
            updatedBy: "Training Manager",
        },
        {
            id: 7,
            title: "Farmer Resources",
            slug: "/resources",
            type: "DIRECTORY",
            status: "DRAFT",
            language: "English",
            updatedAt: "24 Sep 2026",
            updatedBy: "Content Admin",
        },
        {
            id: 8,
            title: "Projects & Impact",
            slug: "/projects",
            type: "DIRECTORY",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "23 Sep 2026",
            updatedBy: "Admin",
        },
        {
            id: 9,
            title: "Success Stories",
            slug: "/success-stories",
            type: "DIRECTORY",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "22 Sep 2026",
            updatedBy: "Content Admin",
        },
        {
            id: 10,
            title: "Partnerships",
            slug: "/partnerships",
            type: "STATIC",
            status: "DRAFT",
            language: "English",
            updatedAt: "21 Sep 2026",
            updatedBy: "Admin",
        },
        {
            id: 11,
            title: "Gallery",
            slug: "/gallery",
            type: "DIRECTORY",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "20 Sep 2026",
            updatedBy: "Media Manager",
        },
        {
            id: 12,
            title: "Contact",
            slug: "/contact",
            type: "STATIC",
            status: "PUBLISHED",
            language: "English",
            updatedAt: "19 Sep 2026",
            updatedBy: "Admin",
        },
    ]

    const filteredPages = pages.filter((page) => {
        const searchValue = search.toLowerCase().trim()

        const matchesSearch =
            page.title.toLowerCase().includes(searchValue) ||
            page.slug.toLowerCase().includes(searchValue) ||
            page.updatedBy.toLowerCase().includes(searchValue)

        const matchesStatus =
            status === "ALL" || page.status === status

        const matchesType =
            type === "ALL" || page.type === type

        return matchesSearch && matchesStatus && matchesType
    })

    const getStatusStyle = (value) => {
        const styles = {
            PUBLISHED: "bg-green-50 text-green-700",
            DRAFT: "bg-gray-100 text-gray-600",
            IN_REVIEW: "bg-amber-50 text-amber-700",
            SCHEDULED: "bg-blue-50 text-blue-700",
            ARCHIVED: "bg-red-50 text-red-600",
        }

        return styles[value] || "bg-gray-100 text-gray-600"
    }

    const getStatusLabel = (value) => {
        const labels = {
            PUBLISHED: "Published",
            DRAFT: "Draft",
            IN_REVIEW: "In Review",
            SCHEDULED: "Scheduled",
            ARCHIVED: "Archived",
        }

        return labels[value] || value
    }

    const getTypeLabel = (value) => {
        const labels = {
            HOME: "Home",
            STATIC: "Static",
            DIRECTORY: "Directory",
        }

        return labels[value] || value
    }

    const resetFilters = () => {
        setSearch("")
        setStatus("ALL")
        setType("ALL")
        setDateFilter("ALL")
    }

    const publishedCount = pages.filter(
        (page) => page.status === "PUBLISHED"
    ).length

    const draftCount = pages.filter(
        (page) => page.status === "DRAFT"
    ).length

    const reviewCount = pages.filter(
        (page) => page.status === "IN_REVIEW"
    ).length

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

                            <span>/</span>

                            <span className="text-gray-400">
                                Content
                            </span>

                            <span>/</span>

                            <span className="text-green-700">
                                Pages
                            </span>
                        </div>

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <FileText size={23} />
                                </div>

                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                    Content Management
                                </p>

                                <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                    Pages
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                    Manage website pages, content status,
                                    previews, publishing and revisions.
                                </p>
                            </div>

                            <Link
                                to="/admin/content/pages/new"
                                className="kr-hover-button inline-flex h-12 w-fit items-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                <Plus size={18} />
                                Add Page
                            </Link>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <FileText size={20} />
                                </div>

                                <span className="text-xs font-bold text-gray-400">
                                    TOTAL
                                </span>
                            </div>

                            <p className="mt-5 text-2xl font-black text-green-950">
                                {pages.length}
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-500">
                                Website Pages
                            </p>
                        </div>

                        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <CheckCircle2 size={20} />
                                </div>

                                <span className="text-xs font-bold text-green-600">
                                    LIVE
                                </span>
                            </div>

                            <p className="mt-5 text-2xl font-black text-green-950">
                                {publishedCount}
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-500">
                                Published
                            </p>
                        </div>

                        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
                                    <Edit3 size={20} />
                                </div>

                                <span className="text-xs font-bold text-gray-400">
                                    WORKING
                                </span>
                            </div>

                            <p className="mt-5 text-2xl font-black text-green-950">
                                {draftCount}
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-500">
                                Drafts
                            </p>
                        </div>

                        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                                    <Clock3 size={20} />
                                </div>

                                <span className="text-xs font-bold text-amber-600">
                                    REVIEW
                                </span>
                            </div>

                            <p className="mt-5 text-2xl font-black text-green-950">
                                {reviewCount}
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-500">
                                In Review
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
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
                                    placeholder="Search page title, URL or updated by..."
                                    className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                {/* Status */}
                                <div className="relative">
                                    <select
                                        value={status}
                                        onChange={(event) =>
                                            setStatus(event.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold text-gray-600 outline-none transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-50 sm:w-40"
                                    >
                                        <option value="ALL">
                                            All Statuses
                                        </option>
                                        <option value="PUBLISHED">
                                            Published
                                        </option>
                                        <option value="DRAFT">
                                            Draft
                                        </option>
                                        <option value="IN_REVIEW">
                                            In Review
                                        </option>
                                        <option value="SCHEDULED">
                                            Scheduled
                                        </option>
                                        <option value="ARCHIVED">
                                            Archived
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>

                                {/* Type */}
                                <div className="relative">
                                    <select
                                        value={type}
                                        onChange={(event) =>
                                            setType(event.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold text-gray-600 outline-none transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-50 sm:w-40"
                                    >
                                        <option value="ALL">
                                            All Types
                                        </option>
                                        <option value="HOME">
                                            Home
                                        </option>
                                        <option value="STATIC">
                                            Static
                                        </option>
                                        <option value="DIRECTORY">
                                            Directory
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>

                                {/* Date */}
                                <div className="relative">
                                    <select
                                        value={dateFilter}
                                        onChange={(event) =>
                                            setDateFilter(event.target.value)
                                        }
                                        className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-semibold text-gray-600 outline-none transition-all duration-200 focus:border-green-300 focus:ring-4 focus:ring-green-50 sm:w-40"
                                    >
                                        <option value="ALL">
                                            All Dates
                                        </option>
                                        <option value="TODAY">
                                            Today
                                        </option>
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
                                    className="kr-hover-button inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 hover:border-green-200 hover:text-green-700"
                                >
                                    <Filter size={17} />
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-270">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400 md:px-6">
                                            Page
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            URL
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Type
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Language
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Updated
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredPages.map((page) => (
                                        <tr
                                            key={page.id}
                                            className="border-b border-gray-100 last:border-0 transition-colors duration-200 hover:bg-green-50/40"
                                        >
                                            <td className="px-5 py-4 md:px-6">
                                                <div>
                                                    <p className="text-sm font-bold text-green-950">
                                                        {page.title}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Updated by{" "}
                                                        {page.updatedBy}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-lg bg-gray-50 px-2.5 py-1.5 font-mono text-xs text-gray-500">
                                                    {page.slug}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="text-sm font-semibold text-gray-600">
                                                    {getTypeLabel(page.type)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                                                        page.status
                                                    )}`}
                                                >
                                                    {page.status ===
                                                        "PUBLISHED" && (
                                                        <CheckCircle2
                                                            size={13}
                                                        />
                                                    )}

                                                    {page.status ===
                                                        "DRAFT" && (
                                                        <Edit3 size={13} />
                                                    )}

                                                    {page.status ===
                                                        "IN_REVIEW" && (
                                                        <Clock3
                                                            size={13}
                                                        />
                                                    )}

                                                    {page.status ===
                                                        "SCHEDULED" && (
                                                        <CalendarDays
                                                            size={13}
                                                        />
                                                    )}

                                                    {page.status ===
                                                        "ARCHIVED" && (
                                                        <XCircle
                                                            size={13}
                                                        />
                                                    )}

                                                    {getStatusLabel(
                                                        page.status
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-flex rounded-xl bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-600">
                                                    {page.language}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <CalendarDays
                                                        size={15}
                                                    />
                                                    {page.updatedAt}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        to={`/admin/content/pages/${page.id}/preview`}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                                                        aria-label={`Preview ${page.title}`}
                                                        title="Preview"
                                                    >
                                                        <Eye size={17} />
                                                    </Link>

                                                    <Link
                                                        to={`/admin/content/pages/${page.id}/edit`}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-green-100 hover:text-green-700"
                                                        aria-label={`Edit ${page.title}`}
                                                        title="Edit"
                                                    >
                                                        <Edit3 size={17} />
                                                    </Link>

                                                    <Link
                                                        to={`/admin/content/pages/${page.id}/revisions`}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                                                        aria-label={`View revisions for ${page.title}`}
                                                        title="Revision history"
                                                    >
                                                        <History size={17} />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700"
                                                        aria-label={`More actions for ${page.title}`}
                                                        title="More actions"
                                                    >
                                                        <MoreHorizontal
                                                            size={17}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {filteredPages.length === 0 && (
                            <div className="px-5 py-14 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText size={24} />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-green-950">
                                    No pages found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Try changing your search or filter
                                    criteria.
                                </p>
                            </div>
                        )}

                        {/* Footer / Pagination */}
                        <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                            <p className="text-sm text-gray-500">
                                Showing{" "}
                                <span className="font-bold text-gray-700">
                                    {filteredPages.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-bold text-gray-700">
                                    {pages.length}
                                </span>{" "}
                                pages
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

                    {/* Publishing Information */}
                    <div className="mt-6 rounded-3xl border border-green-100 bg-green-50 p-5">
                        <div className="flex items-start gap-3">
                            <Send
                                size={19}
                                className="mt-0.5 shrink-0 text-green-700"
                            />

                            <div>
                                <p className="text-sm font-bold text-green-900">
                                    Publishing workflow
                                </p>

                                <p className="mt-1 text-sm leading-6 text-green-800/70">
                                    Pages can be maintained as drafts,
                                    reviewed, previewed and published. The
                                    revision history will preserve previous
                                    versions when the CMS is connected to the
                                    backend.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Pages