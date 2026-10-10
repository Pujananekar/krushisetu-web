import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeft,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    Edit3,
    FileText,
    Info,
    MapPin,
    ShieldCheck,
    Target,
    Users,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import { getAdminImpactIndicatorById } from "../../api/adminImpactApi.js"

const formatDate = (date) => {
    if (!date) {
        return "—"
    }

    const value = String(date).match(/^\d{4}-\d{2}-\d{2}/)

    if (!value) {
        return "—"
    }

    const parsedDate = new Date(`${value[0]}T00:00:00`)

    if (Number.isNaN(parsedDate.getTime())) {
        return "—"
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const formatValue = (value, unit) => {
    if (value === null || value === undefined || value === "") {
        return "—"
    }

    const number = Number(value)

    if (Number.isNaN(number)) {
        return `${value}${unit ? ` ${unit}` : ""}`
    }

    return `${number.toLocaleString("en-IN")}${unit ? ` ${unit}` : ""}`
}

const getApprovalLabel = (status) => {
    switch (status) {
        case "APPROVED":
            return "Approved"

        case "PENDING":
            return "Pending"

        case "DRAFT":
            return "Draft"

        case "REJECTED":
            return "Rejected"

        default:
            return status || "—"
    }
}

const getApprovalClasses = (status) => {
    switch (status) {
        case "APPROVED":
            return "border-green-200 bg-green-50 text-green-700"

        case "PENDING":
            return "border-amber-200 bg-amber-50 text-amber-700"

        case "DRAFT":
            return "border-gray-200 bg-gray-50 text-gray-600"

        case "REJECTED":
            return "border-red-200 bg-red-50 text-red-700"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}

const ImpactDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-impact-indicator", id],
        queryFn: () => getAdminImpactIndicatorById(id),
        enabled: Boolean(id),
    })

    const indicator =
        data?.impactIndicator ||
        data?.impact_indicator ||
        data?.indicator ||
        null

    if (isLoading) {
        return <Loader text="Loading impact indicator..." />
    }

    if (isError || !indicator) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1400px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <BarChart3 className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Unable to load impact indicator
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                "The requested impact indicator could not be found."}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Try Again
                            </button>

                            <Link
                                to="/admin/content/impact"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Impact
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/impact"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                <span>Projects & Impact</span>

                                <span>/</span>

                                <span>Impact Indicators</span>

                                <span>/</span>

                                <span className="font-medium text-green-700">
                                    Details
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {indicator.indicator_name}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                View the complete impact measurement and
                                supporting information.
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/admin/content/impact/${indicator.id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />
                        Edit Indicator
                    </Link>
                </div>

                {/* Hero */}
                <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
                    <div className="relative overflow-hidden bg-linear-to-br from-green-950 via-green-900 to-green-800 px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
                        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-green-400/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex flex-wrap items-center gap-3">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getApprovalClasses(
                                        indicator.approval_status
                                    )}`}
                                >
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    {getApprovalLabel(
                                        indicator.approval_status
                                    )}
                                </span>

                                {indicator.unit && (
                                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                                        {indicator.unit}
                                    </span>
                                )}
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-green-200">
                                        Impact Indicator
                                    </p>

                                    <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                        {indicator.indicator_name}
                                    </h2>

                                    {indicator.project_name && (
                                        <p className="mt-4 text-sm text-green-100/80">
                                            Project:{" "}
                                            <span className="font-semibold text-white">
                                                {
                                                    indicator.project_name
                                                }
                                            </span>
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
                                    <p className="text-xs font-medium uppercase tracking-wider text-green-200">
                                        Recorded Value
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-white">
                                        {formatValue(
                                            indicator.value,
                                            indicator.unit
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick information */}
                    <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                        <QuickInfo
                            icon={
                                <Target className="h-5 w-5" />
                            }
                            label="Indicator Value"
                            value={formatValue(
                                indicator.value,
                                indicator.unit
                            )}
                        />

                        <QuickInfo
                            icon={
                                <CalendarDays className="h-5 w-5" />
                            }
                            label="Reporting Period"
                            value={
                                indicator.period_from ||
                                indicator.period_to
                                    ? `${formatDate(
                                          indicator.period_from
                                      )} - ${formatDate(
                                          indicator.period_to
                                      )}`
                                    : "—"
                            }
                        />

                        <QuickInfo
                            icon={
                                <MapPin className="h-5 w-5" />
                            }
                            label="Location"
                            value={
                                indicator.location || "—"
                            }
                        />

                        <QuickInfo
                            icon={
                                <ShieldCheck className="h-5 w-5" />
                            }
                            label="Approval"
                            value={getApprovalLabel(
                                indicator.approval_status
                            )}
                        />
                    </div>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

                    {/* Left */}
                    <div className="space-y-6">

                        {/* Measurement */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <SectionHeader
                                icon={
                                    <BarChart3 className="h-5 w-5" />
                                }
                                title="Measurement"
                                description="The recorded measurement for this impact indicator."
                            />

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <InfoCard
                                    label="Indicator"
                                    value={
                                        indicator.indicator_name
                                    }
                                />

                                <InfoCard
                                    label="Value"
                                    value={formatValue(
                                        indicator.value,
                                        indicator.unit
                                    )}
                                />

                                <InfoCard
                                    label="Unit"
                                    value={
                                        indicator.unit || "—"
                                    }
                                />
                            </div>
                        </section>

                        {/* Evidence */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <SectionHeader
                                icon={
                                    <FileText className="h-5 w-5" />
                                }
                                title="Evidence Note"
                                description="Supporting information recorded for this measurement."
                            />

                            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                                {indicator.evidence_note ? (
                                    <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                        {
                                            indicator.evidence_note
                                        }
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No evidence note has been added.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Internal Notes */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <SectionHeader
                                icon={
                                    <Info className="h-5 w-5" />
                                }
                                title="Internal Notes"
                                description="Internal information associated with this indicator."
                            />

                            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                                {indicator.notes ? (
                                    <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                        {indicator.notes}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No internal notes have been added.
                                    </p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Association */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="font-bold text-gray-900">
                                Association
                            </h2>

                            <div className="mt-5 space-y-4">
                                <SidebarInfo
                                    icon={
                                        <BarChart3 className="h-4 w-4" />
                                    }
                                    label="Project"
                                    value={
                                        indicator.project_name ||
                                        "—"
                                    }
                                />

                                <SidebarInfo
                                    icon={
                                        <Users className="h-4 w-4" />
                                    }
                                    label="Department"
                                    value={
                                        indicator.department_name ||
                                        "—"
                                    }
                                />
                            </div>
                        </section>

                        {/* Reporting */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="font-bold text-gray-900">
                                Reporting Information
                            </h2>

                            <div className="mt-5 space-y-4">
                                <SidebarInfo
                                    icon={
                                        <CalendarDays className="h-4 w-4" />
                                    }
                                    label="Period From"
                                    value={formatDate(
                                        indicator.period_from
                                    )}
                                />

                                <SidebarInfo
                                    icon={
                                        <CalendarDays className="h-4 w-4" />
                                    }
                                    label="Period To"
                                    value={formatDate(
                                        indicator.period_to
                                    )}
                                />

                                <SidebarInfo
                                    icon={
                                        <MapPin className="h-4 w-4" />
                                    }
                                    label="Location"
                                    value={
                                        indicator.location ||
                                        "—"
                                    }
                                />
                            </div>
                        </section>

                        {/* Approval */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Approval Status
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Current review state of this
                                        indicator.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${getApprovalClasses(
                                        indicator.approval_status
                                    )}`}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    {getApprovalLabel(
                                        indicator.approval_status
                                    )}
                                </span>
                            </div>
                        </section>

                        {/* Edit */}
                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                            <p className="text-sm font-semibold text-green-900">
                                Need to update this indicator?
                            </p>

                            <p className="mt-1 text-xs leading-5 text-green-800/80">
                                Update the measurement, evidence or
                                approval information when required.
                            </p>

                            <Link
                                to={`/admin/content/impact/${indicator.id}/edit`}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Indicator
                            </Link>
                        </div>
                    </aside>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between ">
                    <Link
                        to="/admin/content/impact"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Impact
                    </Link>

                    <Link
                        to={`/admin/content/impact/${indicator.id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 className="h-4 w-4" />
                        Edit Indicator
                    </Link>
                </div>
            </div>
        </section>
    )
}

const QuickInfo = ({
    icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-center gap-3 px-6 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs text-gray-400">
                    {label}
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                    {value}
                </p>
            </div>
        </div>
    )
}

const SectionHeader = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                {icon}
            </div>

            <div>
                <h2 className="font-bold text-gray-900">
                    {title}
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    )
}

const InfoCard = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">
                {label}
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-gray-800">
                {value || "—"}
            </p>
        </div>
    )
}

const SidebarInfo = ({
    icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs text-gray-400">
                    {label}
                </p>

                <p className="mt-1 wrap-break-words text-sm font-semibold leading-6 text-gray-800">
                    {value || "—"}
                </p>
            </div>
        </div>
    )
}

export default ImpactDetails