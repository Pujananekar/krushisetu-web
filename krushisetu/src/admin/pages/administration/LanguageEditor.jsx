import { useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    Globe2,
    Languages,
    Save,
    ShieldCheck,
} from "lucide-react"

const existingLanguages = {
    1: {
        name: "English",
        nativeName: "English",
        code: "en",
        locale: "en-IN",
        direction: "LTR",
        status: "Active",
        isDefault: true,
        displayOrder: 1,
        description:
            "Primary website language and source language.",
        seoTitle: "Krushisetu",
        seoDescription:
            "Krushisetu rural development and agriculture services.",
    },
    2: {
        name: "Marathi",
        nativeName: "मराठी",
        code: "mr",
        locale: "mr-IN",
        direction: "LTR",
        status: "Active",
        isDefault: false,
        displayOrder: 2,
        description:
            "Primary regional translation for Maharashtra audiences.",
        seoTitle: "कृषीसेतू",
        seoDescription:
            "महाराष्ट्रातील ग्रामीण विकास आणि कृषीविषयक सेवा.",
    },
    3: {
        name: "Hindi",
        nativeName: "हिन्दी",
        code: "hi",
        locale: "hi-IN",
        direction: "LTR",
        status: "Active",
        isDefault: false,
        displayOrder: 3,
        description:
            "Hindi translation for wider regional accessibility.",
        seoTitle: "कृषीसेतू",
        seoDescription:
            "ग्रामीण विकास और कृषि सेवाओं के लिए कृषीसेतू।",
    },
}

const emptyForm = {
    name: "",
    nativeName: "",
    code: "",
    locale: "",
    direction: "LTR",
    status: "Active",
    isDefault: false,
    displayOrder: 1,
    description: "",
    seoTitle: "",
    seoDescription: "",
}

const LanguageEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const isEditing = Boolean(id)

    const initialData = useMemo(() => {
        if (!isEditing) {
            return emptyForm
        }

        return existingLanguages[id] || emptyForm
    }, [id, isEditing])

    const [form, setForm] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [saved, setSaved] = useState(false)

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }))

        setErrors((current) => ({
            ...current,
            [field]: "",
        }))

        setSaved(false)
    }

    const validate = () => {
        const nextErrors = {}

        if (!form.name.trim()) {
            nextErrors.name = "Language name is required."
        }

        if (!form.nativeName.trim()) {
            nextErrors.nativeName =
                "Native language name is required."
        }

        if (!form.code.trim()) {
            nextErrors.code = "Language code is required."
        } else if (
            !/^[a-z]{2,3}$/i.test(form.code.trim())
        ) {
            nextErrors.code =
                "Use a valid 2–3 letter language code."
        }

        if (!form.locale.trim()) {
            nextErrors.locale = "Locale is required."
        }

        if (!form.description.trim()) {
            nextErrors.description =
                "Description is required."
        }

        if (
            form.displayOrder === "" ||
            Number(form.displayOrder) < 1
        ) {
            nextErrors.displayOrder =
                "Display order must be at least 1."
        }

        setErrors(nextErrors)

        return Object.keys(nextErrors).length === 0
    }

    const handleSave = (event) => {
        event.preventDefault()

        if (!validate()) {
            return
        }

        setSaved(true)

        window.setTimeout(() => {
            navigate("/admin/administration/languages")
        }, 900)
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        to="/admin/administration/languages"
                        className="kr-hover-link mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Languages
                    </Link>

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                                <Globe2 className="h-4 w-4" />
                                Administration
                                <span className="text-gray-400">
                                    /
                                </span>
                                Languages
                                <span className="text-gray-400">
                                    /
                                </span>
                                {isEditing
                                    ? "Edit"
                                    : "Add"}
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                {isEditing
                                    ? "Edit Language"
                                    : "Add Language"}
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Configure the language used by
                                the Krushisetu website and its
                                translation system.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                to="/admin/administration/languages"
                                className="kr-hover-button inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                form="language-form"
                                className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                <Save className="h-4 w-4" />
                                {isEditing
                                    ? "Save Changes"
                                    : "Add Language"}
                            </button>
                        </div>
                    </div>
                </div>

                {saved && (
                    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-green-800">
                            <CheckCircle2 className="h-5 w-5" />
                            Language saved successfully.
                        </div>
                    </div>
                )}

                <form
                    id="language-form"
                    onSubmit={handleSave}
                >
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                        {/* Main */}
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <SectionHeader
                                    icon={Languages}
                                    title="Basic Information"
                                    description="Define the language identity and locale."
                                />

                                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <FormField
                                        label="Language Name"
                                        required
                                        error={errors.name}
                                    >
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(event) =>
                                                updateField(
                                                    "name",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder="e.g. Marathi"
                                            className={inputClass(
                                                errors.name,
                                            )}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Native Name"
                                        required
                                        error={
                                            errors.nativeName
                                        }
                                    >
                                        <input
                                            type="text"
                                            value={
                                                form.nativeName
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "nativeName",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder="e.g. मराठी"
                                            className={inputClass(
                                                errors.nativeName,
                                            )}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Language Code"
                                        required
                                        hint="ISO-style 2–3 letter code"
                                        error={errors.code}
                                    >
                                        <input
                                            type="text"
                                            maxLength={3}
                                            value={form.code}
                                            onChange={(event) =>
                                                updateField(
                                                    "code",
                                                    event.target.value
                                                        .toLowerCase(),
                                                )
                                            }
                                            placeholder="mr"
                                            className={inputClass(
                                                errors.code,
                                            )}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Locale"
                                        required
                                        hint="Example: mr-IN"
                                        error={errors.locale}
                                    >
                                        <input
                                            type="text"
                                            value={form.locale}
                                            onChange={(event) =>
                                                updateField(
                                                    "locale",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder="mr-IN"
                                            className={inputClass(
                                                errors.locale,
                                            )}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Text Direction"
                                        required
                                    >
                                        <select
                                            value={
                                                form.direction
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "direction",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            className={inputClass()}
                                        >
                                            <option value="LTR">
                                                LTR — Left to
                                                Right
                                            </option>
                                            <option value="RTL">
                                                RTL — Right to
                                                Left
                                            </option>
                                        </select>
                                    </FormField>

                                    <FormField
                                        label="Display Order"
                                        required
                                        hint="Lower numbers appear first."
                                        error={
                                            errors.displayOrder
                                        }
                                    >
                                        <input
                                            type="number"
                                            min="1"
                                            value={
                                                form.displayOrder
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "displayOrder",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            className={inputClass(
                                                errors.displayOrder,
                                            )}
                                        />
                                    </FormField>
                                </div>

                                <div className="mt-5">
                                    <FormField
                                        label="Description"
                                        required
                                        error={
                                            errors.description
                                        }
                                    >
                                        <textarea
                                            rows={4}
                                            value={
                                                form.description
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "description",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder="Describe where this language is used on the website..."
                                            className={inputClass(
                                                errors.description,
                                            )}
                                        />
                                    </FormField>
                                </div>
                            </section>

                            {/* Status & Availability */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <SectionHeader
                                    icon={ShieldCheck}
                                    title="Availability & Status"
                                    description="Control whether this language is available to website visitors."
                                />

                                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <FormField label="Status">
                                        <select
                                            value={form.status}
                                            onChange={(event) =>
                                                updateField(
                                                    "status",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            className={inputClass()}
                                        >
                                            <option value="Active">
                                                Active
                                            </option>
                                            <option value="Inactive">
                                                Inactive
                                            </option>
                                        </select>
                                    </FormField>

                                    <div className="flex items-end">
                                        <label className="flex w-full cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-green-200 hover:bg-green-50/50">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    form.isDefault
                                                }
                                                onChange={(event) =>
                                                    updateField(
                                                        "isDefault",
                                                        event
                                                            .target
                                                            .checked,
                                                    )
                                                }
                                                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-500"
                                            />

                                            <span>
                                                <span className="block text-sm font-semibold text-gray-900">
                                                    Default
                                                    language
                                                </span>

                                                <span className="mt-1 block text-xs leading-5 text-gray-500">
                                                    This language
                                                    will be used
                                                    as the
                                                    website's
                                                    primary
                                                    language.
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </section>

                            {/* SEO */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                                <SectionHeader
                                    icon={Globe2}
                                    title="Language SEO"
                                    description="Configure language-specific search metadata."
                                />

                                <div className="mt-6 space-y-5">
                                    <FormField
                                        label="SEO Title"
                                        hint="Recommended: keep it concise."
                                    >
                                        <input
                                            type="text"
                                            maxLength={70}
                                            value={
                                                form.seoTitle
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "seoTitle",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder="Website title for this language"
                                            className={inputClass()}
                                        />

                                        <p className="mt-1.5 text-right text-xs text-gray-400">
                                            {
                                                form.seoTitle
                                                    .length
                                            }
                                            / 70
                                        </p>
                                    </FormField>

                                    <FormField
                                        label="SEO Description"
                                        hint="Language-specific description used by search engines."
                                    >
                                        <textarea
                                            rows={4}
                                            maxLength={160}
                                            value={
                                                form.seoDescription
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "seoDescription",
                                                    event
                                                        .target
                                                        .value,
                                                )
                                            }
                                            placeholder="Enter the search description for this language..."
                                            className={inputClass()}
                                        />

                                        <p className="mt-1.5 text-right text-xs text-gray-400">
                                            {
                                                form
                                                    .seoDescription
                                                    .length
                                            }
                                            / 160
                                        </p>
                                    </FormField>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Preview */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="text-sm font-bold text-gray-900">
                                    Language Preview
                                </h2>

                                <div className="mt-4 rounded-2xl border border-green-100 bg-green-50/60 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-sm font-bold text-white">
                                            {form.code
                                                ? form.code
                                                      .slice(
                                                          0,
                                                          2,
                                                      )
                                                      .toUpperCase()
                                                : "--"}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900">
                                                {form.name ||
                                                    "Language Name"}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {form.nativeName ||
                                                    "Native Name"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <PreviewValue
                                            label="Code"
                                            value={
                                                form.code ||
                                                "--"
                                            }
                                        />

                                        <PreviewValue
                                            label="Locale"
                                            value={
                                                form.locale ||
                                                "--"
                                            }
                                        />

                                        <PreviewValue
                                            label="Direction"
                                            value={
                                                form.direction
                                            }
                                        />

                                        <PreviewValue
                                            label="Status"
                                            value={
                                                form.status
                                            }
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Default Language Warning */}
                            {form.isDefault && (
                                <div className="rounded-3xl border border-green-100 bg-green-50/70 p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900">
                                                Default
                                                language
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-gray-600">
                                                This language
                                                will be treated
                                                as the primary
                                                website language.
                                                Only one
                                                language should
                                                be default.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Publishing Checklist */}
                            <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="text-sm font-bold text-gray-900">
                                    Setup Checklist
                                </h2>

                                <div className="mt-4 space-y-3">
                                    <ChecklistItem
                                        done={Boolean(
                                            form.name.trim(),
                                        )}
                                        label="Language name"
                                    />

                                    <ChecklistItem
                                        done={Boolean(
                                            form.nativeName.trim(),
                                        )}
                                        label="Native name"
                                    />

                                    <ChecklistItem
                                        done={Boolean(
                                            form.code.trim(),
                                        )}
                                        label="Language code"
                                    />

                                    <ChecklistItem
                                        done={Boolean(
                                            form.locale.trim(),
                                        )}
                                        label="Locale"
                                    />

                                    <ChecklistItem
                                        done={Boolean(
                                            form.description.trim(),
                                        )}
                                        label="Description"
                                    />

                                    <ChecklistItem
                                        done={Boolean(
                                            form.seoTitle.trim(),
                                        )}
                                        label="SEO title"
                                    />

                                    <ChecklistItem
                                        done={Boolean(
                                            form.seoDescription.trim(),
                                        )}
                                        label="SEO description"
                                    />
                                </div>
                            </section>

                            {/* Translation Link */}
                            {isEditing && (
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h2 className="text-sm font-bold text-gray-900">
                                        Translation Content
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Manage individual translated
                                        content entries separately
                                        from language configuration.
                                    </p>

                                    <Link
                                        to="/admin/administration/translations"
                                        className="kr-hover-link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-700"
                                    >
                                        Open Translations
                                        <ArrowLeft className="h-4 w-4 rotate-180" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* UI-only notice */}
                <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                    <p className="text-xs leading-5 text-amber-800">
                        <span className="font-semibold">
                            UI preview:
                        </span>{" "}
                        Language configuration is currently stored
                        only in temporary frontend state. Backend
                        persistence, unique language validation and
                        translation synchronization will be connected
                        later.
                    </p>
                </div>
            </div>
        </div>
    )
}

const SectionHeader = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h2 className="text-base font-bold text-gray-900">
                    {title}
                </h2>

                <p className="mt-0.5 text-sm text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    )
}

const FormField = ({
    label,
    required,
    hint,
    error,
    children,
}) => {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-gray-700">
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">
                            *
                        </span>
                    )}
                </label>

                {hint && (
                    <span className="text-xs text-gray-400">
                        {hint}
                    </span>
                )}
            </div>

            {children}

            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>
    )
}

const PreviewValue = ({ label, value }) => {
    return (
        <div className="rounded-xl border border-green-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {label}
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-gray-700">
                {value}
            </p>
        </div>
    )
}

const ChecklistItem = ({ done, label }) => {
    return (
        <div className="flex items-center gap-2.5">
            <CheckCircle2
                className={`h-4 w-4 ${
                    done
                        ? "text-green-600"
                        : "text-gray-300"
                }`}
            />

            <span
                className={`text-sm ${
                    done
                        ? "text-gray-700"
                        : "text-gray-400"
                }`}
            >
                {label}
            </span>
        </div>
    )
}

const inputClass = (error) => {
    return `w-full rounded-2xl border ${
        error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-green-400 focus:ring-green-100"
    } bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2`
}

export default LanguageEditor