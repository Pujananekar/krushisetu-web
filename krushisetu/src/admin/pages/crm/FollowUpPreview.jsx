import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    Bell,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Edit3,
    FileText,
    Mail,
    MessageSquare,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react"

const followUpData = {
    "1": {
        id: "1",
        title: "Follow up regarding enquiry",
        contactName: "Rahul Patil",
        organisation: "Patil Agro Group",
        email: "rahul.patil@example.com",
        phone: "+91 98765 43210",
        enquiryId: "1",
        category: "Schemes",
        type: "Phone Call",
        status: "Pending",
        priority: "High",
        assignedTo: "Support Executive",
        dueDate: "01 Oct 2026",
        dueTime: "11:00 AM",
        duration: "15 minutes",
        purpose:
            "Confirm required documents and provide guidance about government scheme eligibility.",
        instructions:
            "Call the farmer, understand the requested scheme, confirm eligibility requirements and explain the documents needed for the application.",
        notes:
            "Initial website enquiry received. Farmer is waiting for scheme information.",
        outcome: "",
        reminder: true,
        reminderTime: "30 minutes before",
        contactPreference: "Phone",
        createdAt: "01 Oct 2026, 09:45 AM",
        updatedAt: "01 Oct 2026, 09:45 AM",
    },

    "2": {
        id: "2",
        title: "Send upcoming training schedule",
        contactName: "Sneha Jadhav",
        organisation: "Jadhav Farmers Group",
        email: "sneha.jadhav@example.com",
        phone: "+91 91234 56789",
        enquiryId: "2",
        category: "Training",
        type: "Email",
        status: "Pending",
        priority: "Medium",
        assignedTo: "Training Manager",
        dueDate: "02 Oct 2026",
        dueTime: "02:00 PM",
        duration: "15 minutes",
        purpose:
            "Provide the upcoming training schedule and registration information.",
        instructions:
            "Send the latest training schedule, available seats and registration instructions.",
        notes:
            "Contact requested training programme details through the website.",
        outcome: "",
        reminder: true,
        reminderTime: "1 hour before",
        contactPreference: "Email",
        createdAt: "30 Sep 2026, 04:15 PM",
        updatedAt: "30 Sep 2026, 04:15 PM",
    },

    "3": {
        id: "3",
        title: "Partnership discussion follow-up",
        contactName: "Amit Shinde",
        organisation: "Shinde Agro Services",
        email: "amit.shinde@example.com",
        phone: "+91 99887 66554",
        enquiryId: "3",
        category: "Partnerships",
        type: "Meeting",
        status: "Completed",
        priority: "Low",
        assignedTo: "Programme Manager",
        dueDate: "30 Sep 2026",
        dueTime: "03:00 PM",
        duration: "30 minutes",
        purpose:
            "Discuss possible collaboration opportunities.",
        instructions:
            "Discuss the proposed project and explain the partnership process.",
        notes:
            "Meeting completed with the organisation.",
        outcome:
            "Initial partnership information was shared and the organisation was directed to the programme team for further discussion.",
        reminder: false,
        reminderTime: "",
        contactPreference: "Email",
        createdAt: "29 Sep 2026, 12:10 PM",
        updatedAt: "30 Sep 2026, 04:05 PM",
    },
}

const FollowUpPreview = () => {
    const { id } = useParams()

    const followUp =
        followUpData[id] || followUpData["1"]

    const isCompleted =
        followUp.status === "Completed"

    const isOverdue =
        followUp.status === "Overdue"

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
                                    #{followUp.id}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {followUp.title}
                                </h1>

                                <StatusBadge
                                    status={followUp.status}
                                />
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                Follow-up for {followUp.contactName}
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/admin/crm/follow-ups/${followUp.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />
                        Edit Follow-up
                    </Link>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Main */}
                    <div className="space-y-6">

                        {/* Contact */}
                        <PreviewCard
                            title="Contact Information"
                            description="Person or organisation associated with this follow-up."
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <InfoItem
                                    icon={UserRound}
                                    label="Contact Name"
                                    value={
                                        followUp.contactName
                                    }
                                />

                                <InfoItem
                                    icon={FileText}
                                    label="Organisation"
                                    value={
                                        followUp.organisation ||
                                        "Not provided"
                                    }
                                />

                                <InfoItem
                                    icon={Mail}
                                    label="Email"
                                    value={
                                        followUp.email ||
                                        "Not provided"
                                    }
                                />

                                <InfoItem
                                    icon={Phone}
                                    label="Phone"
                                    value={
                                        followUp.phone ||
                                        "Not provided"
                                    }
                                />

                                <InfoItem
                                    icon={MessageSquare}
                                    label="Contact Preference"
                                    value={
                                        followUp.contactPreference
                                    }
                                />

                                <InfoItem
                                    icon={FileText}
                                    label="Related Enquiry"
                                    value={
                                        followUp.enquiryId
                                            ? `#${followUp.enquiryId}`
                                            : "None"
                                    }
                                />
                            </div>
                        </PreviewCard>

                        {/* Follow-up Overview */}
                        <PreviewCard
                            title="Follow-up Overview"
                            description="Classification, assignment and current workflow state."
                        >
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <MetaCard
                                    label="Category"
                                    value={
                                        followUp.category
                                    }
                                />

                                <MetaCard
                                    label="Type"
                                    value={
                                        followUp.type
                                    }
                                />

                                <MetaCard
                                    label="Priority"
                                    value={
                                        followUp.priority
                                    }
                                    highlight
                                />

                                <MetaCard
                                    label="Assigned To"
                                    value={
                                        followUp.assignedTo
                                    }
                                />
                            </div>
                        </PreviewCard>

                        {/* Schedule */}
                        <PreviewCard
                            title="Schedule"
                            description="Date, time and reminder information for this action."
                        >
                            <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                        <CalendarDays className="h-6 w-6" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-green-800/50">
                                            Scheduled For
                                        </p>

                                        <div className="mt-1 flex flex-wrap items-center gap-2">
                                            <p className="text-lg font-bold text-green-950">
                                                {
                                                    followUp.dueDate
                                                }
                                            </p>

                                            <span className="text-green-900/30">
                                                •
                                            </span>

                                            <p className="text-sm font-semibold text-green-800">
                                                {
                                                    followUp.dueTime
                                                }
                                            </p>
                                        </div>

                                        <p className="mt-1 text-xs text-green-900/60">
                                            {followUp.duration}{" "}
                                            ·{" "}
                                            {
                                                followUp.type
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <StatusBadge
                                            status={
                                                followUp.status
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <SmallInfo
                                    icon={Bell}
                                    label="Reminder"
                                    value={
                                        followUp.reminder
                                            ? followUp.reminderTime
                                            : "Disabled"
                                    }
                                />

                                <SmallInfo
                                    icon={UserRound}
                                    label="Assigned To"
                                    value={
                                        followUp.assignedTo
                                    }
                                />
                            </div>
                        </PreviewCard>

                        {/* Purpose */}
                        <PreviewCard
                            title="Purpose"
                            description="Reason this follow-up was created."
                        >
                            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                <p className="text-sm leading-7 text-gray-600">
                                    {followUp.purpose ||
                                        "No purpose recorded."}
                                </p>
                            </div>
                        </PreviewCard>

                        {/* Instructions */}
                        <PreviewCard
                            title="Action Instructions"
                            description="Instructions for completing this follow-up."
                        >
                            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                        <MessageSquare className="h-4 w-4" />
                                    </div>

                                    <p className="text-sm leading-7 text-gray-600">
                                        {followUp.instructions ||
                                            "No instructions recorded."}
                                    </p>
                                </div>
                            </div>
                        </PreviewCard>

                        {/* Notes */}
                        <PreviewCard
                            title="Notes"
                            description="Notes recorded during the follow-up process."
                        >
                            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                <p className="text-sm leading-7 text-gray-600">
                                    {followUp.notes ||
                                        "No notes recorded."}
                                </p>
                            </div>
                        </PreviewCard>

                        {/* Outcome */}
                        <PreviewCard
                            title="Outcome"
                            description="Result of the follow-up action."
                        >
                            {followUp.outcome ? (
                                <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-green-900">
                                                Follow-up completed
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-green-900/70">
                                                {
                                                    followUp.outcome
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <EmptyPanel
                                    icon={Clock3}
                                    title="No outcome recorded"
                                    description="The outcome will be recorded after the follow-up is completed."
                                />
                            )}
                        </PreviewCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Status */}
                        <PreviewCard
                            title="Current Status"
                            description="Current follow-up workflow state."
                        >
                            <div
                                className={`flex items-center gap-4 rounded-2xl border p-4 ${
                                    isCompleted
                                        ? "border-green-100 bg-green-50/60"
                                        : isOverdue
                                          ? "border-red-100 bg-red-50/60"
                                          : "border-gray-100 bg-gray-50"
                                }`}
                            >
                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                                        isCompleted
                                            ? "bg-green-100 text-green-700"
                                            : isOverdue
                                              ? "bg-red-100 text-red-700"
                                              : "bg-white text-green-700"
                                    }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        <Clock3 className="h-5 w-5" />
                                    )}
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Status
                                    </p>

                                    <p className="mt-0.5 text-sm font-bold text-gray-800">
                                        {followUp.status}
                                    </p>
                                </div>
                            </div>
                        </PreviewCard>

                        {/* Assignment */}
                        <PreviewCard
                            title="Assignment"
                            description="Team ownership and urgency."
                        >
                            <div className="space-y-4">
                                <InfoItem
                                    icon={UserRound}
                                    label="Assigned To"
                                    value={
                                        followUp.assignedTo
                                    }
                                />

                                <div className="h-px bg-gray-100" />

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                        Priority
                                    </p>

                                    <div className="mt-2">
                                        <PriorityBadge
                                            priority={
                                                followUp.priority
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </PreviewCard>

                        {/* Reminder */}
                        <PreviewCard
                            title="Reminder"
                            description="Reminder configuration for this follow-up."
                        >
                            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                    <Bell className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-700">
                                        {followUp.reminder
                                            ? "Reminder enabled"
                                            : "Reminder disabled"}
                                    </p>

                                    <p className="mt-1 text-[11px] text-gray-400">
                                        {followUp.reminder
                                            ? followUp.reminderTime
                                            : "No reminder scheduled"}
                                    </p>
                                </div>
                            </div>
                        </PreviewCard>

                        {/* Activity */}
                        <PreviewCard
                            title="Activity"
                            description="Basic follow-up record timeline."
                        >
                            <div className="space-y-5">
                                <TimelineItem
                                    title="Follow-up created"
                                    value={
                                        followUp.createdAt
                                    }
                                    active
                                />

                                <TimelineItem
                                    title="Last updated"
                                    value={
                                        followUp.updatedAt
                                    }
                                    active
                                />

                                <TimelineItem
                                    title={
                                        isCompleted
                                            ? "Follow-up completed"
                                            : "Scheduled action"
                                    }
                                    value={
                                        isCompleted
                                            ? followUp.updatedAt
                                            : `${followUp.dueDate} · ${followUp.dueTime}`
                                    }
                                    active
                                    last
                                />
                            </div>
                        </PreviewCard>

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
                                        Follow-up and contact information
                                        should only be accessible to
                                        authorised CRM users.
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
                                        This detail page currently uses
                                        temporary UI data. CRM backend
                                        integration will be connected later.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/crm/follow-ups"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Follow-ups
                        </Link>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            {!isCompleted && (
                                <Link
                                    to={`/admin/crm/follow-ups/${followUp.id}/edit`}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    Update Follow-up
                                </Link>
                            )}

                            {!isCompleted && (
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Mark Completed
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const PreviewCard = ({
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
                    <p className="mt-1 text-xs leading-5 text-gray-500">
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

const InfoItem = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                    {value}
                </p>
            </div>
        </div>
    )
}

const SmallInfo = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] text-gray-400">
                    {label}
                </p>

                <p className="mt-0.5 truncate text-xs font-semibold text-gray-700">
                    {value}
                </p>
            </div>
        </div>
    )
}

const MetaCard = ({
    label,
    value,
    highlight = false,
}) => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>

            <p
                className={`mt-1.5 text-sm font-bold ${
                    highlight
                        ? "text-green-700"
                        : "text-gray-800"
                }`}
            >
                {value}
            </p>
        </div>
    )
}

const PriorityBadge = ({
    priority,
}) => {
    const styles = {
        High: "border-red-100 bg-red-50 text-red-700",
        Medium: "border-amber-100 bg-amber-50 text-amber-700",
        Low: "border-green-100 bg-green-50 text-green-700",
    }

    return (
        <span
            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
                styles[priority] ||
                "border-gray-100 bg-gray-50 text-gray-600"
            }`}
        >
            {priority}
        </span>
    )
}

const StatusBadge = ({
    status,
}) => {
    const styles = {
        Pending:
            "border-blue-100 bg-blue-50 text-blue-700",
        Completed:
            "border-green-100 bg-green-50 text-green-700",
        Overdue:
            "border-red-100 bg-red-50 text-red-700",
        Cancelled:
            "border-gray-200 bg-gray-100 text-gray-600",
    }

    return (
        <span
            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
                styles[status] ||
                "border-gray-100 bg-gray-50 text-gray-600"
            }`}
        >
            {status}
        </span>
    )
}

const EmptyPanel = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-3 text-sm font-bold text-gray-700">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
                {description}
            </p>
        </div>
    )
}

const TimelineItem = ({
    title,
    value,
    active = false,
    last = false,
}) => {
    return (
        <div className="relative flex gap-3">
            {!last && (
                <div className="absolute left-[7px] top-5 h-full w-px bg-gray-200" />
            )}

            <div
                className={`relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                    active
                        ? "border-green-600 bg-green-100"
                        : "border-gray-300 bg-white"
                }`}
            />

            <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-700">
                    {title}
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                    {value}
                </p>
            </div>
        </div>
    )
}

export default FollowUpPreview