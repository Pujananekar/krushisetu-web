import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    FileCheck2,
    HelpCircle,
    Plus,
    Save,
    ShieldCheck,
    Trash2,
} from "lucide-react"

const FAQEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = Boolean(id)

    const [form, setForm] = useState({
        question: isEditMode
            ? "How can I apply for a government scheme?"
            : "",
        slug: isEditMode
            ? "how-can-i-apply-for-a-government-scheme"
            : "",
        answer: isEditMode
            ? "You can explore eligible schemes on the Schemes section and follow the application steps provided for each scheme."
            : "",
        category: isEditMode
            ? "Schemes"
            : "General",
        audience: isEditMode
            ? "Farmers"
            : "All Visitors",
        language: "English",
        status: isEditMode
            ? "Published"
            : "Draft",
        featured: isEditMode,
        published: isEditMode,
        displayOrder: isEditMode
            ? "2"
            : "",
        tags: isEditMode
            ? "schemes, applications, farmers"
            : "",
        internalNotes: "",
    })

    const [relatedQuestions, setRelatedQuestions] =
        useState(
            isEditMode
                ? [
                      "What documents may be required for scheme applications?",
                      "Where can I find government schemes?",
                  ]
                : [""]
        )

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

    const updateRelatedQuestion = (
        index,
        value
    ) => {
        setRelatedQuestions((previous) =>
            previous.map((item, itemIndex) =>
                itemIndex === index
                    ? value
                    : item
            )
        )
    }

    const addRelatedQuestion = () => {
        setRelatedQuestions((previous) => [
            ...previous,
            "",
        ])
    }

    const removeRelatedQuestion = (
        index
    ) => {
        setRelatedQuestions((previous) =>
            previous.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            )
        )
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

            navigate("/admin/content/faqs")
        }, 500)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/faqs"
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
                                    FAQs
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
                                    ? "Edit FAQ"
                                    : "Add FAQ"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Create a clear and useful frequently asked
                                question for the Krushisetu website.
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

                        {/* Question */}
                        <FormCard
                            title="Question & Answer"
                            description="Write the question exactly as a visitor is likely to ask it and provide a concise, useful answer."
                        >
                            <div className="space-y-5">
                                <Field
                                    label="Question"
                                    required
                                    value={
                                        form.question
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "question",
                                            value
                                        )
                                    }
                                    placeholder="Enter the frequently asked question..."
                                />

                                <Field
                                    label="Slug"
                                    required
                                    value={
                                        form.slug
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "slug",
                                            value
                                        )
                                    }
                                    placeholder="frequently-asked-question"
                                />

                                <TextAreaField
                                    label="Answer"
                                    required
                                    value={
                                        form.answer
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "answer",
                                            value
                                        )
                                    }
                                    placeholder="Write the answer..."
                                    rows={9}
                                />
                            </div>
                        </FormCard>

                        {/* Classification */}
                        <FormCard
                            title="Classification"
                            description="Organise the FAQ so visitors and administrators can find the correct information easily."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                                        "General",
                                        "Schemes",
                                        "Training",
                                        "Resources",
                                        "Applications",
                                        "Partnerships",
                                        "FPO",
                                        "Projects",
                                        "Services",
                                        "Contact",
                                    ]}
                                />

                                <SelectField
                                    label="Audience"
                                    required
                                    value={
                                        form.audience
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "audience",
                                            value
                                        )
                                    }
                                    options={[
                                        "All Visitors",
                                        "Farmers",
                                        "Students",
                                        "Participants",
                                        "FPOs",
                                        "Organisations",
                                        "Partners",
                                        "Community",
                                        "Staff",
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
                                    label="Display Order"
                                    value={
                                        form.displayOrder
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "displayOrder",
                                            value
                                        )
                                    }
                                    placeholder="1"
                                />
                            </div>
                        </FormCard>

                        {/* Related Questions */}
                        <FormCard
                            title="Related Questions"
                            description="Optional questions that can be displayed alongside this FAQ."
                        >
                            <div className="space-y-3">
                                {relatedQuestions.map(
                                    (
                                        question,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-green-700">
                                                {index +
                                                    1}
                                            </div>

                                            <input
                                                type="text"
                                                value={
                                                    question
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateRelatedQuestion(
                                                        index,
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                                placeholder="Enter related question"
                                                className="h-11 min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                            />

                                            {relatedQuestions.length >
                                                1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRelatedQuestion(
                                                            index
                                                        )
                                                    }
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    )
                                )}

                                <button
                                    type="button"
                                    onClick={
                                        addRelatedQuestion
                                    }
                                    className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-green-200 bg-green-50/50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Related Question
                                </button>
                            </div>
                        </FormCard>

                        {/* Tags */}
                        <FormCard
                            title="Search & Tags"
                            description="Add keywords that can help administrators locate this FAQ."
                        >
                            <Field
                                label="Tags"
                                value={
                                    form.tags
                                }
                                onChange={(value) =>
                                    updateField(
                                        "tags",
                                        value
                                    )
                                }
                                placeholder="schemes, farmers, application"
                            />
                        </FormCard>

                        {/* Internal Notes */}
                        <FormCard
                            title="Internal Notes"
                            description="Notes for administrators and reviewers. These are not displayed publicly."
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
                                placeholder="Add internal notes for reviewers..."
                                rows={5}
                            />
                        </FormCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Publishing */}
                        <FormCard
                            title="Publishing"
                            description="Control FAQ status and public visibility."
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
                                    label="Featured FAQ"
                                    description="Highlight this question in featured FAQ sections."
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
                                    description="Make this FAQ visible on the public website."
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

                        {/* Content Checklist */}
                        <FormCard
                            title="Content Checklist"
                            description="Review the FAQ before publishing."
                        >
                            <div className="space-y-3">
                                <ChecklistItem
                                    label="Question added"
                                    checked={Boolean(
                                        form.question
                                    )}
                                />

                                <ChecklistItem
                                    label="Answer added"
                                    checked={Boolean(
                                        form.answer
                                    )}
                                />

                                <ChecklistItem
                                    label="Category selected"
                                    checked={Boolean(
                                        form.category
                                    )}
                                />

                                <ChecklistItem
                                    label="Audience selected"
                                    checked={Boolean(
                                        form.audience
                                    )}
                                />

                                <ChecklistItem
                                    label="Language selected"
                                    checked={Boolean(
                                        form.language
                                    )}
                                />

                                <ChecklistItem
                                    label="Slug added"
                                    checked={Boolean(
                                        form.slug
                                    )}
                                />
                            </div>
                        </FormCard>

                        {/* Quality Guidelines */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <HelpCircle className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-green-950">
                                        FAQ quality
                                    </h3>

                                    <ul className="mt-2 space-y-2 text-xs leading-5 text-green-900/70">
                                        <li>
                                            • Keep the question
                                            specific.
                                        </li>

                                        <li>
                                            • Give a direct and
                                            easy-to-understand answer.
                                        </li>

                                        <li>
                                            • Avoid outdated scheme or
                                            programme information.
                                        </li>

                                        <li>
                                            • Review public links and
                                            contact information before
                                            publishing.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* UI Notice */}
                        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        UI preview mode
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        FAQ changes are currently
                                        UI-only. Backend persistence,
                                        publishing and audit logging will
                                        be connected later.
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
                            to="/admin/content/faqs"
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
                                    : "Publish FAQ"}
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

            <input
                type="text"
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

export default FAQEditor