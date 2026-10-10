import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    Download,
    Edit3,
    ExternalLink,
    FileText,
    ShieldCheck,
} from "lucide-react"

const downloadData = {
    1: {
        title: "Krushisetu Organisation Profile",
        description:
            "Official organisation profile and overview document.",
        category: "Organisation",
        fileType: "PDF",
        fileSize: "2.4 MB",
        downloads: 128,
        language: "English",
        version: "1.0",
        documentDate: "28 Sep 2026",
        lastUpdated: "28 Sep 2026",
        author: "Krushisetu Team",
        reviewer: "Content Team",
        source: "Krushisetu",
        status: "Published",
        featured: true,
        allowDownload: true,
        disclaimer:
            "Information is provided for general guidance. Please verify the latest information with Krushisetu where required.",
    },
    2: {
        title: "Farmer Scheme Application Guide",
        description:
            "Reference guide for understanding scheme application procedures.",
        category: "Schemes",
        fileType: "PDF",
        fileSize: "3.8 MB",
        downloads: 246,
        language: "English",
        version: "1.2",
        documentDate: "27 Sep 2026",
        lastUpdated: "27 Sep 2026",
        author: "Krushisetu Team",
        reviewer: "Content Team",
        source: "Krushisetu",
        status: "Published",
        featured: true,
        allowDownload: true,
        disclaimer:
            "Information is provided for general guidance. Please verify the latest requirements with the relevant authority.",
    },
}

const fallbackDownload = {
    title: "Download Document",
    description:
        "This is a UI preview of a downloadable Krushisetu document.",
    category: "Resources",
    fileType: "PDF",
    fileSize: "2.4 MB",
    downloads: 0,
    language: "English",
    version: "1.0",
    documentDate: "01 Oct 2026",
    lastUpdated: "01 Oct 2026",
    author: "Krushisetu Team",
    reviewer: "Content Team",
    source: "Krushisetu",
    status: "Draft",
    featured: false,
    allowDownload: true,
    disclaimer:
        "Information is provided for general guidance. Please verify the latest information before using this document.",
}

const DownloadPreview = () => {
    const { id } = useParams()

    const document =
        downloadData[id] || fallbackDownload

    return (
        <section className="min-h-screen bg-[#F6FAF7]">

            {/* Admin Preview Header */}
            <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 shadow-sm">
                <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/content/downloads"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
                                Admin Preview
                            </p>

                            <p className="text-sm font-bold text-gray-900">
                                Download Preview
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={`/admin/content/downloads/${id}/edit`}
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
                        <span>Training</span>
                        <span>Resources</span>
                        <span className="text-green-700">
                            Downloads
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

                        <span>Downloads</span>

                        <span className="text-gray-300">
                            /
                        </span>

                        <span className="max-w-[320px] truncate text-green-700">
                            {document.title}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden bg-green-950">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-800/30" />

                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-green-700/20" />

                <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[170px_minmax(0,1fr)]">

                        {/* File Icon */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/10 bg-white shadow-2xl">
                                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                                    <FileText className="h-14 w-14" />
                                </div>
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-green-100">
                                    {document.category}
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-green-100">
                                    {document.fileType}
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-green-100">
                                    {document.fileSize}
                                </span>

                                {document.featured && (
                                    <span className="rounded-full bg-amber-400/15 px-3 py-1.5 text-[11px] font-bold text-amber-200">
                                        Featured
                                    </span>
                                )}

                                {document.status ===
                                    "Published" && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-400/15 px-3 py-1.5 text-[11px] font-bold text-green-200">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Published
                                    </span>
                                )}
                            </div>

                            <p className="mt-6 text-sm font-semibold text-green-300">
                                Downloadable Resource
                            </p>

                            <h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                {document.title}
                            </h1>

                            <p className="mt-5 max-w-3xl text-base leading-7 text-green-100/80">
                                {document.description}
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                {document.allowDownload && (
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-green-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Document
                                    </button>
                                )}

                                <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-green-50">
                                    <Download className="h-4 w-4" />
                                    {document.downloads.toLocaleString()} downloads
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main */}
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

                    {/* Content */}
                    <div className="space-y-8">

                        {/* Document Information */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                        Document
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                                        About This Download
                                    </h2>
                                </div>
                            </div>

                            <p className="mt-6 text-sm leading-7 text-gray-600">
                                {document.description}
                            </p>
                        </section>

                        {/* File Preview */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-[#F6FAF7] px-6 py-12 text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-green-700 shadow-sm">
                                    <FileText className="h-9 w-9" />
                                </div>

                                <h2 className="mt-5 text-lg font-bold text-gray-900">
                                    {document.title}
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    {document.fileType} •{" "}
                                    {document.fileSize} • Version{" "}
                                    {document.version}
                                </p>

                                {document.allowDownload && (
                                    <button
                                        type="button"
                                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download File
                                    </button>
                                )}
                            </div>
                        </section>

                        {/* Disclaimer */}
                        {document.disclaimer && (
                            <section className="rounded-4xl border border-amber-100 bg-amber-50/60 p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-amber-950">
                                            Important Information
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-amber-900/70">
                                            {
                                                document.disclaimer
                                            }
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* CTA */}
                        <section className="overflow-hidden rounded-4xl bg-green-800 p-7 shadow-xl shadow-green-900/10 sm:p-9">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-green-200">
                                        Need Assistance?
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-white">
                                        Have questions about this document?
                                    </h2>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100/80">
                                        Contact the Krushisetu team if you
                                        need help understanding or accessing
                                        this resource.
                                    </p>
                                </div>

                                <Link
                                    to="/contact"
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-green-800 transition hover:-translate-y-0.5 hover:bg-green-50"
                                >
                                    Contact Us
                                    <ExternalLink className="h-4 w-4" />
                                </Link>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* File Details */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                File Details
                            </h2>

                            <div className="mt-5 space-y-4">
                                <DetailRow
                                    label="File Type"
                                    value={
                                        document.fileType
                                    }
                                />

                                <DetailRow
                                    label="File Size"
                                    value={
                                        document.fileSize
                                    }
                                />

                                <DetailRow
                                    label="Version"
                                    value={
                                        document.version
                                    }
                                />

                                <DetailRow
                                    label="Language"
                                    value={
                                        document.language
                                    }
                                />

                                <DetailRow
                                    label="Category"
                                    value={
                                        document.category
                                    }
                                />

                                <DetailRow
                                    label="Downloads"
                                    value={document.downloads.toLocaleString()}
                                />
                            </div>
                        </div>

                        {/* Publication */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-green-700" />

                                <h2 className="text-sm font-bold text-gray-900">
                                    Publication
                                </h2>
                            </div>

                            <div className="mt-5 space-y-3">
                                <MetaRow
                                    label="Document Date"
                                    value={
                                        document.documentDate
                                    }
                                />

                                <MetaRow
                                    label="Last Updated"
                                    value={
                                        document.lastUpdated
                                    }
                                />

                                <MetaRow
                                    label="Author"
                                    value={
                                        document.author
                                    }
                                />

                                <MetaRow
                                    label="Reviewer"
                                    value={
                                        document.reviewer
                                    }
                                />

                                <MetaRow
                                    label="Source"
                                    value={
                                        document.source
                                    }
                                />

                                <MetaRow
                                    label="Status"
                                    value={
                                        document.status
                                    }
                                />
                            </div>
                        </div>

                        {/* Download Stats */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Download className="h-5 w-5" />
                            </div>

                            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                                Total Downloads
                            </p>

                            <p className="mt-1 text-3xl font-bold text-gray-900">
                                {document.downloads.toLocaleString()}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Recorded document downloads
                            </p>
                        </div>

                        {/* Admin Metadata */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-700" />

                                <h2 className="text-sm font-bold text-gray-900">
                                    Admin Metadata
                                </h2>
                            </div>

                            <div className="mt-5 space-y-3">
                                <MetaRow
                                    label="Featured"
                                    value={
                                        document.featured
                                            ? "Yes"
                                            : "No"
                                    }
                                />

                                <MetaRow
                                    label="Public Download"
                                    value={
                                        document.allowDownload
                                            ? "Enabled"
                                            : "Disabled"
                                    }
                                />

                                <MetaRow
                                    label="Document ID"
                                    value={
                                        id || "new"
                                    }
                                />
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
                                <p>Downloads</p>
                                <p>FAQs</p>
                                <p>Contact</p>
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

            {/* Admin Metadata Footer */}
            <div className="border-t border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <span>
                        Admin preview • Download ID:{" "}
                        {id || "new"}
                    </span>

                    <Link
                        to={`/admin/content/downloads/${id}/edit`}
                        className="font-semibold text-green-700 hover:text-green-800"
                    >
                        Edit download
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

            <span className="max-w-[170px] text-right text-xs font-semibold text-gray-700">
                {value}
            </span>
        </div>
    )
}

export default DownloadPreview