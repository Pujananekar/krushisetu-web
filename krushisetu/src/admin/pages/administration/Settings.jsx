import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
    Bell,
    Building2,
    CheckCircle2,
    Clock3,
    ExternalLink,
    Globe2,
    Link2,
    Mail,
    MapPin,
    Phone,
    Save,
    Settings2,
    ShieldCheck,
    XCircle,
} from "lucide-react"
import {
    getSettings,
    updateSettings,
} from "../../api/adminSettingsApi.js"


const defaultSettings = {
    englishName: "Krushisetu",
    marathiName: "कृषीसेतू",
    tagline:
        "Empowering Farmers • Transforming Agriculture",
    parentOrganisation:
        "An Initiative of Be The Change Foundation",

    email: "",
    phone: "",
    whatsapp: "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "Maharashtra",
    pincode: "",

    mapUrl: "",

    monday: "09:00 AM - 06:00 PM",
    tuesday: "09:00 AM - 06:00 PM",
    wednesday: "09:00 AM - 06:00 PM",
    thursday: "09:00 AM - 06:00 PM",
    friday: "09:00 AM - 06:00 PM",
    saturday: "09:00 AM - 02:00 PM",
    sunday: "Closed",

    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    twitter: "",

    footerText:
        "Krushisetu provides information, awareness, training and facilitation support for farmers and rural communities.",

    emergencyEnabled: false,
    emergencyText: "",
    emergencyLink: "",
}


const parseSettings = (value) => {
    if (!value) {
        return { ...defaultSettings }
    }

    try {
        const parsed =
            typeof value === "string"
                ? JSON.parse(value)
                : value

        return {
            ...defaultSettings,
            ...(parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed)
                ? parsed
                : {}),
        }
    } catch (error) {
        console.error(
            "Failed to parse settings:",
            error
        )

        return { ...defaultSettings }
    }
}


const isValidEmail = (value) => {
    if (!value) {
        return true
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        value.trim()
    )
}


const isValidPhone = (value) => {
    if (!value) {
        return true
    }

    const normalized = value.replace(
        /[\s()-]/g,
        ""
    )

    return /^(?:\+91)?[6-9]\d{9}$/.test(
        normalized
    )
}


const isValidUrl = (value) => {
    if (!value) {
        return true
    }

    try {
        const url = new URL(value.trim())

        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        )
    } catch {
        return false
    }
}


const validateSettings = (settings) => {
    const errors = {}

    const englishName =
        String(settings.englishName || "").trim()

    const marathiName =
        String(settings.marathiName || "").trim()

    if (!englishName) {
        errors.englishName =
            "English name is required."
    } else if (englishName.length > 100) {
        errors.englishName =
            "English name cannot exceed 100 characters."
    }

    if (!marathiName) {
        errors.marathiName =
            "Marathi name is required."
    } else if (marathiName.length > 100) {
        errors.marathiName =
            "Marathi name cannot exceed 100 characters."
    }

    if (
        String(settings.tagline || "").length >
        255
    ) {
        errors.tagline =
            "Tagline cannot exceed 255 characters."
    }

    if (
        String(settings.parentOrganisation || "")
            .length > 255
    ) {
        errors.parentOrganisation =
            "Parent organisation cannot exceed 255 characters."
    }

    if (!isValidEmail(settings.email)) {
        errors.email =
            "Enter a valid email address."
    }

    if (!isValidPhone(settings.phone)) {
        errors.phone =
            "Enter a valid Indian mobile number."
    }

    if (!isValidPhone(settings.whatsapp)) {
        errors.whatsapp =
            "Enter a valid Indian mobile number."
    }

    if (
        String(settings.addressLine1 || "")
            .length > 255
    ) {
        errors.addressLine1 =
            "Address cannot exceed 255 characters."
    }

    if (
        String(settings.addressLine2 || "")
            .length > 255
    ) {
        errors.addressLine2 =
            "Address cannot exceed 255 characters."
    }

    if (
        String(settings.city || "").length >
        100
    ) {
        errors.city =
            "City cannot exceed 100 characters."
    }

    if (
        String(settings.district || "").length >
        100
    ) {
        errors.district =
            "District cannot exceed 100 characters."
    }

    if (
        String(settings.state || "").length >
        100
    ) {
        errors.state =
            "State cannot exceed 100 characters."
    }

    if (
        settings.pincode &&
        !/^\d{6}$/.test(settings.pincode)
    ) {
        errors.pincode =
            "PIN code must contain exactly 6 digits."
    }

    if (!isValidUrl(settings.mapUrl)) {
        errors.mapUrl =
            "Enter a valid URL starting with http:// or https://."
    }

    const socialFields = [
        ["facebook", "Facebook"],
        ["instagram", "Instagram"],
        ["youtube", "YouTube"],
        ["linkedin", "LinkedIn"],
        ["twitter", "X / Twitter"],
    ]

    socialFields.forEach(([key, label]) => {
        if (!isValidUrl(settings[key])) {
            errors[key] =
                `${label} URL must start with http:// or https://.`
        }
    })

    if (
        String(settings.footerText || "")
            .length > 1000
    ) {
        errors.footerText =
            "Footer description cannot exceed 1000 characters."
    }

    if (settings.emergencyEnabled) {
        const emergencyText =
            String(settings.emergencyText || "").trim()

        if (!emergencyText) {
            errors.emergencyText =
                "Banner message is required when the banner is enabled."
        } else if (emergencyText.length > 500) {
            errors.emergencyText =
                "Banner message cannot exceed 500 characters."
        }

        if (!isValidUrl(settings.emergencyLink)) {
            errors.emergencyLink =
                "Banner link must be a valid http:// or https:// URL."
        }
    }

    return errors
}


const getSectionForField = (field) => {
    const sections = {
        englishName: "general",
        marathiName: "general",
        tagline: "general",
        parentOrganisation: "general",

        email: "contact",
        phone: "contact",
        whatsapp: "contact",

        addressLine1: "location",
        addressLine2: "location",
        city: "location",
        district: "location",
        state: "location",
        pincode: "location",
        mapUrl: "location",

        facebook: "social",
        instagram: "social",
        youtube: "social",
        linkedin: "social",
        twitter: "social",

        footerText: "footer",

        emergencyText: "emergency",
        emergencyLink: "emergency",
    }

    return sections[field] || "general"
}


const Settings = () => {
    const [activeSection, setActiveSection] =
        useState("general")

    const [settings, setSettings] =
        useState({ ...defaultSettings })

    const [initialSettings, setInitialSettings] =
        useState({ ...defaultSettings })

    const [saved, setSaved] = useState(false)
    const [saveError, setSaveError] = useState("")
    const [validationErrors, setValidationErrors] =
        useState({})
    const [touched, setTouched] = useState({})

    const {
        data: settingsData,
        isLoading: isSettingsLoading,
        isError: isSettingsError,
        error: settingsError,
    } = useQuery({
        queryKey: ["admin-settings"],
        queryFn: getSettings,
        retry: false,
    })

    useEffect(() => {
        const serverSettings =
            settingsData?.data?.settings

        if (!serverSettings) {
            return
        }

        const parsedSettings =
            parseSettings(serverSettings)

        setSettings(parsedSettings)
        setInitialSettings(parsedSettings)
        setValidationErrors({})
        setTouched({})
        setSaved(false)
        setSaveError("")
    }, [settingsData])

    const saveSettingsMutation =
        useMutation({
            mutationFn: updateSettings,

            onSuccess: (data) => {
                const updatedSettings =
                    parseSettings(
                        data?.data?.settings ||
                            settings
                    )

                setSettings(updatedSettings)
                setInitialSettings(
                    updatedSettings
                )
                setValidationErrors({})
                setTouched({})
                setSaved(true)
                setSaveError("")

                window.setTimeout(() => {
                    setSaved(false)
                }, 3000)
            },

            onError: (error) => {
                setSaved(false)

                setSaveError(
                    error?.response?.data
                        ?.message ||
                        "Failed to save settings. Please try again."
                )
            },
        })

    const isDirty =
        JSON.stringify(settings) !==
        JSON.stringify(initialSettings)

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (
                !isDirty ||
                saveSettingsMutation.isPending
            ) {
                return
            }

            event.preventDefault()
            event.returnValue = ""
        }

        window.addEventListener(
            "beforeunload",
            handleBeforeUnload
        )

        return () => {
            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            )
        }
    }, [
        isDirty,
        saveSettingsMutation.isPending,
    ])

    const updateSetting = (
        key,
        value
    ) => {
        setSettings((current) => ({
            ...current,
            [key]: value,
        }))

        setSaved(false)
        setSaveError("")

        setValidationErrors((current) => {
            if (!current[key]) {
                return current
            }

            const next = {
                ...current,
            }

            delete next[key]

            return next
        })
    }

    const validateSingleField = (
        key,
        nextSettings = settings
    ) => {
        const errors =
            validateSettings(nextSettings)

        return errors[key] || ""
    }

    const handleFieldBlur = (key) => {
        setTouched((current) => ({
            ...current,
            [key]: true,
        }))

        const error =
            validateSingleField(key)

        setValidationErrors((current) => {
            const next = {
                ...current,
            }

            if (error) {
                next[key] = error
            } else {
                delete next[key]
            }

            return next
        })
    }

    const handleSave = () => {
        setSaved(false)
        setSaveError("")

        const errors =
            validateSettings(settings)

        setValidationErrors(errors)

        const touchedFields =
            Object.keys(errors).reduce(
                (result, key) => ({
                    ...result,
                    [key]: true,
                }),
                {}
            )

        setTouched(touchedFields)

        const firstError =
            Object.keys(errors)[0]

        if (firstError) {
            const section =
                getSectionForField(
                    firstError
                )

            setActiveSection(section)

            window.setTimeout(() => {
                const element =
                    document.getElementById(
                        `setting-field-${firstError}`
                    )

                element?.focus()

                element?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                })
            }, 50)

            return
        }

        saveSettingsMutation.mutate(
            settings
        )
    }

    const sections = [
        {
            id: "general",
            label: "General",
            description:
                "Brand and organisation",
            icon: Building2,
        },
        {
            id: "contact",
            label: "Contact",
            description:
                "Contact information",
            icon: Phone,
        },
        {
            id: "location",
            label: "Location",
            description:
                "Address and map",
            icon: MapPin,
        },
        {
            id: "hours",
            label: "Office Hours",
            description:
                "Working schedule",
            icon: Clock3,
        },
        {
            id: "social",
            label: "Social Links",
            description:
                "Social media profiles",
            icon: Link2,
        },
        {
            id: "footer",
            label: "Footer",
            description:
                "Website footer",
            icon: Globe2,
        },
        {
            id: "emergency",
            label: "Emergency Banner",
            description:
                "Important announcements",
            icon: Bell,
        },
    ]

    const commonProps = {
        settings,
        updateSetting,
        errors: validationErrors,
        touched,
        onBlur: handleFieldBlur,
    }

    if (isSettingsLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-[#F6FAF7]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />

                    <p className="text-sm font-medium text-gray-500">
                        Loading settings...
                    </p>
                </div>
            </div>
        )
    }

    if (isSettingsError) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-[#F6FAF7] px-4">
                <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <ShieldCheck className="h-5 w-5" />
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                        Unable to load settings
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {settingsError
                            ?.response?.data
                            ?.message ||
                            "Something went wrong while loading website settings."}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            window.location.reload()
                        }
                        className="mt-5 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <Settings2 className="h-4 w-4" />

                            Administration

                            <span className="text-gray-400">
                                /
                            </span>

                            Settings
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Website Settings
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage Krushisetu's global website configuration, organisation details and public contact information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={
                            saveSettingsMutation.isPending ||
                            !isDirty
                        }
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save className="h-4 w-4" />

                        {saveSettingsMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </div>

                {/* SUCCESS */}
                {saved && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                        <CheckCircle2 className="h-5 w-5" />

                        Settings saved successfully.
                    </div>
                )}

                {/* SERVER ERROR */}
                {saveError && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                        <XCircle className="h-5 w-5" />

                        {saveError}
                    </div>
                )}

                {/* VALIDATION ERROR */}
                {Object.keys(
                    validationErrors
                ).length > 0 && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0" />

                        <div>
                            <p>
                                Please fix the highlighted fields before saving.
                            </p>

                            <p className="mt-1 text-xs font-normal text-red-700">
                                {
                                    Object.keys(
                                        validationErrors
                                    ).length
                                }{" "}
                                validation issue
                                {Object.keys(
                                    validationErrors
                                ).length > 1
                                    ? "s"
                                    : ""}{" "}
                                found.
                            </p>
                        </div>
                    </div>
                )}

                {/* INFO */}
                <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <ShieldCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                Global website configuration
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                These settings can affect information displayed throughout the public website. Keep official contact details and organisational information verified before publishing.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

                    {/* SETTINGS NAVIGATION */}
                    <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
                        <div className="mb-3 px-3 py-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Settings
                            </p>
                        </div>

                        <nav className="space-y-1">
                            {sections.map(
                                (section) => {
                                    const Icon =
                                        section.icon

                                    const active =
                                        activeSection ===
                                        section.id

                                    const hasSectionError =
                                        Object.keys(
                                            validationErrors
                                        ).some(
                                            (key) =>
                                                getSectionForField(
                                                    key
                                                ) ===
                                                section.id
                                        )

                                    return (
                                        <button
                                            key={
                                                section.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                setActiveSection(
                                                    section.id
                                                )
                                            }
                                            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                                                active
                                                    ? "bg-green-50 text-green-700"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                                    active
                                                        ? "bg-white text-green-700 shadow-sm"
                                                        : "bg-gray-50 text-gray-400"
                                                }`}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span className="flex items-center gap-2 text-sm font-semibold">
                                                    {
                                                        section.label
                                                    }

                                                    {hasSectionError && (
                                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                    )}
                                                </span>

                                                <span
                                                    className={`mt-0.5 block truncate text-xs ${
                                                        active
                                                            ? "text-green-600"
                                                            : "text-gray-400"
                                                    }`}
                                                >
                                                    {
                                                        section.description
                                                    }
                                                </span>
                                            </span>
                                        </button>
                                    )
                                }
                            )}
                        </nav>
                    </aside>

                    {/* ACTIVE SECTION */}
                    <div className="min-w-0">

                        {activeSection ===
                            "general" && (
                            <GeneralSettings
                                {...commonProps}
                            />
                        )}

                        {activeSection ===
                            "contact" && (
                            <ContactSettings
                                {...commonProps}
                            />
                        )}

                        {activeSection ===
                            "location" && (
                            <LocationSettings
                                {...commonProps}
                            />
                        )}

                        {activeSection ===
                            "hours" && (
                            <OfficeHoursSettings
                                {...commonProps}
                            />
                        )}

                        {activeSection ===
                            "social" && (
                            <SocialSettings
                                {...commonProps}
                            />
                        )}

                        {activeSection ===
                            "footer" && (
                            <FooterSettings
                                {...commonProps}
                            />
                        )}

                        {activeSection ===
                            "emergency" && (
                            <EmergencySettings
                                {...commonProps}
                            />
                        )}

                        {/* SAVE BAR */}
                        <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />

                                {isDirty
                                    ? "You have unsaved changes."
                                    : "All changes are saved."}
                            </div>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={
                                    saveSettingsMutation.isPending ||
                                    !isDirty
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />

                                {saveSettingsMutation.isPending
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


/* =========================================================
   GENERAL SETTINGS
========================================================= */

const GeneralSettings = ({
    settings,
    updateSetting,
    errors,
    touched,
    onBlur,
}) => {
    return (
        <SettingsCard
            icon={Building2}
            title="Brand & Organisation"
            description="Configure the public identity used across Krushisetu."
        >
            <div className="grid gap-5 sm:grid-cols-2">

                <Field
                    id="setting-field-englishName"
                    name="englishName"
                    label="English Name"
                    value={settings.englishName}
                    onChange={(value) =>
                        updateSetting(
                            "englishName",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.englishName
                            ? errors.englishName
                            : ""
                    }
                    required
                    maxLength={100}
                    placeholder="Krushisetu"
                />

                <Field
                    id="setting-field-marathiName"
                    name="marathiName"
                    label="Marathi Name"
                    value={settings.marathiName}
                    onChange={(value) =>
                        updateSetting(
                            "marathiName",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.marathiName
                            ? errors.marathiName
                            : ""
                    }
                    required
                    maxLength={100}
                    placeholder="कृषीसेतू"
                />

                <div className="sm:col-span-2">
                    <Field
                        id="setting-field-tagline"
                        name="tagline"
                        label="Tagline"
                        value={settings.tagline}
                        onChange={(value) =>
                            updateSetting(
                                "tagline",
                                value
                            )
                        }
                        onBlur={onBlur}
                        error={
                            touched.tagline
                                ? errors.tagline
                                : ""
                        }
                        maxLength={255}
                        placeholder="Empowering Farmers • Transforming Agriculture"
                    />
                </div>

                <div className="sm:col-span-2">
                    <Field
                        id="setting-field-parentOrganisation"
                        name="parentOrganisation"
                        label="Parent Organisation"
                        value={
                            settings.parentOrganisation
                        }
                        onChange={(value) =>
                            updateSetting(
                                "parentOrganisation",
                                value
                            )
                        }
                        onBlur={onBlur}
                        error={
                            touched.parentOrganisation
                                ? errors.parentOrganisation
                                : ""
                        }
                        maxLength={255}
                        placeholder="An Initiative of Be The Change Foundation"
                    />
                </div>
            </div>


        </SettingsCard>
    )
}


/* =========================================================
   CONTACT SETTINGS
========================================================= */

const ContactSettings = ({
    settings,
    updateSetting,
    errors,
    touched,
    onBlur,
}) => {
    return (
        <SettingsCard
            icon={Phone}
            title="Contact Details"
            description="Public contact information displayed across the website."
        >
            <div className="grid gap-5 sm:grid-cols-2">

                <Field
                    id="setting-field-email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={settings.email}
                    onChange={(value) =>
                        updateSetting(
                            "email",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.email
                            ? errors.email
                            : ""
                    }
                    maxLength={150}
                    placeholder="contact@example.org"
                />

                <Field
                    id="setting-field-phone"
                    name="phone"
                    label="Telephone"
                    value={settings.phone}
                    onChange={(value) =>
                        updateSetting(
                            "phone",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.phone
                            ? errors.phone
                            : ""
                    }
                    inputMode="tel"
                    maxLength={15}
                    placeholder="+91 XXXXX XXXXX"
                />

                <Field
                    id="setting-field-whatsapp"
                    name="whatsapp"
                    label="WhatsApp Number"
                    value={settings.whatsapp}
                    onChange={(value) =>
                        updateSetting(
                            "whatsapp",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.whatsapp
                            ? errors.whatsapp
                            : ""
                    }
                    inputMode="tel"
                    maxLength={15}
                    placeholder="+91 XXXXX XXXXX"
                />
            </div>

            <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                    <p className="text-xs leading-5 text-amber-800">
                        Contact information is optional. When provided, it should contain official and verified contact details.
                    </p>
                </div>
            </div>
        </SettingsCard>
    )
}


/* =========================================================
   LOCATION SETTINGS
========================================================= */

const LocationSettings = ({
    settings,
    updateSetting,
    errors,
    touched,
    onBlur,
}) => {
    return (
        <SettingsCard
            icon={MapPin}
            title="Address & Map"
            description="Configure the organisation's public office location."
        >
            <div className="grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">
                    <Field
                        id="setting-field-addressLine1"
                        name="addressLine1"
                        label="Address Line 1"
                        value={settings.addressLine1}
                        onChange={(value) =>
                            updateSetting(
                                "addressLine1",
                                value
                            )
                        }
                        onBlur={onBlur}
                        error={
                            touched.addressLine1
                                ? errors.addressLine1
                                : ""
                        }
                        maxLength={255}
                        placeholder="Office address"
                    />
                </div>

                <div className="sm:col-span-2">
                    <Field
                        id="setting-field-addressLine2"
                        name="addressLine2"
                        label="Address Line 2"
                        value={settings.addressLine2}
                        onChange={(value) =>
                            updateSetting(
                                "addressLine2",
                                value
                            )
                        }
                        onBlur={onBlur}
                        error={
                            touched.addressLine2
                                ? errors.addressLine2
                                : ""
                        }
                        maxLength={255}
                        placeholder="Building, landmark or area"
                    />
                </div>

                <Field
                    id="setting-field-city"
                    name="city"
                    label="City"
                    value={settings.city}
                    onChange={(value) =>
                        updateSetting(
                            "city",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.city
                            ? errors.city
                            : ""
                    }
                    maxLength={100}
                    placeholder="City"
                />

                <Field
                    id="setting-field-district"
                    name="district"
                    label="District"
                    value={settings.district}
                    onChange={(value) =>
                        updateSetting(
                            "district",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.district
                            ? errors.district
                            : ""
                    }
                    maxLength={100}
                    placeholder="District"
                />

                <Field
                    id="setting-field-state"
                    name="state"
                    label="State"
                    value={settings.state}
                    onChange={(value) =>
                        updateSetting(
                            "state",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.state
                            ? errors.state
                            : ""
                    }
                    maxLength={100}
                    placeholder="Maharashtra"
                />

                <Field
                    id="setting-field-pincode"
                    name="pincode"
                    label="PIN Code"
                    value={settings.pincode}
                    onChange={(value) =>
                        updateSetting(
                            "pincode",
                            value
                                .replace(/\D/g, "")
                                .slice(0, 6)
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.pincode
                            ? errors.pincode
                            : ""
                    }
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="6-digit PIN code"
                    hint="Only numbers are allowed. Exactly 6 digits when entered."
                />

                <div className="sm:col-span-2">
                    <Field
                        id="setting-field-mapUrl"
                        name="mapUrl"
                        label="Map / Location URL"
                        value={settings.mapUrl}
                        onChange={(value) =>
                            updateSetting(
                                "mapUrl",
                                value
                            )
                        }
                        onBlur={onBlur}
                        error={
                            touched.mapUrl
                                ? errors.mapUrl
                                : ""
                        }
                        type="url"
                        placeholder="https://maps.google.com/..."
                    />
                </div>
            </div>

            <div className="mt-6 flex min-h-48 items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50">
                <div className="px-4 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
                        <MapPin className="h-5 w-5" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                        Map preview
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {isValidUrl(
                            settings.mapUrl
                        )
                            ? "A valid map URL is configured."
                            : "A public map will appear here after a valid location URL is configured."}
                    </p>

                    {settings.mapUrl &&
                        isValidUrl(
                            settings.mapUrl
                        ) && (
                            <a
                                href={
                                    settings.mapUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Open Map
                            </a>
                        )}
                </div>
            </div>
        </SettingsCard>
    )
}


/* =========================================================
   OFFICE HOURS
========================================================= */

const OfficeHoursSettings = ({
    settings,
    updateSetting,
}) => {
    const days = [
        ["monday", "Monday"],
        ["tuesday", "Tuesday"],
        ["wednesday", "Wednesday"],
        ["thursday", "Thursday"],
        ["friday", "Friday"],
        ["saturday", "Saturday"],
        ["sunday", "Sunday"],
    ]

    return (
        <SettingsCard
            icon={Clock3}
            title="Office Hours"
            description="Set the public office schedule shown on the website."
        >
            <div className="space-y-3">
                {days.map(
                    ([key, label]) => (
                        <div
                            key={key}
                            className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                    <Clock3 className="h-4 w-4" />
                                </div>

                                <span className="text-sm font-semibold text-gray-800">
                                    {label}
                                </span>
                            </div>

                            <input
                                type="text"
                                value={
                                    settings[
                                        key
                                    ] || ""
                                }
                                maxLength={50}
                                onChange={(event) =>
                                    updateSetting(
                                        key,
                                        event.target
                                            .value
                                    )
                                }
                                className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 sm:max-w-xs"
                                placeholder={
                                    label ===
                                    "Sunday"
                                        ? "Closed"
                                        : "09:00 AM - 06:00 PM"
                                }
                            />
                        </div>
                    )
                )}
            </div>

            <p className="mt-4 text-xs text-gray-400">
                Example: 09:00 AM - 06:00 PM or Closed
            </p>
        </SettingsCard>
    )
}


/* =========================================================
   SOCIAL SETTINGS
========================================================= */

const SocialSettings = ({
    settings,
    updateSetting,
    errors,
    touched,
    onBlur,
}) => {
    const links = [
        ["facebook", "Facebook"],
        ["instagram", "Instagram"],
        ["youtube", "YouTube"],
        ["linkedin", "LinkedIn"],
        ["twitter", "X / Twitter"],
    ]

    const configuredLinks =
        links.filter(
            ([key]) =>
                String(
                    settings[key] || ""
                ).trim() !== ""
        ).length

    return (
        <SettingsCard
            icon={Link2}
            title="Social Links"
            description="Manage public social media links displayed on the website."
        >
            <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Configured profiles
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Add only official social media URLs.
                        </p>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">
                        {configuredLinks}/5
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {links.map(
                    ([key, label]) => (
                        <div
                            key={key}
                            className="flex flex-col gap-2 sm:flex-row sm:items-start"
                        >
                            <div className="flex w-full items-center gap-3 sm:w-40 sm:pt-1">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <Link2 className="h-4 w-4" />
                                </div>

                                <span className="text-sm font-semibold text-gray-700">
                                    {label}
                                </span>
                            </div>

                            <div className="min-w-0 flex-1">
                                <Field
                                    id={`setting-field-${key}`}
                                    name={key}
                                    value={
                                        settings[
                                            key
                                        ]
                                    }
                                    onChange={(value) =>
                                        updateSetting(
                                            key,
                                            value
                                        )
                                    }
                                    onBlur={
                                        onBlur
                                    }
                                    error={
                                        touched[
                                            key
                                        ]
                                            ? errors[
                                                  key
                                              ]
                                            : ""
                                    }
                                    type="url"
                                    placeholder={`https://${label
                                        .toLowerCase()
                                        .replace(
                                            " / ",
                                            ""
                                        )}.com/...`}
                                />
                            </div>

                            {settings[key] &&
                                isValidUrl(
                                    settings[key]
                                ) && (
                                    <a
                                        href={
                                            settings[
                                                key
                                            ]
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 sm:mt-0.5"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        Open
                                    </a>
                                )}
                        </div>
                    )
                )}
            </div>

            {configuredLinks === 0 && (
                <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs leading-5 text-gray-500">
                        No social profiles are currently configured. The public website should not display social links until at least one profile is added.
                    </p>
                </div>
            )}
        </SettingsCard>
    )
}


/* =========================================================
   FOOTER SETTINGS
========================================================= */

const FooterSettings = ({
    settings,
    updateSetting,
    errors,
    touched,
    onBlur,
}) => {
    const hasSocialLinks = [
        settings.facebook,
        settings.instagram,
        settings.youtube,
        settings.linkedin,
        settings.twitter,
    ].some(
        (value) =>
            String(value || "").trim() !== ""
    )

    return (
        <SettingsCard
            icon={Globe2}
            title="Footer"
            description="Configure the public footer content and organisation message."
        >
            <Field
                id="setting-field-footerText"
                name="footerText"
                label="Footer Description"
                value={settings.footerText}
                onChange={(value) =>
                    updateSetting(
                        "footerText",
                        value
                    )
                }
                onBlur={onBlur}
                error={
                    touched.footerText
                        ? errors.footerText
                        : ""
                }
                textarea
                rows={5}
                maxLength={1000}
                placeholder="Footer description..."
            />

            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                    <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />

                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Footer configuration
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Krushisetu branding is part of the public footer. Social links are displayed automatically when social profiles are configured in the Social Links section.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">
                                Organisation name: Krushisetu
                            </span>

                            <span
                                className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                                    hasSocialLinks
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                            >
                                Social links:{" "}
                                {hasSocialLinks
                                    ? "Configured"
                                    : "Not configured"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </SettingsCard>
    )
}


/* =========================================================
   EMERGENCY SETTINGS
========================================================= */

const EmergencySettings = ({
    settings,
    updateSetting,
    errors,
    touched,
    onBlur,
}) => {
    const disabled =
        !settings.emergencyEnabled

    return (
        <SettingsCard
            icon={Bell}
            title="Emergency Banner"
            description="Display an important temporary announcement across the public website."
        >
            <ToggleRow
                label="Enable Emergency Banner"
                description="Show the announcement banner on the public website."
                enabled={
                    settings.emergencyEnabled
                }
                onToggle={() =>
                    updateSetting(
                        "emergencyEnabled",
                        !settings.emergencyEnabled
                    )
                }
            />

            <div className="mt-6 space-y-5">

                <Field
                    id="setting-field-emergencyText"
                    name="emergencyText"
                    label="Banner Message"
                    value={
                        settings.emergencyText
                    }
                    onChange={(value) =>
                        updateSetting(
                            "emergencyText",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.emergencyText
                            ? errors.emergencyText
                            : ""
                    }
                    textarea
                    rows={4}
                    maxLength={500}
                    disabled={disabled}
                    required={
                        settings.emergencyEnabled
                    }
                    placeholder="Enter important announcement..."
                />

                <Field
                    id="setting-field-emergencyLink"
                    name="emergencyLink"
                    label="Banner Link"
                    value={
                        settings.emergencyLink
                    }
                    onChange={(value) =>
                        updateSetting(
                            "emergencyLink",
                            value
                        )
                    }
                    onBlur={onBlur}
                    error={
                        touched.emergencyLink
                            ? errors.emergencyLink
                            : ""
                    }
                    type="url"
                    disabled={disabled}
                    placeholder="https://..."
                    hint="Optional. Add a URL if the banner should link to another page."
                />
            </div>

            <div
                className={`mt-6 rounded-2xl border p-4 transition ${
                    settings.emergencyEnabled
                        ? "border-amber-100 bg-amber-50"
                        : "border-gray-200 bg-gray-50"
                }`}
            >
                <div className="flex items-start gap-3">
                    <Bell
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                            settings.emergencyEnabled
                                ? "text-amber-600"
                                : "text-gray-400"
                        }`}
                    />

                    <div>
                        <p
                            className={`text-xs font-semibold ${
                                settings.emergencyEnabled
                                    ? "text-amber-800"
                                    : "text-gray-600"
                            }`}
                        >
                            Banner preview
                        </p>

                        <p
                            className={`mt-1 text-xs leading-5 ${
                                settings.emergencyEnabled
                                    ? "text-amber-700"
                                    : "text-gray-400"
                            }`}
                        >
                            {settings.emergencyEnabled
                                ? settings.emergencyText ||
                                  "Your emergency announcement will appear here."
                                : "Enable the banner to activate this announcement."}
                        </p>

                        {settings.emergencyEnabled &&
                            settings.emergencyLink &&
                            isValidUrl(
                                settings.emergencyLink
                            ) && (
                                <a
                                    href={
                                        settings.emergencyLink
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-amber-800 underline underline-offset-2"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Open banner link
                                </a>
                            )}
                    </div>
                </div>
            </div>
        </SettingsCard>
    )
}


/* =========================================================
   SETTINGS CARD
========================================================= */

const SettingsCard = ({
    icon: Icon,
    title,
    description,
    children,
}) => {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6 flex items-start gap-3 border-b border-gray-100 pb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
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


/* =========================================================
   FORM FIELD
========================================================= */

const Field = ({
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    type = "text",
    textarea = false,
    rows = 4,
    error = "",
    required = false,
    maxLength,
    inputMode,
    pattern,
    hint,
    disabled = false,
}) => {
    const hasError = Boolean(error)

    const currentLength =
        String(value || "").length

    const commonProps = {
        id,
        name,
        value: value || "",
        onChange: (event) =>
            onChange(
                event.target.value
            ),
        onBlur: () =>
            onBlur?.(name),
        placeholder,
        disabled,
        maxLength,
        inputMode,
        pattern,
        "aria-invalid": hasError,
        "aria-describedby":
            hasError || hint
                ? `${id}-help`
                : undefined,
    }

    return (
        <div>
            <label
                htmlFor={id}
                className="block"
            >
                <span className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-gray-700">
                    <span>
                        {label}

                        {required && (
                            <span className="ml-1 text-red-500">
                                *
                            </span>
                        )}
                    </span>

                    {maxLength && (
                        <span
                            className={`text-xs font-normal ${
                                currentLength >=
                                maxLength
                                    ? "text-amber-600"
                                    : "text-gray-400"
                            }`}
                        >
                            {currentLength}/
                            {maxLength}
                        </span>
                    )}
                </span>

                {textarea ? (
                    <textarea
                        {...commonProps}
                        rows={rows}
                        className={`w-full resize-y rounded-2xl border px-4 py-3 text-sm leading-6 outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${
                            hasError
                                ? "border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-gray-200 bg-gray-50 text-gray-700 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                        }`}
                    />
                ) : (
                    <input
                        {...commonProps}
                        type={type}
                        className={`h-11 w-full rounded-2xl border px-4 text-sm outline-none transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${
                            hasError
                                ? "border-red-300 bg-red-50/40 text-gray-700 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                : "border-gray-200 bg-gray-50 text-gray-700 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                        }`}
                    />
                )}
            </label>

            {(hasError || hint) && (
                <div
                    id={`${id}-help`}
                    className="mt-1.5"
                >
                    {hasError ? (
                        <p className="text-xs font-medium text-red-600">
                            {error}
                        </p>
                    ) : (
                        <p className="text-xs text-gray-400">
                            {hint}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}


/* =========================================================
   ASSET BOX
========================================================= */

const AssetBox = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex min-h-32 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-5 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-3 text-sm font-bold text-gray-700">
                {title}
            </p>

            <p className="mt-1 text-xs text-gray-400">
                {description}
            </p>

        </div>
    )
}


/* =========================================================
   TOGGLE
========================================================= */

const ToggleRow = ({
    label,
    description,
    enabled,
    onToggle,
    disabled = false,
}) => {
    return (
        <div
            className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition ${
                disabled
                    ? "border-gray-200 bg-gray-50"
                    : enabled
                        ? "border-green-100 bg-green-50/70"
                        : "border-gray-200 bg-white"
            }`}
        >
            <div className="min-w-0">
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
                aria-checked={enabled}
                aria-label={`${label}: ${
                    enabled
                        ? "On"
                        : "Off"
                }`}
                disabled={disabled}
                onClick={onToggle}
                className={`relative h-[30px] w-[52px] shrink-0 rounded-full p-[3px] outline-none transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-green-100 ${
                    disabled
                        ? "cursor-not-allowed bg-gray-200"
                        : enabled
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 hover:bg-gray-400"
                }`}
            >
                <span
                    className={`block h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        enabled
                            ? "translate-x-[22px]"
                            : "translate-x-0"
                    }`}
                />
            </button>
        </div>
    )
}


export default Settings