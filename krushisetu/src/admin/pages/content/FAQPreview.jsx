import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    Edit3,
    ExternalLink,
    HelpCircle,
    MessageCircleQuestion,
    ShieldCheck,
} from "lucide-react"

const faqData = {
    1: {
        question: "What is Krushisetu?",
        answer:
            "Krushisetu is a rural development platform connecting farmers, communities, programmes and support services.",
        category: "General",
        audience: "Farmers",
        language: "English",
        status: "Published",
        featured: true,
        order: 1,
        tags: ["Krushisetu", "rural development", "farmers"],
        relatedQuestions: [
            "How can I apply for a government scheme?",
            "How can I access farmer resources?",
        ],
    },
    2: {
        question:
            "How can I apply for a government scheme?",
        answer:
            "You can explore eligible schemes on the Schemes section and follow the application steps provided for each scheme.",
        category: "Schemes",
        audience: "Farmers",
        language: "English",
        status: "Published",
        featured: true,
        order: 2,
        tags: [
            "schemes",
            "applications",
            "farmers",
        ],
        relatedQuestions: [
            "What documents may be required for scheme applications?",
            "Where can I find government schemes?",
        ],
    },
}

const fallbackFaq = {
    question: "Frequently Asked Question",
    answer:
        "This is a UI preview of an FAQ. The final question and answer will be loaded from the backend during the integration phase.",
    category: "General",
    audience: "All Visitors",
    language: "English",
    status: "Draft",
    featured: false,
    order: 1,
    tags: ["faq"],
    relatedQuestions: [
        "How can I contact Krushisetu?",
        "Where can I find more information?",
    ],
}

const FAQPreview = () => {
    const { id } = useParams()

    const faq = faqData[id] || fallbackFaq

    return (
        <section className="min-h-screen bg-[#F6FAF7]">

            {/* Admin Preview Header */}
            <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 shadow-sm">
                <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/content/faqs"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
                                Admin Preview
                            </p>

                            <p className="text-sm font-bold text-gray-900">
                                FAQ Preview
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={`/admin/content/faqs/${id}/edit`}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                        </Link>

                        <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Preview Mode
                        </span>
                    </div>
                </div>
            </div>

            {/* Simulated Public Navbar */}
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white">
                            <span className="text-sm font-black">
                                K
                            </span>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-gray-900">
                                Krushisetu
                            </p>

                            <p className="text-[10px] text-gray-500">
                                Rural Development Initiative
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-7 text-xs font-semibold text-gray-500 md:flex">
                        <span>About</span>
                        <span>Departments</span>
                        <span>Schemes</span>
                        <span>Resources</span>
                        <span>Training</span>
                        <span className="text-green-700">
                            FAQs
                        </span>
                        <span>Contact</span>
                    </div>

                    <div className="rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white">
                        Get Support
                    </div>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500">
                        <span>Home</span>

                        <span className="text-gray-300">
                            /
                        </span>

                        <span>FAQs</span>

                        <span className="text-gray-300">
                            /
                        </span>

                        <span className="max-w-[280px] truncate text-green-700">
                            {faq.question}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden bg-green-950">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-800/30" />

                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-green-700/20" />

                <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-green-100">
                                <HelpCircle className="h-3 w-3" />
                                {faq.category}
                            </span>

                            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-green-100">
                                {faq.audience}
                            </span>

                            {faq.featured && (
                                <span className="rounded-full bg-amber-400/15 px-3 py-1.5 text-[11px] font-bold text-amber-200">
                                    Featured FAQ
                                </span>
                            )}

                            {faq.status ===
                                "Published" && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-400/15 px-3 py-1.5 text-[11px] font-bold text-green-200">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Published
                                </span>
                            )}
                        </div>

                        <p className="mt-6 text-sm font-semibold text-green-300">
                            Frequently Asked Question
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {faq.question}
                        </h1>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-green-100/80">
                            Clear information to help farmers,
                            communities and visitors find the support
                            they need.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main */}
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

                    {/* Main Content */}
                    <div className="space-y-8">

                        {/* Answer */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <MessageCircleQuestion className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                        Answer
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                                        {faq.question}
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-7 rounded-3xl bg-[#F6FAF7] p-6 sm:p-7">
                                <p className="text-sm leading-8 text-gray-600 sm:text-base">
                                    {faq.answer}
                                </p>
                            </div>
                        </section>

                        {/* Helpful CTA */}
                        <section className="rounded-4xl border border-green-100 bg-green-50/60 p-6 sm:p-8">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <HelpCircle className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-green-950">
                                        Need more information?
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-green-900/70">
                                        Visitors can explore related resources
                                        or contact the Krushisetu team for
                                        additional assistance.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-800"
                                >
                                    Contact Us
                                </Link>

                                <Link
                                    to="/resources"
                                    className="inline-flex items-center gap-2 rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    Explore Resources
                                    <ExternalLink className="h-4 w-4" />
                                </Link>
                            </div>
                        </section>

                        {/* Related Questions */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                    Continue Reading
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-gray-900">
                                    Related Questions
                                </h2>
                            </div>

                            <div className="mt-6 space-y-3">
                                {faq.relatedQuestions.map(
                                    (
                                        question,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="kr-hover-card flex items-center gap-4 rounded-3xl border border-gray-200 bg-white p-5"
                                        >
                                            <div className="kr-hover-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                <HelpCircle className="h-5 w-5" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="kr-hover-title text-sm font-bold leading-6 text-gray-900">
                                                    {
                                                        question
                                                    }
                                                </p>
                                            </div>

                                            <span className="text-green-700">
                                                →
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* Tags */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <h2 className="text-base font-bold text-gray-900">
                                Related Topics
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {faq.tags.map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700"
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* FAQ Details */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                FAQ Details
                            </h2>

                            <div className="mt-5 space-y-4">
                                <DetailRow
                                    label="Category"
                                    value={
                                        faq.category
                                    }
                                />

                                <DetailRow
                                    label="Audience"
                                    value={
                                        faq.audience
                                    }
                                />

                                <DetailRow
                                    label="Language"
                                    value={
                                        faq.language
                                    }
                                />

                                <DetailRow
                                    label="Status"
                                    value={
                                        faq.status
                                    }
                                />

                                <DetailRow
                                    label="Display Order"
                                    value={
                                        faq.order
                                    }
                                />
                            </div>
                        </div>

                        {/* Publishing */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-green-700" />

                                <h2 className="text-sm font-bold text-gray-900">
                                    Publishing
                                </h2>
                            </div>

                            <div className="mt-5 space-y-3">
                                <MetaRow
                                    label="Public Visibility"
                                    value={
                                        faq.status ===
                                        "Published"
                                            ? "Visible"
                                            : "Hidden"
                                    }
                                />

                                <MetaRow
                                    label="Featured"
                                    value={
                                        faq.featured
                                            ? "Yes"
                                            : "No"
                                    }
                                />

                                <MetaRow
                                    label="Language"
                                    value={
                                        faq.language
                                    }
                                />
                            </div>
                        </div>

                        {/* Admin notice */}
                        <div className="rounded-4xl border border-green-100 bg-green-50/60 p-6">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-green-950">
                                        Preview information
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-green-900/70">
                                        This page simulates how the FAQ
                                        content can appear on the public
                                        Krushisetu website.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Public Footer */}
            <footer className="bg-green-950">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white">
                                    <span className="text-sm font-black">
                                        K
                                    </span>
                                </div>

                                <span className="font-bold text-white">
                                    Krushisetu
                                </span>
                            </div>

                            <p className="mt-4 max-w-sm text-sm leading-6 text-green-100/60">
                                Connecting communities, programmes and
                                opportunities for sustainable rural
                                development.
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">
                                Quick Links
                            </p>

                            <div className="mt-4 space-y-2 text-sm text-green-100/60">
                                <p>About</p>
                                <p>Departments</p>
                                <p>Schemes</p>
                                <p>Resources</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">
                                Support
                            </p>

                            <div className="mt-4 space-y-2 text-sm text-green-100/60">
                                <p>FAQs</p>
                                <p>Contact</p>
                                <p>Partnerships</p>
                                <p>Privacy Policy</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6 text-xs text-green-100/50">
                        © {new Date().getFullYear()} Krushisetu. All
                        rights reserved.
                    </div>
                </div>
            </footer>

            {/* Admin Metadata */}
            <div className="border-t border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <span>
                        Admin preview • FAQ ID:{" "}
                        {id || "new"}
                    </span>

                    <Link
                        to={`/admin/content/faqs/${id}/edit`}
                        className="font-semibold text-green-700 hover:text-green-800"
                    >
                        Edit FAQ
                    </Link>
                </div>
            </div>
        </section>
    )
}

const DetailRow = ({
    label,
    value,
}) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <span className="text-xs text-gray-500">
                {label}
            </span>

            <span className="text-right text-xs font-semibold text-gray-700">
                {value}
            </span>
        </div>
    )
}

const MetaRow = ({
    label,
    value,
}) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <span className="text-xs text-gray-500">
                {label}
            </span>

            <span className="text-xs font-semibold text-gray-700">
                {value}
            </span>
        </div>
    )
}

export default FAQPreview