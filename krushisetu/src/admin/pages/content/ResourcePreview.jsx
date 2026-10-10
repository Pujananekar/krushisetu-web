import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Edit3,
    FileText,
    Globe2,
    Leaf,
    MapPin,
    UserRound,
} from "lucide-react"

const resource = {
    id: 1,
    title: "Guide to Sustainable Farming",
    slug: "guide-to-sustainable-farming",
    type: "Guide",
    category: "Sustainable Agriculture",
    language: "English",

    shortDescription:
        "A practical guide covering sustainable farming practices for farmers.",

    content: [
        {
            heading: "Introduction",
            text: "Sustainable farming focuses on agricultural practices that support productive farming while making responsible use of natural resources.",
        },
        {
            heading: "Soil Management",
            text: "Maintaining soil health is an important part of sustainable agriculture. Farmers can use appropriate crop planning, organic matter management and other suitable soil management practices.",
        },
        {
            heading: "Water Management",
            text: "Efficient water management helps farmers use available water resources responsibly. Appropriate irrigation practices can help improve water-use efficiency.",
        },
        {
            heading: "Sustainable Crop Practices",
            text: "Farmers can consider locally appropriate crop planning and agricultural practices based on their crops, soil conditions, climate and available resources.",
        },
    ],

    author: "Krushisetu Team",
    reviewer: "Agriculture Expert",

    publicationDate: "12 Sep 2026",
    lastUpdated: "20 Sep 2026",

    region: "Maharashtra",
    crops: "Multiple Crops",

    disclaimer:
        "The information provided in this resource is for general educational purposes. Farmers should consider local conditions and obtain appropriate professional guidance where required.",

    published: true,
    featured: true,
}

const ResourcePreview = () => {
    const { id } = useParams()

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px] space-y-6">

                {/* Admin Preview Header */}
                <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/resources"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                                <BookOpen className="h-4 w-4" />
                                Resources
                                <span className="text-gray-400">/</span>
                                <span className="text-gray-500">
                                    Preview
                                </span>
                            </div>

                            <h1 className="mt-1 text-xl font-bold text-gray-900">
                                Public Resource Preview
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Preview how this resource will appear on the
                                Krushisetu website.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            to={`/admin/content/resources/${id}/edit`}
                            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Edit3 className="h-4 w-4" />
                            Edit Resource
                        </Link>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                        >
                            <Globe2 className="h-4 w-4" />
                            View Public Page
                        </button>
                    </div>
                </div>

                {/* Public Website Preview */}
                <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-900/10">

                    {/* Simulated Navbar */}
                    <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8">
                        <div className="mx-auto flex max-w-7xl items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-sm font-bold text-white">
                                    K
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-green-900">
                                        Krushisetu
                                    </p>

                                    <p className="text-[10px] text-gray-500">
                                        Empowering Agriculture
                                    </p>
                                </div>
                            </div>

                            <div className="hidden items-center gap-6 text-xs font-medium text-gray-500 md:flex">
                                <span>About</span>
                                <span>Departments</span>
                                <span>Schemes</span>
                                <span>Training & Events</span>

                                <span className="font-semibold text-green-700">
                                    Resources
                                </span>

                                <span>Projects</span>
                                <span>Contact</span>
                            </div>

                            <div className="h-9 w-20 rounded-xl bg-green-700" />
                        </div>
                    </div>

                    {/* Hero */}
                    <div className="relative overflow-hidden bg-[#F6FAF7] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-100/60" />

                        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-green-50" />

                        <div className="relative mx-auto max-w-7xl">
                            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">

                                {/* Hero Content */}
                                <div>
                                    <div className="mb-5 flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                            <BookOpen className="h-3.5 w-3.5" />
                                            {resource.type}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                            {resource.category}
                                        </span>

                                        {resource.featured && (
                                            <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
                                        {resource.title}
                                    </h2>

                                    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                                        {resource.shortDescription}
                                    </p>

                                    <div className="mt-7 flex flex-wrap gap-3">
                                        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                                            <UserRound className="h-4 w-4 text-green-700" />

                                            <div>
                                                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                                    Author
                                                </p>

                                                <p className="text-sm font-semibold text-gray-800">
                                                    {resource.author}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                                            <CalendarDays className="h-4 w-4 text-green-700" />

                                            <div>
                                                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                                    Updated
                                                </p>

                                                <p className="text-sm font-semibold text-gray-800">
                                                    {resource.lastUpdated}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Media Card */}
                                <div className="rounded-[2rem] border border-green-100 bg-white p-5 shadow-xl shadow-green-900/10">
                                    <div className="flex h-48 items-center justify-center rounded-3xl bg-gradient-to-br from-green-50 to-green-100/70">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-green-700 shadow-lg">
                                            <Leaf className="h-9 w-9" />
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <p className="text-xs font-medium text-gray-400">
                                            Resource Information
                                        </p>

                                        <div className="mt-4 space-y-3">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-sm text-gray-500">
                                                    Language
                                                </span>

                                                <span className="text-sm font-semibold text-gray-800">
                                                    {resource.language}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-sm text-gray-500">
                                                    Region
                                                </span>

                                                <span className="text-right text-sm font-semibold text-gray-800">
                                                    {resource.region}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-sm text-gray-500">
                                                    Crops
                                                </span>

                                                <span className="text-right text-sm font-semibold text-gray-800">
                                                    {resource.crops}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="px-5 py-10 sm:px-8 lg:px-12">
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

                            {/* Article */}
                            <article className="min-w-0">
                                <div className="mb-8">
                                    <p className="text-sm font-semibold text-green-700">
                                        Resource Guide
                                    </p>

                                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                        {resource.title}
                                    </h3>
                                </div>

                                <div className="space-y-8">
                                    {resource.content.map((section) => (
                                        <section key={section.heading}>
                                            <h4 className="text-xl font-bold text-green-950">
                                                {section.heading}
                                            </h4>

                                            <div className="mt-3 h-1 w-12 rounded-full bg-green-600" />

                                            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                                                {section.text}
                                            </p>
                                        </section>
                                    ))}
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                                            <FileText className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold text-amber-900">
                                                Disclaimer
                                            </h4>

                                            <p className="mt-2 text-sm leading-6 text-amber-800/80">
                                                {resource.disclaimer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Sidebar */}
                            <aside className="space-y-5">

                                {/* Resource Details */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="text-base font-bold text-gray-900">
                                        Resource Details
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <BookOpen className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Resource Type
                                                </p>

                                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                                    {resource.type}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <Leaf className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Category
                                                </p>

                                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                                    {resource.category}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <MapPin className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Applicability
                                                </p>

                                                <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                                    {resource.region}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {resource.crops}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Author / Reviewer */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="text-base font-bold text-gray-900">
                                        Content Credits
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Author
                                            </p>

                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                    <UserRound className="h-4 w-4" />
                                                </div>

                                                <span className="text-sm font-semibold text-gray-800">
                                                    {resource.author}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-4">
                                            <p className="text-xs text-gray-400">
                                                Reviewed by
                                            </p>

                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>

                                                <span className="text-sm font-semibold text-gray-800">
                                                    {resource.reviewer}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Publication */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="text-base font-bold text-gray-900">
                                        Publication
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <span className="text-sm text-gray-500">
                                                Published
                                            </span>

                                            <span className="text-right text-sm font-semibold text-gray-800">
                                                {resource.publicationDate}
                                            </span>
                                        </div>

                                        <div className="flex items-start justify-between gap-4">
                                            <span className="text-sm text-gray-500">
                                                Last Updated
                                            </span>

                                            <span className="text-right text-sm font-semibold text-gray-800">
                                                {resource.lastUpdated}
                                            </span>
                                        </div>

                                        <div className="flex items-start justify-between gap-4">
                                            <span className="text-sm text-gray-500">
                                                Language
                                            </span>

                                            <span className="text-right text-sm font-semibold text-gray-800">
                                                {resource.language}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3">
                                        <CheckCircle2 className="h-4 w-4 text-green-700" />

                                        <span className="text-xs font-semibold text-green-700">
                                            Published resource
                                        </span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>

                    {/* Public CTA */}
                    <div className="bg-green-900 px-5 py-10 sm:px-8 lg:px-12">
                        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-green-300">
                                    Krushisetu Resources
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-white">
                                    Explore more agricultural resources
                                </h3>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-green-100/70">
                                    Explore guides, articles and practical
                                    resources designed to support farmers.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-bold text-green-800 transition hover:bg-green-50"
                            >
                                Browse Resources
                            </button>
                        </div>
                    </div>

                    {/* Simulated Footer */}
                    <div className="border-t border-gray-100 bg-[#F6FAF7] px-5 py-6 sm:px-8">
                        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                            <span>
                                © 2026 Krushisetu. All rights reserved.
                            </span>

                            <div className="flex justify-center gap-4 sm:justify-end">
                                <span>Privacy Policy</span>
                                <span>Terms</span>
                                <span>Contact</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Metadata */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
                            <FileText className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-sm font-bold text-gray-900">
                                Admin Preview Information
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                This is a UI preview of the public resource
                                page. The displayed resource is temporary UI
                                data until the Resources API is connected.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                    ID: {resource.id}
                                </span>

                                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                    Slug: {resource.slug}
                                </span>

                                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                                    Published
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResourcePreview