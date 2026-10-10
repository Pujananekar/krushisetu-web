import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    Eye,
    FileText,
    Globe2,
    History,
    Image,
    Languages,
    Save,
    Send,
    Settings2,
} from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const PageEditor = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const isEditing = Boolean(id)

    const [formData, setFormData] = useState({
        title: isEditing ? "About Us" : "",
        slug: isEditing ? "/about" : "",
        language: "English",
        status: isEditing ? "DRAFT" : "DRAFT",
        summary: isEditing
            ? "Learn about Krushisetu, its mission, vision and role in supporting farmers and rural communities."
            : "",
        content: isEditing
            ? "Krushisetu is an agriculture development initiative of Be The Change Foundation established to strengthen farmers, rural women, youth, Farmer Producer Organisations, agri-entrepreneurs and farming communities."
            : "",
        metaTitle: isEditing ? "About Us | Krushisetu" : "",
        metaDescription: isEditing
            ? "Learn about Krushisetu, its vision, mission and commitment to farmer empowerment and sustainable rural development."
            : "",
        canonicalUrl: isEditing
            ? "https://example.com/about"
            : "",
        featuredImage: "",
        publishDate: "",
        publishTime: "",
    })

    const [showSchedule, setShowSchedule] = useState(false)
    const [saved, setSaved] = useState(false)

    const updateField = (field, value) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }))
        setSaved(false)
    }

    const handleSaveDraft = () => {
        setFormData((current) => ({
            ...current,
            status: "DRAFT",
        }))

        setSaved(true)
    }

    const handleSubmitReview = () => {
        setFormData((current) => ({
            ...current,
            status: "IN_REVIEW",
        }))

        setSaved(true)
    }

    const handlePublish = () => {
        setFormData((current) => ({
            ...current,
            status: "PUBLISHED",
        }))

        setSaved(true)
    }

    const handleSchedule = () => {
        if (!formData.publishDate || !formData.publishTime) {
            return
        }

        setFormData((current) => ({
            ...current,
            status: "SCHEDULED",
        }))

        setSaved(true)
    }

    const getStatusStyle = () => {
        const styles = {
            DRAFT: "bg-gray-100 text-gray-600",
            IN_REVIEW: "bg-amber-50 text-amber-700",
            PUBLISHED: "bg-green-50 text-green-700",
            SCHEDULED: "bg-blue-50 text-blue-700",
        }

        return styles[formData.status] || "bg-gray-100 text-gray-600"
    }

    const getStatusLabel = () => {
        const labels = {
            DRAFT: "Draft",
            IN_REVIEW: "In Review",
            PUBLISHED: "Published",
            SCHEDULED: "Scheduled",
        }

        return labels[formData.status] || formData.status
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
                            {isEditing ? "Edit Page" : "Add Page"}
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <FileText size={23} />
                            </div>

                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                Content Management
                            </p>

                            <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                {isEditing ? "Edit Page" : "Create Page"}
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                {isEditing
                                    ? "Update page content, metadata and publishing settings."
                                    : "Create a new website page and prepare it for review or publication."}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                to="/admin/content/pages"
                                className="kr-hover-button inline-flex h-11 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-600 hover:border-green-200 hover:text-green-700"
                            >
                                <ArrowLeft size={17} />
                                Back to Pages
                            </Link>

                            {isEditing && (
                                <Link
                                    to={`/admin/content/pages/${id}/preview`}
                                    className="kr-hover-button inline-flex h-11 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-600 hover:border-blue-200 hover:text-blue-700"
                                >
                                    <Eye size={17} />
                                    Preview
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Saved Notice */}
                    {saved && (
                        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                <Save size={16} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-green-900">
                                    Changes saved
                                </p>

                                <p className="text-xs text-green-700/70">
                                    This is currently a UI-only workflow.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-6 xl:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-6 xl:col-span-2">
                            {/* Basic Information */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <div className="mb-6 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <FileText size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-green-950">
                                            Basic Information
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Define the page title, URL and
                                            language.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            Page Title
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(event) =>
                                                updateField(
                                                    "title",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter page title"
                                            className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            URL Slug
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(event) =>
                                                updateField(
                                                    "slug",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="/example-page"
                                            className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 font-mono text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            Language
                                        </label>

                                        <div className="relative">
                                            <Languages
                                                size={17}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            />

                                            <select
                                                value={formData.language}
                                                onChange={(event) =>
                                                    updateField(
                                                        "language",
                                                        event.target.value
                                                    )
                                                }
                                                className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm font-semibold text-gray-700 outline-none transition-all duration-200 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                            >
                                                <option value="English">
                                                    English
                                                </option>
                                                <option value="Marathi">
                                                    Marathi
                                                </option>
                                            </select>

                                            <ChevronRight
                                                size={16}
                                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            Short Summary
                                        </label>

                                        <textarea
                                            value={formData.summary}
                                            onChange={(event) =>
                                                updateField(
                                                    "summary",
                                                    event.target.value
                                                )
                                            }
                                            rows={3}
                                            placeholder="Write a short summary for this page..."
                                            className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Content */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <div className="mb-6 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <Globe2 size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-green-950">
                                            Page Content
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Add and edit the main content for
                                            this page.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-gray-700">
                                        Content
                                    </label>

                                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 focus-within:border-green-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-50">
                                        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-white p-2">
                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                                            >
                                                Heading
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                                            >
                                                Bold
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                                            >
                                                Italic
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                                            >
                                                Link
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                                            >
                                                List
                                            </button>
                                        </div>

                                        <textarea
                                            value={formData.content}
                                            onChange={(event) =>
                                                updateField(
                                                    "content",
                                                    event.target.value
                                                )
                                            }
                                            rows={14}
                                            placeholder="Write page content..."
                                            className="w-full resize-y border-0 bg-transparent px-4 py-4 text-sm leading-7 text-gray-800 outline-none"
                                        />
                                    </div>

                                    <p className="mt-2 text-xs text-gray-400">
                                        Rich-text controls are UI placeholders
                                        until the editor is connected to the
                                        backend/content system.
                                    </p>
                                </div>
                            </section>

                            {/* Featured Media */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <div className="mb-6 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <Image size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-green-950">
                                            Featured Media
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Select the primary image or media
                                            associated with the page.
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center transition-colors duration-200 hover:border-green-200 hover:bg-green-50/30">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
                                        <Image size={22} />
                                    </div>

                                    <p className="mt-4 text-sm font-bold text-gray-700">
                                        No featured media selected
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Media library integration will be added
                                        later.
                                    </p>

                                    <button
                                        type="button"
                                        className="kr-hover-button mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-bold text-gray-700 hover:border-green-200 hover:text-green-700"
                                    >
                                        Select Media
                                    </button>
                                </div>
                            </section>

                            {/* SEO */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <div className="mb-6 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <Settings2 size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-green-950">
                                            SEO Settings
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Configure metadata for search and
                                            sharing.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            Meta Title
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.metaTitle}
                                            onChange={(event) =>
                                                updateField(
                                                    "metaTitle",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Page title for search engines"
                                            className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            Meta Description
                                        </label>

                                        <textarea
                                            value={formData.metaDescription}
                                            onChange={(event) =>
                                                updateField(
                                                    "metaDescription",
                                                    event.target.value
                                                )
                                            }
                                            rows={4}
                                            placeholder="Describe this page for search engines..."
                                            className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            Canonical URL
                                        </label>

                                        <input
                                            type="url"
                                            value={formData.canonicalUrl}
                                            onChange={(event) =>
                                                updateField(
                                                    "canonicalUrl",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="https://example.com/page"
                                            className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Publishing */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <div className="mb-5 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <Send size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-green-950">
                                            Publishing
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Control page publication.
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Current Status
                                    </p>

                                    <span
                                        className={`mt-2 inline-flex rounded-xl px-3 py-1.5 text-xs font-bold ${getStatusStyle()}`}
                                    >
                                        {getStatusLabel()}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <button
                                        type="button"
                                        onClick={handleSaveDraft}
                                        className="kr-hover-button flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:border-green-200 hover:text-green-700"
                                    >
                                        <Save size={17} />
                                        Save Draft
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSubmitReview}
                                        className="kr-hover-button flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 text-sm font-bold text-amber-700 hover:bg-amber-100"
                                    >
                                        <Send size={17} />
                                        Submit for Review
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handlePublish}
                                        className="kr-hover-button flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-green-700 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                                    >
                                        <Send size={17} />
                                        Publish
                                    </button>
                                </div>

                                <div className="mt-4 border-t border-gray-100 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowSchedule(
                                                (current) => !current
                                            )
                                        }
                                        className="flex w-full items-center justify-between text-sm font-bold text-gray-600 hover:text-green-700"
                                    >
                                        <span className="flex items-center gap-2">
                                            <CalendarDays size={17} />
                                            Schedule Publishing
                                        </span>

                                        <ChevronRight
                                            size={17}
                                            className={`transition-transform duration-200 ${
                                                showSchedule
                                                    ? "rotate-90"
                                                    : ""
                                            }`}
                                        />
                                    </button>

                                    {showSchedule && (
                                        <div className="mt-4 space-y-3">
                                            <div>
                                                <label className="mb-2 block text-xs font-bold text-gray-600">
                                                    Publish Date
                                                </label>

                                                <input
                                                    type="date"
                                                    value={
                                                        formData.publishDate
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "publishDate",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-xs font-bold text-gray-600">
                                                    Publish Time
                                                </label>

                                                <input
                                                    type="time"
                                                    value={
                                                        formData.publishTime
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "publishTime",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleSchedule}
                                                disabled={
                                                    !formData.publishDate ||
                                                    !formData.publishTime
                                                }
                                                className="kr-hover-button flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <CalendarDays size={15} />
                                                Schedule Page
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Language */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <div className="mb-5 flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                        <Languages size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-green-950">
                                            Translation
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Manage the language version of this
                                            page.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4">
                                        <div>
                                            <p className="text-sm font-bold text-green-900">
                                                English
                                            </p>

                                            <p className="mt-1 text-xs text-green-700/70">
                                                Current version
                                            </p>
                                        </div>

                                        <span className="rounded-lg bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase text-green-700">
                                            Active
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">
                                                Marathi
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Translation status
                                            </p>
                                        </div>

                                        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-700">
                                            In Review
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Revisions */}
                            {isEditing && (
                                <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                    <div className="mb-5 flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                            <History size={20} />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-black text-green-950">
                                                Revisions
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Review previous page versions.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">
                                                        Version 3
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        29 Sep 2026 · Admin
                                                    </p>
                                                </div>

                                                <span className="rounded-lg bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase text-green-700">
                                                    Current
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">
                                                    Version 2
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    25 Sep 2026 · Admin
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/admin/content/pages/${id}/revisions`}
                                            className="kr-hover-link mt-1 inline-flex items-center gap-2 text-xs font-bold text-green-700"
                                        >
                                            View full revision history
                                            <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-lg shadow-gray-900/5 sm:flex-row sm:items-center sm:justify-between md:p-5">
                        <Link
                            to="/admin/content/pages"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
                        >
                            <ArrowLeft size={17} />
                            Cancel
                        </Link>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-700 hover:border-green-200 hover:text-green-700"
                            >
                                <Save size={17} />
                                Save Draft
                            </button>

                            <button
                                type="button"
                                onClick={handlePublish}
                                className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                <Send size={17} />
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PageEditor