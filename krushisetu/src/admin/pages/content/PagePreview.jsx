import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    Edit3,
    Eye,
    Globe2,
    History,
    Languages,
    Send,
} from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

const PagePreview = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const page = {
        id,
        title: "About Us",
        slug: "/about",
        language: "English",
        status: "DRAFT",
        summary:
            "Learn about Krushisetu, its mission, vision and role in supporting farmers and rural communities.",
        content: [
            {
                type: "paragraph",
                text:
                    "Krushisetu is an agriculture development initiative of Be The Change Foundation established to strengthen farmers, rural women, youth, Farmer Producer Organisations, agri-entrepreneurs and farming communities.",
            },
            {
                type: "paragraph",
                text:
                    "It works as a bridge between agriculture knowledge, modern technology, government schemes, institutional support, market opportunities and sustainable rural livelihoods.",
            },
            {
                type: "heading",
                text: "Our Vision",
            },
            {
                type: "paragraph",
                text:
                    "To empower farmers through knowledge, technology, market access and government-scheme awareness while building resilient, prosperous and sustainable rural communities.",
            },
            {
                type: "heading",
                text: "Our Mission",
            },
            {
                type: "paragraph",
                text:
                    "To serve as a trusted bridge between farmers and the resources required for agricultural progress by delivering practical advisory support, quality training, institutional linkages, entrepreneurship guidance, digital solutions and inclusive rural development programs.",
            },
        ],
        updatedAt: "29 Sep 2026",
        updatedBy: "Admin",
    }

    const getStatusStyle = () => {
        const styles = {
            DRAFT: "bg-gray-100 text-gray-600",
            IN_REVIEW: "bg-amber-50 text-amber-700",
            PUBLISHED: "bg-green-50 text-green-700",
            SCHEDULED: "bg-blue-50 text-blue-700",
        }

        return styles[page.status] || "bg-gray-100 text-gray-600"
    }

    const getStatusLabel = () => {
        const labels = {
            DRAFT: "Draft",
            IN_REVIEW: "In Review",
            PUBLISHED: "Published",
            SCHEDULED: "Scheduled",
        }

        return labels[page.status] || page.status
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

                        <span className="text-green-700">Preview</span>
                    </div>

                    {/* Admin Preview Header */}
                    <div className="mb-6 overflow-hidden rounded-3xl border border-green-200 bg-white shadow-lg shadow-gray-900/5">
                        <div className="flex flex-col gap-5 border-b border-gray-100 bg-green-50/60 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-md shadow-green-900/10">
                                    <Eye size={20} />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                            Admin Preview
                                        </p>

                                        <span
                                            className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase ${getStatusStyle()}`}
                                        >
                                            {getStatusLabel()}
                                        </span>
                                    </div>

                                    <h1 className="mt-1 text-xl font-black text-green-950">
                                        {page.title}
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {page.slug}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Link
                                    to={`/admin/content/pages/${id}/edit`}
                                    className="kr-hover-button inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 hover:border-green-200 hover:text-green-700"
                                >
                                    <Edit3 size={16} />
                                    Edit Page
                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/admin/content/pages")
                                    }
                                    className="kr-hover-button inline-flex h-10 items-center gap-2 rounded-xl bg-green-700 px-4 text-xs font-bold text-white hover:bg-green-800"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Pages
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 md:p-6">
                            <div className="rounded-2xl bg-gray-50 p-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Globe2 size={15} />

                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        URL
                                    </p>
                                </div>

                                <p className="mt-2 font-mono text-sm font-semibold text-green-950">
                                    {page.slug}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Languages size={15} />

                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        Language
                                    </p>
                                </div>

                                <p className="mt-2 text-sm font-semibold text-green-950">
                                    {page.language}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <CalendarDays size={15} />

                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        Last Updated
                                    </p>
                                </div>

                                <p className="mt-2 text-sm font-semibold text-green-950">
                                    {page.updatedAt}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-gray-50 p-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <History size={15} />

                                    <p className="text-[10px] font-bold uppercase tracking-wider">
                                        Updated By
                                    </p>
                                </div>

                                <p className="mt-2 text-sm font-semibold text-green-950">
                                    {page.updatedBy}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Preview Notice */}
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4">
                        <Eye
                            size={19}
                            className="mt-0.5 shrink-0 text-blue-700"
                        />

                        <div>
                            <p className="text-sm font-bold text-blue-900">
                                Preview mode
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-800/70">
                                This is an administrative preview. Changes
                                shown here are not publicly published until
                                the page is published.
                            </p>
                        </div>
                    </div>

                    {/* Website Preview */}
                    <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5">
                        {/* Simulated Public Navbar */}
                        <div className="border-b border-gray-100 bg-white px-5 py-4 md:px-8">
                            <div className="mx-auto flex max-w-300 items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
                                        <Globe2 size={19} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-black leading-none text-green-950">
                                            Krushisetu
                                        </p>

                                        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-green-700">
                                            कृषीसेतू
                                        </p>
                                    </div>
                                </div>

                                <div className="hidden items-center gap-6 md:flex">
                                    <span className="text-xs font-semibold text-gray-500">
                                        About
                                    </span>

                                    <span className="text-xs font-semibold text-gray-500">
                                        Departments
                                    </span>

                                    <span className="text-xs font-semibold text-gray-500">
                                        Schemes
                                    </span>

                                    <span className="text-xs font-semibold text-gray-500">
                                        Training
                                    </span>

                                    <span className="rounded-xl bg-green-700 px-3 py-2 text-xs font-bold text-white">
                                        Contact
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hero */}
                        <section className="relative overflow-hidden bg-[#F6FAF7] px-5 py-16 md:px-10 md:py-24">
                            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-100/70" />

                            <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-green-50" />

                            <div className="relative mx-auto max-w-260 text-center">
                                <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
                                    About Krushisetu
                                </span>

                                <h2 className="mt-5 text-4xl font-black tracking-tight text-green-950 md:text-6xl">
                                    {page.title}
                                </h2>

                                <p className="mx-auto mt-5 max-w-190 text-base leading-7 text-gray-600 md:text-lg md:leading-8">
                                    {page.summary}
                                </p>
                            </div>
                        </section>

                        {/* Content */}
                        <section className="px-5 py-12 md:px-10 md:py-16">
                            <div className="mx-auto max-w-220">
                                {page.content.map((block, index) => {
                                    if (block.type === "heading") {
                                        return (
                                            <h3
                                                key={index}
                                                className="mt-10 text-2xl font-black text-green-950 first:mt-0 md:text-3xl"
                                            >
                                                {block.text}
                                            </h3>
                                        )
                                    }

                                    return (
                                        <p
                                            key={index}
                                            className="mt-6 text-base leading-8 text-gray-600 first:mt-0 md:text-lg"
                                        >
                                            {block.text}
                                        </p>
                                    )
                                })}
                            </div>
                        </section>

                        {/* CTA Preview */}
                        <section className="px-5 pb-12 md:px-10 md:pb-16">
                            <div className="mx-auto max-w-220 overflow-hidden rounded-3xl bg-green-900 p-7 md:p-10">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-300">
                                            Need guidance?
                                        </p>

                                        <h3 className="mt-2 text-2xl font-black text-white">
                                            Connect with Krushisetu
                                        </h3>

                                        <p className="mt-2 max-w-xl text-sm leading-6 text-green-100/70">
                                            Get practical agricultural support,
                                            training and facilitation guidance.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="kr-hover-button inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-green-800"
                                    >
                                        Contact Us
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Simulated Footer */}
                        <div className="border-t border-gray-100 bg-green-950 px-5 py-7 md:px-10">
                            <div className="mx-auto flex max-w-300 flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                                <p className="text-xs font-semibold text-green-100/70">
                                    Krushisetu · Empowering Farmers •
                                    Transforming Agriculture
                                </p>

                                <p className="text-xs text-green-100/50">
                                    An initiative of Be The Change Foundation
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-lg shadow-gray-900/5 sm:flex-row sm:items-center sm:justify-between md:p-5">
                        <Link
                            to={`/admin/content/pages/${id}/revisions`}
                            className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-600 hover:border-amber-200 hover:text-amber-700"
                        >
                            <History size={17} />
                            Revision History
                        </Link>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                to={`/admin/content/pages/${id}/edit`}
                                className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-700 hover:border-green-200 hover:text-green-700"
                            >
                                <Edit3 size={17} />
                                Edit Page
                            </Link>

                            <button
                                type="button"
                                className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                <Send size={17} />
                                Publish Page
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PagePreview