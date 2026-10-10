import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    Mail,
    MessageSquare,
    Phone,
    Save,
    UserRound,
    XCircle,
} from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
    getEnquiryById,
    updateEnquiryStatus,
} from "../../api/adminEnquiryApi.js"

const STATUS_OPTIONS = [
    "NEW",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
]

const statusLabels = {
    NEW: "New",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    CLOSED: "Closed",
}

const EnquiryDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [selectedStatus, setSelectedStatus] = useState("")

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-enquiry", id],
        queryFn: () => getEnquiryById(id),
        enabled: Boolean(id),
        retry: false,
    })

    const enquiry = data?.data || null

    const currentStatus =
        selectedStatus ||
        enquiry?.status ||
        "NEW"

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            updateEnquiryStatus(id, status),

        onSuccess: async (response) => {
            const updatedEnquiry =
                response?.data

            if (updatedEnquiry) {
                setSelectedStatus(
                    updatedEnquiry.status
                )
            }

            await queryClient.invalidateQueries({
                queryKey: ["admin-enquiry", id],
            })

            await queryClient.invalidateQueries({
                queryKey: ["admin-enquiries"],
            })
        },
    })

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value)
    }

    const handleSaveStatus = () => {
        if (!id || !currentStatus) {
            return
        }

        if (
            currentStatus ===
            enquiry?.status
        ) {
            return
        }

        statusMutation.mutate({
            id,
            status: currentStatus,
        })
    }

    const formatDateTime = (date) => {
        if (!date) {
            return "—"
        }

        const parsedDate = new Date(date)

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "—"
        }

        return parsedDate.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        )
    }

    const formatStatus = (status) => {
        return (
            statusLabels[status] ||
            status ||
            "Unknown"
        )
    }

    if (isLoading) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[500px] max-w-[1200px] items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-700" />

                        <p className="text-sm font-medium text-gray-500">
                            Loading enquiry...
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    if (isError || !enquiry) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[500px] max-w-[1200px] items-center justify-center">
                    <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <XCircle className="h-7 w-7" />
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-gray-900">
                            Enquiry not found
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "The requested enquiry could not be found."}
                        </p>

                        <Link
                            to="/admin/crm/enquiries"
                            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Enquiries
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1200px] space-y-6">

                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <Link
                            to="/admin/crm/enquiries"
                            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Enquiries
                        </Link>

                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Enquiry Details
                            </h1>

                            <StatusBadge
                                status={
                                    enquiry.status
                                }
                            />
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            Reference Number:{" "}
                            <span className="font-semibold text-gray-700">
                                {
                                    enquiry.reference_number
                                }
                            </span>
                        </p>
                    </div>

                </div>

                {/* Main Grid */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">

                    {/* Left */}

                    <div className="space-y-6">

                        {/* Contact Information */}

                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <UserRound className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Contact Information
                                        </h2>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Information submitted by the visitor
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">

                                <InfoItem
                                    icon={UserRound}
                                    label="Name"
                                    value={
                                        enquiry.name
                                    }
                                />

                                <InfoItem
                                    icon={Mail}
                                    label="Email"
                                    value={
                                        enquiry.email
                                    }
                                    href={
                                        enquiry.email
                                            ? `mailto:${enquiry.email}`
                                            : undefined
                                    }
                                />

                                <InfoItem
                                    icon={Phone}
                                    label="Phone"
                                    value={
                                        enquiry.phone
                                    }
                                    href={
                                        enquiry.phone
                                            ? `tel:${enquiry.phone}`
                                            : undefined
                                    }
                                />

                                <InfoItem
                                    icon={MessageSquare}
                                    label="Reference Number"
                                    value={
                                        enquiry.reference_number
                                    }
                                />

                            </div>

                        </div>

                        {/* Message */}

                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">
                                            Enquiry Message
                                        </h2>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Message submitted through the website
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 sm:p-6">
                                <div className="rounded-2xl bg-[#F6FAF7] p-5">
                                    <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                                        {
                                            enquiry.message
                                        }
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Timeline */}

                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

                            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                                <h2 className="text-base font-bold text-gray-900">
                                    Enquiry Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">

                                <InfoItem
                                    icon={Clock3}
                                    label="Created At"
                                    value={formatDateTime(
                                        enquiry.created_at
                                    )}
                                />

                                <InfoItem
                                    icon={Clock3}
                                    label="Last Updated"
                                    value={formatDateTime(
                                        enquiry.updated_at
                                    )}
                                />

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="space-y-6">

                        {/* Status */}

                        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">

                            <div className="border-b border-gray-100 px-5 py-5">
                                <h2 className="text-base font-bold text-gray-900">
                                    Update Status
                                </h2>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Change the current status of this enquiry.
                                </p>
                            </div>

                            <div className="space-y-4 p-5">

                                <div>
                                    <label
                                        htmlFor="enquiry-status"
                                        className="mb-2 block text-xs font-bold text-gray-700"
                                    >
                                        Status
                                    </label>

                                    <select
                                        id="enquiry-status"
                                        value={
                                            currentStatus
                                        }
                                        onChange={
                                            handleStatusChange
                                        }
                                        className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                    >
                                        {STATUS_OPTIONS.map(
                                            (
                                                status
                                            ) => (
                                                <option
                                                    key={
                                                        status
                                                    }
                                                    value={
                                                        status
                                                    }
                                                >
                                                    {
                                                        statusLabels[
                                                            status
                                                        ]
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleSaveStatus
                                    }
                                    disabled={
                                        statusMutation.isPending ||
                                        currentStatus ===
                                            enquiry.status
                                    }
                                    className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />

                                    {statusMutation.isPending
                                        ? "Saving..."
                                        : "Save Status"}
                                </button>

                                {statusMutation.isSuccess && (
                                    <div className="flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-xs font-semibold text-green-700">
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                        Status updated successfully.
                                    </div>
                                )}

                                {statusMutation.isError && (
                                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-semibold leading-5 text-red-700">
                                        {statusMutation.error?.response?.data?.message ||
                                            statusMutation.error?.message ||
                                            "Failed to update enquiry status."}
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Current Status */}

                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Current Status
                            </p>

                            <div className="mt-4 flex items-center gap-3">
                                <StatusIcon
                                    status={
                                        enquiry.status
                                    }
                                />

                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        {formatStatus(
                                            enquiry.status
                                        )}
                                    </p>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        Enquiry status
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Quick Contact */}

                        <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">

                            <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                Quick Contact
                            </p>

                            <div className="mt-4 space-y-3">

                                {enquiry.email && (
                                    <a
                                        href={`mailto:${enquiry.email}`}
                                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-gray-700 transition hover:bg-green-100"
                                    >
                                        <Mail className="h-4 w-4 text-green-700" />
                                        Send Email
                                    </a>
                                )}

                                {enquiry.phone && (
                                    <a
                                        href={`tel:${enquiry.phone}`}
                                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-gray-700 transition hover:bg-green-100"
                                    >
                                        <Phone className="h-4 w-4 text-green-700" />
                                        Call Enquirer
                                    </a>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}

const InfoItem = ({
    icon: Icon,
    label,
    value,
    href,
}) => {
    const content = (
        <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                    {value || "—"}
                </p>
            </div>
        </div>
    )

    if (href) {
        return (
            <a
                href={href}
                className="rounded-2xl transition hover:bg-green-50/60"
            >
                {content}
            </a>
        )
    }

    return content
}

const StatusBadge = ({ status }) => {
    const styles = {
        NEW: "bg-blue-50 text-blue-700",
        IN_PROGRESS:
            "bg-amber-50 text-amber-700",
        RESOLVED:
            "bg-green-50 text-green-700",
        CLOSED:
            "bg-gray-100 text-gray-600",
    }

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ${
                styles[status] ||
                "bg-gray-100 text-gray-600"
            }`}
        >
            {statusLabels[status] ||
                status ||
                "Unknown"}
        </span>
    )
}

const StatusIcon = ({ status }) => {
    if (status === "NEW") {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <MessageSquare className="h-5 w-5" />
            </div>
        )
    }

    if (status === "IN_PROGRESS") {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <Clock3 className="h-5 w-5" />
            </div>
        )
    }

    if (status === "RESOLVED") {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
            </div>
        )
    }

    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
            <XCircle className="h-5 w-5" />
        </div>
    )
}

export default EnquiryDetails