import { useQuery } from "@tanstack/react-query"
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    ExternalLink,
    FileText,
    Landmark,
    MapPin,
    ShieldCheck,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { getSchemeBySlug } from "../../api/schemeApi.js"
import Loader from "../../components/common/Loader"

const formatDate = (value) => {
    if (!value) {
        return null
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return null
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date)
}

const parseList = (value) => {
    if (!value) {
        return []
    }

    if (Array.isArray(value)) {
        return value.filter(Boolean)
    }

    return value
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
}

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
    CENTRAL: "Central Government",
    STATE: "State Government",
}

const SchemeDetails = () => {
    const { slug } = useParams()

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["scheme", slug],
        queryFn: () => getSchemeBySlug(slug),
        enabled: Boolean(slug),
    })

    const scheme = data?.scheme

    const documents = parseList(scheme?.documents)
    const steps = parseList(scheme?.steps)

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading scheme..."
            />
        )
    }

    if (isError || !scheme) {
        return (
            <main className="min-h-screen bg-[#F6FAF7] px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-350">
                    <Link
                        to="/schemes"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-green-800"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Back to Government Schemes
                    </Link>

                    <div className="mt-8 rounded-4xl border border-gray-200 bg-white p-10 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <Landmark size={25} />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold text-gray-950">
                            Scheme Not Found
                        </h1>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
                            The requested government scheme could not be
                            found or is currently unavailable.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="kr-hover-button rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                Try Again
                            </button>

                            <Link
                                to="/schemes"
                                className="kr-hover-button rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:border-green-200 hover:text-green-800"
                            >
                                View All Schemes
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    const deadline = formatDate(scheme.deadline)
    const lastVerified = formatDate(scheme.last_verified)

    return (
        <main className="min-h-screen bg-[#F6FAF7] px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">

                {/* Back */}
                <Link
                    to="/schemes"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-green-800"
                >
                    <ArrowLeft
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />

                    Back to Government Schemes
                </Link>

                {/* Hero */}
                <section className="relative mt-8 overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/95 p-7 shadow-xl shadow-gray-900/10 sm:p-10 lg:p-12">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-100/60" />
                    <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-emerald-100/40" />

                    <div className="relative">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="kr-hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/10">
                                <Landmark
                                    size={24}
                                    strokeWidth={2}
                                />
                            </div>

                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                Government Scheme
                            </span>

                            {scheme.status && (
                                <span
                                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                        statusStyles[scheme.status] ??
                                        "border-gray-200 bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {statusLabels[scheme.status] ??
                                        scheme.status}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-7 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            {scheme.name}
                        </h1>

                        <div className="mt-6 h-1 w-20 rounded-full bg-green-600" />

                        <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-600">
                            {scheme.overview}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {scheme.level && (
                                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                                    {levelLabels[scheme.level] ??
                                        scheme.level}
                                </span>
                            )}

                            {scheme.category && (
                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                    {scheme.category}
                                </span>
                            )}

                            {scheme.authority && (
                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                    {scheme.authority}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-6">

                        {/* Eligibility */}
                        <InfoSection
                            icon={<CheckCircle2 size={21} />}
                            eyebrow="Who Can Apply"
                            title="Eligibility"
                        >
                            <p className="whitespace-pre-line text-base leading-8 text-gray-600">
                                {scheme.eligibility}
                            </p>
                        </InfoSection>

                        {/* Benefits */}
                        <InfoSection
                            icon={<ShieldCheck size={21} />}
                            eyebrow="Available Support"
                            title="Benefits"
                        >
                            <p className="whitespace-pre-line text-base leading-8 text-gray-600">
                                {scheme.benefits}
                            </p>
                        </InfoSection>

                        {/* Documents */}
                        <InfoSection
                            icon={<FileText size={21} />}
                            eyebrow="Requirements"
                            title="Required Documents"
                        >
                            {documents.length > 0 ? (
                                <div className="space-y-3">
                                    {documents.map((document, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-2xl bg-[#F6FAF7] p-4"
                                        >
                                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-100 text-xs font-bold text-green-700">
                                                {index + 1}
                                            </span>

                                            <p className="text-sm leading-6 text-gray-700">
                                                {document}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Document information is not available.
                                </p>
                            )}
                        </InfoSection>

                        {/* Steps */}
                        <InfoSection
                            icon={<Landmark size={21} />}
                            eyebrow="How It Works"
                            title="Application Steps"
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

                                            <div className="pt-1">
                                                <p className="text-sm leading-7 text-gray-700">
                                                    {step}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Application steps are not available.
                                </p>
                            )}
                        </InfoSection>

                        {/* Disclaimer */}
                        {scheme.disclaimer && (
                            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-6">
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-800">
                                    Important Information
                                </p>

                                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-amber-900/80">
                                    {scheme.disclaimer}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Scheme Information */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                                Scheme Information
                            </p>

                            <div className="mt-6 space-y-5">
                                {scheme.authority && (
                                    <DetailItem
                                        label="Authority"
                                        value={scheme.authority}
                                    />
                                )}

                                {scheme.level && (
                                    <DetailItem
                                        label="Level"
                                        value={
                                            levelLabels[scheme.level] ??
                                            scheme.level
                                        }
                                    />
                                )}

                                {scheme.category && (
                                    <DetailItem
                                        label="Category"
                                        value={scheme.category}
                                    />
                                )}

                                {scheme.beneficiary && (
                                    <DetailItem
                                        label="Beneficiary"
                                        value={scheme.beneficiary}
                                    />
                                )}

                                {scheme.geography && (
                                    <div className="border-t border-gray-100 pt-5">
                                        <div className="flex items-start gap-3">
                                            <MapPin
                                                size={17}
                                                className="mt-0.5 shrink-0 text-green-700"
                                            />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Geography
                                                </p>

                                                <p className="mt-1 text-sm leading-6 text-gray-700">
                                                    {scheme.geography}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <CalendarDays size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-gray-950">
                                        Important Dates
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Scheme timeline
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-5">
                                <DetailItem
                                    label="Application Deadline"
                                    value={
                                        deadline ??
                                        "No deadline specified"
                                    }
                                />

                                <DetailItem
                                    label="Last Verified"
                                    value={
                                        lastVerified ??
                                        "Not available"
                                    }
                                />
                            </div>
                        </div>

                        {/* Official Source */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5">
                            <p className="text-sm font-bold uppercase tracking-[0.15em] text-green-700">
                                Official Source
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Always refer to the official source for the
                                latest application requirements and updates.
                            </p>

                            {scheme.official_url && (
                                <a
                                    href={scheme.official_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="kr-hover-button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                                >
                                    Visit Official Source
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </div>

                        {/* Verification */}
                        <div className="rounded-4xl border border-green-100 bg-green-50/70 p-6">
                            <div className="flex items-start gap-3">
                                <ShieldCheck
                                    size={19}
                                    className="mt-0.5 shrink-0 text-green-700"
                                />

                                <div>
                                    <p className="text-sm font-bold text-green-900">
                                        Information Verification
                                    </p>

                                    <p className="mt-2 text-xs leading-6 text-green-900/70">
                                        This scheme information was last
                                        verified on{" "}
                                        <span className="font-semibold">
                                            {lastVerified ??
                                                "an unspecified date"}
                                        </span>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

const InfoSection = ({
    icon,
    eyebrow,
    title,
    children,
}) => {
    return (
        <section className="rounded-4xl border border-gray-200 bg-white p-7 shadow-lg shadow-gray-900/5 sm:p-8">
            <div className="flex items-center gap-3">
                <div className="kr-hover-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    {icon}
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                        {eyebrow}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-950">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="mt-6">
                {children}
            </div>
        </section>
    )
}

const DetailItem = ({ label, value }) => {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-700">
                {value}
            </p>
        </div>
    )
}

export default SchemeDetails