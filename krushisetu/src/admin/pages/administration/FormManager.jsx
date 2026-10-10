import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    Bell,
    CheckCircle2,
    ChevronDown,
    ClipboardList,
    Copy,
    Edit3,
    Eye,
    FileText,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    Settings2,
    ToggleLeft,
    ToggleRight,
    Trash2,
    Users,
    X,
} from "lucide-react"

const formsData = [
    {
        id: 1,
        name: "Farmer Application Form",
        slug: "farmer-application",
        description:
            "Public form used by farmers to submit programme and service applications.",
        category: "Applications",
        fields: 14,
        requiredFields: 11,
        status: "Published",
        submissions: 0,
        openDate: "01 Jan 2026",
        closeDate: "31 Dec 2026",
        notifications: true,
        consent: true,
        updatedAt: "30 Sep 2026",
    },
    {
        id: 2,
        name: "Training Registration Form",
        slug: "training-registration",
        description:
            "Registration form for upcoming Krushisetu training programmes and events.",
        category: "Training",
        fields: 12,
        requiredFields: 9,
        status: "Published",
        submissions: 0,
        openDate: "01 Jan 2026",
        closeDate: "31 Dec 2026",
        notifications: true,
        consent: true,
        updatedAt: "28 Sep 2026",
    },
    {
        id: 3,
        name: "Service Enquiry Form",
        slug: "service-enquiry",
        description:
            "Public enquiry form for programme, service and support requests.",
        category: "CRM",
        fields: 9,
        requiredFields: 7,
        status: "Published",
        submissions: 1,
        openDate: "01 Jan 2026",
        closeDate: "31 Dec 2026",
        notifications: true,
        consent: true,
        updatedAt: "27 Sep 2026",
    },
    {
        id: 4,
        name: "Internship Application Form",
        slug: "internship-application",
        description:
            "Application form for students and candidates interested in internships.",
        category: "Applications",
        fields: 18,
        requiredFields: 14,
        status: "Published",
        submissions: 0,
        openDate: "01 Jun 2026",
        closeDate: "31 Dec 2026",
        notifications: true,
        consent: true,
        updatedAt: "25 Sep 2026",
    },
    {
        id: 5,
        name: "FPO Registration Form",
        slug: "fpo-registration",
        description:
            "Registration form for Farmer Producer Organisations and related enquiries.",
        category: "Applications",
        fields: 16,
        requiredFields: 12,
        status: "Draft",
        submissions: 0,
        openDate: "10 Oct 2026",
        closeDate: "31 Dec 2026",
        notifications: false,
        consent: true,
        updatedAt: "24 Sep 2026",
    },
    {
        id: 6,
        name: "Partnership Enquiry Form",
        slug: "partnership-enquiry",
        description:
            "Form for organisations interested in partnerships and collaboration.",
        category: "Partnerships",
        fields: 11,
        requiredFields: 8,
        status: "Published",
        submissions: 0,
        openDate: "01 Jan 2026",
        closeDate: "31 Dec 2026",
        notifications: true,
        consent: true,
        updatedAt: "20 Sep 2026",
    },
    {
        id: 7,
        name: "Volunteer Registration Form",
        slug: "volunteer-registration",
        description:
            "Registration form for individuals interested in volunteering.",
        category: "Applications",
        fields: 13,
        requiredFields: 10,
        status: "Draft",
        submissions: 0,
        openDate: "15 Oct 2026",
        closeDate: "31 Dec 2026",
        notifications: false,
        consent: true,
        updatedAt: "18 Sep 2026",
    },
    {
        id: 8,
        name: "Contact Form",
        slug: "contact",
        description:
            "General public contact form used for website enquiries.",
        category: "Website",
        fields: 7,
        requiredFields: 5,
        status: "Published",
        submissions: 1,
        openDate: "01 Jan 2026",
        closeDate: "31 Dec 2026",
        notifications: true,
        consent: true,
        updatedAt: "15 Sep 2026",
    },
]

const FormManager = () => {
    const [forms, setForms] = useState(formsData)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")
    const [categoryFilter, setCategoryFilter] = useState("All Categories")
    const [openMenu, setOpenMenu] = useState(null)
    const [selectedForms, setSelectedForms] = useState([])
    const [viewForm, setViewForm] = useState(null)

    const filteredForms = useMemo(() => {
        const query = search.trim().toLowerCase()

        return forms.filter((form) => {
            const matchesSearch =
                !query ||
                form.name.toLowerCase().includes(query) ||
                form.description.toLowerCase().includes(query) ||
                form.slug.toLowerCase().includes(query)

            const matchesStatus =
                statusFilter === "All Status" ||
                form.status === statusFilter

            const matchesCategory =
                categoryFilter === "All Categories" ||
                form.category === categoryFilter

            return matchesSearch && matchesStatus && matchesCategory
        })
    }, [forms, search, statusFilter, categoryFilter])

    const publishedCount = forms.filter(
        (form) => form.status === "Published",
    ).length

    const draftCount = forms.filter((form) => form.status === "Draft").length

    const notificationCount = forms.filter(
        (form) => form.notifications,
    ).length

    const totalSubmissions = forms.reduce(
        (total, form) => total + form.submissions,
        0,
    )

    const allSelected =
        filteredForms.length > 0 &&
        filteredForms.every((form) => selectedForms.includes(form.id))

    const toggleForm = (id) => {
        setSelectedForms((current) =>
            current.includes(id)
                ? current.filter((formId) => formId !== id)
                : [...current, id],
        )
    }

    const toggleAll = () => {
        if (allSelected) {
            setSelectedForms((current) =>
                current.filter(
                    (id) => !filteredForms.some((form) => form.id === id),
                ),
            )
            return
        }

        setSelectedForms((current) => [
            ...new Set([
                ...current,
                ...filteredForms.map((form) => form.id),
            ]),
        ])
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All Status")
        setCategoryFilter("All Categories")
    }

    const toggleStatus = (id) => {
        setForms((current) =>
            current.map((form) =>
                form.id === id
                    ? {
                          ...form,
                          status:
                              form.status === "Published"
                                  ? "Draft"
                                  : "Published",
                      }
                    : form,
            ),
        )

        setOpenMenu(null)
    }

    const toggleNotifications = (id) => {
        setForms((current) =>
            current.map((form) =>
                form.id === id
                    ? {
                          ...form,
                          notifications: !form.notifications,
                      }
                    : form,
            ),
        )
    }

    const duplicateForm = (id) => {
        const original = forms.find((form) => form.id === id)

        if (!original) return

        const newForm = {
            ...original,
            id: Math.max(...forms.map((form) => form.id)) + 1,
            name: `${original.name} Copy`,
            slug: `${original.slug}-copy`,
            status: "Draft",
            submissions: 0,
            updatedAt: "01 Oct 2026",
        }

        setForms((current) => [...current, newForm])
        setOpenMenu(null)
    }

    const deleteForm = (id) => {
        setForms((current) => current.filter((form) => form.id !== id))
        setSelectedForms((current) =>
            current.filter((formId) => formId !== id),
        )
        setOpenMenu(null)
    }

    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <Settings2 className="h-4 w-4" />
                            Administration
                            <span className="text-gray-400">/</span>
                            Form Manager
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Form Manager
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Create and manage public forms, fields, consent,
                            notifications and submission settings.
                        </p>
                    </div>

                    <Link
                        to="/admin/administration/forms/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Create Form
                    </Link>
                </div>

                {/* Summary */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={ClipboardList}
                        label="Total Forms"
                        value={forms.length}
                        description="Configured website forms"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Published"
                        value={publishedCount}
                        description="Currently available"
                    />

                    <SummaryCard
                        icon={FileText}
                        label="Drafts"
                        value={draftCount}
                        description="Awaiting publication"
                    />

                    <SummaryCard
                        icon={Users}
                        label="Submissions"
                        value={totalSubmissions}
                        description="UI preview submissions"
                    />
                </div>

                {/* Form management notice */}
                <div className="mb-6 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <ClipboardList className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                Form configuration
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Configure fields, required information,
                                consent requirements, opening and closing
                                dates, confirmation messages and notification
                                settings for each public form.
                            </p>
                        </div>
                    </div>
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
                                placeholder="Search forms..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <Filter className="h-4 w-4" />
                            Filters
                        </div>

                        <FilterSelect
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            options={[
                                "All Categories",
                                "Applications",
                                "Training",
                                "CRM",
                                "Partnerships",
                                "Website",
                            ]}
                        />

                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={[
                                "All Status",
                                "Published",
                                "Draft",
                            ]}
                        />

                        {(search ||
                            statusFilter !== "All Status" ||
                            categoryFilter !== "All Categories") && (
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

                    {selectedForms.length > 0 && (
                        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-green-100 bg-green-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm font-medium text-green-800">
                                {selectedForms.length} form
                                {selectedForms.length !== 1 ? "s" : ""} selected
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    Publish
                                </button>

                                <button
                                    type="button"
                                    className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    Move to Draft
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setSelectedForms([])}
                                    className="rounded-xl px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1200px] text-left">
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

                                    <TableHead>Form</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Fields</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submissions</TableHead>
                                    <TableHead>Availability</TableHead>
                                    <TableHead>Notifications</TableHead>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredForms.length > 0 ? (
                                    filteredForms.map((form) => (
                                        <tr
                                            key={form.id}
                                            className="transition hover:bg-green-50/30"
                                        >
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedForms.includes(
                                                        form.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleForm(form.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                                        <FileText className="h-5 w-5" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {form.name}
                                                            </p>
                                                        </div>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            /{form.slug}
                                                        </p>

                                                        <p className="mt-1 max-w-[330px] text-xs leading-5 text-gray-500">
                                                            {form.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-flex rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                                                    {form.category}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        {form.fields}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-gray-400">
                                                        {form.requiredFields}{" "}
                                                        required
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={form.status}
                                                />
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Users className="h-4 w-4 text-gray-400" />
                                                    {form.submissions}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="text-xs text-gray-500">
                                                    <p>
                                                        {form.openDate}
                                                    </p>
                                                    <p className="mt-1 text-gray-400">
                                                        to {form.closeDate}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleNotifications(
                                                            form.id,
                                                        )
                                                    }
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                                                        form.notifications
                                                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    {form.notifications ? (
                                                        <>
                                                            <ToggleRight className="h-4 w-4" />
                                                            On
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ToggleLeft className="h-4 w-4" />
                                                            Off
                                                        </>
                                                    )}
                                                </button>
                                            </td>

                                            <td className="relative px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        type="button"
                                                        title="Preview form"
                                                        onClick={() =>
                                                            setViewForm(form)
                                                        }
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>

                                                    <Link
                                                        to={`/admin/administration/forms/${form.id}/edit`}
                                                        title="Edit form"
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
                                                                    form.id
                                                                    ? null
                                                                    : form.id,
                                                            )
                                                        }
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {openMenu === form.id && (
                                                    <div className="absolute right-5 top-14 z-20 w-52 rounded-2xl border border-gray-200 bg-white p-1.5 text-left shadow-xl shadow-gray-900/10">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setViewForm(
                                                                    form,
                                                                )
                                                                setOpenMenu(
                                                                    null,
                                                                )
                                                            }}
                                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            Preview Form
                                                        </button>

                                                        <Link
                                                            to={`/admin/administration/forms/${form.id}/edit`}
                                                            onClick={() =>
                                                                setOpenMenu(
                                                                    null,
                                                                )
                                                            }
                                                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Edit3 className="h-4 w-4" />
                                                            Edit Form
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                duplicateForm(
                                                                    form.id,
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                            Duplicate Form
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                toggleStatus(
                                                                    form.id,
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <CheckCircle2 className="h-4 w-4" />
                                                            {form.status ===
                                                            "Published"
                                                                ? "Move to Draft"
                                                                : "Publish Form"}
                                                        </button>

                                                        <div className="my-1 border-t border-gray-100" />

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteForm(
                                                                    form.id,
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete Form
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-6 py-16 text-center"
                                        >
                                            <div className="mx-auto flex max-w-sm flex-col items-center">
                                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                    <ClipboardList className="h-6 w-6" />
                                                </div>

                                                <h3 className="text-sm font-bold text-gray-900">
                                                    No forms found
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
                                {filteredForms.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700">
                                {forms.length}
                            </span>{" "}
                            forms
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

                {/* Notice */}
                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                    UI preview data only — form fields, submissions,
                    notifications and publishing will be connected to the
                    backend later.
                </div>
            </div>

            {/* Preview Modal */}
            {viewForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/30 p-4">
                    <div
                        className="absolute inset-0"
                        onClick={() => setViewForm(null)}
                    />

                    <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <FileText className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {viewForm.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        /{viewForm.slug}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setViewForm(null)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="max-h-[65vh] overflow-y-auto p-6">
                            <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                                <p className="text-sm leading-6 text-gray-600">
                                    {viewForm.description}
                                </p>
                            </div>

                            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <MiniInfo
                                    label="Fields"
                                    value={viewForm.fields}
                                />

                                <MiniInfo
                                    label="Required"
                                    value={viewForm.requiredFields}
                                />

                                <MiniInfo
                                    label="Submissions"
                                    value={viewForm.submissions}
                                />

                                <MiniInfo
                                    label="Status"
                                    value={viewForm.status}
                                />
                            </div>

                            <div className="space-y-4">
                                <Section title="Form Configuration">
                                    <InfoRow
                                        label="Category"
                                        value={viewForm.category}
                                    />

                                    <InfoRow
                                        label="Opening Date"
                                        value={viewForm.openDate}
                                    />

                                    <InfoRow
                                        label="Closing Date"
                                        value={viewForm.closeDate}
                                    />

                                    <InfoRow
                                        label="Consent Required"
                                        value={
                                            viewForm.consent
                                                ? "Yes"
                                                : "No"
                                        }
                                    />
                                </Section>

                                <Section title="Notifications">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <Bell className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    Submission notifications
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    Notify administrators when
                                                    a new form submission is
                                                    received.
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                viewForm.notifications
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            {viewForm.notifications
                                                ? "Enabled"
                                                : "Disabled"}
                                        </span>
                                    </div>
                                </Section>

                                <Section title="Example Fields">
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {[
                                            "Full Name",
                                            "Email Address",
                                            "Phone Number",
                                            "Organisation",
                                            "Location",
                                            "Message",
                                        ].map((field, index) => (
                                            <div
                                                key={field}
                                                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2.5"
                                            >
                                                <span className="text-xs font-medium text-gray-700">
                                                    {field}
                                                </span>

                                                <span
                                                    className={`text-[10px] font-semibold ${
                                                        index < 4
                                                            ? "text-red-500"
                                                            : "text-gray-400"
                                                    }`}
                                                >
                                                    {index < 4
                                                        ? "Required"
                                                        : "Optional"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </Section>

                                <Section title="Confirmation Message">
                                    <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4 text-sm leading-6 text-gray-600">
                                        Thank you for contacting Krushisetu.
                                        Your submission has been received and
                                        our team will review it shortly.
                                    </div>
                                </Section>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50/70 px-6 py-4">
                            <button
                                type="button"
                                onClick={() => setViewForm(null)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Close
                            </button>

                            <Link
                                to={`/admin/administration/forms/${viewForm.id}/edit`}
                                className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Form
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
    const published = status === "Published"

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                published
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    published ? "bg-green-600" : "bg-amber-500"
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

export default FormManager