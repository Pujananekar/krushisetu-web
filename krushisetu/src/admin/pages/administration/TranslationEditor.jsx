import { useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    ArrowLeft,
    CheckCircle2,
    Globe2,
    Languages,
    Save,
    Send,
    ShieldCheck,
} from "lucide-react"

const translationData = {
    1: {
        title: "Homepage",
        key: "homepage",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Pages",
        status: "Published",
        reviewer: "Administrator",
        sourceContent:
            "Supporting farmers and rural communities through sustainable development programmes.",
        translatedContent:
            "शाश्वत विकास कार्यक्रमांद्वारे शेतकरी आणि ग्रामीण समुदायांना सहाय्य करणे.",
        notes: "Review terminology used for rural development.",
    },
    2: {
        title: "About Us",
        key: "about",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Pages",
        status: "In Review",
        reviewer: "Content Manager",
        sourceContent:
            "Krushisetu works with farmers and rural communities through sustainable development initiatives.",
        translatedContent:
            "कृषीसेतू शाश्वत विकास उपक्रमांद्वारे शेतकरी आणि ग्रामीण समुदायांसोबत कार्य करते.",
        notes: "",
    },
    3: {
        title: "Departments",
        key: "departments",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Departments",
        status: "Published",
        reviewer: "Content Manager",
        sourceContent:
            "Explore our departments and discover the services available to farmers and communities.",
        translatedContent:
            "आमचे विभाग एक्सप्लोर करा आणि शेतकरी व समुदायांसाठी उपलब्ध सेवा जाणून घ्या.",
        notes: "",
    },
    4: {
        title: "Schemes",
        key: "schemes",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Schemes",
        status: "Draft",
        reviewer: "Scheme Manager",
        sourceContent:
            "Explore government schemes and understand their eligibility, benefits and application process.",
        translatedContent: "",
        notes: "Verify official scheme terminology before publishing.",
    },
    5: {
        title: "Training & Events",
        key: "training-events",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Training",
        status: "In Review",
        reviewer: "Training Manager",
        sourceContent:
            "Join upcoming training programmes, workshops and community events.",
        translatedContent:
            "आगामी प्रशिक्षण कार्यक्रम, कार्यशाळा आणि समुदाय कार्यक्रमांमध्ये सहभागी व्हा.",
        notes: "",
    },
    6: {
        title: "Resources",
        key: "resources",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Resources",
        status: "Published",
        reviewer: "Content Manager",
        sourceContent:
            "Access useful resources, guides and information for farmers and rural communities.",
        translatedContent:
            "शेतकरी आणि ग्रामीण समुदायांसाठी उपयुक्त संसाधने, मार्गदर्शक आणि माहिती मिळवा.",
        notes: "",
    },
    7: {
        title: "Success Stories",
        key: "success-stories",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Stories",
        status: "Draft",
        reviewer: "Content Manager",
        sourceContent:
            "Read stories highlighting the experiences and outcomes of our programmes.",
        translatedContent: "",
        notes: "",
    },
    8: {
        title: "Contact",
        key: "contact",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Marathi",
        targetCode: "mr",
        section: "Pages",
        status: "Published",
        reviewer: "Administrator",
        sourceContent:
            "Get in touch with Krushisetu for information, support and partnership opportunities.",
        translatedContent:
            "माहिती, सहाय्य आणि भागीदारीच्या संधींसाठी कृषीसेतूशी संपर्क साधा.",
        notes: "",
    },
    9: {
        title: "Homepage",
        key: "homepage",
        sourceLanguage: "English",
        sourceCode: "en",
        targetLanguage: "Hindi",
        targetCode: "hi",
        section: "Pages",
        status: "In Review",
        reviewer: "Content Manager",
        sourceContent:
            "Supporting farmers and rural communities through sustainable development programmes.",
        translatedContent:
            "सतत विकास कार्यक्रमों के माध्यम से किसानों और ग्रामीण समुदायों का सहयोग करना।",
        notes: "",
    },
}

const TranslationEditor = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const isEditMode = Boolean(id)
    const existingTranslation = id ? translationData[id] : null

    const [form, setForm] = useState({
        title: existingTranslation?.title || "",
        key: existingTranslation?.key || "",
        sourceLanguage: existingTranslation?.sourceLanguage || "English",
        sourceCode: existingTranslation?.sourceCode || "en",
        targetLanguage: existingTranslation?.targetLanguage || "Marathi",
        targetCode: existingTranslation?.targetCode || "mr",
        section: existingTranslation?.section || "Pages",
        reviewer: existingTranslation?.reviewer || "Content Manager",
        sourceContent: existingTranslation?.sourceContent || "",
        translatedContent: existingTranslation?.translatedContent || "",
        notes: existingTranslation?.notes || "",
        status: existingTranslation?.status || "Draft",
    })

    const [savedMessage, setSavedMessage] = useState("")

    const completion = useMemo(() => {
        if (!form.sourceContent.trim()) return 0

        if (!form.translatedContent.trim()) return 0

        const sourceWords = form.sourceContent.trim().split(/\s+/).length
        const translatedWords = form.translatedContent.trim().split(/\s+/).length

        return Math.min(
            100,
            Math.max(
                25,
                Math.round((translatedWords / Math.max(sourceWords, 1)) * 100),
            ),
        )
    }, [form.sourceContent, form.translatedContent])

    const updateField = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }))

        setSavedMessage("")
    }

    const handleSave = (status = form.status) => {
        setForm((current) => ({
            ...current,
            status,
        }))

        setSavedMessage(
            status === "Published"
                ? "Translation published successfully in UI preview mode."
                : status === "In Review"
                  ? "Translation submitted for human review in UI preview mode."
                  : "Translation saved as draft in UI preview mode.",
        )

        window.setTimeout(() => {
            setSavedMessage("")
        }, 3500)
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Link
                            to="/admin/administration/translations"
                            className="kr-hover-link mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Translations
                        </Link>

                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <Languages className="h-4 w-4" />
                            Administration
                            <span className="text-gray-400">/</span>
                            Translations
                            <span className="text-gray-400">/</span>
                            {isEditMode ? "Edit" : "Add"}
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {isEditMode
                                ? "Edit Translation"
                                : "Add Translation"}
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage translated content and human review workflow
                            for the multilingual website.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => handleSave("Draft")}
                            className="kr-hover-button inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            <Save className="h-4 w-4" />
                            Save Draft
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSave("In Review")}
                            className="kr-hover-button inline-flex items-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                        >
                            <Send className="h-4 w-4" />
                            Submit for Review
                        </button>
                    </div>
                </div>

                {/* Status message */}
                {savedMessage && (
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                        {savedMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="space-y-6">
                        {/* Translation information */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={Languages}
                                title="Translation Information"
                                description="Define the content item, languages and section."
                            />

                            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Content Title"
                                    required
                                    value={form.title}
                                    onChange={(value) =>
                                        updateField("title", value)
                                    }
                                    placeholder="e.g. Homepage"
                                />

                                <Field
                                    label="Content Key"
                                    required
                                    value={form.key}
                                    onChange={(value) =>
                                        updateField("key", value)
                                    }
                                    placeholder="e.g. homepage"
                                />

                                <SelectField
                                    label="Source Language"
                                    value={form.sourceLanguage}
                                    onChange={(value) =>
                                        updateField("sourceLanguage", value)
                                    }
                                    options={[
                                        "English",
                                        "Marathi",
                                        "Hindi",
                                    ]}
                                />

                                <SelectField
                                    label="Target Language"
                                    value={form.targetLanguage}
                                    onChange={(value) =>
                                        updateField("targetLanguage", value)
                                    }
                                    options={[
                                        "Marathi",
                                        "Hindi",
                                        "English",
                                    ]}
                                />

                                <Field
                                    label="Source Language Code"
                                    value={form.sourceCode}
                                    onChange={(value) =>
                                        updateField("sourceCode", value)
                                    }
                                    placeholder="en"
                                />

                                <Field
                                    label="Target Language Code"
                                    value={form.targetCode}
                                    onChange={(value) =>
                                        updateField("targetCode", value)
                                    }
                                    placeholder="mr"
                                />

                                <SelectField
                                    label="Section"
                                    value={form.section}
                                    onChange={(value) =>
                                        updateField("section", value)
                                    }
                                    options={[
                                        "Pages",
                                        "Departments",
                                        "Schemes",
                                        "Training",
                                        "Resources",
                                        "Stories",
                                        "News",
                                        "Gallery",
                                        "Team",
                                        "Partners",
                                        "FAQs",
                                    ]}
                                />

                                <SelectField
                                    label="Reviewer"
                                    value={form.reviewer}
                                    onChange={(value) =>
                                        updateField("reviewer", value)
                                    }
                                    options={[
                                        "Administrator",
                                        "Content Manager",
                                        "Scheme Manager",
                                        "Training Manager",
                                    ]}
                                />
                            </div>
                        </section>

                        {/* Source content */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={Globe2}
                                title="Source Content"
                                description="Reference content from the source language."
                            />

                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    English Source Content
                                    <span className="ml-1 text-green-600">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    value={form.sourceContent}
                                    onChange={(event) =>
                                        updateField(
                                            "sourceContent",
                                            event.target.value,
                                        )
                                    }
                                    rows={7}
                                    placeholder="Enter the source-language content..."
                                    className="w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                                />

                                <div className="mt-2 flex justify-between text-xs text-gray-400">
                                    <span>
                                        Source content should remain unchanged
                                        during translation.
                                    </span>

                                    <span>
                                        {form.sourceContent.length} characters
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Translation content */}
                        <section className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={Languages}
                                title="Translated Content"
                                description={`Enter the ${form.targetLanguage} version of the source content.`}
                            />

                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    {form.targetLanguage} Translation
                                    <span className="ml-1 text-green-600">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    value={form.translatedContent}
                                    onChange={(event) =>
                                        updateField(
                                            "translatedContent",
                                            event.target.value,
                                        )
                                    }
                                    rows={9}
                                    placeholder={`Enter the ${form.targetLanguage} translation...`}
                                    className="w-full resize-y rounded-2xl border border-green-200 bg-green-50/40 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                                />

                                <div className="mt-2 flex justify-between text-xs text-gray-400">
                                    <span>
                                        Human review is required before
                                        publishing.
                                    </span>

                                    <span>
                                        {form.translatedContent.length}{" "}
                                        characters
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Notes */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <SectionHeader
                                icon={ShieldCheck}
                                title="Review Notes"
                                description="Add notes for the reviewer or future content updates."
                            />

                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Translation Notes
                                </label>

                                <textarea
                                    value={form.notes}
                                    onChange={(event) =>
                                        updateField(
                                            "notes",
                                            event.target.value,
                                        )
                                    }
                                    rows={5}
                                    placeholder="Add terminology notes, review instructions or other internal information..."
                                    className="w-full resize-y rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                                />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Workflow */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <SectionHeader
                                icon={CheckCircle2}
                                title="Workflow"
                                description="Manage translation status."
                            />

                            <div className="mt-5 space-y-3">
                                {[
                                    {
                                        value: "Draft",
                                        description:
                                            "Translation is being prepared.",
                                    },
                                    {
                                        value: "In Review",
                                        description:
                                            "Waiting for human review.",
                                    },
                                    {
                                        value: "Published",
                                        description:
                                            "Translation is publicly available.",
                                    },
                                ].map((status) => (
                                    <button
                                        key={status.value}
                                        type="button"
                                        onClick={() =>
                                            updateField(
                                                "status",
                                                status.value,
                                            )
                                        }
                                        className={`w-full rounded-2xl border p-3 text-left transition ${
                                            form.status === status.value
                                                ? "border-green-300 bg-green-50"
                                                : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50/40"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                                                    form.status ===
                                                    status.value
                                                        ? "bg-green-700 text-white"
                                                        : "bg-gray-100 text-gray-400"
                                                }`}
                                            >
                                                {form.status ===
                                                status.value ? (
                                                    <CheckCircle2 className="h-4 w-4" />
                                                ) : (
                                                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                                                )}
                                            </span>

                                            <span>
                                                <span className="block text-sm font-semibold text-gray-800">
                                                    {status.value}
                                                </span>

                                                <span className="mt-0.5 block text-xs leading-5 text-gray-500">
                                                    {status.description}
                                                </span>
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Completion */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Translation Completion
                                    </p>

                                    <p className="mt-1 text-3xl font-bold text-gray-900">
                                        {completion}%
                                    </p>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Languages className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-green-600 transition-all"
                                    style={{
                                        width: `${completion}%`,
                                    }}
                                />
                            </div>

                            <p className="mt-3 text-xs leading-5 text-gray-500">
                                Completion is a UI estimate based on the
                                entered source and translated content.
                            </p>
                        </section>

                        {/* Metadata */}
                        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                            <SectionHeader
                                icon={Globe2}
                                title="Translation Metadata"
                                description="Current content information."
                            />

                            <div className="mt-5 divide-y divide-gray-100">
                                <InfoRow
                                    label="Mode"
                                    value={
                                        isEditMode
                                            ? "Existing translation"
                                            : "New translation"
                                    }
                                />

                                <InfoRow
                                    label="Source"
                                    value={`${form.sourceLanguage} (${form.sourceCode})`}
                                />

                                <InfoRow
                                    label="Target"
                                    value={`${form.targetLanguage} (${form.targetCode})`}
                                />

                                <InfoRow
                                    label="Section"
                                    value={form.section}
                                />

                                <InfoRow
                                    label="Reviewer"
                                    value={form.reviewer}
                                />

                                <InfoRow
                                    label="Status"
                                    value={form.status}
                                />
                            </div>
                        </section>

                        {/* Actions */}
                        <section className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                            <p className="text-sm font-bold text-gray-900">
                                Publishing checklist
                            </p>

                            <div className="mt-4 space-y-3">
                                <ChecklistItem
                                    checked={Boolean(form.title.trim())}
                                    label="Content title added"
                                />

                                <ChecklistItem
                                    checked={Boolean(form.key.trim())}
                                    label="Content key added"
                                />

                                <ChecklistItem
                                    checked={Boolean(form.sourceContent.trim())}
                                    label="Source content available"
                                />

                                <ChecklistItem
                                    checked={Boolean(
                                        form.translatedContent.trim(),
                                    )}
                                    label="Translation entered"
                                />

                                <ChecklistItem
                                    checked={form.status === "Published"}
                                    label="Translation published"
                                />
                            </div>
                        </section>
                    </aside>
                </div>

                {/* Bottom actions */}
                <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            {isEditMode
                                ? "Update this translation"
                                : "Create this translation"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Changes are currently saved only in the UI preview.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            to="/admin/administration/translations"
                            className="kr-hover-button inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="button"
                            onClick={() => handleSave("Draft")}
                            className="kr-hover-button inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            <Save className="h-4 w-4" />
                            Save Draft
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSave("Published")}
                            disabled={!form.translatedContent.trim()}
                            className="kr-hover-button inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Publish
                        </button>
                    </div>
                </div>

                {/* UI notice */}
                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                    UI preview data only — translation content, reviewers,
                    workflow and publishing will be connected to the backend
                    later.
                </div>
            </div>
        </div>
    )
}

const SectionHeader = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h2 className="text-sm font-bold text-gray-900">{title}</h2>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    )
}

const Field = ({
    label,
    value,
    onChange,
    placeholder,
    required = false,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                {label}

                {required && (
                    <span className="ml-1 text-green-600">*</span>
                )}
            </label>

            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
        </div>
    )
}

const SelectField = ({ label, value, onChange, options }) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

const InfoRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-xs font-medium text-gray-500">{label}</span>

            <span className="text-right text-xs font-semibold text-gray-800">
                {value}
            </span>
        </div>
    )
}

const ChecklistItem = ({ checked, label }) => {
    return (
        <div className="flex items-center gap-2.5">
            <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    checked
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-300"
                }`}
            >
                {checked && <CheckCircle2 className="h-4 w-4" />}
            </span>

            <span
                className={`text-xs ${
                    checked
                        ? "font-medium text-gray-700"
                        : "text-gray-500"
                }`}
            >
                {label}
            </span>
        </div>
    )
}

export default TranslationEditor