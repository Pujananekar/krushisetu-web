import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {
    ArrowLeft,
    Bell,
    CalendarDays,
    CheckCircle2,
    FileText,
    Mail,
    MessageSquare,
    Phone,
    Save,
    ShieldCheck,
    UserRound,
} from "lucide-react"

const FollowUpEditor = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const enquiryId = searchParams.get("enquiry")

    const [form, setForm] = useState({
        title: enquiryId
            ? "Follow up regarding enquiry"
            : "",
        contactName: enquiryId
            ? "Rahul Patil"
            : "",
        organisation: enquiryId
            ? "Patil Agro Group"
            : "",
        email: enquiryId
            ? "rahul.patil@example.com"
            : "",
        phone: enquiryId
            ? "+91 98765 43210"
            : "",
        enquiryId: enquiryId || "",
        category: "General",
        type: "Phone Call",
        status: "Pending",
        priority: "Medium",
        assignedTo: "Support Executive",
        dueDate: "2026-10-01",
        dueTime: "11:00",
        duration: "15",
        purpose: "",
        instructions: "",
        notes: "",
        outcome: "",
        reminder: true,
        reminderTime: "30 minutes before",
        contactPreference: "Phone",
    })

    const [saving, setSaving] = useState(false)

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))
    }

    const handleSave = (nextStatus = form.status) => {
        setSaving(true)

        setTimeout(() => {
            setSaving(false)

            setForm((previous) => ({
                ...previous,
                status: nextStatus,
            }))

            navigate("/admin/crm/follow-ups")
        }, 500)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/crm/follow-ups"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium">
                                <span className="text-green-700">
                                    CRM
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    Follow-ups
                                </span>

                                <span className="text-gray-400">
                                    /
                                </span>

                                <span className="text-gray-500">
                                    New
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Add Follow-up
                            </h1>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Schedule and assign the next action required for a CRM contact.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start rounded-2xl border border-green-200 bg-green-50 px-4 py-2.5">
                        <Bell className="h-4 w-4 text-green-700" />

                        <span className="text-xs font-semibold text-green-700">
                            CRM Follow-up
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Main */}
                    <div className="space-y-6">

                        {/* Follow-up Details */}
                        <FormCard
                            title="Follow-up Details"
                            description="Define the action, contact and purpose of this follow-up."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Follow-up Title"
                                    required
                                    value={form.title}
                                    onChange={(value) =>
                                        updateField(
                                            "title",
                                            value
                                        )
                                    }
                                    placeholder="Enter follow-up title"
                                    className="md:col-span-2"
                                />

                                <Field
                                    label="Contact Name"
                                    required
                                    value={form.contactName}
                                    onChange={(value) =>
                                        updateField(
                                            "contactName",
                                            value
                                        )
                                    }
                                    placeholder="Full name"
                                />

                                <Field
                                    label="Organisation"
                                    value={form.organisation}
                                    onChange={(value) =>
                                        updateField(
                                            "organisation",
                                            value
                                        )
                                    }
                                    placeholder="Organisation"
                                />

                                <Field
                                    label="Email"
                                    type="email"
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
                                    label="Category"
                                    value={form.category}
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
                                    ]}
                                />

                                <SelectField
                                    label="Follow-up Type"
                                    required
                                    value={form.type}
                                    onChange={(value) =>
                                        updateField(
                                            "type",
                                            value
                                        )
                                    }
                                    options={[
                                        "Phone Call",
                                        "Email",
                                        "WhatsApp",
                                        "Meeting",
                                        "Site Visit",
                                        "Document Review",
                                        "Other",
                                    ]}
                                />

                                <Field
                                    label="Related Enquiry ID"
                                    value={form.enquiryId}
                                    onChange={(value) =>
                                        updateField(
                                            "enquiryId",
                                            value
                                        )
                                    }
                                    placeholder="Optional enquiry ID"
                                />

                                <SelectField
                                    label="Contact Preference"
                                    value={
                                        form.contactPreference
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            "contactPreference",
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
                            </div>

                            <div className="mt-5">
                                <TextAreaField
                                    label="Purpose"
                                    value={form.purpose}
                                    onChange={(value) =>
                                        updateField(
                                            "purpose",
                                            value
                                        )
                                    }
                                    placeholder="What is the purpose of this follow-up?"
                                    rows={5}
                                />
                            </div>
                        </FormCard>

                        {/* Schedule */}
                        <FormCard
                            title="Schedule"
                            description="Set when this follow-up should happen."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Due Date"
                                    required
                                    type="date"
                                    value={form.dueDate}
                                    onChange={(value) =>
                                        updateField(
                                            "dueDate",
                                            value
                                        )
                                    }
                                />

                                <Field
                                    label="Due Time"
                                    required
                                    type="time"
                                    value={form.dueTime}
                                    onChange={(value) =>
                                        updateField(
                                            "dueTime",
                                            value
                                        )
                                    }
                                />

                                <SelectField
                                    label="Duration"
                                    value={form.duration}
                                    onChange={(value) =>
                                        updateField(
                                            "duration",
                                            value
                                        )
                                    }
                                    options={[
                                        "15",
                                        "30",
                                        "45",
                                        "60",
                                        "90",
                                    ]}
                                />

                                <div className="flex items-end">
                                    <div className="flex w-full items-center gap-3 rounded-2xl border border-green-100 bg-green-50/60 px-4 py-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                            <CalendarDays className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-green-900">
                                                Scheduled action
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-green-900/60">
                                                {form.dueDate} ·{" "}
                                                {form.dueTime}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormCard>

                        {/* Assignment */}
                        <FormCard
                            title="Assignment & Priority"
                            description="Choose who should handle this follow-up and how urgent it is."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <SelectField
                                    label="Assigned To"
                                    required
                                    value={form.assignedTo}
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
                                    value={form.priority}
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
                                        "Pending",
                                        "Completed",
                                        "Overdue",
                                        "Cancelled",
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
                                                {form.assignedTo}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormCard>

                        {/* Instructions */}
                        <FormCard
                            title="Action Instructions"
                            description="Provide clear instructions for the person completing the follow-up."
                        >
                            <TextAreaField
                                label="Instructions"
                                value={form.instructions}
                                onChange={(value) =>
                                    updateField(
                                        "instructions",
                                        value
                                    )
                                }
                                placeholder="Explain what should be discussed, collected or completed..."
                                rows={7}
                            />
                        </FormCard>

                        {/* Notes */}
                        <FormCard
                            title="Notes & Outcome"
                            description="Record notes before or after completing the follow-up."
                        >
                            <div className="space-y-5">
                                <TextAreaField
                                    label="Notes"
                                    value={form.notes}
                                    onChange={(value) =>
                                        updateField(
                                            "notes",
                                            value
                                        )
                                    }
                                    placeholder="Add follow-up notes..."
                                    rows={5}
                                />

                                <TextAreaField
                                    label="Outcome"
                                    value={form.outcome}
                                    onChange={(value) =>
                                        updateField(
                                            "outcome",
                                            value
                                        )
                                    }
                                    placeholder="Record the result once the follow-up is completed..."
                                    rows={5}
                                />
                            </div>
                        </FormCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Contact Summary */}
                        <FormCard
                            title="Contact Summary"
                            description="Quick reference for the follow-up contact."
                        >
                            <div className="space-y-4">
                                <SummaryRow
                                    icon={UserRound}
                                    label="Contact"
                                    value={
                                        form.contactName ||
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

                                <SummaryRow
                                    icon={MessageSquare}
                                    label="Method"
                                    value={
                                        form.contactPreference
                                    }
                                />
                            </div>
                        </FormCard>

                        {/* Reminder */}
                        <FormCard
                            title="Reminder"
                            description="Choose whether a reminder should be created."
                        >
                            <ToggleRow
                                label="Send Reminder"
                                description="Create a reminder before the follow-up is due."
                                checked={form.reminder}
                                onChange={(value) =>
                                    updateField(
                                        "reminder",
                                        value
                                    )
                                }
                            />

                            {form.reminder && (
                                <div className="mt-5">
                                    <SelectField
                                        label="Reminder Time"
                                        value={
                                            form.reminderTime
                                        }
                                        onChange={(value) =>
                                            updateField(
                                                "reminderTime",
                                                value
                                            )
                                        }
                                        options={[
                                            "15 minutes before",
                                            "30 minutes before",
                                            "1 hour before",
                                            "2 hours before",
                                            "1 day before",
                                        ]}
                                    />
                                </div>
                            )}
                        </FormCard>

                        {/* Checklist */}
                        <FormCard
                            title="Follow-up Checklist"
                            description="Review the information before saving."
                        >
                            <div className="space-y-3">
                                <ChecklistItem
                                    label="Follow-up title added"
                                    checked={Boolean(
                                        form.title
                                    )}
                                />

                                <ChecklistItem
                                    label="Contact identified"
                                    checked={Boolean(
                                        form.contactName
                                    )}
                                />

                                <ChecklistItem
                                    label="Follow-up type selected"
                                    checked={Boolean(
                                        form.type
                                    )}
                                />

                                <ChecklistItem
                                    label="Due date selected"
                                    checked={Boolean(
                                        form.dueDate
                                    )}
                                />

                                <ChecklistItem
                                    label="Due time selected"
                                    checked={Boolean(
                                        form.dueTime
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
                                    label="Priority selected"
                                    checked={Boolean(
                                        form.priority
                                    )}
                                />

                                <ChecklistItem
                                    label="Reminder reviewed"
                                    checked={true}
                                />
                            </div>
                        </FormCard>

                        {/* Privacy */}
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
                                        Follow-up details and contact
                                        information should only be
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
                                        Follow-up scheduling, reminders and
                                        CRM persistence are currently
                                        UI-only.
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
                            to="/admin/crm/follow-ups"
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
                                        "Pending"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />
                                Save Follow-up
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                    handleSave(
                                        "Completed"
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800 disabled:opacity-60"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                {saving
                                    ? "Saving..."
                                    : "Save as Completed"}
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
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
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
                onChange={(event) =>
                    onChange(event.target.value)
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
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
            />
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

export default FollowUpEditor