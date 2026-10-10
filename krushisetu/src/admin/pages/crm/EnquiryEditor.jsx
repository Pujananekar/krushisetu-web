import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    FileText,
    Mail,
    MessageSquare,
    Phone,
    Save,
    ShieldCheck,
    UserRound,
} from "lucide-react"

const EnquiryEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = Boolean(id)

    const [form, setForm] = useState({
        name: isEditMode ? "Rahul Patil" : "",
        organisation: isEditMode
            ? "Patil Agro Group"
            : "",
        email: isEditMode
            ? "rahul.patil@example.com"
            : "",
        phone: isEditMode
            ? "+91 98765 43210"
            : "",
        subject: isEditMode
            ? "Government scheme assistance"
            : "",
        category: isEditMode
            ? "Schemes"
            : "General",
        source: isEditMode
            ? "Website"
            : "Website",
        status: isEditMode
            ? "New"
            : "New",
        priority: isEditMode
            ? "High"
            : "Medium",
        assignedTo: isEditMode
            ? "Support Executive"
            : "Unassigned",
        enquiryDate: isEditMode
            ? "2026-10-01"
            : "",
        preferredContact: "Phone",
        message: isEditMode
            ? "I would like to know more about government schemes available for farmers and the documents required to apply."
            : "",
        tags: isEditMode
            ? "farmer, scheme, assistance"
            : "",
        followUpRequired: isEditMode,
        followUpDate: isEditMode
            ? "2026-10-01"
            : "",
        followUpTime: isEditMode
            ? "11:00"
            : "",
        followUpType: "Phone Call",
        followUpNotes: isEditMode
            ? "Confirm required documents and scheme eligibility."
            : "",
        internalNotes: "",
        resolution: "",
        consentToContact: true,
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
            }))

            navigate("/admin/crm/enquiries")
        }, 500)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/crm/enquiries"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-green-700">
                                <span>CRM</span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Enquiries
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
                                    ? "Edit Enquiry"
                                    : "Add Enquiry"}
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Record enquiry details, assignment,
                                follow-up requirements and resolution notes.
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

                        {/* Contact Information */}
                        <FormCard
                            title="Contact Information"
                            description="Capture the person or organisation making the enquiry."
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
                                    label="Organisation"
                                    value={
                                        form.organisation
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "organisation",
                                            value
                                        )
                                    }
                                    placeholder="Organisation or company"
                                />

                                <Field
                                    label="Email"
                                    type="email"
                                    required
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
                                    type="tel"
                                    required
                                    value={form.phone}
                                    onChange={(value) =>
                                        updateField(
                                            "phone",
                                            value
                                        )
                                    }
                                    placeholder="+91 XXXXX XXXXX"
                                />

                                <SelectField
                                    label="Preferred Contact"
                                    value={
                                        form.preferredContact
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "preferredContact",
                                            value
                                        )
                                    }
                                    options={[
                                        "Phone",
                                        "Email",
                                        "WhatsApp",
                                        "In Person",
                                    ]}
                                />

                                <div className="flex items-end">
                                    <div className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                            {form.preferredContact ===
                                            "Email" ? (
                                                <Mail className="h-4 w-4" />
                                            ) : (
                                                <Phone className="h-4 w-4" />
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-700">
                                                Preferred contact method
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-gray-400">
                                                {
                                                    form.preferredContact
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormCard>

                        {/* Enquiry Details */}
                        <FormCard
                            title="Enquiry Details"
                            description="Record the subject, category, source and message."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Subject"
                                    required
                                    value={
                                        form.subject
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "subject",
                                            value
                                        )
                                    }
                                    placeholder="Enter enquiry subject"
                                    className="md:col-span-2"
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
                                        "General",
                                        "Schemes",
                                        "Training",
                                        "Resources",
                                        "Projects",
                                        "FPO",
                                        "Partnerships",
                                        "Internships",
                                        "Services",
                                        "Volunteers",
                                        "Other",
                                    ]}
                                />

                                <SelectField
                                    label="Source"
                                    value={form.source}
                                    onChange={(value) =>
                                        updateField(
                                            "source",
                                            value
                                        )
                                    }
                                    options={[
                                        "Website",
                                        "Contact Form",
                                        "Email",
                                        "Phone",
                                        "WhatsApp",
                                        "Referral",
                                        "Walk-in",
                                        "Other",
                                    ]}
                                />

                                <Field
                                    label="Enquiry Date"
                                    type="date"
                                    value={
                                        form.enquiryDate
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "enquiryDate",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Tags"
                                    value={form.tags}
                                    onChange={(value) =>
                                        updateField(
                                            "tags",
                                            value
                                        )
                                    }
                                    placeholder="farmer, scheme, support"
                                />
                            </div>

                            <div className="mt-5">
                                <TextAreaField
                                    label="Message"
                                    required
                                    value={
                                        form.message
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "message",
                                            value
                                        )
                                    }
                                    placeholder="Enter the enquiry message..."
                                    rows={7}
                                />
                            </div>
                        </FormCard>

                        {/* Assignment */}
                        <FormCard
                            title="Assignment & Workflow"
                            description="Assign the enquiry to the appropriate team member and update its workflow state."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <SelectField
                                    label="Assigned To"
                                    required
                                    value={
                                        form.assignedTo
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "assignedTo",
                                            value
                                        )
                                    }
                                    options={[
                                        "Unassigned",
                                        "Support Executive",
                                        "CRM Executive",
                                        "Scheme Manager",
                                        "Training Manager",
                                        "Programme Manager",
                                        "HR Support",
                                    ]}
                                />

                                <SelectField
                                    label="Priority"
                                    required
                                    value={
                                        form.priority
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "priority",
                                            value
                                        )
                                    }
                                    options={[
                                        "High",
                                        "Medium",
                                        "Low",
                                    ]}
                                />

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
                                        "New",
                                        "In Progress",
                                        "Resolved",
                                        "Closed",
                                    ]}
                                />

                                <div className="flex items-end">
                                    <div className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                            <UserRound className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-700">
                                                Current assignee
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-gray-400">
                                                {
                                                    form.assignedTo
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormCard>

                        {/* Follow-up */}
                        <FormCard
                            title="Follow-up"
                            description="Create the next action required for this enquiry."
                        >
                            <ToggleRow
                                label="Follow-up Required"
                                description="Create a follow-up action for this enquiry."
                                checked={
                                    form.followUpRequired
                                }
                                onChange={(value) =>
                                    updateField(
                                        "followUpRequired",
                                        value
                                    )
                                }
                            />

                            {form.followUpRequired && (
                                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <Field
                                        label="Follow-up Date"
                                        required
                                        type="date"
                                        value={
                                            form.followUpDate
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "followUpDate",
                                                value
                                            )
                                        }
                                    />

                                    <Field
                                        label="Follow-up Time"
                                        type="time"
                                        value={
                                            form.followUpTime
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "followUpTime",
                                                value
                                            )
                                        }
                                    />

                                    <SelectField
                                        label="Follow-up Type"
                                        value={
                                            form.followUpType
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "followUpType",
                                                value
                                            )
                                        }
                                        options={[
                                            "Phone Call",
                                            "Email",
                                            "WhatsApp",
                                            "Meeting",
                                            "Site Visit",
                                            "Other",
                                        ]}
                                    />

                                    <div className="flex items-end">
                                        <div className="w-full rounded-2xl border border-green-100 bg-green-50/60 px-4 py-3">
                                            <p className="text-xs font-semibold text-green-900">
                                                Next action
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-green-900/60">
                                                {
                                                    form.followUpType
                                                }{" "}
                                                scheduled for{" "}
                                                {
                                                    form.followUpDate
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <TextAreaField
                                            label="Follow-up Notes"
                                            value={
                                                form.followUpNotes
                                            }
                                            onChange={(value) =>
                                                updateField(
                                                    "followUpNotes",
                                                    value
                                                )
                                            }
                                            placeholder="Describe what needs to be done during the follow-up..."
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            )}
                        </FormCard>

                        {/* Resolution */}
                        <FormCard
                            title="Resolution"
                            description="Record the outcome once the enquiry has been addressed."
                        >
                            <TextAreaField
                                label="Resolution Notes"
                                value={
                                    form.resolution
                                }
                                onChange={(value) =>
                                    updateField(
                                        "resolution",
                                        value
                                    )
                                }
                                placeholder="Describe how the enquiry was resolved..."
                                rows={6}
                            />
                        </FormCard>

                        {/* Internal Notes */}
                        <FormCard
                            title="Internal Notes"
                            description="Administrative notes visible only to authorised CRM users."
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

                        {/* Enquiry Summary */}
                        <FormCard
                            title="Enquiry Summary"
                            description="Quick reference for the current enquiry."
                        >
                            <div className="space-y-4">
                                <SummaryRow
                                    icon={UserRound}
                                    label="Contact"
                                    value={
                                        form.name ||
                                        "Not provided"
                                    }
                                />

                                <SummaryRow
                                    icon={MessageSquare}
                                    label="Subject"
                                    value={
                                        form.subject ||
                                        "Not provided"
                                    }
                                />

                                <SummaryRow
                                    icon={Mail}
                                    label="Email"
                                    value={
                                        form.email ||
                                        "Not provided"
                                    }
                                />

                                <SummaryRow
                                    icon={Phone}
                                    label="Phone"
                                    value={
                                        form.phone ||
                                        "Not provided"
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Contact Consent */}
                        <FormCard
                            title="Contact Permission"
                            description="Record whether the person has permitted follow-up communication."
                        >
                            <ToggleRow
                                label="Consent to Contact"
                                description="Allow the support team to contact this person regarding the enquiry."
                                checked={
                                    form.consentToContact
                                }
                                onChange={(value) =>
                                    updateField(
                                        "consentToContact",
                                        value
                                    )
                                }
                            />
                        </FormCard>

                        {/* CRM Checklist */}
                        <FormCard
                            title="CRM Checklist"
                            description="Review the enquiry before saving."
                        >
                            <div className="space-y-3">
                                <ChecklistItem
                                    label="Contact name added"
                                    checked={Boolean(
                                        form.name
                                    )}
                                />

                                <ChecklistItem
                                    label="Email recorded"
                                    checked={Boolean(
                                        form.email
                                    )}
                                />

                                <ChecklistItem
                                    label="Phone recorded"
                                    checked={Boolean(
                                        form.phone
                                    )}
                                />

                                <ChecklistItem
                                    label="Subject added"
                                    checked={Boolean(
                                        form.subject
                                    )}
                                />

                                <ChecklistItem
                                    label="Category selected"
                                    checked={Boolean(
                                        form.category
                                    )}
                                />

                                <ChecklistItem
                                    label="Assignee selected"
                                    checked={
                                        form.assignedTo !==
                                        "Unassigned"
                                    }
                                />

                                <ChecklistItem
                                    label="Message recorded"
                                    checked={Boolean(
                                        form.message
                                    )}
                                />

                                <ChecklistItem
                                    label="Follow-up reviewed"
                                    checked={
                                        !form.followUpRequired ||
                                        Boolean(
                                            form.followUpDate
                                        )
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Security */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-green-950">
                                        CRM privacy
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-green-900/70">
                                        Enquiry contact information and
                                        internal notes should only be
                                        accessible to authorised CRM users.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* UI Notice */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">
                                        UI preview mode
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Saving, assignment, follow-up
                                        creation and CRM notifications are
                                        currently UI-only.
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
                            to="/admin/crm/enquiries"
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
                                        "New"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />
                                Save as New
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                    handleSave(
                                        "In Progress"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-60"
                            >
                                <MessageSquare className="h-4 w-4" />
                                Save & Start
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                    handleSave(
                                        "Resolved"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:opacity-60"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                {saving
                                    ? "Saving..."
                                    : "Save as Resolved"}
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

const SummaryRow = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] text-gray-400">
                    {label}
                </p>

                <p className="truncate text-xs font-semibold text-gray-700">
                    {value}
                </p>
            </div>
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

export default EnquiryEditor