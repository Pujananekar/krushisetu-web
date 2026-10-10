import { useEffect, useMemo, useState } from "react"
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    FileText,
    Loader2,
    Save,
    ShieldCheck,
    UserRound,
} from "lucide-react"
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"

import {
    getApplicatonById,
    updateApplication,
} from "../api/adminApplicationsApi"

const TYPE_LABELS = {
    FARMER: "Farmer",
    TRAINING: "Training",
    SERVICE: "Service",
    INTERNSHIP: "Internship",
    FPO: "FPO",
    PARTNERSHIP: "Partnership",
    VOLUNTEER: "Volunteer",
}

const STATUS_OPTIONS = [
    {
        value: "NEW",
        label: "New",
    },
    {
        value: "IN_PROGRESS",
        label: "In Progress",
    },
    {
        value: "RESOLVED",
        label: "Resolved",
    },
    {
        value: "CLOSED",
        label: "Closed",
    },
]

const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"

const textareaClass =
    "min-h-32 w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"

const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700"

const ApplicationEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [form, setForm] = useState({})
    const [initialized, setInitialized] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

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

    const updateMutation = useMutation({
        mutationFn: (payload) =>
            updateApplication(id, payload),

        onSuccess: async () => {
            setSuccessMessage(
                "Application updated successfully.",
            )

            await queryClient.invalidateQueries({
                queryKey: ["admin-application", id],
            })

            await queryClient.invalidateQueries({
                queryKey: ["admin-applications"],
            })

            navigate(`/admin/applications/${id}`)
        },
    })

    useEffect(() => {
        if (!application || initialized) {
            return
        }

        const details = application.details || {}
        const applicant = application.applicant || {}
        const location = application.location || {}

        setForm({
            status: application.status || "NEW",
            consent: Boolean(application.consent),

            name: applicant.name || "",
            mobile: applicant.mobile || "",
            email: applicant.email || "",

            village: location.village || "",
            taluka: location.taluka || "",
            district: location.district || "",
            pin: location.pin || "",
            location: location.value || "",

            support_interests:
                details.support_interests || "",

            program: details.program || "",
            participant: details.participant || "",
            organisation: details.organisation || "",
            accessibility_needs:
                details.accessibility_needs || "",

            crop: details.crop || "",
            category: details.category || "",
            urgency: details.urgency || "",
            problem: details.problem || "",

            college: details.college || "",
            course: details.course || "",
            duration: details.duration || "",
            interest: details.interest || "",
            additional_information:
                details.additional_information || "",

            contact: details.contact || "",
            members:
                details.members !== null &&
                    details.members !== undefined
                    ? details.members
                    : "",
            commodity: details.commodity || "",
            fpo_status: details.status || "",
            support_required:
                details.support_required || "",

            theme: details.theme || "",
            geography: details.geography || "",
            target: details.target || "",
            timeline: details.timeline || "",
            message: details.message || "",

            expertise: details.expertise || "",
            experience: details.experience || "",
            availability: details.availability || "",
            contribution: details.contribution || "",
        })

        setInitialized(true)
    }, [application, initialized])

    const typeLabel = useMemo(() => {
        return (
            TYPE_LABELS[application?.application_type] ||
            application?.application_type ||
            "Application"
        )
    }, [application])

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }))

        if (successMessage) {
            setSuccessMessage("")
        }

        if (updateMutation.isError) {
            updateMutation.reset()
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!application) {
            return
        }

        setSuccessMessage("")

        const payload = {
            status: form.status,
            consent: Boolean(form.consent),
        }

        switch (application.application_type) {
            case "FARMER":
                Object.assign(payload, {
                    name: form.name,
                    mobile: form.mobile,
                    village: form.village,
                    taluka: form.taluka,
                    district: form.district,
                    pin: form.pin,
                    support_interests:
                        form.support_interests,
                })
                break

            case "TRAINING":
                Object.assign(payload, {
                    program: form.program,
                    name: form.name,
                    mobile: form.mobile,
                    village: form.village,
                    district: form.district,
                    participant: form.participant,
                    organisation:
                        form.organisation,
                    accessibility_needs:
                        form.accessibility_needs,
                })
                break

            case "SERVICE":
                Object.assign(payload, {
                    name: form.name,
                    mobile: form.mobile,
                    crop: form.crop,
                    location: form.location,
                    category: form.category,
                    urgency: form.urgency,
                    problem: form.problem,
                })
                break

            case "INTERNSHIP":
                Object.assign(payload, {
                    name: form.name,
                    college: form.college,
                    course: form.course,
                    location: form.location,
                    duration: form.duration,
                    interest: form.interest,
                    additional_information:
                        form.additional_information,
                })
                break

            case "FPO":
                Object.assign(payload, {
                    organisation: form.name,
                    contact: form.contact,
                    district: form.district,
                    members:
                        form.members === ""
                            ? ""
                            : Number(form.members),
                    commodity: form.commodity,
                    fpo_status: form.fpo_status,
                    support_required:
                        form.support_required,
                })
                break

            case "PARTNERSHIP":
                Object.assign(payload, {
                    organisation: form.name,
                    contact: form.contact,
                    email: form.email,
                    mobile: form.mobile,
                    theme: form.theme,
                    geography: form.geography,
                    target: form.target,
                    timeline: form.timeline,
                    message: form.message,
                })
                break

            case "VOLUNTEER":
                Object.assign(payload, {
                    name: form.name,
                    mobile: form.mobile,
                    location: form.location,
                    expertise: form.expertise,
                    experience: form.experience,
                    availability:
                        form.availability,
                    contribution:
                        form.contribution,
                })
                break

            default:
                return
        }

        updateMutation.mutate(payload)
    }

    const renderField = (
        label,
        field,
        {
            type = "text",
            placeholder = "",
            required = false,
        } = {},
    ) => {
        return (
            <div>
                <label className={labelClass}>
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    )}
                </label>

                <input
                    type={type}
                    value={form[field] ?? ""}
                    onChange={(event) =>
                        updateField(
                            field,
                            event.target.value,
                        )
                    }
                    placeholder={placeholder}
                    required={required}
                    disabled={updateMutation.isPending}
                    className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-50`}
                />
            </div>
        )
    }

    const renderTextarea = (
        label,
        field,
        {
            placeholder = "",
            required = false,
        } = {},
    ) => {
        return (
            <div>
                <label className={labelClass}>
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    )}
                </label>

                <textarea
                    value={form[field] ?? ""}
                    onChange={(event) =>
                        updateField(
                            field,
                            event.target.value,
                        )
                    }
                    placeholder={placeholder}
                    required={required}
                    disabled={updateMutation.isPending}
                    className={`${textareaClass} disabled:cursor-not-allowed disabled:bg-gray-50`}
                />
            </div>
        )
    }

    const renderSelect = (
        label,
        field,
        options,
        { required = false } = {},
    ) => {
        return (
            <div>
                <label className={labelClass}>
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    )}
                </label>

                <select
                    value={form[field] ?? ""}
                    onChange={(event) =>
                        updateField(
                            field,
                            event.target.value,
                        )
                    }
                    required={required}
                    disabled={updateMutation.isPending}
                    className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-50`}
                >
                    <option value="">
                        Select {label}
                    </option>

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    const renderApplicantSection = () => {
        const type = application?.application_type

        if (type === "FPO") {
            return (
                <Section
                    icon={UserRound}
                    title="Organisation Information"
                    description="Update the FPO organisation information."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        {renderField(
                            "Organisation",
                            "name",
                            {
                                required: true,
                            },
                        )}

                        {renderField(
                            "Contact",
                            "contact",
                            {
                                required: true,
                            },
                        )}

                        {renderField(
                            "District",
                            "district",
                            {
                                required: true,
                            },
                        )}
                    </div>
                </Section>
            )
        }

        if (type === "PARTNERSHIP") {
            return (
                <Section
                    icon={UserRound}
                    title="Organisation Information"
                    description="Update the partnership organisation and contact information."
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        {renderField(
                            "Organisation",
                            "name",
                            {
                                required: true,
                            },
                        )}

                        {renderField(
                            "Contact Person",
                            "contact",
                            {
                                required: true,
                            },
                        )}

                        {renderField(
                            "Email",
                            "email",
                            {
                                type: "email",
                                required: true,
                            },
                        )}

                        {renderField(
                            "Mobile",
                            "mobile",
                            {
                                required: true,
                            },
                        )}
                    </div>
                </Section>
            )
        }

        return (
            <Section
                icon={UserRound}
                title="Applicant Information"
                description="Update the applicant's basic information."
            >
                <div className="grid gap-5 md:grid-cols-2">
                    {renderField(
                        "Full Name",
                        "name",
                        {
                            required: true,
                        },
                    )}

                    {renderField(
                        "Mobile",
                        "mobile",
                        {
                            required: true,
                        },
                    )}
                </div>
            </Section>
        )
    }

    const renderTypeDetails = () => {
        switch (application?.application_type) {
            case "FARMER":
                return (
                    <>
                        <Section
                            icon={FileText}
                            title="Location Information"
                            description="Update the farmer's location information."
                        >
                            <div className="grid gap-5 md:grid-cols-2">
                                {renderField(
                                    "Village",
                                    "village",
                                    {
                                        required: true,
                                    },
                                )}

                                {renderField(
                                    "Taluka",
                                    "taluka",
                                    {
                                        required: true,
                                    },
                                )}

                                {renderField(
                                    "District",
                                    "district",
                                    {
                                        required: true,
                                    },
                                )}

                                {renderField(
                                    "PIN Code",
                                    "pin",
                                    {
                                        required: true,
                                    },
                                )}
                            </div>
                        </Section>

                        <Section
                            icon={FileText}
                            title="Farmer Details"
                            description="Update farmer application information."
                        >
                            {renderTextarea(
                                "Support Interests",
                                "support_interests",
                            )}
                        </Section>
                    </>
                )

            case "TRAINING":
                return (
                    <Section
                        icon={FileText}
                        title="Training Details"
                        description="Update training application information."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            {renderField(
                                "Program",
                                "program",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Participant",
                                "participant",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Name",
                                "name",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Mobile",
                                "mobile",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Village",
                                "village",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "District",
                                "district",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Organisation",
                                "organisation",
                            )}
                        </div>

                        <div className="mt-5">
                            {renderTextarea(
                                "Accessibility Needs",
                                "accessibility_needs",
                            )}
                        </div>
                    </Section>
                )

            case "SERVICE":
                return (
                    <Section
                        icon={FileText}
                        title="Service Details"
                        description="Update service request information."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            {renderField(
                                "Name",
                                "name",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Mobile",
                                "mobile",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Crop",
                                "crop",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Location",
                                "location",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Category",
                                "category",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Urgency",
                                "urgency",
                            )}
                        </div>

                        <div className="mt-5">
                            {renderTextarea(
                                "Problem",
                                "problem",
                            )}
                        </div>
                    </Section>
                )

            case "INTERNSHIP":
                return (
                    <Section
                        icon={FileText}
                        title="Internship Details"
                        description="Update internship application information."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            {renderField(
                                "Name",
                                "name",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "College",
                                "college",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Course",
                                "course",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Location",
                                "location",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Duration",
                                "duration",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Interest",
                                "interest",
                                {
                                    required: true,
                                },
                            )}
                        </div>

                        <div className="mt-5">
                            {renderTextarea(
                                "Additional Information",
                                "additional_information",
                            )}
                        </div>
                    </Section>
                )

            case "FPO":
                return (
                    <Section
                        icon={FileText}
                        title="FPO Details"
                        description="Update FPO application information."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            {renderField(
                                "Members",
                                "members",
                                {
                                    type: "number",
                                },
                            )}

                            {renderField(
                                "Commodity",
                                "commodity",
                            )}

                            {renderField(
                                "FPO Status",
                                "fpo_status",
                            )}

                            {renderField(
                                "District",
                                "district",
                                {
                                    required: true,
                                },
                            )}
                        </div>

                        <div className="mt-5">
                            {renderTextarea(
                                "Support Required",
                                "support_required",
                            )}
                        </div>
                    </Section>
                )

            case "PARTNERSHIP":
                return (
                    <Section
                        icon={FileText}
                        title="Partnership Details"
                        description="Update partnership information."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            {renderField(
                                "Theme",
                                "theme",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Geography",
                                "geography",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Target",
                                "target",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Timeline",
                                "timeline",
                            )}
                        </div>

                        <div className="mt-5">
                            {renderTextarea(
                                "Message",
                                "message",
                            )}
                        </div>
                    </Section>
                )

            case "VOLUNTEER":
                return (
                    <Section
                        icon={FileText}
                        title="Volunteer Details"
                        description="Update volunteer application information."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            {renderField(
                                "Name",
                                "name",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Mobile",
                                "mobile",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Location",
                                "location",
                                {
                                    required: true,
                                },
                            )}

                            {renderField(
                                "Expertise",
                                "expertise",
                            )}

                            {renderField(
                                "Experience",
                                "experience",
                            )}

                            {renderField(
                                "Availability",
                                "availability",
                            )}
                        </div>

                        <div className="mt-5">
                            {renderTextarea(
                                "Contribution",
                                "contribution",
                            )}
                        </div>
                    </Section>
                )

            default:
                return null
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#F6FAF7] px-6">
                <div className="flex items-center gap-3 rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-xl shadow-gray-900/10">
                    <Loader2 className="h-5 w-5 animate-spin text-green-700" />

                    <span className="text-sm font-medium text-gray-600">
                        Loading application...
                    </span>
                </div>
            </div>
        )
    }

    if (isError || !application) {
        return (
            <div className="min-h-[70vh] bg-[#F6FAF7] px-6 py-10">
                <div className="mx-auto max-w-4xl rounded-4xl border border-red-100 bg-white p-8 shadow-xl shadow-gray-900/10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <FileText className="h-6 w-6" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Unable to load application
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error?.message ||
                            "The requested application could not be found."}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="kr-hover-button inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10"
                        >
                            Try Again
                        </button>

                        <Link
                            to="/admin/applications"
                            className="kr-hover-button rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700"
                        >
                            Back to Applications
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <Link
                        to={`/admin/applications/${id}`}
                        className="kr-hover-link mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Application
                    </Link>

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800">
                                <FileText className="h-3.5 w-3.5" />
                                Edit Application
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {typeLabel}
                            </h1>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                <span>
                                    Reference:{" "}
                                    <span className="font-semibold text-gray-700">
                                        {application.reference_number ||
                                            "Not assigned"}
                                    </span>
                                </span>

                                <span className="hidden text-gray-300 sm:inline">
                                    •
                                </span>

                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4" />
                                    {formatDate(
                                        application.created_at,
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Application ID
                            </p>

                            <p className="mt-1 text-lg font-bold text-gray-900">
                                #{application.id}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Success message */}
                {successMessage && (
                    <div className="mb-6 flex items-center gap-3 rounded-3xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-800">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        {successMessage}
                    </div>
                )}

                {/* Error message */}
                {updateMutation.isError && (
                    <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-5 py-4">
                        <p className="text-sm font-semibold text-red-800">
                            Failed to update application.
                        </p>

                        <p className="mt-1 text-sm text-red-700">
                            {updateMutation.error?.response?.data
                                ?.message ||
                                updateMutation.error?.message ||
                                "Something went wrong while saving the application."}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">

                        {/* Main */}
                        <div className="space-y-6">
                            {renderApplicantSection()}

                            {renderTypeDetails()}

                            {/* Consent */}
                            <Section
                                icon={ShieldCheck}
                                title="Consent"
                                description="Manage the consent recorded with this application."
                            >
                                <label className="flex cursor-pointer items-start gap-4 rounded-3xl border border-gray-200 bg-gray-50/70 p-5 transition hover:border-green-200 hover:bg-green-50/40">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(
                                            form.consent,
                                        )}
                                        onChange={(event) =>
                                            updateField(
                                                "consent",
                                                event.target.checked,
                                            )
                                        }
                                        disabled={
                                            updateMutation.isPending
                                        }
                                        className="mt-1 h-5 w-5 rounded border-gray-300 text-green-700 accent-green-700 focus:ring-green-500"
                                    />

                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            Consent granted
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            The applicant has provided
                                            consent for this application.
                                        </p>
                                    </div>
                                </label>
                            </Section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">

                            {/* Status */}
                            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/10">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-gray-900">
                                            Application Status
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            Select the current status.
                                        </p>
                                    </div>
                                </div>

                                {renderSelect(
                                    "Status",
                                    "status",
                                    STATUS_OPTIONS,
                                    {
                                        required: true,
                                    },
                                )}
                            </div>

                            {/* Summary */}
                            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/10">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Application Type
                                </p>

                                <p className="mt-2 text-xl font-bold text-gray-900">
                                    {typeLabel}
                                </p>

                                <div className="my-5 h-px bg-gray-100" />

                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Reference Number
                                </p>

                                <p className="mt-2 break-all text-sm font-semibold text-gray-700">
                                    {application.reference_number ||
                                        "Not assigned"}
                                </p>

                                <div className="my-5 h-px bg-gray-100" />

                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Created
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-700">
                                    {formatDate(
                                        application.created_at,
                                    )}
                                </p>
                            </div>

                            {/* Info */}
                            <div className="rounded-4xl border border-green-100 bg-green-50/70 p-6">
                                <p className="text-sm font-semibold text-green-900">
                                    Application Editor
                                </p>

                                <p className="mt-2 text-sm leading-6 text-green-800/80">
                                    Update the application information and
                                    status, then save the changes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-gray-900/10">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                                to={`/admin/applications/${id}`}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800"
                            >
                                <ArrowLeft size={17} />
                                Back to Application
                            </Link>

                            <button
                                type="submit"
                                disabled={updateMutation.isPending}
                                className="kr-hover-button inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {updateMutation.isPending ? (
                                    <>
                                        <Loader2 size={17} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={17} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Section = ({
    icon: Icon,
    title,
    description,
    children,
}) => {
    return (
        <section className="rounded-4xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-900/10 sm:p-6">
            <div className="mb-6 flex items-start gap-4">
                <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
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

            {children}
        </section>
    )
}

const formatDate = (value) => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

export default ApplicationEditor