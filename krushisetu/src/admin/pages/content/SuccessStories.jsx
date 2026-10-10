import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Eye,
    FileCheck2,
    Filter,
    Image,
    MapPin,
    Plus,
    Search,
    ShieldCheck,
    Star,
    UserRound,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import { getAdminSuccessStories } from "../../api/adminSuccessStoriesApi.js"


const statusOptions = ["DRAFT", "PUBLISHED"]

const consentStatusOptions = [
    "PENDING",
    "RECEIVED",
    "NOT_REQUIRED",
]

const formatStatus = (status) => {
    if (!status) {
        return "—"
    }

    return status.charAt(0) + status.slice(1).toLowerCase()
}

const formatConsentStatus = (status) => {
    if (!status) {
        return "—"
    }

    if (status === "NOT_REQUIRED") {
        return "Not Required"
    }

    return status.charAt(0) + status.slice(1).toLowerCase()
}

const getStatusClasses = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "border-green-200 bg-green-50 text-green-700"

        case "DRAFT":
            return "border-gray-200 bg-gray-50 text-gray-600"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}

const getConsentClasses = (status) => {
    switch (status) {
        case "RECEIVED":
            return "border-green-200 bg-green-50 text-green-700"

        case "PENDING":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "NOT_REQUIRED":
            return "border-gray-200 bg-gray-50 text-gray-600"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}

const SuccessStories = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [consentFilter, setConsentFilter] = useState("All")
    const [page, setPage] = useState(1)

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-success-stories"],
        queryFn: getAdminSuccessStories,
    })

    const successStories = data?.successStories ?? []

    const filteredStories = useMemo(() => {
        const query = search.toLowerCase().trim()

        return successStories.filter((story) => {
            const matchesSearch =
                !query ||
                story.title?.toLowerCase().includes(query) ||
                story.slug?.toLowerCase().includes(query) ||
                story.beneficiary_name
                    ?.toLowerCase()
                    .includes(query) ||
                story.location
                    ?.toLowerCase()
                    .includes(query) ||
                story.story?.toLowerCase().includes(query)

            const matchesStatus =
                statusFilter === "All" ||
                story.status === statusFilter

            const matchesConsent =
                consentFilter === "All" ||
                story.consent_status === consentFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesConsent
            )
        })
    }, [
        successStories,
        search,
        statusFilter,
        consentFilter,
    ])

    const publishedCount = successStories.filter(
        (story) => story.status === "PUBLISHED"
    ).length

    const draftCount = successStories.filter(
        (story) => story.status === "DRAFT"
    ).length

    const approvedConsentCount = successStories.filter(
        (story) => story.consent_status === "RECEIVED"
    ).length

    const pendingConsentCount = successStories.filter(
        (story) => story.consent_status === "PENDING"
    ).length

    const pageSize = 6

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStories.length / pageSize)
    )

    const currentPage = Math.min(page, totalPages)

    const paginatedStories = filteredStories.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setConsentFilter("All")
        setPage(1)
    }

    if (isLoading) {
        return <Loader text="Loading success stories..." />
    }

    if (isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <Star className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load success stories
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                "Something went wrong while loading the success stories."}
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <Star className="h-4 w-4" />

                            <span>Content Management</span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Success Stories
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Success Stories
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage beneficiary stories, outcomes, consent,
                            media and publishing permissions.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/success-stories/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Success Story
                    </Link>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        label="Total Stories"
                        value={successStories.length}
                        description="All story records"
                        icon={<Star className="h-5 w-5" />}
                        iconClass="bg-green-50 text-green-700"
                    />

                    <SummaryCard
                        label="Published"
                        value={publishedCount}
                        description="Currently public"
                        icon={
                            <CheckCircle2 className="h-5 w-5" />
                        }
                        iconClass="bg-emerald-50 text-emerald-700"
                    />

                    <SummaryCard
                        label="Drafts"
                        value={draftCount}
                        description="Not currently published"
                        icon={
                            <FileCheck2 className="h-5 w-5" />
                        }
                        iconClass="bg-gray-50 text-gray-600"
                    />

                    <SummaryCard
                        label="Consent Received"
                        value={approvedConsentCount}
                        description="Stories with received consent"
                        icon={
                            <ShieldCheck className="h-5 w-5" />
                        }
                        iconClass="bg-purple-50 text-purple-700"
                    />
                </div>

                {/* Consent reminder */}
                {pendingConsentCount > 0 && (
                    <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-amber-950">
                                        Consent & publishing permission
                                    </h2>

                                    <p className="mt-1 max-w-3xl text-xs leading-5 text-amber-900/70">
                                        Verify beneficiary consent and
                                        publishing permission before making
                                        stories, photographs or other media
                                        publicly available.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                                <span className="h-2 w-2 rounded-full bg-amber-500" />

                                {pendingConsentCount}{" "}
                                {pendingConsentCount === 1
                                    ? "story requires"
                                    : "stories require"}{" "}
                                consent review
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_200px_220px_auto]">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setPage(1)
                                }}
                                placeholder="Search stories, beneficiaries or locations..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <div className="relative">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value)
                                    setPage(1)
                                }}
                                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            >
                                <option value="All">
                                    All statuses
                                </option>

                                {statusOptions.map((status) => (
                                    <option
                                        key={status}
                                        value={status}
                                    >
                                        {formatStatus(status)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <select
                                value={consentFilter}
                                onChange={(e) => {
                                    setConsentFilter(e.target.value)
                                    setPage(1)
                                }}
                                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            >
                                <option value="All">
                                    All consent statuses
                                </option>

                                {consentStatusOptions.map(
                                    (status) => (
                                        <option
                                            key={status}
                                            value={status}
                                        >
                                            {formatConsentStatus(
                                                status
                                            )}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {(search ||
                            statusFilter !== "All" ||
                            consentFilter !== "All") && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Story Records
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredStories.length}{" "}
                                {filteredStories.length === 1
                                    ? "story"
                                    : "stories"}{" "}
                                found
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Live database data
                        </div>
                    </div>

                    {successStories.length === 0 ? (
                        <div className="flex min-h-80 items-center justify-center px-6 py-12">
                            <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Star className="h-6 w-6" />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-gray-900">
                                    No success stories available
                                </h3>

                                <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                                    No success story records have been
                                    added yet. Start by creating your
                                    first success story.
                                </p>

                                <Link
                                    to="/admin/content/success-stories/new"
                                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Success Story
                                </Link>
                            </div>
                        </div>
                    ) : filteredStories.length === 0 ? (
                        <div className="flex min-h-80 items-center justify-center px-6 py-12">
                            <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                    <Search className="h-6 w-6" />
                                </div>

                                <h3 className="mt-4 text-base font-bold text-gray-900">
                                    No success stories found
                                </h3>

                                <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                                    No stories match your current
                                    search or filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-5 text-sm font-semibold text-green-700 transition hover:text-green-800"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1100px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Story
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Beneficiary
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Location
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Consent
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Media
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Publish Permission
                                            </th>

                                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedStories.map(
                                            (story) => (
                                                <tr
                                                    key={story.id}
                                                    className="group transition hover:bg-green-50/30"
                                                >
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                                <Star className="h-4 w-4" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="max-w-[300px] truncate text-sm font-semibold text-gray-900">
                                                                    {
                                                                        story.title
                                                                    }
                                                                </p>

                                                                <p className="mt-1 max-w-[300px] truncate text-xs text-gray-400">
                                                                    /
                                                                    {
                                                                        story.slug
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <UserRound className="h-4 w-4 text-gray-400" />

                                                            <span className="text-sm font-medium text-gray-700">
                                                                {story.beneficiary_name ||
                                                                    "—"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex max-w-[220px] items-start gap-2">
                                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                            <span className="text-sm text-gray-600">
                                                                {story.location ||
                                                                    "—"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="space-y-1.5">
                                                            <span
                                                                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getConsentClasses(
                                                                    story.consent_status
                                                                )}`}
                                                            >
                                                                {formatConsentStatus(
                                                                    story.consent_status
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {story.media_url ? (
                                                            <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                                                                <Image className="h-3.5 w-3.5" />
                                                                Available
                                                            </div>
                                                        ) : (
                                                            <div className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                                                                <Image className="h-3.5 w-3.5" />
                                                                Missing
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                                                story.status
                                                            )}`}
                                                        >
                                                            {formatStatus(
                                                                story.status
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        {Number(
                                                            story.publish_permission
                                                        ) === 1 ? (
                                                            <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                                Granted
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                                                                Not Granted
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Link
                                                                to={`/admin/content/success-stories/${story.id}`}
                                                                title="View"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/success-stories/${story.id}/edit`}
                                                                title="Edit"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Edit3 className="h-4 w-4" />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-700">
                                        {(currentPage - 1) *
                                            pageSize +
                                            1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-gray-700">
                                        {Math.min(
                                            currentPage *
                                                pageSize,
                                            filteredStories.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {filteredStories.length}
                                    </span>
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={
                                            currentPage === 1
                                        }
                                        onClick={() =>
                                            setPage(
                                                (previous) =>
                                                    Math.max(
                                                        1,
                                                        previous -
                                                            1
                                                    )
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-xs font-semibold text-white">
                                        {currentPage}
                                    </div>

                                    <button
                                        type="button"
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                        onClick={() =>
                                            setPage(
                                                (previous) =>
                                                    Math.min(
                                                        totalPages,
                                                        previous +
                                                            1
                                                    )
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Bottom information */}
                {successStories.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-gray-600">
                                    <FileCheck2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Draft stories
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {draftCount}{" "}
                                        {draftCount === 1
                                            ? "story is"
                                            : "stories are"}{" "}
                                        currently saved as drafts.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Consent review
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {pendingConsentCount}{" "}
                                        {pendingConsentCount === 1
                                            ? "record does"
                                            : "records do"}{" "}
                                        not currently have received
                                        consent.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

const SummaryCard = ({
    label,
    value,
    description,
    icon,
    iconClass,
}) => {
    return (
        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </p>
                </div>

                <div
                    className={`kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
                >
                    {icon}
                </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
                {description}
            </p>
        </div>
    )
}

export default SuccessStories