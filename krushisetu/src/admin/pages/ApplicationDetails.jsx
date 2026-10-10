import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
    XCircle,
} from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"

import { getApplicatonById } from "../api/adminApplicationsApi"

const statusConfig = {
    NEW: {
        label: "New",
        className: "bg-blue-50 text-blue-700 border-blue-100",
        icon: Clock3,
    },

    IN_PROGRESS: {
        label: "In Progress",
        className: "bg-amber-50 text-amber-700 border-amber-100",
        icon: Clock3,
    },

    RESOLVED: {
        label: "Resolved",
        className: "bg-green-50 text-green-700 border-green-100",
        icon: CheckCircle2,
    },

    CLOSED: {
        label: "Closed",
        className: "bg-gray-100 text-gray-600 border-gray-200",
        icon: CheckCircle2,
    },
}

const typeLabels = {
    FARMER: "Farmer Application",
    TRAINING: "Training Application",
    SERVICE: "Service Application",
    INTERNSHIP: "Internship Application",
    FPO: "FPO Application",
    PARTNERSHIP: "Partnership Application",
    VOLUNTEER: "Volunteer Application",
}

const formatDateTime = (value) => {
    if (!value) return "—"

    return new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

const getConsentLabel = (value) => {
    return Number(value) === 1 ? "Granted" : "Not Granted"
}

const ApplicationDetails = () => {
    const { id } = useParams()

    const {
        data: response,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-application", id],
        queryFn: () => getApplicatonById(id),
        enabled: Boolean(id),
    })

    const application = response?.data

    const status =
        statusConfig[application?.status] || statusConfig.NEW

    const StatusIcon = status.icon

    if (isLoading) {
        return <LoadingState />
    }

    if (isError || !application) {
        return (
            <ErrorState
                message={
                    error?.response?.data?.message ||
                    "Unable to load this application."
                }
                onRetry={refetch}
            />
        )
    }

    const details = application.details || {}
    const applicant = application.applicant || {}
    const location = application.location || {}

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">

                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            to="/admin/applications"
                            className="kr-hover-link inline-flex items-center gap-2 text-sm font-semibold text-gray-500"
                        >
                            <ArrowLeft size={17} />
                            Back to Applications
                        </Link>

                        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                    Application Details
                                </p>

                                <h1 className="text-3xl font-black tracking-tight text-green-950 md:text-4xl">
                                    {typeLabels[
                                        application.application_type
                                    ] || "Application"}
                                </h1>

                                <p className="mt-2 text-sm text-gray-500">
                                    Reference number:{" "}
                                    <span className="font-bold text-green-800">
                                        {application.reference_number || "—"}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* Edit Application */}
                                <Link
                                    to={`/admin/applications/${application.id}/edit`}
                                    className="kr-hover-button inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-green-900/10"
                                >
                                    <FileText size={17} />
                                    Edit Application
                                </Link>

                                {/* Status */}
                                <div
                                    className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold ${status.className}`}
                                >
                                    <StatusIcon size={17} />
                                    {status.label}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">

                        <div className="space-y-6 lg:col-span-2">

                            {/* Applicant / Organisation Information */}
                            <section className="rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
                                <div className="border-b border-gray-100 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <UserRound size={19} />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-black text-green-950">
                                                {application.application_type ===
                                                    "PARTNERSHIP" ||
                                                application.application_type ===
                                                    "FPO"
                                                    ? "Organisation Information"
                                                    : "Applicant Information"}
                                            </h2>

                                            <p className="text-xs text-gray-400">
                                                Information provided with the
                                                application
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-5 p-6 sm:grid-cols-2">
                                    <InfoItem
                                        label={
                                            application.application_type ===
                                                "PARTNERSHIP" ||
                                            application.application_type ===
                                                "FPO"
                                                ? "Organisation"
                                                : "Full Name"
                                        }
                                        value={applicant.name}
                                    />

                                    {application.application_type ===
                                        "PARTNERSHIP" &&
                                        details.contact && (
                                            <InfoItem
                                                label="Contact Person"
                                                value={details.contact}
                                            />
                                        )}

                                    {applicant.mobile && (
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Mobile Number
                                            </p>

                                            <a
                                                href={`tel:${applicant.mobile}`}
                                                className="kr-hover-link mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-700"
                                            >
                                                <Phone size={15} />
                                                {applicant.mobile}
                                            </a>
                                        </div>
                                    )}

                                    {applicant.email && (
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Email Address
                                            </p>

                                            <a
                                                href={`mailto:${applicant.email}`}
                                                className="kr-hover-link mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-700"
                                            >
                                                <Mail size={15} />
                                                {applicant.email}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Location */}
                            {hasLocationData(application) && (
                                <section className="rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
                                    <div className="border-b border-gray-100 px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <MapPin size={19} />
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-black text-green-950">
                                                    Location
                                                </h2>

                                                <p className="text-xs text-gray-400">
                                                    Location information provided
                                                    with the application
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
                                        {location.village && (
                                            <InfoItem
                                                label="Village"
                                                value={location.village}
                                            />
                                        )}

                                        {location.taluka && (
                                            <InfoItem
                                                label="Taluka"
                                                value={location.taluka}
                                            />
                                        )}

                                        {location.district && (
                                            <InfoItem
                                                label="District"
                                                value={location.district}
                                            />
                                        )}

                                        {location.pin && (
                                            <InfoItem
                                                label="PIN Code"
                                                value={location.pin}
                                            />
                                        )}

                                        {location.value && (
                                            <InfoItem
                                                label={getLocationLabel(
                                                    application.application_type,
                                                )}
                                                value={location.value}
                                            />
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Type Specific Information */}
                            <ApplicationTypeDetails
                                type={application.application_type}
                                details={details}
                            />

                            {/* Consent */}
                            <section className="rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
                                <div className="border-b border-gray-100 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                            <ShieldCheck size={19} />
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-black text-green-950">
                                                Consent
                                            </h2>

                                            <p className="text-xs text-gray-400">
                                                Consent information submitted
                                                with the application
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div
                                        className={`flex items-center gap-3 rounded-2xl p-4 ${
                                            Number(application.consent) === 1
                                                ? "bg-green-50"
                                                : "bg-red-50"
                                        }`}
                                    >
                                        {Number(application.consent) === 1 ? (
                                            <CheckCircle2
                                                size={20}
                                                className="text-green-700"
                                            />
                                        ) : (
                                            <XCircle
                                                size={20}
                                                className="text-red-600"
                                            />
                                        )}

                                        <div>
                                            <p className="text-sm font-bold text-gray-800">
                                                {getConsentLabel(
                                                    application.consent,
                                                )}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Consent status stored with the
                                                application record.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">

                            {/* Application Summary */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <h2 className="text-lg font-black text-green-950">
                                    Application Summary
                                </h2>

                                <div className="mt-5 space-y-4">
                                    <SummaryRow
                                        label="Reference"
                                        value={
                                            application.reference_number ||
                                            "—"
                                        }
                                        valueClass="text-green-800"
                                    />

                                    <SummaryRow
                                        label="Type"
                                        value={
                                            typeLabels[
                                                application.application_type
                                            ] ||
                                            application.application_type ||
                                            "—"
                                        }
                                    />

                                    <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                                        <span className="text-sm text-gray-500">
                                            Status
                                        </span>

                                        <span
                                            className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${status.className}`}
                                        >
                                            {status.label}
                                        </span>
                                    </div>

                                    <SummaryRow
                                        label="Application ID"
                                        value={`#${application.id}`}
                                    />

                                    <SummaryRow
                                        label="Consent"
                                        value={getConsentLabel(
                                            application.consent,
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Timeline */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                                <h2 className="text-lg font-black text-green-950">
                                    Timeline
                                </h2>

                                <div className="mt-5 space-y-5">
                                    <div className="flex gap-3">
                                        <div className="relative flex w-8 justify-center">
                                            <span className="absolute top-8 h-full w-px bg-green-100" />

                                            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                                <FileText size={15} />
                                            </span>
                                        </div>

                                        <div className="pb-2">
                                            <p className="text-sm font-bold text-green-950">
                                                Application Submitted
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {formatDateTime(
                                                    application.created_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="flex w-8 justify-center">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <CalendarDays size={15} />
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-green-950">
                                                Last Updated
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {formatDateTime(
                                                    application.updated_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Current Status */}
                            <section className="rounded-3xl border border-green-100 bg-green-50 p-5">
                                <p className="text-sm font-bold text-green-900">
                                    Current Status
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                    <StatusIcon
                                        size={17}
                                        className="text-green-700"
                                    />

                                    <span className="text-sm font-semibold text-green-800">
                                        {status.label}
                                    </span>
                                </div>

                                <p className="mt-2 text-xs leading-5 text-green-800/70">
                                    Use Edit Application to update the
                                    application information.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const ApplicationTypeDetails = ({ type, details }) => {
    if (!details) {
        return null
    }

    const fields = getTypeFields(type, details)

    if (fields.length === 0) {
        return null
    }

    return (
        <section className="rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-900/5">
            <div className="border-b border-gray-100 px-6 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                        <FileText size={19} />
                    </div>

                    <div>
                        <h2 className="text-lg font-black text-green-950">
                            Application Information
                        </h2>

                        <p className="text-xs text-gray-400">
                            Details submitted for this application type
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
                {fields.map((field) => (
                    <InfoItem
                        key={field.label}
                        label={field.label}
                        value={field.value}
                        fullWidth={field.fullWidth}
                    />
                ))}
            </div>
        </section>
    )
}

const getTypeFields = (type, details) => {
    const fields = []

    const add = (label, value, fullWidth = false) => {
        if (
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ""
        ) {
            fields.push({
                label,
                value,
                fullWidth,
            })
        }
    }

    switch (type) {
        case "FARMER":
            add(
                "Support Interests",
                details.support_interests,
                true,
            )
            break

        case "TRAINING":
            add("Program", details.program)
            add("Participant", details.participant)
            add("Organisation", details.organisation)
            add(
                "Accessibility Needs",
                details.accessibility_needs,
                true,
            )
            break

        case "SERVICE":
            add("Crop", details.crop)
            add("Category", details.category)
            add("Urgency", details.urgency)
            add("Problem", details.problem, true)
            break

        case "INTERNSHIP":
            add("College", details.college)
            add("Course", details.course)
            add("Duration", details.duration)
            add("Interest", details.interest)
            add(
                "Additional Information",
                details.additional_information,
                true,
            )
            break

        case "FPO":
            add("Members", details.members)
            add("Commodity", details.commodity)
            add("FPO Status", details.status)
            add(
                "Support Required",
                details.support_required,
                true,
            )
            break

        case "PARTNERSHIP":
            add("Theme", details.theme)
            add("Geography", details.geography)
            add("Target", details.target)
            add("Timeline", details.timeline)
            add("Message", details.message, true)
            break

        case "VOLUNTEER":
            add("Expertise", details.expertise)
            add("Experience", details.experience)
            add("Availability", details.availability)
            add(
                "Contribution",
                details.contribution,
                true,
            )
            break

        default:
            break
    }

    return fields
}

const getLocationLabel = (type) => {
    const labels = {
        SERVICE: "Location",
        INTERNSHIP: "Location",
        PARTNERSHIP: "Geography",
        VOLUNTEER: "Location",
    }

    return labels[type] || "Location"
}

const hasLocationData = (application) => {
    const location = application.location || {}

    return Boolean(
        location.village ||
            location.taluka ||
            location.district ||
            location.pin ||
            location.value,
    )
}

const InfoItem = ({
    label,
    value,
    fullWidth = false,
}) => {
    return (
        <div className={fullWidth ? "sm:col-span-2" : ""}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {label}
            </p>

            <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-gray-800">
                {value || "—"}
            </p>
        </div>
    )
}

const SummaryRow = ({
    label,
    value,
    valueClass = "text-gray-800",
}) => {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
            <span className="text-sm text-gray-500">
                {label}
            </span>

            <span
                className={`text-right text-sm font-semibold ${valueClass}`}
            >
                {value}
            </span>
        </div>
    )
}

const LoadingState = () => {
    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">
                    <div className="mb-8 h-5 w-40 animate-pulse rounded bg-gray-200" />

                    <div className="h-12 w-96 max-w-full animate-pulse rounded-xl bg-gray-200" />

                    <div className="mt-8 grid gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <div className="h-64 animate-pulse rounded-3xl bg-white" />
                            <div className="h-64 animate-pulse rounded-3xl bg-white" />
                        </div>

                        <div className="space-y-6">
                            <div className="h-80 animate-pulse rounded-3xl bg-white" />
                            <div className="h-64 animate-pulse rounded-3xl bg-white" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const ErrorState = ({
    message,
    onRetry,
}) => {
    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <main className="px-5 py-8 md:px-8 lg:px-10">
                <div className="mx-auto max-w-350">
                    <Link
                        to="/admin/applications"
                        className="kr-hover-link inline-flex items-center gap-2 text-sm font-semibold text-gray-500"
                    >
                        <ArrowLeft size={17} />
                        Back to Applications
                    </Link>

                    <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-600">
                            <FileText size={24} />
                        </div>

                        <h1 className="mt-5 text-xl font-black text-red-900">
                            Application not found
                        </h1>

                        <p className="mt-2 text-sm text-red-700">
                            {message}
                        </p>

                        <button
                            type="button"
                            onClick={onRetry}
                            className="mt-5 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ApplicationDetails