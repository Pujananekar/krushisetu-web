import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    ClipboardList,
    // Download,
    // ExternalLink,
    FileText,
    // HelpCircle,
    Loader2,
    Pencil,
    RefreshCw,
    // Sparkles,
    Users,
    Wrench,
    AlertCircle,
} from "lucide-react"
import { getAdminDepartmentById } from "../../api/adminDepartmentsApi"



const DepartmentDetails = () => {
    const { id } = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["admin", "department", id],
        queryFn: () => getAdminDepartmentById(id),
        enabled: Boolean(id),
    })

    const department = data?.data

    /* --------------------------------
       Loading
    -------------------------------- */

    if (isLoading) {
        return (
            <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[70vh] max-w-[1500px] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <Loader2
                                size={26}
                                className="animate-spin"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            Loading department
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Fetching department information from the server...
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    /* --------------------------------
       Error / Not Found
    -------------------------------- */

    if (isError || !department) {
        return (
            <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[70vh] max-w-[900px] items-center justify-center">
                    <div className="w-full rounded-4xl border border-red-200 bg-white p-8 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <AlertCircle size={26} />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            Unable to load department
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "The requested department could not be found."}
                        </p>

                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <RefreshCw size={17} />
                                Try Again
                            </button>

                            <Link
                                to="/admin/content/departments"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <ArrowLeft size={17} />
                                Back to Departments
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-full bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px] space-y-6">

                <div className=" pt-5">
                    <Link
                        to="/admin/content/departments"
                        className="kr-hover-link inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Departments
                    </Link>
                </div>

                {/* =========================================
                    HEADER
                ========================================== */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <Link
                                to="/admin/content/departments"
                                className="transition hover:text-green-700"
                            >
                                Departments
                            </Link>

                            <span>/</span>

                            <span className="font-medium text-green-700">
                                {department.title}
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {department.title}
                        </h1>

                        <p className="mt-1 max-w-3xl text-sm text-gray-500">
                            View complete department information and related
                            public-facing content.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            to={`/admin/content/departments/${department.id}/edit`}
                            className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                        >
                            <Pencil size={17} />
                            Edit Department
                        </Link>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RefreshCw
                                size={17}
                                className={
                                    isFetching
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Refresh
                        </button>
                    </div>
                </div>

                {/* =========================================
                    HERO
                ========================================== */}

                <div className="overflow-hidden rounded-4xl border border-green-100 bg-white shadow-xl shadow-gray-900/5">
                    <div className="bg-gradient-to-br from-green-50 via-white to-[#F6FAF7] p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex items-start gap-5">
                                <div className="kr-hover-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-green-100 text-green-700 shadow-sm">
                                    <Building2 size={30} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
                                        Department
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                                        {department.title}
                                    </h2>

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <span className="whitespace-nowrap rounded-xl bg-gray-100 px-3 py-2 font-mono text-xs text-gray-600">
                                            {department.slug}
                                        </span>

                                        <span className="rounded-xl bg-green-100 px-3 py-2 text-xs font-semibold text-green-700">
                                            ID: {department.id}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-green-100 bg-white px-5 py-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Call to Action
                                </p>

                                <p className="mt-2 whitespace-nowrap text-sm font-semibold text-green-700">
                                    {department.cta || "—"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    DESCRIPTION
                ========================================== */}

                <div className="kr-hover-card rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <FileText size={20} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="kr-hover-title text-lg font-bold text-gray-900">
                                Description
                            </h2>

                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                                {department.description ||
                                    "No description available."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    CONTENT GRID
                ========================================== */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    {/* =====================================
                        BENEFICIARIES
                    ====================================== */}

                    <ContentCard
                        icon={<Users size={20} />}
                        title="Beneficiaries"
                        count={department.beneficiaries?.length || 0}
                    >
                        {department.beneficiaries?.length > 0 ? (
                            <div className="space-y-3">
                                {department.beneficiaries.map(
                                    (item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <CheckCircle2
                                                size={18}
                                                className="mt-0.5 shrink-0 text-green-600"
                                            />

                                            <p className="text-sm leading-6 text-gray-700">
                                                {item.beneficiary}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyContent message="No beneficiaries have been added yet." />
                        )}
                    </ContentCard>

                    {/* =====================================
                        SERVICES
                    ====================================== */}

                    <ContentCard
                        icon={<Wrench size={20} />}
                        title="Services"
                        count={department.services?.length || 0}
                    >
                        {department.services?.length > 0 ? (
                            <div className="space-y-3">
                                {department.services.map(
                                    (item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <CheckCircle2
                                                size={18}
                                                className="mt-0.5 shrink-0 text-green-600"
                                            />

                                            <p className="text-sm leading-6 text-gray-700">
                                                {item.service}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyContent message="No services have been added yet." />
                        )}
                    </ContentCard>

                    {/* =====================================
                        PROCESS
                    ====================================== */}

                    <ContentCard
                        icon={<ClipboardList size={20} />}
                        title="Process"
                        count={department.process?.length || 0}
                    >
                        {department.process?.length > 0 ? (
                            <div className="space-y-3">
                                {department.process.map(
                                    (item, index) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-700 text-xs font-bold text-white">
                                                {index + 1}
                                            </div>

                                            <p className="pt-1 text-sm leading-6 text-gray-700">
                                                {item.step}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyContent message="No process steps have been added yet." />
                        )}
                    </ContentCard>

                    {/* =====================================
                        FAQs
                    ====================================== */}
                    {/* 
                    <ContentCard
                        icon={<HelpCircle size={20} />}
                        title="FAQs"
                        count={department.faqs?.length || 0}
                    >
                        {department.faqs?.length > 0 ? (
                            <div className="space-y-4">
                                {department.faqs.map(
                                    (item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <p className="font-semibold text-gray-900">
                                                {item.question}
                                            </p>

                                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                                {item.answer}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyContent message="No FAQs have been added yet." />
                        )}
                    </ContentCard> */}

                    {/* =====================================
                        DOWNLOADS
                    ====================================== */}

                    {/* <ContentCard
                        icon={<Download size={20} />}
                        title="Downloads"
                        count={department.downloads?.length || 0}
                    >
                        {department.downloads?.length > 0 ? (
                            <div className="space-y-3">
                                {department.downloads.map(
                                    (item) => (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="kr-hover-link flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                    <FileText
                                                        size={17}
                                                    />
                                                </div>

                                                <p className="truncate text-sm font-medium text-gray-700">
                                                    {item.title}
                                                </p>
                                            </div>

                                            <ExternalLink
                                                size={17}
                                                className="shrink-0 text-gray-400"
                                            />
                                        </a>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyContent message="No downloads have been added yet." />
                        )}
                    </ContentCard> */}

                    {/* =====================================
                        SUCCESS STORIES
                    ====================================== */}

                    {/* <ContentCard
                        icon={<Sparkles size={20} />}
                        title="Success Stories"
                        count={
                            department.successStories?.length || 0
                        }
                    >
                        {department.successStories?.length > 0 ? (
                            <div className="space-y-4">
                                {department.successStories.map(
                                    (item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4"
                                        >
                                            <h3 className="font-semibold text-gray-900">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyContent message="No success stories have been added yet." />
                        )}
                    </ContentCard> */}
                </div>

                {/* =========================================
                    METADATA
                ========================================== */}

                <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
                            <FileText size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Department Information
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                System information for this department
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <InfoItem
                            label="Department ID"
                            value={department.id}
                        />

                        <InfoItem
                            label="Slug"
                            value={department.slug}
                            mono
                        />

                        <InfoItem
                            label="Created"
                            value={formatDate(
                                department.created_at,
                            )}
                        />

                        <InfoItem
                            label="Last Updated"
                            value={formatDate(
                                department.updated_at,
                            )}
                        />
                    </div>
                </div>

                {/* =========================================
                    BOTTOM ACTIONS
                ========================================== */}

                <div className="flex flex-col gap-3 border-t border-gray-200 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/admin/content/departments"
                        className="kr-hover-link inline-flex items-center gap-2 text-sm font-semibold text-gray-600"
                    >
                        <ArrowLeft size={17} />
                        Back to Departments
                    </Link>

                    <Link
                        to={`/admin/content/departments/${department.id}/edit`}
                        className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                    >
                        <Pencil size={17} />
                        Edit Department
                    </Link>
                </div>
            </div>
        </section>
    )
}

/* =========================================
   Content Card
========================================= */

const ContentCard = ({
    icon,
    title,
    count,
    children,
}) => {
    return (
        <div className="kr-hover-card rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                        {icon}
                    </div>

                    <h2 className="kr-hover-title text-lg font-bold text-gray-900">
                        {title}
                    </h2>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                    {count}
                </span>
            </div>

            {children}
        </div>
    )
}

/* =========================================
   Empty Content
========================================= */

const EmptyContent = ({ message }) => {
    return (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-[#FAFCFB] px-5 py-8 text-center">
            <p className="text-sm text-gray-500">
                {message}
            </p>
        </div>
    )
}

/* =========================================
   Information Item
========================================= */

const InfoItem = ({
    label,
    value,
    mono = false,
}) => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-[#F6FAF7] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p
                className={`mt-2 text-sm font-semibold text-gray-800 ${mono ? "break-all font-mono" : ""
                    }`}
            >
                {value || "—"}
            </p>
        </div>
    )
}

/* =========================================
   Date Formatter
========================================= */

const formatDate = (value) => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "—"
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

export default DepartmentDetails