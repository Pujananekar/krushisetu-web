import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    CheckCircle2,
    ChevronDown,
    Edit3,
    Eye,
    Filter,
    Globe2,
    Languages,
    MoreHorizontal,
    Plus,
    Search,
    X,
} from "lucide-react"

const translationsData = [
    {
        id: 1,
        title: "Homepage",
        key: "homepage",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Pages",
        status: "Published",
        reviewer: "Administrator",
        updatedAt: "30 Sep 2026",
        completion: 100,
        entries: 42,
    },
    {
        id: 2,
        title: "About Us",
        key: "about",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Pages",
        status: "In Review",
        reviewer: "Content Manager",
        updatedAt: "29 Sep 2026",
        completion: 92,
        entries: 28,
    },
    {
        id: 3,
        title: "Departments",
        key: "departments",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Departments",
        status: "Published",
        reviewer: "Content Manager",
        updatedAt: "27 Sep 2026",
        completion: 100,
        entries: 35,
    },
    {
        id: 4,
        title: "Schemes",
        key: "schemes",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Schemes",
        status: "Draft",
        reviewer: "Scheme Manager",
        updatedAt: "26 Sep 2026",
        completion: 76,
        entries: 31,
    },
    {
        id: 5,
        title: "Training & Events",
        key: "training-events",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Training",
        status: "In Review",
        reviewer: "Training Manager",
        updatedAt: "24 Sep 2026",
        completion: 88,
        entries: 24,
    },
    {
        id: 6,
        title: "Resources",
        key: "resources",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Resources",
        status: "Published",
        reviewer: "Content Manager",
        updatedAt: "22 Sep 2026",
        completion: 100,
        entries: 37,
    },
    {
        id: 7,
        title: "Success Stories",
        key: "success-stories",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Stories",
        status: "Draft",
        reviewer: "Content Manager",
        updatedAt: "20 Sep 2026",
        completion: 64,
        entries: 19,
    },
    {
        id: 8,
        title: "Contact",
        key: "contact",
        language: "Marathi",
        languageCode: "mr",
        sourceLanguage: "English",
        section: "Pages",
        status: "Published",
        reviewer: "Administrator",
        updatedAt: "18 Sep 2026",
        completion: 100,
        entries: 16,
    },
    {
        id: 9,
        title: "Homepage",
        key: "homepage",
        language: "Hindi",
        languageCode: "hi",
        sourceLanguage: "English",
        section: "Pages",
        status: "In Review",
        reviewer: "Content Manager",
        updatedAt: "28 Sep 2026",
        completion: 94,
        entries: 42,
    },
]

const languages = [
    {
        name: "English",
        code: "en",
        label: "Source",
        status: "Active",
        completion: 100,
        translations: 242,
    },
    {
        name: "Marathi",
        code: "mr",
        label: "Translation",
        status: "Active",
        completion: 91,
        translations: 220,
    },
    {
        name: "Hindi",
        code: "hi",
        label: "Translation",
        status: "Active",
        completion: 78,
        translations: 188,
    },
]

const Translations = () => {
    const [translations, setTranslations] = useState(translationsData)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")
    const [languageFilter, setLanguageFilter] = useState("All Languages")
    const [sectionFilter, setSectionFilter] = useState("All Sections")
    const [openMenu, setOpenMenu] = useState(null)
    const [selectedTranslations, setSelectedTranslations] = useState([])
    const [viewTranslation, setViewTranslation] = useState(null)

    const filteredTranslations = useMemo(() => {
        const query = search.trim().toLowerCase()

        return translations.filter((translation) => {
            const matchesSearch =
                !query ||
                translation.title.toLowerCase().includes(query) ||
                translation.key.toLowerCase().includes(query) ||
                translation.language.toLowerCase().includes(query) ||
                translation.reviewer.toLowerCase().includes(query)

            const matchesStatus =
                statusFilter === "All Status" ||
                translation.status === statusFilter

            const matchesLanguage =
                languageFilter === "All Languages" ||
                translation.language === languageFilter

            const matchesSection =
                sectionFilter === "All Sections" ||
                translation.section === sectionFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesLanguage &&
                matchesSection
            )
        })
    }, [
        translations,
        search,
        statusFilter,
        languageFilter,
        sectionFilter,
    ])

    const publishedCount = translations.filter(
        (item) => item.status === "Published",
    ).length

    const reviewCount = translations.filter(
        (item) => item.status === "In Review",
    ).length

    const draftCount = translations.filter(
        (item) => item.status === "Draft",
    ).length

    const averageCompletion =
        translations.length > 0
            ? Math.round(
                  translations.reduce(
                      (total, item) => total + item.completion,
                      0,
                  ) / translations.length,
              )
            : 0

    const allSelected =
        filteredTranslations.length > 0 &&
        filteredTranslations.every((item) =>
            selectedTranslations.includes(item.id),
        )

    const toggleTranslation = (id) => {
        setSelectedTranslations((current) =>
            current.includes(id)
                ? current.filter((translationId) => translationId !== id)
                : [...current, id],
        )
    }

    const toggleAll = () => {
        if (allSelected) {
            setSelectedTranslations((current) =>
                current.filter(
                    (id) =>
                        !filteredTranslations.some(
                            (translation) => translation.id === id,
                        ),
                ),
            )
            return
        }

        setSelectedTranslations((current) => [
            ...new Set([
                ...current,
                ...filteredTranslations.map(
                    (translation) => translation.id,
                ),
            ]),
        ])
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All Status")
        setLanguageFilter("All Languages")
        setSectionFilter("All Sections")
    }

    const changeStatus = (id, status) => {
        setTranslations((current) =>
            current.map((translation) =>
                translation.id === id
                    ? {
                          ...translation,
                          status,
                      }
                    : translation,
            ),
        )

        setOpenMenu(null)
    }

    const duplicateTranslation = (id) => {
        const original = translations.find((item) => item.id === id)

        if (!original) return

        const newId =
            Math.max(...translations.map((translation) => translation.id)) + 1

        setTranslations((current) => [
            ...current,
            {
                ...original,
                id: newId,
                title: `${original.title} Copy`,
                key: `${original.key}-copy`,
                status: "Draft",
                completion: 0,
                updatedAt: "01 Oct 2026",
            },
        ])

        setOpenMenu(null)
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <Globe2 className="h-4 w-4" />
                            Administration
                            <span className="text-gray-400">/</span>
                            Translations
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Translations
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage multilingual website content, translation
                            progress and human review workflows.
                        </p>
                    </div>

                    <Link
                        to="/admin/administration/translations/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Translation
                    </Link>
                </div>

                {/* Summary */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={Languages}
                        label="Translation Entries"
                        value={translations.length}
                        description="Managed translations"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Published"
                        value={publishedCount}
                        description="Published translations"
                    />

                    <SummaryCard
                        icon={Eye}
                        label="In Review"
                        value={reviewCount}
                        description="Awaiting human review"
                    />

                    <SummaryCard
                        icon={Globe2}
                        label="Avg. Completion"
                        value={`${averageCompletion}%`}
                        description={`${draftCount} drafts remaining`}
                    />
                </div>

                {/* Workflow notice */}
                <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <Languages className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                Translation workflow
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Translation content moves through{" "}
                                <span className="font-semibold text-gray-700">
                                    Draft
                                </span>
                                {" → "}
                                <span className="font-semibold text-gray-700">
                                    In Review
                                </span>
                                {" → "}
                                <span className="font-semibold text-gray-700">
                                    Published
                                </span>
                                . Human review should be completed before
                                translated content is published.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Language overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {languages.map((language) => (
                        <div
                            key={language.code}
                            className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <span className="text-sm font-bold uppercase">
                                            {language.code}
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-gray-900">
                                                {language.name}
                                            </h3>

                                            {language.label === "Source" && (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                                    Source
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {language.translations} entries
                                        </p>
                                    </div>
                                </div>

                                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                    {language.status}
                                </span>
                            </div>

                            <div className="mt-5">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500">
                                        Completion
                                    </span>

                                    <span className="text-xs font-bold text-gray-700">
                                        {language.completion}%
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full bg-green-600 transition-all"
                                        style={{
                                            width: `${language.completion}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="mb-5 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                        <div className="relative min-w-0 flex-1">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search translations..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <Filter className="h-4 w-4" />
                            Filters
                        </div>

                        <FilterSelect
                            value={languageFilter}
                            onChange={setLanguageFilter}
                            options={[
                                "All Languages",
                                "Marathi",
                                "Hindi",
                            ]}
                        />

                        <FilterSelect
                            value={sectionFilter}
                            onChange={setSectionFilter}
                            options={[
                                "All Sections",
                                "Pages",
                                "Departments",
                                "Schemes",
                                "Training",
                                "Resources",
                                "Stories",
                            ]}
                        />

                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={[
                                "All Status",
                                "Draft",
                                "In Review",
                                "Published",
                            ]}
                        />

                        {(search ||
                            statusFilter !== "All Status" ||
                            languageFilter !== "All Languages" ||
                            sectionFilter !== "All Sections") && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                <X className="h-4 w-4" />
                                Clear
                            </button>
                        )}
                    </div>

                    {selectedTranslations.length > 0 && (
                        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-green-100 bg-green-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm font-medium text-green-800">
                                {selectedTranslations.length} translation
                                {selectedTranslations.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                selected
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    Submit for Review
                                </button>

                                <button
                                    type="button"
                                    className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    Publish
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedTranslations([])}
                                    className="rounded-xl px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Translation table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1150px] text-left">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/80">
                                    <th className="w-12 px-4 py-4">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            onChange={toggleAll}
                                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                    </th>

                                    <TableHead>Content</TableHead>
                                    <TableHead>Language</TableHead>
                                    <TableHead>Section</TableHead>
                                    <TableHead>Completion</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reviewer</TableHead>
                                    <TableHead>Updated</TableHead>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredTranslations.length > 0 ? (
                                    filteredTranslations.map(
                                        (translation) => (
                                            <tr
                                                key={translation.id}
                                                className="transition hover:bg-green-50/30"
                                            >
                                                <td className="px-4 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTranslations.includes(
                                                            translation.id,
                                                        )}
                                                        onChange={() =>
                                                            toggleTranslation(
                                                                translation.id,
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                                            <Languages className="h-5 w-5" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {
                                                                    translation.title
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {
                                                                    translation.key
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-500">
                                                                Source:{" "}
                                                                {
                                                                    translation.sourceLanguage
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                                                        <span className="font-bold uppercase text-green-700">
                                                            {
                                                                translation.languageCode
                                                            }
                                                        </span>
                                                        {
                                                            translation.language
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="text-sm text-gray-600">
                                                        {translation.section}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="w-28">
                                                        <div className="mb-1.5 flex items-center justify-between">
                                                            <span className="text-xs font-semibold text-gray-700">
                                                                {
                                                                    translation.completion
                                                                }
                                                                %
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                                                            <div
                                                                className="h-full rounded-full bg-green-600"
                                                                style={{
                                                                    width: `${translation.completion}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <StatusBadge
                                                        status={
                                                            translation.status
                                                        }
                                                    />
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {
                                                        translation.reviewer
                                                    }
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {
                                                        translation.updatedAt
                                                    }
                                                </td>

                                                <td className="relative px-5 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            type="button"
                                                            title="Preview translation"
                                                            onClick={() =>
                                                                setViewTranslation(
                                                                    translation,
                                                                )
                                                            }
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>

                                                        <Link
                                                            to={`/admin/administration/translations/${translation.id}/edit`}
                                                            title="Edit translation"
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Edit3 className="h-4 w-4" />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            title="More actions"
                                                            onClick={() =>
                                                                setOpenMenu(
                                                                    openMenu ===
                                                                        translation.id
                                                                        ? null
                                                                        : translation.id,
                                                                )
                                                            }
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    {openMenu ===
                                                        translation.id && (
                                                        <div className="absolute right-5 top-14 z-20 w-56 rounded-2xl border border-gray-200 bg-white p-1.5 text-left shadow-xl shadow-gray-900/10">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setViewTranslation(
                                                                        translation,
                                                                    )
                                                                    setOpenMenu(
                                                                        null,
                                                                    )
                                                                }}
                                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                Preview
                                                            </button>

                                                            <Link
                                                                to={`/admin/administration/translations/${translation.id}/edit`}
                                                                onClick={() =>
                                                                    setOpenMenu(
                                                                        null,
                                                                    )
                                                                }
                                                                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Edit3 className="h-4 w-4" />
                                                                Edit Translation
                                                            </Link>

                                                            {translation.status ===
                                                                "Draft" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            translation.id,
                                                                            "In Review",
                                                                        )
                                                                    }
                                                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                    Submit for
                                                                    Review
                                                                </button>
                                                            )}

                                                            {translation.status ===
                                                                "In Review" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            translation.id,
                                                                            "Published",
                                                                        )
                                                                    }
                                                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                                >
                                                                    <CheckCircle2 className="h-4 w-4" />
                                                                    Publish
                                                                </button>
                                                            )}

                                                            {translation.status ===
                                                                "Published" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            translation.id,
                                                                            "Draft",
                                                                        )
                                                                    }
                                                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                                >
                                                                    <Edit3 className="h-4 w-4" />
                                                                    Move to
                                                                    Draft
                                                                </button>
                                                            )}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    duplicateTranslation(
                                                                        translation.id,
                                                                    )
                                                                }
                                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Languages className="h-4 w-4" />
                                                                Duplicate
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ),
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                    <Languages className="h-6 w-6" />
                                                </div>

                                                <h3 className="text-sm font-bold text-gray-900">
                                                    No translations found
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Try changing your search or
                                                    filter criteria.
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={clearFilters}
                                                    className="mt-4 text-sm font-semibold text-green-700 hover:text-green-800"
                                                >
                                                    Clear filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-semibold text-gray-700">
                                {filteredTranslations.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700">
                                {translations.length}
                            </span>{" "}
                            translations
                        </p>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                disabled
                                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-300"
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                className="rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white"
                            >
                                1
                            </button>

                            <button
                                type="button"
                                disabled
                                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* UI notice */}
                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                    UI preview data only — translation content, language
                    entries and review actions will be connected to the
                    backend later.
                </div>
            </div>

            {/* Preview modal */}
            {viewTranslation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/30 p-4">
                    <div
                        className="absolute inset-0"
                        onClick={() => setViewTranslation(null)}
                    />

                    <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
                        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Languages className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {viewTranslation.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {viewTranslation.language} ·{" "}
                                        {viewTranslation.section}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setViewTranslation(null)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="max-h-[65vh] overflow-y-auto p-6">
                            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <MiniInfo
                                    label="Language"
                                    value={viewTranslation.language}
                                />

                                <MiniInfo
                                    label="Source"
                                    value={viewTranslation.sourceLanguage}
                                />

                                <MiniInfo
                                    label="Status"
                                    value={viewTranslation.status}
                                />

                                <MiniInfo
                                    label="Completion"
                                    value={`${viewTranslation.completion}%`}
                                />
                            </div>

                            <div className="space-y-4">
                                <Section title="Translation Progress">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">
                                            Content completion
                                        </span>

                                        <span className="text-sm font-bold text-green-700">
                                            {viewTranslation.completion}%
                                        </span>
                                    </div>

                                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-green-600"
                                            style={{
                                                width: `${viewTranslation.completion}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="mt-2 text-xs text-gray-500">
                                        {viewTranslation.entries} translation
                                        entries are currently tracked for this
                                        content item.
                                    </p>
                                </Section>

                                <Section title="Review Information">
                                    <InfoRow
                                        label="Reviewer"
                                        value={viewTranslation.reviewer}
                                    />

                                    <InfoRow
                                        label="Last Updated"
                                        value={viewTranslation.updatedAt}
                                    />

                                    <InfoRow
                                        label="Workflow Status"
                                        value={viewTranslation.status}
                                    />

                                    <InfoRow
                                        label="Content Key"
                                        value={viewTranslation.key}
                                    />
                                </Section>

                                <Section title="Translation Preview">
                                    <div className="space-y-3">
                                        <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                                English
                                            </p>

                                            <p className="text-sm leading-6 text-gray-700">
                                                Supporting farmers and rural
                                                communities through sustainable
                                                development programmes.
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">
                                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-green-600">
                                                {viewTranslation.language}
                                            </p>

                                            <p className="text-sm leading-6 text-gray-700">
                                                This translated content is a UI
                                                preview and will be replaced by
                                                the actual managed translation
                                                content later.
                                            </p>
                                        </div>
                                    </div>
                                </Section>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50/70 px-6 py-4">
                            <button
                                type="button"
                                onClick={() => setViewTranslation(null)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Close
                            </button>

                            <Link
                                to={`/admin/administration/translations/${viewTranslation.id}/edit`}
                                className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Translation
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const SummaryCard = ({ icon: Icon, label, value, description }) => {
    return (
        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        {description}
                    </p>
                </div>

                <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    )
}

const FilterSelect = ({ value, onChange, options }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 min-w-[155px] appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
    )
}

const TableHead = ({ children }) => {
    return (
        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {children}
        </th>
    )
}

const StatusBadge = ({ status }) => {
    const styles = {
        Draft: "bg-gray-100 text-gray-600",
        "In Review": "bg-amber-50 text-amber-700",
        Published: "bg-green-50 text-green-700",
    }

    const dotStyles = {
        Draft: "bg-gray-400",
        "In Review": "bg-amber-500",
        Published: "bg-green-600",
    }

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                styles[status] || "bg-gray-100 text-gray-600"
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    dotStyles[status] || "bg-gray-400"
                }`}
            />

            {status}
        </span>
    )
}

const MiniInfo = ({ label, value }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-1 truncate text-sm font-bold text-gray-800">
                {value}
            </p>
        </div>
    )
}

const Section = ({ title, children }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
            <h3 className="mb-3 text-sm font-bold text-gray-900">{title}</h3>
            {children}
        </div>
    )
}

const InfoRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-2.5 last:border-b-0 last:pb-0">
            <span className="text-xs font-medium text-gray-500">{label}</span>

            <span className="text-right text-xs font-semibold text-gray-700">
                {value}
            </span>
        </div>
    )
}

export default Translations