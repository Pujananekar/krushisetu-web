import {
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Eye,
    History,
    RotateCcw,
    UserRound,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

const PageRevisions = () => {
    const { id } = useParams()

    const page = {
        id,
        title: "About Us",
        slug: "/about",
        currentVersion: 3,
        currentStatus: "PUBLISHED",
        lastUpdated: "29 Sep 2026",
        updatedBy: "Admin",
    }

    const revisions = [
        {
            id: 3,
            version: "Version 3",
            status: "PUBLISHED",
            title: "About Us",
            summary:
                "Updated the mission section and improved the description of Krushisetu's farmer support activities.",
            updatedBy: "Admin",
            date: "29 Sep 2026",
            time: "04:35 PM",
            changes: [
                "Updated page summary",
                "Updated mission content",
                "Updated SEO description",
            ],
            current: true,
        },
        {
            id: 2,
            version: "Version 2",
            status: "PUBLISHED",
            title: "About Us",
            summary:
                "Added additional information about Krushisetu's programs and rural development activities.",
            updatedBy: "Admin",
            date: "25 Sep 2026",
            time: "11:20 AM",
            changes: [
                "Added program information",
                "Updated page content",
                "Changed featured content",
            ],
            current: false,
        },
        {
            id: 1,
            version: "Version 1",
            status: "PUBLISHED",
            title: "About Us",
            summary:
                "Initial version of the About Us page created for the Krushisetu website.",
            updatedBy: "Admin",
            date: "20 Sep 2026",
            time: "02:10 PM",
            changes: [
                "Created page",
                "Added initial content",
                "Added SEO metadata",
            ],
            current: false,
        },
    ]

    const getStatusStyle = (status) => {
        const styles = {
            PUBLISHED: "bg-green-50 text-green-700",
            DRAFT: "bg-gray-100 text-gray-600",
            IN_REVIEW: "bg-amber-50 text-amber-700",
            SCHEDULED: "bg-blue-50 text-blue-700",
        }

        return styles[status] || "bg-gray-100 text-gray-600"
    }

    const getStatusLabel = (status) => {
        const labels = {
            PUBLISHED: "Published",
            DRAFT: "Draft",
            IN_REVIEW: "In Review",
            SCHEDULED: "Scheduled",
        }

        return labels[status] || status
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-500">
                        <Link
                            to="/admin/dashboard"
                            className="kr-hover-link"
                        >
                            Dashboard
                        </Link>

                        <ChevronRight size={15} />

                        <Link
                            to="/admin/content/pages"
                            className="kr-hover-link"
                        >
                            Pages
                        </Link>

                        <ChevronRight size={15} />

                        <span className="text-green-700">
                            Revision History
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <History size={23} />
                            </div>

                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                Content Management
                            </p>

                            <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                Revision History
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                Review previous versions and publishing
                                changes made to this page.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                to={`/admin/content/pages/${id}/preview`}
                                className="kr-hover-button inline-flex h-11 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-600 hover:border-blue-200 hover:text-blue-700"
                            >
                                <Eye size={17} />
                                Preview
                            </Link>

                            <Link
                                to={`/admin/content/pages/${id}/edit`}
                                className="kr-hover-button inline-flex h-11 items-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                Edit Page
                            </Link>
                        </div>
                    </div>

                    {/* Page Summary */}
                    <section className="mb-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5 md:p-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <History size={21} />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-lg font-black text-green-950">
                                            {page.title}
                                        </h2>

                                        <span
                                            className={`rounded-xl px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                                                page.currentStatus
                                            )}`}
                                        >
                                            {getStatusLabel(
                                                page.currentStatus
                                            )}
                                        </span>
                                    </div>

                                    <p className="mt-1 font-mono text-xs text-gray-400">
                                        {page.slug}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        Current
                                    </p>

                                    <p className="mt-1 text-sm font-black text-green-950">
                                        v{page.currentVersion}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        Revisions
                                    </p>

                                    <p className="mt-1 text-sm font-black text-green-950">
                                        {revisions.length}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        Updated
                                    </p>

                                    <p className="mt-1 text-sm font-black text-green-950">
                                        {page.lastUpdated}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        Updated By
                                    </p>

                                    <p className="mt-1 text-sm font-black text-green-950">
                                        {page.updatedBy}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Revision Notice */}
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-4">
                        <Clock3
                            size={19}
                            className="mt-0.5 shrink-0 text-amber-700"
                        />

                        <div>
                            <p className="text-sm font-bold text-amber-900">
                                Revision history
                            </p>

                            <p className="mt-1 text-xs leading-5 text-amber-800/70">
                                Previous versions are displayed here for
                                review. Restore and comparison actions are
                                currently UI-only and will be connected to the
                                backend later.
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        <div className="absolute bottom-10 left-6 top-6 hidden w-px bg-gray-200 md:block" />

                        <div className="space-y-5">
                            {revisions.map((revision) => (
                                <section
                                    key={revision.id}
                                    className="relative rounded-3xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-900/5 md:ml-16 md:p-6"
                                >
                                    {/* Timeline Icon */}
                                    <div
                                        className={`absolute -left-16 top-6 hidden h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#F6FAF7] md:flex ${
                                            revision.current
                                                ? "bg-green-700 text-white"
                                                : "bg-white text-gray-500 shadow-sm"
                                        }`}
                                    >
                                        {revision.current ? (
                                            <CheckCircle2 size={19} />
                                        ) : (
                                            <History size={19} />
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-lg font-black text-green-950">
                                                    {revision.version}
                                                </h2>

                                                {revision.current && (
                                                    <span className="rounded-lg bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
                                                        Current Version
                                                    </span>
                                                )}

                                                <span
                                                    className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(
                                                        revision.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(
                                                        revision.status
                                                    )}
                                                </span>
                                            </div>

                                            <p className="mt-3 text-base font-bold text-gray-800">
                                                {revision.title}
                                            </p>

                                            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                                                {revision.summary}
                                            </p>

                                            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
                                                <span className="flex items-center gap-1.5">
                                                    <UserRound size={14} />
                                                    {revision.updatedBy}
                                                </span>

                                                <span className="flex items-center gap-1.5">
                                                    <CalendarDays size={14} />
                                                    {revision.date}
                                                </span>

                                                <span className="flex items-center gap-1.5">
                                                    <Clock3 size={14} />
                                                    {revision.time}
                                                </span>
                                            </div>

                                            <div className="mt-5">
                                                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                                                    Changes
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {revision.changes.map(
                                                        (change) => (
                                                            <span
                                                                key={change}
                                                                className="rounded-xl bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600"
                                                            >
                                                                {change}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 flex-wrap gap-2">
                                            <button
                                                type="button"
                                                className="kr-hover-button inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-700"
                                            >
                                                <Eye size={15} />
                                                View
                                            </button>

                                            {!revision.current && (
                                                <button
                                                    type="button"
                                                    className="kr-hover-button inline-flex h-10 items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-xs font-bold text-amber-700 hover:bg-amber-100"
                                                >
                                                    <RotateCcw size={15} />
                                                    Restore
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-lg shadow-gray-900/5 sm:flex-row sm:items-center sm:justify-between md:p-5">
                        <Link
                            to="/admin/content/pages"
                            className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-600 hover:border-green-200 hover:text-green-700"
                        >
                            <ArrowLeft size={17} />
                            Back to Pages
                        </Link>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                to={`/admin/content/pages/${id}/preview`}
                                className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-600 hover:border-blue-200 hover:text-blue-700"
                            >
                                <Eye size={17} />
                                Preview Current
                            </Link>

                            <Link
                                to={`/admin/content/pages/${id}/edit`}
                                className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                Edit Current
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PageRevisions