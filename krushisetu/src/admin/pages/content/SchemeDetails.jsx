import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    AlertCircle,
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Edit3,
    ExternalLink,
    FileCheck2,
    FileText,
    Globe2,
    Landmark,
    Link2,
    LoaderCircle,
    MapPin,
    ShieldCheck,
} from "lucide-react"

import { getAdminSchemeById } from "../../api/adminSchemesApi"

const statusStyles = {
    ACTIVE: "border-green-200 bg-green-50 text-green-700",
    UPCOMING: "border-blue-200 bg-blue-50 text-blue-700",
    CLOSED: "border-red-200 bg-red-50 text-red-700",
    INACTIVE: "border-gray-200 bg-gray-100 text-gray-600",
}

const statusLabels = {
    ACTIVE: "Active",
    UPCOMING: "Upcoming",
    CLOSED: "Closed",
    INACTIVE: "Inactive",
}

const levelLabels = {
    CENTRAL: "Central",
    STATE: "State",
}

const formatDate = (value) => {
    if (!value) {
        return "Not specified"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date)
}

const parseList = (value) => {
    if (Array.isArray(value)) {
        return value.filter(Boolean)
    }

    if (typeof value === "string") {
        return value
            .split(/\r?\n/)
            .map((item) => item.trim())
            .filter(Boolean)
    }

    return []
}

const SchemeDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-scheme", id],
        queryFn: () => getAdminSchemeById(id),
        enabled: Boolean(id),
    })

    const scheme = data?.scheme

    if (isLoading) {
        return (
            <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[70vh] max-w-350 items-center justify-center">
                    <div className="flex items-center gap-3 rounded-3xl border border-gray-200 bg-white px-6 py-5 text-sm font-medium text-gray-600 shadow-sm">
                        <LoaderCircle
                            size={20}
                            className="animate-spin text-green-700"
                        />
                        Loading scheme details...
                    </div>
                </div>
            </section>
        )
    }

    if (isError || !scheme) {
        return (
            <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-350">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle
                                size={20}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <div>
                                <h2 className="font-semibold text-red-900">
                                    Unable to load scheme
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    {error?.response?.data?.message ||
                                        error?.message ||
                                        "The requested scheme could not be found."}
                                </p>

                                <Link
                                    to="/admin/content/schemes"
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Schemes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const documents = parseList(scheme.documents)
    const steps = parseList(scheme.steps)

    return (
        <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-350 space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/schemes"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                <span>Content</span>
                                <span>/</span>
                                <span>Schemes</span>
                                <span>/</span>
                                <span className="font-medium text-green-700">
                                    Details
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {scheme.name}
                                </h1>

                                <span
                                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                                        statusStyles[scheme.status] ||
                                        "border-gray-200 bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {statusLabels[scheme.status] ||
                                        scheme.status}
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                {scheme.authority}
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/admin/content/schemes/${id}/edit`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Edit3 size={17} />
                        Edit Scheme
                    </Link>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">

                    {/* Left */}
                    <div className="space-y-6">

                        {/* Scheme Overview */}
                        <DetailsCard
                            icon={<Landmark size={19} />}
                            title="Scheme Overview"
                            description="Basic information about this government scheme."
                        >
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem
                                    label="Scheme Name"
                                    value={scheme.name}
                                />

                                <InfoItem
                                    label="Authority"
                                    value={scheme.authority}
                                />

                                <InfoItem
                                    label="Level"
                                    value={
                                        levelLabels[scheme.level] ||
                                        scheme.level
                                    }
                                />

                                <InfoItem
                                    label="Category"
                                    value={scheme.category}
                                />

                                <InfoItem
                                    label="Beneficiary"
                                    value={scheme.beneficiary}
                                />

                                <InfoItem
                                    label="Geography"
                                    value={
                                        scheme.geography ||
                                        "Not specified"
                                    }
                                />
                            </div>
                        </DetailsCard>

                        {/* Overview */}
                        <DetailsCard
                            icon={<FileText size={19} />}
                            title="Overview"
                            description="General information about the scheme."
                        >
                            <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                {scheme.overview || "No overview provided."}
                            </p>
                        </DetailsCard>

                        {/* Eligibility */}
                        <DetailsCard
                            icon={<ShieldCheck size={19} />}
                            title="Eligibility"
                            description="Eligibility requirements for beneficiaries."
                        >
                            <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                {scheme.eligibility ||
                                    "No eligibility information provided."}
                            </p>
                        </DetailsCard>

                        {/* Benefits */}
                        <DetailsCard
                            icon={<CheckCircle2 size={19} />}
                            title="Benefits"
                            description="Benefits available under the scheme."
                        >
                            <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                                {scheme.benefits ||
                                    "No benefits information provided."}
                            </p>
                        </DetailsCard>

                        {/* Required Documents */}
                        <DetailsCard
                            icon={<FileCheck2 size={19} />}
                            title="Required Documents"
                            description="Documents that may be required when applying."
                        >
                            {documents.length > 0 ? (
                                <div className="space-y-3">
                                    {documents.map((document, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-2xl bg-[#F6FAF7] px-4 py-3.5"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-700 text-xs font-bold text-white">
                                                {index + 1}
                                            </div>

                                            <p className="pt-1 text-sm leading-6 text-gray-700">
                                                {document}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No documents have been added." />
                            )}
                        </DetailsCard>

                        {/* Application Steps */}
                        <DetailsCard
                            icon={<FileCheck2 size={19} />}
                            title="Application Steps"
                            description="Steps that applicants should follow."
                        >
                            {steps.length > 0 ? (
                                <div className="space-y-4">
                                    {steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-700 text-sm font-bold text-white">
                                                {index + 1}
                                            </div>

                                            <p className="pt-1 text-sm leading-7 text-gray-600">
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState text="No application steps have been added." />
                            )}
                        </DetailsCard>

                        {/* Disclaimer */}
                        {scheme.disclaimer && (
                            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <AlertCircle
                                        size={19}
                                        className="mt-0.5 shrink-0 text-amber-700"
                                    />

                                    <div>
                                        <h2 className="font-semibold text-amber-900">
                                            Disclaimer
                                        </h2>

                                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-amber-800/80">
                                            {scheme.disclaimer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-6">

                        {/* Status */}
                        <DetailsCard
                            icon={<ShieldCheck size={18} />}
                            title="Scheme Status"
                            description="Current status of the scheme."
                            compact
                        >
                            <span
                                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                    statusStyles[scheme.status] ||
                                    "border-gray-200 bg-gray-100 text-gray-600"
                                }`}
                            >
                                {statusLabels[scheme.status] ||
                                    scheme.status}
                            </span>
                        </DetailsCard>

                        {/* Important Dates */}
                        <DetailsCard
                            icon={<CalendarDays size={18} />}
                            title="Important Dates"
                            description="Verification and deadline information."
                            compact
                        >
                            <div className="space-y-5">
                                <InfoItem
                                    label="Last Verified"
                                    value={formatDate(
                                        scheme.last_verified
                                    )}
                                />

                                <InfoItem
                                    label="Application Deadline"
                                    value={formatDate(
                                        scheme.deadline
                                    )}
                                />
                            </div>
                        </DetailsCard>

                        {/* Geography */}
                        <DetailsCard
                            icon={<MapPin size={18} />}
                            title="Geography"
                            description="Where the scheme applies."
                            compact
                        >
                            <p className="text-sm leading-7 text-gray-600">
                                {scheme.geography ||
                                    "No geography specified."}
                            </p>
                        </DetailsCard>

                        {/* Official Source */}
                        <DetailsCard
                            icon={<Globe2 size={18} />}
                            title="Official Source"
                            description="Official government source."
                            compact
                        >
                            {scheme.official_url ? (
                                <a
                                    href={scheme.official_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-start gap-2 text-sm font-medium leading-6 text-green-700 transition hover:text-green-800"
                                >
                                    <Link2
                                        size={16}
                                        className="mt-1 shrink-0"
                                    />

                                    <span className="break-all">
                                        {scheme.official_url}
                                    </span>

                                    <ExternalLink
                                        size={14}
                                        className="mt-1 shrink-0 opacity-60 transition group-hover:opacity-100"
                                    />
                                </a>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No official URL provided.
                                </p>
                            )}
                        </DetailsCard>

                        {/* URL */}
                        <DetailsCard
                            icon={<Globe2 size={18} />}
                            title="Public URL"
                            description="Public scheme path."
                            compact
                        >
                            <div className="rounded-2xl bg-[#F6FAF7] p-4">
                                <p className="break-all text-xs leading-5 text-gray-600">
                                    /schemes/{scheme.slug}
                                </p>
                            </div>
                        </DetailsCard>

                        {/* Edit */}
                        <div className="rounded-3xl border border-green-100 bg-green-50 p-5">
                            <div className="flex items-start gap-3">
                                <Edit3
                                    size={18}
                                    className="mt-0.5 shrink-0 text-green-700"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold text-green-900">
                                        Need to change something?
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-green-800/70">
                                        Open the scheme editor to update its
                                        information.
                                    </p>

                                    <Link
                                        to={`/admin/content/schemes/${id}/edit`}
                                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800"
                                    >
                                        <Edit3 size={14} />
                                        Edit Scheme
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}

const DetailsCard = ({
    icon,
    title,
    description,
    children,
    compact = false,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div
                className={`border-b border-gray-100 ${
                    compact ? "px-5 py-4" : "px-5 py-5 sm:px-6"
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                        {icon}
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {title}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <div className={compact ? "p-5" : "p-5 sm:p-6"}>
                {children}
            </div>
        </div>
    )
}

const InfoItem = ({ label, value }) => {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-1.5 wrap-break-words text-sm font-medium leading-6 text-gray-800">
                {value || "Not specified"}
            </p>
        </div>
    )
}

const EmptyState = ({ text }) => {
    return (
        <div className="rounded-2xl bg-gray-50 px-4 py-4 text-sm text-gray-500">
            {text}
        </div>
    )
}

export default SchemeDetails