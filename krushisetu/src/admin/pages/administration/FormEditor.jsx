import { useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowDown,
    ArrowLeft,
    ArrowUp,
    Bell,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronDown,
    Copy,
    FileText,
    GripVertical,
    Mail,
    Plus,
    Save,
    Settings2,
    ShieldCheck,
    Trash2,
    X,
} from "lucide-react"

const formsData = [
    {
        id: 1,
        name: "Farmer Application Form",
        slug: "farmer-application",
        description:
            "Public form used by farmers to submit programme and service applications.",
        category: "Applications",
        status: "Published",
        openDate: "2026-01-01",
        closeDate: "2026-12-31",
        consent: true,
        consentText:
            "I consent to Krushisetu using the information provided for processing this application.",
        confirmationMessage:
            "Thank you. Your application has been received successfully.",
        notificationEnabled: true,
        notificationRecipients: "admin@krushisetu.org",
        fields: [
            {
                id: 1,
                label: "Full Name",
                type: "text",
                required: true,
                placeholder: "Enter your full name",
            },
            {
                id: 2,
                label: "Email Address",
                type: "email",
                required: true,
                placeholder: "Enter your email address",
            },
            {
                id: 3,
                label: "Phone Number",
                type: "phone",
                required: true,
                placeholder: "Enter your phone number",
            },
            {
                id: 4,
                label: "Location",
                type: "text",
                required: true,
                placeholder: "Village / District",
            },
            {
                id: 5,
                label: "Programme",
                type: "select",
                required: true,
                placeholder: "Select programme",
                options: [
                    "Farmer Support",
                    "Training",
                    "Agriculture Services",
                ],
            },
            {
                id: 6,
                label: "Message",
                type: "textarea",
                required: false,
                placeholder: "Tell us about your requirement",
            },
        ],
    },
    {
        id: 2,
        name: "Training Registration Form",
        slug: "training-registration",
        description:
            "Registration form for upcoming Krushisetu training programmes and events.",
        category: "Training",
        status: "Published",
        openDate: "2026-01-01",
        closeDate: "2026-12-31",
        consent: true,
        consentText:
            "I consent to Krushisetu using the information provided for training registration.",
        confirmationMessage:
            "Your training registration has been submitted successfully.",
        notificationEnabled: true,
        notificationRecipients: "training@krushisetu.org",
        fields: [
            {
                id: 1,
                label: "Full Name",
                type: "text",
                required: true,
                placeholder: "Enter your full name",
            },
            {
                id: 2,
                label: "Email Address",
                type: "email",
                required: true,
                placeholder: "Enter your email address",
            },
            {
                id: 3,
                label: "Phone Number",
                type: "phone",
                required: true,
                placeholder: "Enter your phone number",
            },
            {
                id: 4,
                label: "Training Programme",
                type: "select",
                required: true,
                placeholder: "Select training programme",
                options: [
                    "Organic Farming",
                    "Digital Agriculture",
                    "Farm Business",
                ],
            },
        ],
    },
]

const fieldTypes = [
    {
        value: "text",
        label: "Short Text",
    },
    {
        value: "textarea",
        label: "Long Text",
    },
    {
        value: "email",
        label: "Email",
    },
    {
        value: "phone",
        label: "Phone",
    },
    {
        value: "number",
        label: "Number",
    },
    {
        value: "select",
        label: "Dropdown",
    },
    {
        value: "radio",
        label: "Radio",
    },
    {
        value: "checkbox",
        label: "Checkbox",
    },
    {
        value: "date",
        label: "Date",
    },
    {
        value: "file",
        label: "File Upload",
    },
]

const FormEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const isEdit = Boolean(id)

    const existingForm = useMemo(() => {
        if (!isEdit) return null

        return (
            formsData.find((form) => form.id === Number(id)) ||
            null
        )
    }, [id, isEdit])

    const [form, setForm] = useState(() => ({
        name: existingForm?.name || "",
        slug: existingForm?.slug || "",
        description: existingForm?.description || "",
        category: existingForm?.category || "Applications",
        status: existingForm?.status || "Draft",
        openDate: existingForm?.openDate || "",
        closeDate: existingForm?.closeDate || "",
        consent: existingForm?.consent ?? true,
        consentText:
            existingForm?.consentText ||
            "I consent to Krushisetu using the information provided for the stated purpose.",
        confirmationMessage:
            existingForm?.confirmationMessage ||
            "Thank you. Your submission has been received successfully.",
        notificationEnabled:
            existingForm?.notificationEnabled ?? true,
        notificationRecipients:
            existingForm?.notificationRecipients || "",
        fields: existingForm?.fields || [],
    }))

    const [errors, setErrors] = useState({})
    const [saved, setSaved] = useState(false)
    const [openField, setOpenField] = useState(
        existingForm?.fields?.[0]?.id || null,
    )

    const updateForm = (key, value) => {
        setForm((current) => ({
            ...current,
            [key]: value,
        }))

        setErrors((current) => ({
            ...current,
            [key]: "",
        }))

        setSaved(false)
    }

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
    }

    const handleNameChange = (value) => {
        setForm((current) => ({
            ...current,
            name: value,
            slug:
                !isEdit || !current.slug
                    ? generateSlug(value)
                    : current.slug,
        }))

        setErrors((current) => ({
            ...current,
            name: "",
        }))

        setSaved(false)
    }

    const addField = (type = "text") => {
        const newField = {
            id: Date.now(),
            label: "New Field",
            type,
            required: false,
            placeholder: "",
            options:
                type === "select" ||
                type === "radio" ||
                type === "checkbox"
                    ? ["Option 1", "Option 2"]
                    : [],
        }

        setForm((current) => ({
            ...current,
            fields: [...current.fields, newField],
        }))

        setOpenField(newField.id)
        setSaved(false)
    }

    const updateField = (fieldId, key, value) => {
        setForm((current) => ({
            ...current,
            fields: current.fields.map((field) =>
                field.id === fieldId
                    ? {
                          ...field,
                          [key]: value,
                      }
                    : field,
            ),
        }))

        setSaved(false)
    }

    const removeField = (fieldId) => {
        setForm((current) => ({
            ...current,
            fields: current.fields.filter(
                (field) => field.id !== fieldId,
            ),
        }))

        if (openField === fieldId) {
            setOpenField(null)
        }

        setSaved(false)
    }

    const duplicateField = (fieldId) => {
        const index = form.fields.findIndex(
            (field) => field.id === fieldId,
        )

        if (index === -1) return

        const original = form.fields[index]

        const duplicated = {
            ...original,
            id: Date.now(),
            label: `${original.label} Copy`,
            options: original.options
                ? [...original.options]
                : [],
        }

        setForm((current) => {
            const next = [...current.fields]

            next.splice(index + 1, 0, duplicated)

            return {
                ...current,
                fields: next,
            }
        })

        setOpenField(duplicated.id)
        setSaved(false)
    }

    const moveField = (fieldId, direction) => {
        const index = form.fields.findIndex(
            (field) => field.id === fieldId,
        )

        if (index === -1) return

        const newIndex =
            direction === "up" ? index - 1 : index + 1

        if (
            newIndex < 0 ||
            newIndex >= form.fields.length
        ) {
            return
        }

        setForm((current) => {
            const next = [...current.fields]

            const [moved] = next.splice(index, 1)

            next.splice(newIndex, 0, moved)

            return {
                ...current,
                fields: next,
            }
        })

        setSaved(false)
    }

    const addOption = (fieldId) => {
        setForm((current) => ({
            ...current,
            fields: current.fields.map((field) =>
                field.id === fieldId
                    ? {
                          ...field,
                          options: [
                              ...(field.options || []),
                              `Option ${
                                  (field.options?.length || 0) + 1
                              }`,
                          ],
                      }
                    : field,
            ),
        }))

        setSaved(false)
    }

    const updateOption = (
        fieldId,
        optionIndex,
        value,
    ) => {
        setForm((current) => ({
            ...current,
            fields: current.fields.map((field) =>
                field.id === fieldId
                    ? {
                          ...field,
                          options: field.options.map(
                              (option, index) =>
                                  index === optionIndex
                                      ? value
                                      : option,
                          ),
                      }
                    : field,
            ),
        }))

        setSaved(false)
    }

    const removeOption = (
        fieldId,
        optionIndex,
    ) => {
        setForm((current) => ({
            ...current,
            fields: current.fields.map((field) =>
                field.id === fieldId
                    ? {
                          ...field,
                          options: field.options.filter(
                              (_, index) =>
                                  index !== optionIndex,
                          ),
                      }
                    : field,
            ),
        }))

        setSaved(false)
    }

    const validate = () => {
        const nextErrors = {}

        if (!form.name.trim()) {
            nextErrors.name = "Form name is required."
        }

        if (!form.slug.trim()) {
            nextErrors.slug = "Slug is required."
        }

        if (!form.description.trim()) {
            nextErrors.description =
                "Description is required."
        }

        if (!form.openDate) {
            nextErrors.openDate =
                "Opening date is required."
        }

        if (!form.closeDate) {
            nextErrors.closeDate =
                "Closing date is required."
        }

        if (
            form.openDate &&
            form.closeDate &&
            form.closeDate < form.openDate
        ) {
            nextErrors.closeDate =
                "Closing date cannot be before opening date."
        }

        if (form.fields.length === 0) {
            nextErrors.fields =
                "Add at least one form field."
        }

        const invalidField = form.fields.find(
            (field) => !field.label.trim(),
        )

        if (invalidField) {
            nextErrors.fields =
                "Every form field must have a label."
        }

        if (
            form.notificationEnabled &&
            !form.notificationRecipients.trim()
        ) {
            nextErrors.notificationRecipients =
                "Add at least one notification recipient."
        }

        if (
            form.consent &&
            !form.consentText.trim()
        ) {
            nextErrors.consentText =
                "Consent text is required."
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    const handleSave = (publish = false) => {
        if (!validate()) return

        setSaved(true)

        setForm((current) => ({
            ...current,
            status: publish ? "Published" : "Draft",
        }))

        window.setTimeout(() => {
            navigate("/admin/administration/forms")
        }, 800)
    }

    if (isEdit && !existingForm) {
        return (
            <div className="min-h-screen bg-[#F6FAF7] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                        <FileText className="h-6 w-6" />
                    </div>

                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        Form not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        The requested form does not exist in the current
                        UI preview data.
                    </p>

                    <Link
                        to="/admin/administration/forms"
                        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Forms
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        to="/admin/administration/forms"
                        className="kr-hover-link mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Form Manager
                    </Link>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                                <Settings2 className="h-4 w-4" />
                                Administration
                                <span className="text-gray-400">/</span>
                                Form Manager
                                <span className="text-gray-400">/</span>
                                {isEdit ? "Edit" : "Create"}
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEdit
                                    ? "Edit Form"
                                    : "Create Form"}
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Configure form fields, validation, consent,
                                notifications and submission behaviour.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                                    form.status === "Published"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        form.status === "Published"
                                            ? "bg-green-600"
                                            : "bg-gray-400"
                                    }`}
                                />
                                {form.status}
                            </span>
                        </div>
                    </div>
                </div>

                {saved && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                        <CheckCircle2 className="h-5 w-5" />
                        Form {isEdit ? "updated" : "created"} successfully.
                    </div>
                )}

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
                    {/* Main */}
                    <div className="min-w-0 space-y-6">
                        {/* Basic details */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={FileText}
                                title="Basic Information"
                                description="Define the public identity and purpose of this form."
                            />

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    label="Form Name"
                                    value={form.name}
                                    onChange={handleNameChange}
                                    placeholder="e.g. Farmer Application Form"
                                    required
                                    error={errors.name}
                                />

                                <Field
                                    label="Slug"
                                    value={form.slug}
                                    onChange={(value) =>
                                        updateForm(
                                            "slug",
                                            generateSlug(value),
                                        )
                                    }
                                    placeholder="farmer-application"
                                    required
                                    error={errors.slug}
                                    prefix="/"
                                />

                                <div className="sm:col-span-2">
                                    <Field
                                        label="Description"
                                        value={form.description}
                                        onChange={(value) =>
                                            updateForm(
                                                "description",
                                                value,
                                            )
                                        }
                                        placeholder="Explain what this form is used for..."
                                        textarea
                                        rows={4}
                                        required
                                        error={
                                            errors.description
                                        }
                                    />
                                </div>

                                <SelectField
                                    label="Category"
                                    value={form.category}
                                    onChange={(value) =>
                                        updateForm(
                                            "category",
                                            value,
                                        )
                                    }
                                    options={[
                                        "Applications",
                                        "Training",
                                        "CRM",
                                        "Partnerships",
                                        "Website",
                                    ]}
                                />

                                <SelectField
                                    label="Status"
                                    value={form.status}
                                    onChange={(value) =>
                                        updateForm(
                                            "status",
                                            value,
                                        )
                                    }
                                    options={[
                                        "Draft",
                                        "Published",
                                    ]}
                                />
                            </div>
                        </section>

                        {/* Availability */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={CalendarDays}
                                title="Availability"
                                description="Control when the public can access and submit this form."
                            />

                            <div className="grid gap-5 sm:grid-cols-2">
                                <DateField
                                    label="Opening Date"
                                    value={form.openDate}
                                    onChange={(value) =>
                                        updateForm(
                                            "openDate",
                                            value,
                                        )
                                    }
                                    required
                                    error={errors.openDate}
                                />

                                <DateField
                                    label="Closing Date"
                                    value={form.closeDate}
                                    onChange={(value) =>
                                        updateForm(
                                            "closeDate",
                                            value,
                                        )
                                    }
                                    required
                                    error={errors.closeDate}
                                />
                            </div>
                        </section>

                        {/* Fields */}
                        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 p-5 sm:p-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <SectionHeader
                                        icon={Settings2}
                                        title="Form Fields"
                                        description="Add, reorder and configure the fields visitors will complete."
                                        noMargin
                                    />

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addField("text")
                                            }
                                            className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Field
                                        </button>
                                    </div>
                                </div>

                                {errors.fields && (
                                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
                                        <X className="h-4 w-4" />
                                        {errors.fields}
                                    </div>
                                )}
                            </div>

                            <div className="divide-y divide-gray-100">
                                {form.fields.length > 0 ? (
                                    form.fields.map(
                                        (field, index) => (
                                            <FieldBuilder
                                                key={field.id}
                                                field={field}
                                                index={index}
                                                total={
                                                    form.fields.length
                                                }
                                                open={
                                                    openField ===
                                                    field.id
                                                }
                                                onToggle={() =>
                                                    setOpenField(
                                                        openField ===
                                                            field.id
                                                            ? null
                                                            : field.id,
                                                    )
                                                }
                                                onUpdate={(
                                                    key,
                                                    value,
                                                ) =>
                                                    updateField(
                                                        field.id,
                                                        key,
                                                        value,
                                                    )
                                                }
                                                onRemove={() =>
                                                    removeField(
                                                        field.id,
                                                    )
                                                }
                                                onDuplicate={() =>
                                                    duplicateField(
                                                        field.id,
                                                    )
                                                }
                                                onMoveUp={() =>
                                                    moveField(
                                                        field.id,
                                                        "up",
                                                    )
                                                }
                                                onMoveDown={() =>
                                                    moveField(
                                                        field.id,
                                                        "down",
                                                    )
                                                }
                                                onAddOption={() =>
                                                    addOption(
                                                        field.id,
                                                    )
                                                }
                                                onUpdateOption={(
                                                    optionIndex,
                                                    value,
                                                ) =>
                                                    updateOption(
                                                        field.id,
                                                        optionIndex,
                                                        value,
                                                    )
                                                }
                                                onRemoveOption={(
                                                    optionIndex,
                                                ) =>
                                                    removeOption(
                                                        field.id,
                                                        optionIndex,
                                                    )
                                                }
                                            />
                                        ),
                                    )
                                ) : (
                                    <EmptyFields
                                        onAdd={() =>
                                            addField("text")
                                        }
                                    />
                                )}
                            </div>

                            <div className="border-t border-gray-200 bg-gray-50/60 p-4">
                                <div className="flex flex-wrap gap-2">
                                    {fieldTypes.map(
                                        (fieldType) => (
                                            <button
                                                key={
                                                    fieldType.value
                                                }
                                                type="button"
                                                onClick={() =>
                                                    addField(
                                                        fieldType.value,
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                {fieldType.label}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Consent */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={ShieldCheck}
                                title="Consent & Privacy"
                                description="Configure consent requirements for public submissions."
                            />

                            <ToggleRow
                                label="Require consent"
                                description="Require visitors to explicitly agree before submitting."
                                enabled={form.consent}
                                onChange={(value) =>
                                    updateForm(
                                        "consent",
                                        value,
                                    )
                                }
                            />

                            {form.consent && (
                                <div className="mt-5">
                                    <Field
                                        label="Consent Text"
                                        value={form.consentText}
                                        onChange={(value) =>
                                            updateForm(
                                                "consentText",
                                                value,
                                            )
                                        }
                                        placeholder="Enter the consent statement..."
                                        textarea
                                        rows={4}
                                        error={
                                            errors.consentText
                                        }
                                    />
                                </div>
                            )}
                        </section>

                        {/* Confirmation */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={CheckCircle2}
                                title="Confirmation"
                                description="Set the message displayed after a successful submission."
                            />

                            <Field
                                label="Confirmation Message"
                                value={
                                    form.confirmationMessage
                                }
                                onChange={(value) =>
                                    updateForm(
                                        "confirmationMessage",
                                        value,
                                    )
                                }
                                placeholder="Thank you. Your submission has been received."
                                textarea
                                rows={4}
                            />
                        </section>

                        {/* Notifications */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={Bell}
                                title="Notifications"
                                description="Notify administrators when a new submission is received."
                            />

                            <ToggleRow
                                label="Submission notifications"
                                description="Send an administrative notification for every new submission."
                                enabled={
                                    form.notificationEnabled
                                }
                                onChange={(value) =>
                                    updateForm(
                                        "notificationEnabled",
                                        value,
                                    )
                                }
                            />

                            {form.notificationEnabled && (
                                <div className="mt-5">
                                    <Field
                                        label="Notification Recipients"
                                        value={
                                            form.notificationRecipients
                                        }
                                        onChange={(value) =>
                                            updateForm(
                                                "notificationRecipients",
                                                value,
                                            )
                                        }
                                        placeholder="admin@krushisetu.org, manager@krushisetu.org"
                                        error={
                                            errors.notificationRecipients
                                        }
                                        hint="Separate multiple email addresses with commas."
                                    />
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-gray-900">
                                Form Summary
                            </h2>

                            <div className="mt-4 space-y-3">
                                <SummaryRow
                                    label="Fields"
                                    value={form.fields.length}
                                />

                                <SummaryRow
                                    label="Required Fields"
                                    value={
                                        form.fields.filter(
                                            (field) =>
                                                field.required,
                                        ).length
                                    }
                                />

                                <SummaryRow
                                    label="Category"
                                    value={form.category}
                                />

                                <SummaryRow
                                    label="Status"
                                    value={form.status}
                                />

                                <SummaryRow
                                    label="Consent"
                                    value={
                                        form.consent
                                            ? "Required"
                                            : "Not required"
                                    }
                                />

                                <SummaryRow
                                    label="Notifications"
                                    value={
                                        form.notificationEnabled
                                            ? "Enabled"
                                            : "Disabled"
                                    }
                                />
                            </div>
                        </section>

                        <section className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />

                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">
                                        Submission workflow
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Public submissions can later be
                                        connected to the application or CRM
                                        workflow when the backend form system
                                        is implemented.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-gray-900">
                                Publishing
                            </h2>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Save the configuration as a draft or publish
                                it when all required settings are complete.
                            </p>

                            <div className="mt-5 space-y-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSave(false)
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Draft
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSave(true)
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Publish Form
                                </button>
                            </div>
                        </section>

                        <Link
                            to="/admin/administration/forms"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </Link>
                    </aside>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                    UI preview only — form persistence, submission handling,
                    email notifications and validation will be connected to
                    the backend later.
                </div>
            </div>
        </div>
    )
}

const FieldBuilder = ({
    field,
    index,
    total,
    open,
    onToggle,
    onUpdate,
    onRemove,
    onDuplicate,
    onMoveUp,
    onMoveDown,
    onAddOption,
    onUpdateOption,
    onRemoveOption,
}) => {
    return (
        <div className="bg-white">
            <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
                <div className="hidden text-gray-300 sm:block">
                    <GripVertical className="h-5 w-5" />
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-sm font-bold text-green-700">
                    {index + 1}
                </div>

                <button
                    type="button"
                    onClick={onToggle}
                    className="min-w-0 flex-1 text-left"
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-semibold text-gray-900">
                            {field.label || "Untitled Field"}
                        </span>

                        <span className="rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500">
                            {getFieldTypeLabel(field.type)}
                        </span>

                        {field.required && (
                            <span className="rounded-lg bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600">
                                Required
                            </span>
                        )}
                    </div>

                    <p className="mt-1 truncate text-xs text-gray-400">
                        {field.placeholder ||
                            "No placeholder configured"}
                    </p>
                </button>

                <div className="hidden items-center gap-1 sm:flex">
                    <button
                        type="button"
                        onClick={onMoveUp}
                        disabled={index === 0}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move up"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onMoveDown}
                        disabled={index === total - 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                        title="Move down"
                    >
                        <ArrowDown className="h-4 w-4" />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onToggle}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-green-50 hover:text-green-700 ${
                        open
                            ? "rotate-180 bg-green-50 text-green-700"
                            : ""
                    }`}
                >
                    <ChevronDown className="h-4 w-4" />
                </button>
            </div>

            {open && (
                <div className="border-t border-gray-100 bg-gray-50/60 p-4 sm:p-5">
                    <div className="grid gap-5 lg:grid-cols-2">
                        <Field
                            label="Field Label"
                            value={field.label}
                            onChange={(value) =>
                                onUpdate("label", value)
                            }
                            placeholder="e.g. Full Name"
                            required
                        />

                        <SelectField
                            label="Field Type"
                            value={field.type}
                            onChange={(value) =>
                                onUpdate("type", value)
                            }
                            options={fieldTypes.map(
                                (type) => type.value,
                            )}
                            displayOptions={fieldTypes}
                        />

                        <Field
                            label="Placeholder"
                            value={field.placeholder || ""}
                            onChange={(value) =>
                                onUpdate(
                                    "placeholder",
                                    value,
                                )
                            }
                            placeholder="Enter placeholder text"
                        />

                        <div className="flex items-center">
                            <ToggleRow
                                label="Required field"
                                description="Visitors must complete this field before submission."
                                enabled={Boolean(
                                    field.required,
                                )}
                                onChange={(value) =>
                                    onUpdate(
                                        "required",
                                        value,
                                    )
                                }
                                compact
                            />
                        </div>
                    </div>

                    {(field.type === "select" ||
                        field.type === "radio" ||
                        field.type === "checkbox") && (
                        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Field Options
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Define the choices available to
                                        visitors.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={onAddOption}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Add Option
                                </button>
                            </div>

                            <div className="space-y-2">
                                {(field.options || []).map(
                                    (option, optionIndex) => (
                                        <div
                                            key={`${field.id}-${optionIndex}`}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xs font-semibold text-gray-400">
                                                {optionIndex +
                                                    1}
                                            </div>

                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(
                                                    event,
                                                ) =>
                                                    onUpdateOption(
                                                        optionIndex,
                                                        event
                                                            .target
                                                            .value,
                                                    )
                                                }
                                                className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onRemoveOption(
                                                        optionIndex,
                                                    )
                                                }
                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-4">
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={onDuplicate}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                            >
                                <Copy className="h-3.5 w-3.5" />
                                Duplicate
                            </button>

                            <button
                                type="button"
                                onClick={onMoveUp}
                                disabled={index === 0}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
                            >
                                <ArrowUp className="h-3.5 w-3.5" />
                                Move Up
                            </button>

                            <button
                                type="button"
                                onClick={onMoveDown}
                                disabled={index === total - 1}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
                            >
                                <ArrowDown className="h-3.5 w-3.5" />
                                Move Down
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={onRemove}
                            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete Field
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

const EmptyFields = ({ onAdd }) => {
    return (
        <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <Settings2 className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-900">
                No fields added yet
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                Start building the form by adding the fields visitors need to
                complete.
            </p>

            <button
                type="button"
                onClick={onAdd}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
            >
                <Plus className="h-4 w-4" />
                Add First Field
            </button>
        </div>
    )
}

const SectionHeader = ({
    icon: Icon,
    title,
    description,
    noMargin = false,
}) => {
    return (
        <div
            className={`flex items-start gap-3 ${
                noMargin ? "" : "mb-6"
            }`}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h2 className="text-lg font-bold text-gray-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    )
}

const Field = ({
    label,
    value,
    onChange,
    placeholder,
    textarea = false,
    rows = 4,
    required = false,
    error,
    hint,
    prefix,
}) => {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </span>

            <div className="relative">
                {prefix && (
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                        {prefix}
                    </span>
                )}

                {textarea ? (
                    <textarea
                        value={value}
                        onChange={(event) =>
                            onChange(event.target.value)
                        }
                        placeholder={placeholder}
                        rows={rows}
                        className={`w-full resize-y rounded-2xl border bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition focus:bg-white focus:ring-4 ${
                            error
                                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                        }`}
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(event) =>
                            onChange(event.target.value)
                        }
                        placeholder={placeholder}
                        className={`h-11 w-full rounded-2xl border bg-gray-50 text-sm text-gray-700 outline-none transition focus:bg-white focus:ring-4 ${
                            prefix
                                ? "pl-8 pr-4"
                                : "px-4"
                        } ${
                            error
                                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                        }`}
                    />
                )}
            </div>

            {hint && !error && (
                <span className="mt-1.5 block text-xs text-gray-400">
                    {hint}
                </span>
            )}

            {error && (
                <span className="mt-1.5 block text-xs font-medium text-red-600">
                    {error}
                </span>
            )}
        </label>
    )
}

const DateField = ({
    label,
    value,
    onChange,
    required,
    error,
}) => {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </span>

            <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                    type="date"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className={`h-11 w-full rounded-2xl border bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:bg-white focus:ring-4 ${
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                    }`}
                />
            </div>

            {error && (
                <span className="mt-1.5 block text-xs font-medium text-red-600">
                    {error}
                </span>
            )}
        </label>
    )
}

const SelectField = ({
    label,
    value,
    onChange,
    options,
    displayOptions,
}) => {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
            </span>

            <div className="relative">
                <select
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                >
                    {options.map((option) => {
                        const display =
                            displayOptions?.find(
                                (item) =>
                                    item.value === option,
                            )?.label || option

                        return (
                            <option
                                key={option}
                                value={option}
                            >
                                {display}
                            </option>
                        )
                    })}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
        </label>
    )
}

const ToggleRow = ({
    label,
    description,
    enabled,
    onChange,
    compact = false,
}) => {
    return (
        <div
            className={`flex items-center justify-between gap-4 ${
                compact
                    ? "rounded-2xl border border-gray-200 bg-white p-4"
                    : "rounded-2xl border border-gray-200 bg-gray-50/60 p-4"
            }`}
        >
            <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                    {label}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onChange(!enabled)}
                aria-label={label}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    enabled
                        ? "bg-green-700"
                        : "bg-gray-300"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        enabled
                            ? "left-6"
                            : "left-1"
                    }`}
                />
            </button>
        </div>
    )
}

const SummaryRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-2.5 last:border-b-0 last:pb-0">
            <span className="text-xs font-medium text-gray-500">
                {label}
            </span>

            <span className="max-w-[170px] truncate text-right text-xs font-semibold text-gray-800">
                {value}
            </span>
        </div>
    )
}

const getFieldTypeLabel = (type) => {
    return (
        fieldTypes.find(
            (fieldType) => fieldType.value === type,
        )?.label || type
    )
}

export default FormEditor