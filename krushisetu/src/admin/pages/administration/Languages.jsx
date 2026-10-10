import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    CheckCircle2,
    Edit3,
    Globe2,
    Languages as LanguagesIcon,
    MoreHorizontal,
    Plus,
    ShieldCheck,
    Trash2,
    UserCheck,
    UserX,
    X,
} from "lucide-react"

const initialLanguages = [
    {
        id: 1,
        name: "English",
        nativeName: "English",
        code: "en",
        locale: "en-IN",
        direction: "LTR",
        status: "Active",
        default: true,
        completion: 100,
        translations: 242,
        updatedAt: "01 Oct 2026",
        description: "Primary website language and source language.",
    },
    {
        id: 2,
        name: "Marathi",
        nativeName: "मराठी",
        code: "mr",
        locale: "mr-IN",
        direction: "LTR",
        status: "Active",
        default: false,
        completion: 91,
        translations: 220,
        updatedAt: "01 Oct 2026",
        description: "Primary regional translation for Maharashtra audiences.",
    },
    {
        id: 3,
        name: "Hindi",
        nativeName: "हिन्दी",
        code: "hi",
        locale: "hi-IN",
        direction: "LTR",
        status: "Active",
        default: false,
        completion: 78,
        translations: 188,
        updatedAt: "28 Sep 2026",
        description: "Hindi translation for wider regional accessibility.",
    },
]

const Languages = () => {
    const [languages, setLanguages] = useState(initialLanguages)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")
    const [openMenu, setOpenMenu] = useState(null)
    const [deleteLanguage, setDeleteLanguage] = useState(null)
    const [notice, setNotice] = useState("")

    const filteredLanguages = useMemo(() => {
        return languages.filter((language) => {
            const query = search.trim().toLowerCase()

            const matchesSearch =
                !query ||
                language.name.toLowerCase().includes(query) ||
                language.nativeName.toLowerCase().includes(query) ||
                language.code.toLowerCase().includes(query)

            const matchesStatus =
                statusFilter === "All Status" ||
                language.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [languages, search, statusFilter])

    const activeCount = languages.filter(
        (language) => language.status === "Active",
    ).length

    const inactiveCount = languages.filter(
        (language) => language.status === "Inactive",
    ).length

    const defaultLanguage = languages.find(
        (language) => language.default,
    )

    const toggleStatus = (id) => {
        setLanguages((current) =>
            current.map((language) =>
                language.id === id
                    ? {
                          ...language,
                          status:
                              language.status === "Active"
                                  ? "Inactive"
                                  : "Active",
                      }
                    : language,
            ),
        )

        setOpenMenu(null)
        showNotice("Language status updated.")
    }

    const setDefault = (id) => {
        setLanguages((current) =>
            current.map((language) => ({
                ...language,
                default: language.id === id,
                status:
                    language.id === id
                        ? "Active"
                        : language.status,
            })),
        )

        setOpenMenu(null)
        showNotice("Default language updated.")
    }

    const confirmDelete = () => {
        if (!deleteLanguage) return

        if (deleteLanguage.default) {
            showNotice(
                "The default language cannot be deleted. Set another language as default first.",
            )
            setDeleteLanguage(null)
            return
        }

        setLanguages((current) =>
            current.filter(
                (language) => language.id !== deleteLanguage.id,
            ),
        )

        setDeleteLanguage(null)
        showNotice(`${deleteLanguage.name} has been removed.`)
    }

    const showNotice = (message) => {
        setNotice(message)

        window.setTimeout(() => {
            setNotice("")
        }, 3000)
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
                            Languages
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Languages
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage the languages available across the
                            Krushisetu website.
                        </p>
                    </div>

                    <Link
                        to="/admin/administration/languages/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Language
                    </Link>
                </div>

                {/* Summary */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={LanguagesIcon}
                        label="Total Languages"
                        value={languages.length}
                        description="Configured website languages"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Active"
                        value={activeCount}
                        description="Currently available"
                    />

                    <SummaryCard
                        icon={UserX}
                        label="Inactive"
                        value={inactiveCount}
                        description="Currently disabled"
                    />

                    <SummaryCard
                        icon={ShieldCheck}
                        label="Default"
                        value={defaultLanguage?.name || "Not Set"}
                        description="Primary website language"
                    />
                </div>

                {/* Management Notice */}
                <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <Globe2 className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                Language management
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Active languages are available to visitors
                                through the website language switcher.
                                Deactivating a language hides it from the
                                public website without removing its
                                translations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-5 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
                        <div className="relative">
                            <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search language, native name or code..."
                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(event.target.value)
                            }
                            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                        >
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-[1050px] w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/80">
                                    <TableHead>Language</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Default</TableHead>
                                    <TableHead>Translations</TableHead>
                                    <TableHead>Completion</TableHead>
                                    <TableHead>Updated</TableHead>
                                    <TableHead align="right">
                                        Actions
                                    </TableHead>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredLanguages.length > 0 ? (
                                    filteredLanguages.map(
                                        (language) => (
                                            <tr
                                                key={language.id}
                                                className="transition hover:bg-green-50/30"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-sm font-bold text-green-700">
                                                            {language.code.toUpperCase()}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-gray-900">
                                                                {
                                                                    language.name
                                                                }
                                                            </p>

                                                            <p className="mt-0.5 text-sm text-gray-500">
                                                                {
                                                                    language.nativeName
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div>
                                                        <span className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs font-semibold text-gray-700">
                                                            {
                                                                language.code
                                                            }
                                                        </span>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {
                                                                language.locale
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <StatusBadge
                                                        status={
                                                            language.status
                                                        }
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    {language.default ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            Default
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setDefault(
                                                                    language.id,
                                                                )
                                                            }
                                                            className="text-xs font-semibold text-gray-500 transition hover:text-green-700"
                                                        >
                                                            Set as default
                                                        </button>
                                                    )}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {language.translations}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="w-32">
                                                        <div className="mb-1.5 flex items-center justify-between text-xs">
                                                            <span className="font-medium text-gray-500">
                                                                {
                                                                    language.completion
                                                                }
                                                                %
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                                                            <div
                                                                className="h-full rounded-full bg-green-600"
                                                                style={{
                                                                    width: `${language.completion}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-500">
                                                    {
                                                        language.updatedAt
                                                    }
                                                </td>

                                                <td className="relative px-5 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link
                                                            to={`/admin/administration/languages/${language.id}/edit`}
                                                            title="Edit language"
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
                                                                        language.id
                                                                        ? null
                                                                        : language.id,
                                                                )
                                                            }
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    {openMenu ===
                                                        language.id && (
                                                        <div className="absolute right-5 top-14 z-20 w-56 rounded-2xl border border-gray-200 bg-white p-1.5 text-left shadow-xl shadow-gray-900/10">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setDefault(
                                                                        language.id,
                                                                    )
                                                                }}
                                                                disabled={
                                                                    language.default
                                                                }
                                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                                            >
                                                                <ShieldCheck className="h-4 w-4" />
                                                                {language.default
                                                                    ? "Already Default"
                                                                    : "Set as Default"}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleStatus(
                                                                        language.id,
                                                                    )
                                                                }
                                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                {language.status ===
                                                                "Active" ? (
                                                                    <UserX className="h-4 w-4" />
                                                                ) : (
                                                                    <UserCheck className="h-4 w-4" />
                                                                )}

                                                                {language.status ===
                                                                "Active"
                                                                    ? "Deactivate"
                                                                    : "Activate"}
                                                            </button>

                                                            <div className="my-1 border-t border-gray-100" />

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setDeleteLanguage(
                                                                        language,
                                                                    )
                                                                    setOpenMenu(
                                                                        null,
                                                                    )
                                                                }}
                                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete Language
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
                                            colSpan="8"
                                            className="px-5 py-16 text-center"
                                        >
                                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                    <Globe2 className="h-6 w-6" />
                                                </div>

                                                <h3 className="font-semibold text-gray-900">
                                                    No languages found
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Try changing your
                                                    search or filter.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* UI-only notice */}
                <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                    <p className="text-xs leading-5 text-amber-800">
                        <span className="font-semibold">
                            UI preview:
                        </span>{" "}
                        Language changes are currently stored only in
                        this page's temporary state. Backend persistence,
                        translation cleanup and public language-switcher
                        updates will be connected later.
                    </p>
                </div>
            </div>

            {/* Notice */}
            {notice && (
                <div className="fixed bottom-5 right-5 z-[70] max-w-sm rounded-2xl border border-green-200 bg-white px-4 py-3 shadow-xl shadow-gray-900/10">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <p className="text-sm font-medium text-gray-700">
                            {notice}
                        </p>

                        <button
                            type="button"
                            onClick={() => setNotice("")}
                            className="text-gray-400 transition hover:text-gray-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteLanguage && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-950/30 p-4">
                    <div
                        className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                    <Trash2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Delete Language?
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        This action affects website
                                        language availability.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteLanguage(null)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
                            <p className="text-sm leading-6 text-red-800">
                                You are about to remove{" "}
                                <span className="font-bold">
                                    {deleteLanguage.name}
                                </span>{" "}
                                (
                                {deleteLanguage.code}).
                            </p>

                            <p className="mt-2 text-sm leading-6 text-red-700">
                                This language currently has{" "}
                                <span className="font-semibold">
                                    {deleteLanguage.translations}
                                </span>{" "}
                                translation entries in the UI preview.
                                In the real backend, these translations
                                should be handled before permanent
                                deletion.
                            </p>
                        </div>

                        {deleteLanguage.default && (
                            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                <p className="text-sm leading-6 text-amber-800">
                                    <span className="font-semibold">
                                        This is the default language.
                                    </span>{" "}
                                    It cannot be deleted until another
                                    language is selected as the default.
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteLanguage(null)
                                }
                                className="kr-hover-button rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={confirmDelete}
                                disabled={deleteLanguage.default}
                                className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/10 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Language
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const SummaryCard = ({
    icon: Icon,
    label,
    value,
    description,
}) => {
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

                    <p className="mt-1 text-xs text-gray-400">
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

const TableHead = ({ children, align }) => {
    return (
        <th
            className={`px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 ${
                align === "right" ? "text-right" : ""
            }`}
        >
            {children}
        </th>
    )
}

const StatusBadge = ({ status }) => {
    const active = status === "Active"

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                active
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    active ? "bg-green-600" : "bg-gray-400"
                }`}
            />

            {status}
        </span>
    )
}

export default Languages