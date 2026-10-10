import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    BriefcaseBusiness,
    CheckCircle2,
    FileCheck2,
    Image,
    Plus,
    Save,
    ShieldCheck,
    Trash2,
    Upload,
    UserRound,
} from "lucide-react"

const TeamEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = Boolean(id)

    const [form, setForm] = useState({
        name: isEditMode
            ? "Founder & Director"
            : "",
        slug: isEditMode
            ? "founder-director"
            : "",
        displayName: isEditMode
            ? "Founder & Director"
            : "",
        role: isEditMode
            ? "Founder"
            : "",
        type: isEditMode
            ? "Founder"
            : "Team Member",
        department: isEditMode
            ? "Leadership"
            : "",
        location: isEditMode
            ? "Maharashtra"
            : "",
        shortBio: isEditMode
            ? "Leading Krushisetu's vision and long-term development initiatives."
            : "",
        biography: isEditMode
            ? "The founder provides strategic direction to the organisation and works closely with communities, programmes and partners to support sustainable rural development."
            : "",
        email: isEditMode
            ? "contact@krushisetu.org"
            : "",
        phone: isEditMode
            ? "+91 00000 00000"
            : "",
        linkedin: isEditMode
            ? "https://linkedin.com/"
            : "",
        photoAlt: isEditMode
            ? "Krushisetu Founder and Director"
            : "",
        status: isEditMode
            ? "Published"
            : "Draft",
        language: "English",
        featured: isEditMode,
        published: isEditMode,
        showOnAbout: true,
        showOnContact: false,
        displayOrder: isEditMode ? "1" : "",
    })

    const [saving, setSaving] = useState(false)

    const [responsibilities, setResponsibilities] = useState(
        isEditMode
            ? [
                  "Provide strategic direction",
                  "Support programme development",
                  "Build institutional partnerships",
              ]
            : [""]
    )

    const [expertise, setExpertise] = useState(
        isEditMode
            ? [
                  "Rural Development",
                  "Community Development",
                  "Programme Strategy",
              ]
            : [""]
    )

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

            navigate("/admin/content/team")
        }, 500)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/team"
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
                                    Team & Founder
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
                                    ? "Edit Team Profile"
                                    : "Add Team Member"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Manage profile information,
                                biography, responsibilities and
                                publishing settings.
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

                        {/* Basic information */}
                        <FormCard
                            title="Profile Information"
                            description="Basic information displayed on the team or founder profile."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Name"
                                    required
                                    value={form.name}
                                    onChange={(value) =>
                                        updateField(
                                            "name",
                                            value
                                        )
                                    }
                                    placeholder="Full name"
                                />

                                <Field
                                    label="Display Name"
                                    required
                                    value={
                                        form.displayName
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "displayName",
                                            value
                                        )
                                    }
                                    placeholder="Public display name"
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
                                    placeholder="profile-slug"
                                />

                                <Field
                                    label="Role / Designation"
                                    required
                                    value={form.role}
                                    onChange={(value) =>
                                        updateField(
                                            "role",
                                            value
                                        )
                                    }
                                    placeholder="e.g. Founder & Director"
                                />

                                <SelectField
                                    label="Profile Type"
                                    required
                                    value={form.type}
                                    onChange={(value) =>
                                        updateField(
                                            "type",
                                            value
                                        )
                                    }
                                    options={[
                                        "Founder",
                                        "Leadership",
                                        "Team Member",
                                    ]}
                                />

                                <Field
                                    label="Department / Programme"
                                    value={
                                        form.department
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "department",
                                            value
                                        )
                                    }
                                    placeholder="Department"
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
                                    placeholder="Maharashtra"
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

                                <TextAreaField
                                    label="Short Bio"
                                    required
                                    value={form.shortBio}
                                    onChange={(value) =>
                                        updateField(
                                            "shortBio",
                                            value
                                        )
                                    }
                                    placeholder="Short introduction..."
                                    rows={4}
                                    className="md:col-span-2"
                                />

                                <TextAreaField
                                    label="Biography"
                                    required
                                    value={form.biography}
                                    onChange={(value) =>
                                        updateField(
                                            "biography",
                                            value
                                        )
                                    }
                                    placeholder="Detailed biography..."
                                    rows={7}
                                    className="md:col-span-2"
                                />
                            </div>
                        </FormCard>

                        {/* Profile image */}
                        <FormCard
                            title="Profile Photo"
                            description="Upload the profile image used across public team sections."
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-green-50 text-green-700">
                                    <UserRound className="h-12 w-12" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Profile image
                                    </h3>

                                    <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500">
                                        Use a clear professional photograph.
                                        Actual file upload will be connected
                                        during backend integration.
                                    </p>

                                    <button
                                        type="button"
                                        className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Choose Photo
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5">
                                <Field
                                    label="Photo Alt Text"
                                    required
                                    value={form.photoAlt}
                                    onChange={(value) =>
                                        updateField(
                                            "photoAlt",
                                            value
                                        )
                                    }
                                    placeholder="Describe the person in the photograph"
                                />
                            </div>
                        </FormCard>

                        {/* Responsibilities */}
                        <FormCard
                            title="Responsibilities"
                            description="Key responsibilities shown on the public profile."
                        >
                            <DynamicList
                                items={responsibilities}
                                setter={setResponsibilities}
                                placeholder="Enter a responsibility"
                                updateArrayItem={updateArrayItem}
                                addArrayItem={addArrayItem}
                                removeArrayItem={
                                    removeArrayItem
                                }
                            />
                        </FormCard>

                        {/* Expertise */}
                        <FormCard
                            title="Areas of Expertise"
                            description="Skills, focus areas or professional expertise associated with the profile."
                        >
                            <DynamicList
                                items={expertise}
                                setter={setExpertise}
                                placeholder="Enter an area of expertise"
                                updateArrayItem={updateArrayItem}
                                addArrayItem={addArrayItem}
                                removeArrayItem={
                                    removeArrayItem
                                }
                            />
                        </FormCard>

                        {/* Contact */}
                        <FormCard
                            title="Contact & Social Information"
                            description="Optional contact information and professional social profiles."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Email"
                                    value={form.email}
                                    onChange={(value) =>
                                        updateField(
                                            "email",
                                            value
                                        )
                                    }
                                    placeholder="name@example.com"
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

                                <Field
                                    label="LinkedIn URL"
                                    value={form.linkedin}
                                    onChange={(value) =>
                                        updateField(
                                            "linkedin",
                                            value
                                        )
                                    }
                                    placeholder="https://linkedin.com/in/..."
                                    className="md:col-span-2"
                                />
                            </div>
                        </FormCard>

                        {/* SEO */}
                        <FormCard
                            title="SEO"
                            description="Search engine metadata for the public profile page."
                        >
                            <div className="space-y-5">
                                <Field
                                    label="Meta Title"
                                    value={`${form.displayName || "Team Profile"} | Krushisetu`}
                                    onChange={() => {}}
                                    placeholder="SEO title"
                                />

                                <TextAreaField
                                    label="Meta Description"
                                    value={
                                        form.shortBio
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
                            description="Control the visibility and workflow state of this profile."
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
                                    value={form.language}
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
                                    label="Featured Profile"
                                    description="Show this profile in featured team sections."
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
                                    description="Make this profile publicly visible."
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

                        {/* Placement */}
                        <FormCard
                            title="Website Placement"
                            description="Choose where this profile should appear."
                        >
                            <div className="space-y-5">
                                <ToggleRow
                                    label="About Page"
                                    description="Show profile on the organisation About page."
                                    checked={
                                        form.showOnAbout
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "showOnAbout",
                                            value
                                        )
                                    }
                                />

                                <ToggleRow
                                    label="Contact Page"
                                    description="Show profile in relevant contact sections."
                                    checked={
                                        form.showOnContact
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "showOnContact",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Profile checklist */}
                        <FormCard
                            title="Profile Checklist"
                            description="Review the profile before publishing."
                        >
                            <div className="space-y-3">
                                <ChecklistItem
                                    label="Name added"
                                    checked={Boolean(
                                        form.name
                                    )}
                                />

                                <ChecklistItem
                                    label="Role added"
                                    checked={Boolean(
                                        form.role
                                    )}
                                />

                                <ChecklistItem
                                    label="Biography added"
                                    checked={Boolean(
                                        form.biography
                                    )}
                                />

                                <ChecklistItem
                                    label="Profile photo selected"
                                    checked={isEditMode}
                                />

                                <ChecklistItem
                                    label="Alt text added"
                                    checked={Boolean(
                                        form.photoAlt
                                    )}
                                />

                                <ChecklistItem
                                    label="Display order configured"
                                    checked={Boolean(
                                        form.displayOrder
                                    )}
                                />
                            </div>
                        </FormCard>

                        {/* Notice */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-green-950">
                                        Content workflow
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-green-900/70">
                                        Profile changes are currently
                                        UI-only. Review, publishing and
                                        media storage will be connected
                                        later.
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
                            to="/admin/content/team"
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
                                    handleSave("In Review")
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
                                    handleSave("Published")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:opacity-60"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                {saving
                                    ? "Saving..."
                                    : "Publish Profile"}
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

export default TeamEditor