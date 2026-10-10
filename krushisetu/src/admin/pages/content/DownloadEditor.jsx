import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    FileCheck2,
    FileText,
    Save,
    ShieldCheck,
    Upload,
} from "lucide-react"

const DownloadEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = Boolean(id)

    const [form, setForm] = useState({
        title: isEditMode
            ? "Farmer Scheme Application Guide"
            : "",
        slug: isEditMode
            ? "farmer-scheme-application-guide"
            : "",
        description: isEditMode
            ? "Reference guide for understanding scheme application procedures."
            : "",
        category: isEditMode
            ? "Schemes"
            : "Organisation",
        fileType: "PDF",
        fileSize: isEditMode
            ? "3.8 MB"
            : "",
        language: isEditMode
            ? "English"
            : "English",
        version: isEditMode
            ? "1.2"
            : "1.0",
        documentDate: isEditMode
            ? "2026-09-27"
            : "",
        lastUpdated: isEditMode
            ? "2026-09-27"
            : "",
        author: isEditMode
            ? "Krushisetu Team"
            : "",
        reviewer: isEditMode
            ? "Content Team"
            : "",
        source: isEditMode
            ? "Krushisetu"
            : "",
        status: isEditMode
            ? "Published"
            : "Draft",
        featured: isEditMode,
        published: isEditMode,
        showOnDownloads: true,
        showOnResources: false,
        allowPublicDownload: true,
        requireAcknowledgement: false,
        disclaimer: isEditMode
            ? "Information is provided for general guidance. Please verify the latest requirements with the relevant authority."
            : "",
        internalNotes: "",
    })

    const [saving, setSaving] = useState(false)

    const updateField = (
        field,
        value
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))
    }

    const handleSave = (
        nextStatus = form.status
    ) => {
        setSaving(true)

        setTimeout(() => {
            setSaving(false)

            setForm((previous) => ({
                ...previous,
                status: nextStatus,
                published:
                    nextStatus === "Published",
            }))

            navigate("/admin/content/downloads")
        }, 500)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/downloads"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-green-700">
                                <span>
                                    Content Management
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Downloads
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    {isEditMode
                                        ? "Edit"
                                        : "New"}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEditMode
                                    ? "Edit Download"
                                    : "Add Download"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage downloadable documents, metadata,
                                visibility and public access.
                            </p>
                        </div>
                    </div>

                    {isEditMode && (
                        <div className="flex items-center gap-2 self-start rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5">
                            <CheckCircle2 className="h-4 w-4 text-green-700" />

                            <span className="text-xs font-semibold text-green-700">
                                {form.status}
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Main */}
                    <div className="space-y-6">

                        {/* Document Information */}
                        <FormCard
                            title="Document Information"
                            description="Basic information displayed alongside the downloadable file."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Document Title"
                                    required
                                    value={form.title}
                                    onChange={(value) =>
                                        updateField(
                                            "title",
                                            value
                                        )
                                    }
                                    placeholder="Enter document title"
                                    className="md:col-span-2"
                                />

                                <Field
                                    label="Slug"
                                    required
                                    value={form.slug}
                                    onChange={(value) =>
                                        updateField(
                                            "slug",
                                            value
                                        )
                                    }
                                    placeholder="document-slug"
                                />

                                <SelectField
                                    label="Category"
                                    required
                                    value={
                                        form.category
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "category",
                                            value
                                        )
                                    }
                                    options={[
                                        "Organisation",
                                        "Schemes",
                                        "Training",
                                        "Resources",
                                        "Partnerships",
                                        "FPO",
                                        "Programmes",
                                        "Internships",
                                        "Projects",
                                        "Reports",
                                        "Forms",
                                        "Other",
                                    ]}
                                />

                                <SelectField
                                    label="File Type"
                                    required
                                    value={
                                        form.fileType
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "fileType",
                                            value
                                        )
                                    }
                                    options={[
                                        "PDF",
                                        "DOC",
                                        "DOCX",
                                        "XLS",
                                        "XLSX",
                                        "PPT",
                                        "PPTX",
                                        "ZIP",
                                        "Other",
                                    ]}
                                />

                                <SelectField
                                    label="Language"
                                    value={
                                        form.language
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "language",
                                            value
                                        )
                                    }
                                    options={[
                                        "English",
                                        "Marathi",
                                        "Hindi",
                                    ]}
                                />

                                <Field
                                    label="File Size"
                                    value={
                                        form.fileSize
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "fileSize",
                                            value
                                        )
                                    }
                                    placeholder="e.g. 3.8 MB"
                                />

                                <Field
                                    label="Version"
                                    value={
                                        form.version
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "version",
                                            value
                                        )
                                    }
                                    placeholder="1.0"
                                />

                                <Field
                                    label="Document Date"
                                    type="date"
                                    value={
                                        form.documentDate
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "documentDate",
                                            value
                                        )
                                    }
                                />
                            </div>

                            <div className="mt-5">
                                <TextAreaField
                                    label="Description"
                                    required
                                    value={
                                        form.description
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "description",
                                            value
                                        )
                                    }
                                    placeholder="Describe what this document contains..."
                                    rows={5}
                                />
                            </div>
                        </FormCard>

                        {/* File */}
                        <FormCard
                            title="Document File"
                            description="Upload the file that visitors will be able to download."
                        >
                            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-[#F6FAF7] p-6 text-center sm:p-8">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-green-700 shadow-sm">
                                    <FileText className="h-7 w-7" />
                                </div>

                                <h3 className="mt-4 text-sm font-bold text-gray-900">
                                    {isEditMode
                                        ? "Farmer Scheme Application Guide.pdf"
                                        : "Upload document"}
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-gray-500">
                                    Select the document file to make
                                    available for public download.
                                </p>

                                <button
                                    type="button"
                                    className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                >
                                    <Upload className="h-4 w-4" />
                                    Choose File
                                </button>
                            </div>

                            {isEditMode && (
                                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                            <FileText className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">
                                                Farmer Scheme Application Guide.pdf
                                            </p>

                                            <p className="mt-0.5 text-xs text-gray-400">
                                                {form.fileSize} • Version{" "}
                                                {form.version}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-green-700 hover:text-green-900"
                                    >
                                        Replace File
                                    </button>
                                </div>
                            )}
                        </FormCard>

                        {/* Attribution */}
                        <FormCard
                            title="Document Attribution"
                            description="Record the document author, reviewer and source."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Author"
                                    value={
                                        form.author
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "author",
                                            value
                                        )
                                    }
                                    placeholder="Document author"
                                />

                                <Field
                                    label="Reviewer"
                                    value={
                                        form.reviewer
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "reviewer",
                                            value
                                        )
                                    }
                                    placeholder="Content reviewer"
                                />

                                <Field
                                    label="Source / Organisation"
                                    value={
                                        form.source
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "source",
                                            value
                                        )
                                    }
                                    placeholder="Source organisation"
                                />

                                <Field
                                    label="Last Updated"
                                    type="date"
                                    value={
                                        form.lastUpdated
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "lastUpdated",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Disclaimer */}
                        <FormCard
                            title="Disclaimer"
                            description="Optional public disclaimer displayed with the downloadable document."
                        >
                            <TextAreaField
                                label="Disclaimer"
                                value={
                                    form.disclaimer
                                }
                                onChange={(value) =>
                                    updateField(
                                        "disclaimer",
                                        value
                                    )
                                }
                                placeholder="Add any relevant disclaimer..."
                                rows={5}
                            />
                        </FormCard>

                        {/* Internal Notes */}
                        <FormCard
                            title="Internal Notes"
                            description="Administrative notes that are not visible to website visitors."
                        >
                            <TextAreaField
                                label="Internal Notes"
                                value={
                                    form.internalNotes
                                }
                                onChange={(value) =>
                                    updateField(
                                        "internalNotes",
                                        value
                                    )
                                }
                                placeholder="Add internal notes..."
                                rows={5}
                            />
                        </FormCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Publishing */}
                        <FormCard
                            title="Publishing"
                            description="Control document status and visibility."
                        >
                            <div className="space-y-5">
                                <SelectField
                                    label="Status"
                                    required
                                    value={
                                        form.status
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "status",
                                            value
                                        )
                                    }
                                    options={[
                                        "Draft",
                                        "In Review",
                                        "Published",
                                    ]}
                                />

                                <ToggleRow
                                    label="Featured Document"
                                    description="Highlight this document in featured download sections."
                                    checked={
                                        form.featured
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "featured",
                                            value
                                        )
                                    }
                                />

                                <ToggleRow
                                    label="Published"
                                    description="Make this document visible on the public website."
                                    checked={
                                        form.published
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "published",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Website Placement */}
                        <FormCard
                            title="Website Placement"
                            description="Choose where this document should appear."
                        >
                            <div className="space-y-5">
                                <ToggleRow
                                    label="Downloads Page"
                                    description="Show this document in the main download library."
                                    checked={
                                        form.showOnDownloads
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "showOnDownloads",
                                            value
                                        )
                                    }
                                />

                                <ToggleRow
                                    label="Resources Page"
                                    description="Also make this document available through Resources."
                                    checked={
                                        form.showOnResources
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "showOnResources",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Public Access */}
                        <FormCard
                            title="Public Access"
                            description="Configure how visitors interact with the document."
                        >
                            <div className="space-y-5">
                                <ToggleRow
                                    label="Allow Download"
                                    description="Allow visitors to download the file."
                                    checked={
                                        form.allowPublicDownload
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "allowPublicDownload",
                                            value
                                        )
                                    }
                                />

                                <ToggleRow
                                    label="Acknowledgement"
                                    description="Require an acknowledgement before download."
                                    checked={
                                        form.requireAcknowledgement
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "requireAcknowledgement",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Checklist */}
                        <FormCard
                            title="Publishing Checklist"
                            description="Review the document before making it public."
                        >
                            <div className="space-y-3">
                                <ChecklistItem
                                    label="Document title added"
                                    checked={Boolean(
                                        form.title
                                    )}
                                />

                                <ChecklistItem
                                    label="Description added"
                                    checked={Boolean(
                                        form.description
                                    )}
                                />

                                <ChecklistItem
                                    label="Category selected"
                                    checked={Boolean(
                                        form.category
                                    )}
                                />

                                <ChecklistItem
                                    label="Document file selected"
                                    checked={isEditMode}
                                />

                                <ChecklistItem
                                    label="Language selected"
                                    checked={Boolean(
                                        form.language
                                    )}
                                />

                                <ChecklistItem
                                    label="Version recorded"
                                    checked={Boolean(
                                        form.version
                                    )}
                                />

                                <ChecklistItem
                                    label="Reviewer recorded"
                                    checked={Boolean(
                                        form.reviewer
                                    )}
                                />
                            </div>
                        </FormCard>

                        {/* UI Notice */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-green-950">
                                        UI preview mode
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-green-900/70">
                                        File uploads, download tracking
                                        and publishing changes are
                                        currently UI-only. Backend
                                        integration will be added later.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="sticky bottom-4 z-20 rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-gray-900/10">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/content/downloads"
                            className="text-sm font-semibold text-gray-500 transition hover:text-gray-800"
                        >
                            Cancel
                        </Link>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                    handleSave(
                                        "Draft"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />
                                Save Draft
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                    handleSave(
                                        "In Review"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-60"
                            >
                                <FileCheck2 className="h-4 w-4" />
                                Submit for Review
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                    handleSave(
                                        "Published"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:opacity-60"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                {saving
                                    ? "Saving..."
                                    : "Publish Download"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const FormCard = ({
    title,
    description,
    children,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <h2 className="text-base font-bold text-gray-900">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500">
                        {description}
                    </p>
                )}
            </div>

            <div className="p-5 sm:p-6">
                {children}
            </div>
        </div>
    )
}

const Field = ({
    label,
    required = false,
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
}) => {
    return (
        <div className={className}>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
            />
        </div>
    )
}

const TextAreaField = ({
    label,
    required = false,
    value,
    onChange,
    placeholder,
    rows = 5,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <textarea
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
            />
        </div>
    )
}

const SelectField = ({
    label,
    required = false,
    value,
    onChange,
    options,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

const ToggleRow = ({
    label,
    description,
    checked,
    onChange,
}) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <p className="text-sm font-semibold text-gray-800">
                    {label}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    checked
                        ? "bg-green-700"
                        : "bg-gray-300"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        checked
                            ? "left-6"
                            : "left-1"
                    }`}
                />
            </button>
        </div>
    )
}

const ChecklistItem = ({
    label,
    checked,
}) => {
    return (
        <div className="flex items-center gap-3">
            <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    checked
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                }`}
            >
                <CheckCircle2 className="h-3.5 w-3.5" />
            </div>

            <span
                className={`text-xs font-medium ${
                    checked
                        ? "text-gray-700"
                        : "text-gray-400"
                }`}
            >
                {label}
            </span>
        </div>
    )
}

export default DownloadEditor