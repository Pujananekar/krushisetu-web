import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    FileCheck2,
    Globe2,
    Plus,
    Save,
    ShieldCheck,
    Trash2,
    Upload,
} from "lucide-react"

const PartnerEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = Boolean(id)

    const [form, setForm] = useState({
        name: isEditMode
            ? "Maharashtra Rural Development Network"
            : "",
        shortName: isEditMode ? "MRDN" : "",
        slug: isEditMode
            ? "maharashtra-rural-development-network"
            : "",
        type: isEditMode
            ? "Government"
            : "NGO",
        category: isEditMode
            ? "Institutional"
            : "Development Partner",
        location: isEditMode
            ? "Maharashtra"
            : "",
        website: isEditMode
            ? "https://example.com"
            : "",
        email: isEditMode
            ? "partnerships@example.com"
            : "",
        phone: isEditMode
            ? "+91 00000 00000"
            : "",
        shortDescription: isEditMode
            ? "Institutional collaboration supporting rural development programmes."
            : "",
        description: isEditMode
            ? "This partner supports Krushisetu through institutional collaboration, programme coordination and rural development initiatives."
            : "",
        partnershipScope: isEditMode
            ? "Programme implementation, institutional coordination and community development."
            : "",
        websiteLabel: isEditMode
            ? "Visit Partner Website"
            : "",
        logoAlt: isEditMode
            ? "Maharashtra Rural Development Network logo"
            : "",
        status: isEditMode
            ? "Published"
            : "Draft",
        language: "English",
        featured: isEditMode,
        published: isEditMode,
        showOnPartners: true,
        showOnHome: false,
        displayOrder: isEditMode ? "1" : "",
    })

    const [focusAreas, setFocusAreas] = useState(
        isEditMode
            ? [
                  "Rural Development",
                  "Community Programmes",
                  "Institutional Collaboration",
              ]
            : [""]
    )

    const [partnershipBenefits, setPartnershipBenefits] =
        useState(
            isEditMode
                ? [
                      "Programme coordination",
                      "Knowledge sharing",
                      "Community outreach",
                  ]
                : [""]
        )

    const [saving, setSaving] = useState(false)

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))
    }

    const updateArrayItem = (
        setter,
        index,
        value
    ) => {
        setter((previous) =>
            previous.map((item, itemIndex) =>
                itemIndex === index
                    ? value
                    : item
            )
        )
    }

    const addArrayItem = (setter) => {
        setter((previous) => [
            ...previous,
            "",
        ])
    }

    const removeArrayItem = (
        setter,
        index
    ) => {
        setter((previous) =>
            previous.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            )
        )
    }

    const handleSave = (nextStatus = form.status) => {
        setSaving(true)

        setTimeout(() => {
            setSaving(false)

            setForm((previous) => ({
                ...previous,
                status: nextStatus,
                published:
                    nextStatus === "Published",
            }))

            navigate("/admin/content/partners")
        }, 500)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/partners"
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
                                    Partners
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
                                    ? "Edit Partner"
                                    : "Add Partner"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage partner organisation information,
                                collaboration details and website
                                visibility.
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

                    {/* Main content */}
                    <div className="space-y-6">

                        {/* Organisation information */}
                        <FormCard
                            title="Organisation Information"
                            description="Basic information about the partner organisation."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Organisation Name"
                                    required
                                    value={form.name}
                                    onChange={(value) =>
                                        updateField(
                                            "name",
                                            value
                                        )
                                    }
                                    placeholder="Partner organisation name"
                                    className="md:col-span-2"
                                />

                                <Field
                                    label="Short Name / Acronym"
                                    value={
                                        form.shortName
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "shortName",
                                            value
                                        )
                                    }
                                    placeholder="e.g. MRDN"
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
                                    placeholder="partner-organisation"
                                />

                                <SelectField
                                    label="Organisation Type"
                                    required
                                    value={form.type}
                                    onChange={(value) =>
                                        updateField(
                                            "type",
                                            value
                                        )
                                    }
                                    options={[
                                        "Government",
                                        "NGO",
                                        "Industry",
                                        "Training Institution",
                                        "Research Institution",
                                        "Financial Institution",
                                        "Community Organisation",
                                        "Other",
                                    ]}
                                />

                                <SelectField
                                    label="Partnership Category"
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
                                        "Institutional",
                                        "Development Partner",
                                        "Training Partner",
                                        "Finance Partner",
                                        "Technical Partner",
                                        "Enterprise Partner",
                                        "Community Partner",
                                        "Knowledge Partner",
                                        "Other",
                                    ]}
                                />

                                <Field
                                    label="Location"
                                    value={form.location}
                                    onChange={(value) =>
                                        updateField(
                                            "location",
                                            value
                                        )
                                    }
                                    placeholder="City / State"
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

                        {/* Logo */}
                        <FormCard
                            title="Partner Logo"
                            description="Upload the organisation logo used in partner sections."
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-green-50 text-green-700">
                                    <Building2 className="h-12 w-12" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Organisation logo
                                    </h3>

                                    <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                                        Use a clear organisation logo with
                                        sufficient contrast and appropriate
                                        resolution.
                                    </p>

                                    <button
                                        type="button"
                                        className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Choose Logo
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5">
                                <Field
                                    label="Logo Alt Text"
                                    required
                                    value={
                                        form.logoAlt
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "logoAlt",
                                            value
                                        )
                                    }
                                    placeholder="Describe the organisation logo"
                                />
                            </div>
                        </FormCard>

                        {/* Description */}
                        <FormCard
                            title="Partner Description"
                            description="Content shown on the partner directory and partner detail page."
                        >
                            <div className="space-y-5">
                                <TextAreaField
                                    label="Short Description"
                                    required
                                    value={
                                        form.shortDescription
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "shortDescription",
                                            value
                                        )
                                    }
                                    placeholder="Short introduction to the partner..."
                                    rows={4}
                                />

                                <TextAreaField
                                    label="Full Description"
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
                                    placeholder="Detailed partner description..."
                                    rows={7}
                                />

                                <TextAreaField
                                    label="Partnership Scope"
                                    value={
                                        form.partnershipScope
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "partnershipScope",
                                            value
                                        )
                                    }
                                    placeholder="Describe the scope of collaboration..."
                                    rows={5}
                                />
                            </div>
                        </FormCard>

                        {/* Focus areas */}
                        <FormCard
                            title="Focus Areas"
                            description="Areas where this partner contributes or collaborates with Krushisetu."
                        >
                            <DynamicList
                                items={focusAreas}
                                setter={setFocusAreas}
                                placeholder="Enter a focus area"
                                updateArrayItem={
                                    updateArrayItem
                                }
                                addArrayItem={
                                    addArrayItem
                                }
                                removeArrayItem={
                                    removeArrayItem
                                }
                            />
                        </FormCard>

                        {/* Partnership benefits */}
                        <FormCard
                            title="Partnership Contributions"
                            description="Key contributions, resources or benefits associated with the collaboration."
                        >
                            <DynamicList
                                items={
                                    partnershipBenefits
                                }
                                setter={
                                    setPartnershipBenefits
                                }
                                placeholder="Enter a contribution"
                                updateArrayItem={
                                    updateArrayItem
                                }
                                addArrayItem={
                                    addArrayItem
                                }
                                removeArrayItem={
                                    removeArrayItem
                                }
                            />
                        </FormCard>

                        {/* Contact */}
                        <FormCard
                            title="Contact & Website"
                            description="Public contact and website information for the partner."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Website URL"
                                    value={
                                        form.website
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "website",
                                            value
                                        )
                                    }
                                    placeholder="https://example.com"
                                />

                                <Field
                                    label="Website Button Label"
                                    value={
                                        form.websiteLabel
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "websiteLabel",
                                            value
                                        )
                                    }
                                    placeholder="Visit Partner Website"
                                />

                                <Field
                                    label="Email"
                                    value={form.email}
                                    onChange={(value) =>
                                        updateField(
                                            "email",
                                            value
                                        )
                                    }
                                    placeholder="partnership@example.com"
                                />

                                <Field
                                    label="Phone"
                                    value={form.phone}
                                    onChange={(value) =>
                                        updateField(
                                            "phone",
                                            value
                                        )
                                    }
                                    placeholder="+91"
                                />
                            </div>
                        </FormCard>

                        {/* SEO */}
                        <FormCard
                            title="SEO"
                            description="Search engine metadata for the public partner profile."
                        >
                            <div className="space-y-5">
                                <Field
                                    label="Meta Title"
                                    value={`${form.name || "Partner"} | Krushisetu`}
                                    onChange={() => {}}
                                    placeholder="SEO title"
                                />

                                <TextAreaField
                                    label="Meta Description"
                                    value={
                                        form.shortDescription
                                    }
                                    onChange={() => {}}
                                    placeholder="SEO description"
                                    rows={4}
                                />
                            </div>
                        </FormCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Publishing */}
                        <FormCard
                            title="Publishing"
                            description="Control the workflow and public visibility."
                        >
                            <div className="space-y-5">
                                <SelectField
                                    label="Status"
                                    required
                                    value={form.status}
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

                                <ToggleRow
                                    label="Featured Partner"
                                    description="Show this partner in featured partnership sections."
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
                                    description="Make this partner publicly visible."
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

                        {/* Website placement */}
                        <FormCard
                            title="Website Placement"
                            description="Choose where the partner profile should appear."
                        >
                            <div className="space-y-5">
                                <ToggleRow
                                    label="Partners Page"
                                    description="Show this partner in the main partner directory."
                                    checked={
                                        form.showOnPartners
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "showOnPartners",
                                            value
                                        )
                                    }
                                />

                                <ToggleRow
                                    label="Home Page"
                                    description="Show this partner in the homepage partner section."
                                    checked={
                                        form.showOnHome
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "showOnHome",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Checklist */}
                        <FormCard
                            title="Publishing Checklist"
                            description="Review partner information before publishing."
                        >
                            <div className="space-y-3">
                                <ChecklistItem
                                    label="Organisation name added"
                                    checked={Boolean(
                                        form.name
                                    )}
                                />

                                <ChecklistItem
                                    label="Organisation type selected"
                                    checked={Boolean(
                                        form.type
                                    )}
                                />

                                <ChecklistItem
                                    label="Category selected"
                                    checked={Boolean(
                                        form.category
                                    )}
                                />

                                <ChecklistItem
                                    label="Description added"
                                    checked={Boolean(
                                        form.description
                                    )}
                                />

                                <ChecklistItem
                                    label="Logo selected"
                                    checked={isEditMode}
                                />

                                <ChecklistItem
                                    label="Logo alt text added"
                                    checked={Boolean(
                                        form.logoAlt
                                    )}
                                />

                                <ChecklistItem
                                    label="Website information added"
                                    checked={Boolean(
                                        form.website
                                    )}
                                />
                            </div>
                        </FormCard>

                        {/* UI notice */}
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
                                        Partner data, logo uploads and
                                        publishing changes are currently
                                        UI-only and will be connected to
                                        the backend later.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom actions */}
                <div className="sticky bottom-4 z-20 rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-gray-900/10">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/content/partners"
                            className="text-sm font-semibold text-gray-500 transition hover:text-gray-800"
                        >
                            Cancel
                        </Link>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                    handleSave("Draft")
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
                                    : "Publish Partner"}
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

const DynamicList = ({
    items,
    setter,
    placeholder,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
}) => {
    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-green-700">
                        {index + 1}
                    </div>

                    <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                            updateArrayItem(
                                setter,
                                index,
                                e.target.value
                            )
                        }
                        placeholder={placeholder}
                        className="h-11 min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                    />

                    {items.length > 1 && (
                        <button
                            type="button"
                            onClick={() =>
                                removeArrayItem(
                                    setter,
                                    index
                                )
                            }
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={() =>
                    addArrayItem(setter)
                }
                className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-green-200 bg-green-50/50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
                <Plus className="h-4 w-4" />
                Add Item
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

export default PartnerEditor