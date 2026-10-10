    import { useEffect, useState } from "react"
    import { Link, useNavigate, useParams } from "react-router-dom"

    import {
        ArrowLeft,
        CalendarDays,
        Check,
        Clock3,
        FileText,
        GraduationCap,
        MapPin,
        Save,
        UserRound,
        Wand2,
        XCircle,
    } from "lucide-react"

    import {
        useMutation,
        useQuery,
        useQueryClient,
    } from "@tanstack/react-query"

    import Loader from "../../../components/common/Loader"

    import {
        getAdminTrainingEventById,
        createAdminTrainingEvent,
        updateAdminTrainingEvent,
    } from "../../api/adminTrainingEventsApi.js"

    const trainingTypes = [
        "Training",
        "Workshop",
        "Awareness Program",
        "Orientation",
    ]

    const eventStatuses = [
        "UPCOMING",
        "ONGOING",
        "COMPLETED",
        "CANCELLED",
    ]

    const createEmptyForm = () => ({
        title: "",
        slug: "",
        description: "",
        training_type: "Training",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        venue: "",
        location: "",
        organiser: "",
        trainer: "",
        capacity: "",
        registration_open: "",
        registration_close: "",
        status: "UPCOMING",
        registration_enabled: true,
    })

    const getStatusClasses = (status) => {
        switch (status) {
            case "UPCOMING":
                return "bg-blue-50 text-blue-700 border-blue-200"

            case "ONGOING":
                return "bg-green-50 text-green-700 border-green-200"

            case "COMPLETED":
                return "bg-purple-50 text-purple-700 border-purple-200"

            case "CANCELLED":
                return "bg-red-50 text-red-700 border-red-200"

            default:
                return "bg-gray-50 text-gray-700 border-gray-200"
        }
    }

    const formatStatus = (status) => {
        if (!status) return "Unknown"

        return status
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (character) =>
                character.toUpperCase()
            )
    }

    const slugify = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
    }

    const TrainingEventEditor = () => {
        const { id } = useParams()
        const navigate = useNavigate()
        const queryClient = useQueryClient()

        const isEditMode = Boolean(id)

        const [form, setForm] = useState(createEmptyForm)
        const [errors, setErrors] = useState({})
        const [serverMessage, setServerMessage] = useState("")
        const [serverError, setServerError] = useState("")

        const {
            data,
            isLoading,
            isError,
        } = useQuery({
            queryKey: ["admin-training-event", id],
            queryFn: () => getAdminTrainingEventById(id),
            enabled: isEditMode,
        })

        useEffect(() => {
            if (!isEditMode || !data?.trainingEvent) return

            const event = data.trainingEvent

            setForm({
                title: event.title ?? "",
                slug: event.slug ?? "",
                description: event.description ?? "",
                training_type: event.training_type ?? "Training",

                start_date: event.start_date
                    ? String(event.start_date).slice(0, 10)
                    : "",

                end_date: event.end_date
                    ? String(event.end_date).slice(0, 10)
                    : "",

                start_time: event.start_time
                    ? String(event.start_time).slice(0, 5)
                    : "",

                end_time: event.end_time
                    ? String(event.end_time).slice(0, 5)
                    : "",

                venue: event.venue ?? "",
                location: event.location ?? "",
                organiser: event.organiser ?? "",
                trainer: event.trainer ?? "",

                capacity:
                    event.capacity !== null &&
                    event.capacity !== undefined
                        ? String(event.capacity)
                        : "",

                registration_open: event.registration_open
                    ? String(event.registration_open).slice(0, 10)
                    : "",

                registration_close: event.registration_close
                    ? String(event.registration_close).slice(0, 10)
                    : "",

                status: event.status ?? "UPCOMING",

                registration_enabled:
                    Boolean(event.registration_enabled),
            })
        }, [data, isEditMode])

        const updateField = (field, value) => {
            setForm((previous) => ({
                ...previous,
                [field]: value,
            }))

            setErrors((previous) => ({
                ...previous,
                [field]: "",
            }))

            setServerError("")
            setServerMessage("")
        }

        const handleTitleChange = (value) => {
            setForm((previous) => ({
                ...previous,
                title: value,

                ...(isEditMode || previous.slug
                    ? {}
                    : {
                        slug: slugify(value),
                    }),
            }))

            setErrors((previous) => ({
                ...previous,
                title: "",
            }))

            setServerError("")
            setServerMessage("")
        }

        const generateSlug = () => {
            const generatedSlug = slugify(form.title)

            updateField("slug", generatedSlug)
        }

        const validateForm = () => {
            const validationErrors = {}

            if (!form.title.trim()) {
                validationErrors.title =
                    "Training / event title is required."
            }

            if (!form.slug.trim()) {
                validationErrors.slug = "Slug is required."
            }

            if (!form.description.trim()) {
                validationErrors.description =
                    "Description is required."
            }

            if (!form.training_type.trim()) {
                validationErrors.training_type =
                    "Training type is required."
            }

            if (!form.start_date) {
                validationErrors.start_date =
                    "Start date is required."
            }

            if (
                form.end_date &&
                form.start_date &&
                form.end_date < form.start_date
            ) {
                validationErrors.end_date =
                    "End date cannot be before the start date."
            }

            if (
                form.registration_open &&
                form.registration_close &&
                form.registration_close <
                    form.registration_open
            ) {
                validationErrors.registration_close =
                    "Registration close date cannot be before the opening date."
            }

            if (
                form.capacity !== "" &&
                Number(form.capacity) < 0
            ) {
                validationErrors.capacity =
                    "Capacity cannot be negative."
            }

            setErrors(validationErrors)

            return (
                Object.keys(validationErrors).length === 0
            )
        }

        const buildPayload = () => ({
            title: form.title.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            training_type: form.training_type.trim(),

            start_date: form.start_date,

            end_date:
                form.end_date || null,

            start_time:
                form.start_time || null,

            end_time:
                form.end_time || null,

            venue:
                form.venue.trim() || null,

            location:
                form.location.trim() || null,

            organiser:
                form.organiser.trim() || null,

            trainer:
                form.trainer.trim() || null,

            capacity:
                form.capacity === ""
                    ? null
                    : Number(form.capacity),

            registration_open:
                form.registration_open || null,

            registration_close:
                form.registration_close || null,

            status: form.status,

            registration_enabled:
                form.registration_enabled ? 1 : 0,
        })

        const saveMutation = useMutation({
            mutationFn: async () => {
                if (!validateForm()) {
                    throw new Error(
                        "Please fix the highlighted fields."
                    )
                }

                const payload = buildPayload()

                if (isEditMode) {
                    return updateAdminTrainingEvent(
                        id,
                        payload
                    )
                }

                return createAdminTrainingEvent(payload)
            },

            onSuccess: async (response) => {
                await queryClient.invalidateQueries({
                    queryKey: ["admin-training-events"],
                })

                if (isEditMode) {
                    await queryClient.invalidateQueries({
                        queryKey: [
                            "admin-training-event",
                            id,
                        ],
                    })
                }

                setServerError("")

                setServerMessage(
                    response?.message ||
                        "Training event saved successfully."
                )

                if (
                    !isEditMode &&
                    response?.trainingEvent?.id
                ) {
                    navigate(
                        `/admin/content/training/${response.trainingEvent.id}/edit`,
                        {
                            replace: true,
                        }
                    )
                }
            },

            onError: (error) => {
                setServerMessage("")

                setServerError(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Unable to save training event."
                )
            },
        })

        const handleSubmit = (event) => {
            event.preventDefault()

            if (!validateForm()) {
                return
            }

            saveMutation.mutate()
        }

        if (isEditMode && isLoading) {
            return (
                <Loader
                    variant="page"
                    text="Loading training event..."
                />
            )
        }

        if (isEditMode && isError) {
            return (
                <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto flex min-h-[60vh] max-w-375 items-center justify-center">
                        <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-gray-900/5">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                <XCircle className="h-7 w-7" />
                            </div>

                            <h2 className="mt-4 text-lg font-bold text-gray-900">
                                Unable to load training event
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                The requested training event could not
                                be loaded.
                            </p>

                            <Link
                                to="/admin/content/training"
                                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Training & Events
                            </Link>
                        </div>
                    </div>
                </section>
            )
        }

        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-375 space-y-6">

                    {/* Header */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-3">
                            <Link
                                to="/admin/content/training"
                                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Link>

                            <div>
                                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-green-700">
                                    <GraduationCap className="h-4 w-4" />

                                    <span>
                                        Training & Events
                                    </span>

                                    <span className="text-gray-400">
                                        /
                                    </span>

                                    <span className="text-gray-500">
                                        {isEditMode
                                            ? "Edit"
                                            : "Create"}
                                    </span>
                                </div>

                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {isEditMode
                                        ? "Edit Training / Event"
                                        : "Add Training / Event"}
                                </h1>

                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    Manage training event information
                                    stored in the Krushisetu database.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                form="training-event-form"
                                disabled={
                                    saveMutation.isPending
                                }
                                className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saveMutation.isPending ? (
                                    <Loader
                                        variant="button"
                                        text="Saving..."
                                    />
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />

                                        {isEditMode
                                            ? "Save Changes"
                                            : "Create Event"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    {serverMessage && (
                        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                            <Check className="h-4 w-4 shrink-0" />
                            {serverMessage}
                        </div>
                    )}

                    {serverError && (
                        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                            <XCircle className="h-4 w-4 shrink-0" />
                            {serverError}
                        </div>
                    )}

                    <form
                        id="training-event-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

                            {/* Main Content */}
                            <div className="space-y-6">

                                {/* Basic Information */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-6 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <FileText className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-gray-900">
                                                Basic Information
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Define the core information
                                                for this training or event.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        {/* Title */}
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Training / Event Title
                                            </label>

                                            <input
                                                type="text"
                                                value={form.title}
                                                onChange={(event) =>
                                                    handleTitleChange(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Enter training or event title"
                                                className={`h-12 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.title
                                                        ? "border-red-300 focus:border-red-300 focus:ring-red-50"
                                                        : "border-gray-200"
                                                }`}
                                            />

                                            {errors.title && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {errors.title}
                                                </p>
                                            )}
                                        </div>

                                        {/* Slug */}
                                        <div>
                                            <div className="mb-2 flex items-center justify-between gap-3">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    URL Slug
                                                </label>

                                                <button
                                                    type="button"
                                                    onClick={
                                                        generateSlug
                                                    }
                                                    disabled={
                                                        !form.title.trim()
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-100 hover:text-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Wand2 className="h-3.5 w-3.5" />
                                                    Generate Slug
                                                </button>
                                            </div>

                                            <input
                                                type="text"
                                                value={form.slug}
                                                onChange={(event) =>
                                                    updateField(
                                                        "slug",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="event-url-slug"
                                                className={`h-12 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.slug
                                                        ? "border-red-300"
                                                        : "border-gray-200"
                                                }`}
                                            />

                                            {errors.slug && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {errors.slug}
                                                </p>
                                            )}

                                            <p className="mt-1.5 text-xs text-gray-400">
                                                Generate a URL-friendly slug from the training/event title.
                                            </p>
                                        </div>

                                        {/* Training Type */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Training Type
                                            </label>

                                            <select
                                                value={
                                                    form.training_type
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "training_type",
                                                        event.target.value
                                                    )
                                                }
                                                className={`h-12 w-full appearance-none rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.training_type
                                                        ? "border-red-300"
                                                        : "border-gray-200"
                                                }`}
                                            >
                                                {trainingTypes.map(
                                                    (type) => (
                                                        <option
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    )
                                                )}
                                            </select>

                                            {errors.training_type && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {
                                                        errors.training_type
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Description
                                            </label>

                                            <textarea
                                                value={
                                                    form.description
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "description",
                                                        event.target.value
                                                    )
                                                }
                                                rows="7"
                                                placeholder="Write the complete training or event description..."
                                                className={`w-full resize-y rounded-2xl border bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.description
                                                        ? "border-red-300"
                                                        : "border-gray-200"
                                                }`}
                                            />

                                            {errors.description && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {
                                                        errors.description
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Schedule */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-6 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <CalendarDays className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-gray-900">
                                                Schedule
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Configure dates and timings
                                                for the event.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        {/* Start Date */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Start Date
                                            </label>

                                            <input
                                                type="date"
                                                value={
                                                    form.start_date
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "start_date",
                                                        event.target.value
                                                    )
                                                }
                                                className={`h-12 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.start_date
                                                        ? "border-red-300"
                                                        : "border-gray-200"
                                                }`}
                                            />

                                            {errors.start_date && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {
                                                        errors.start_date
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* End Date */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                End Date
                                            </label>

                                            <input
                                                type="date"
                                                value={
                                                    form.end_date
                                                }
                                                min={
                                                    form.start_date ||
                                                    undefined
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "end_date",
                                                        event.target.value
                                                    )
                                                }
                                                className={`h-12 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.end_date
                                                        ? "border-red-300"
                                                        : "border-gray-200"
                                                }`}
                                            />

                                            {errors.end_date && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {
                                                        errors.end_date
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Start Time */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Start Time
                                            </label>

                                            <div className="relative">
                                                <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                                <input
                                                    type="time"
                                                    value={
                                                        form.start_time
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "start_time",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                                />
                                            </div>
                                        </div>

                                        {/* End Time */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                End Time
                                            </label>

                                            <div className="relative">
                                                <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                                <input
                                                    type="time"
                                                    value={
                                                        form.end_time
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "end_time",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-6 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <MapPin className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-gray-900">
                                                Location
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Specify the venue and location
                                                for the event.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Venue
                                            </label>

                                            <input
                                                type="text"
                                                value={form.venue}
                                                onChange={(event) =>
                                                    updateField(
                                                        "venue",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Training centre / venue"
                                                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Location
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    form.location
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "location",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="City, district or online"
                                                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Organizer */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-6 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <UserRound className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-gray-900">
                                                Organizer & Trainer
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Add the organisation and trainer
                                                information.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Organiser
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    form.organiser
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "organiser",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Organisation name"
                                                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Trainer
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    form.trainer
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "trainer",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Trainer name"
                                                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Registration */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-6 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-gray-900">
                                                Registration
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Configure registration availability
                                                and capacity.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        {/* Capacity */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Capacity
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                value={
                                                    form.capacity
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "capacity",
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="e.g. 50"
                                                className={`h-12 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-800 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.capacity
                                                        ? "border-red-300"
                                                        : "border-gray-200"
                                                }`}
                                            />

                                            {errors.capacity && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {
                                                        errors.capacity
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Registration Enabled */}
                                        <div className="flex items-end">
                                            <label className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        Registration Enabled
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        Allow participants to
                                                        register
                                                    </p>
                                                </div>

                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        form.registration_enabled
                                                    }
                                                    onChange={(event) =>
                                                        updateField(
                                                            "registration_enabled",
                                                            event.target.checked
                                                        )
                                                    }
                                                    className="h-5 w-5 rounded border-gray-300 accent-green-700"
                                                />
                                            </label>
                                        </div>

                                        {/* Registration Opens */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Registration Opens
                                            </label>

                                            <input
                                                type="date"
                                                value={
                                                    form.registration_open
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "registration_open",
                                                        event.target.value
                                                    )
                                                }
                                                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                            />
                                        </div>

                                        {/* Registration Closes */}
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Registration Closes
                                            </label>

                                            <input
                                                type="date"
                                                value={
                                                    form.registration_close
                                                }
                                                min={
                                                    form.registration_open ||
                                                    undefined
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "registration_close",
                                                        event.target.value
                                                    )
                                                }
                                                className={`h-12 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 ${
                                                    errors.registration_close
                                                        ? "border-red-300"
                                                        : "border-gray-200"
                                                }`}
                                            />

                                            {errors.registration_close && (
                                                <p className="mt-1.5 text-xs font-medium text-red-600">
                                                    {
                                                        errors.registration_close
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-6">

                                {/* Event Status */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className="mb-5">
                                        <h2 className="text-base font-bold text-gray-900">
                                            Event Status
                                        </h2>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Set the current lifecycle status
                                            of this event.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        {eventStatuses.map(
                                            (status) => {
                                                const selected =
                                                    form.status ===
                                                    status

                                                return (
                                                    <button
                                                        key={status}
                                                        type="button"
                                                        onClick={() =>
                                                            updateField(
                                                                "status",
                                                                status
                                                            )
                                                        }
                                                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                                                            selected
                                                                ? getStatusClasses(
                                                                    status
                                                                )
                                                                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-green-200 hover:bg-green-50"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`h-2.5 w-2.5 rounded-full ${
                                                                selected
                                                                    ? "bg-current"
                                                                    : "bg-gray-300"
                                                            }`}
                                                        />

                                                        <span className="text-sm font-semibold">
                                                            {formatStatus(
                                                                status
                                                            )}
                                                        </span>
                                                    </button>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>

                                {/* Current Summary */}
                                <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                                    <h2 className="text-sm font-bold text-green-900">
                                        Event summary
                                    </h2>

                                    <div className="mt-4 space-y-3">

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-xs text-green-800/70">
                                                Type
                                            </span>

                                            <span className="text-right text-xs font-semibold text-green-900">
                                                {form.training_type ||
                                                    "Not set"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-xs text-green-800/70">
                                                Start
                                            </span>

                                            <span className="text-right text-xs font-semibold text-green-900">
                                                {form.start_date ||
                                                    "Not set"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-xs text-green-800/70">
                                                Capacity
                                            </span>

                                            <span className="text-xs font-semibold text-green-900">
                                                {form.capacity ||
                                                    "Not set"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-xs text-green-800/70">
                                                Registration
                                            </span>

                                            <span
                                                className={`text-xs font-semibold ${
                                                    form.registration_enabled
                                                        ? "text-green-700"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {form.registration_enabled
                                                    ? "Enabled"
                                                    : "Disabled"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-xs text-green-800/70">
                                                Status
                                            </span>

                                            <span className="text-xs font-semibold text-green-900">
                                                {formatStatus(
                                                    form.status
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Database Information */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h2 className="text-sm font-bold text-gray-900">
                                        Event information
                                    </h2>

                                    <p className="mt-2 text-xs leading-5 text-gray-500">
                                        This editor is connected directly
                                        to the training event database
                                        fields. Participant workflows are
                                        managed separately through Training
                                        Applications.
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </form>

                    {/* Bottom Actions */}
                    <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            to="/admin/content/training"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Training & Events
                        </Link>

                        <button
                            type="submit"
                            form="training-event-form"
                            disabled={
                                saveMutation.isPending
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saveMutation.isPending ? (
                                <Loader
                                    variant="button"
                                    text="Saving..."
                                />
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />

                                    {isEditMode
                                        ? "Save Changes"
                                        : "Create Event"}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    export default TrainingEventEditor