import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Eye,
    Filter,
    HelpCircle,
    Plus,
    Search,
} from "lucide-react"

const faqsData = [
    {
        id: 1,
        question: "What is Krushisetu?",
        answer:
            "Krushisetu is a rural development platform connecting farmers, communities, programmes and support services.",
        category: "General",
        audience: "Farmers",
        language: "English",
        status: "Published",
        featured: true,
        order: 1,
        updatedAt: "28 Sep 2026",
    },
    {
        id: 2,
        question: "How can I apply for a government scheme?",
        answer:
            "You can explore eligible schemes on the Schemes section and follow the application steps provided for each scheme.",
        category: "Schemes",
        audience: "Farmers",
        language: "English",
        status: "Published",
        featured: true,
        order: 2,
        updatedAt: "27 Sep 2026",
    },
    {
        id: 3,
        question: "How can I register for a training programme?",
        answer:
            "Open the Training & Events section, select the relevant programme and complete the registration form before the registration deadline.",
        category: "Training",
        audience: "Farmers",
        language: "English",
        status: "Published",
        featured: false,
        order: 3,
        updatedAt: "26 Sep 2026",
    },
    {
        id: 4,
        question: "How can I contact Krushisetu?",
        answer:
            "You can contact the organisation through the Contact page or use the enquiry form available on the website.",
        category: "General",
        audience: "All Visitors",
        language: "English",
        status: "Published",
        featured: false,
        order: 4,
        updatedAt: "25 Sep 2026",
    },
    {
        id: 5,
        question: "What documents may be required for scheme applications?",
        answer:
            "Required documents depend on the individual scheme. Check the Documents section on the relevant scheme detail page.",
        category: "Schemes",
        audience: "Farmers",
        language: "English",
        status: "In Review",
        featured: false,
        order: 5,
        updatedAt: "24 Sep 2026",
    },
    {
        id: 6,
        question: "Can organisations partner with Krushisetu?",
        answer:
            "Organisations can submit partnership enquiries through the Partnerships section for review by the Krushisetu team.",
        category: "Partnerships",
        audience: "Organisations",
        language: "English",
        status: "Published",
        featured: true,
        order: 6,
        updatedAt: "23 Sep 2026",
    },
    {
        id: 7,
        question: "How can I access farmer resources?",
        answer:
            "Farmer resources such as guides, articles, calendars and reference material are available through the Resources section.",
        category: "Resources",
        audience: "Farmers",
        language: "English",
        status: "Draft",
        featured: false,
        order: 7,
        updatedAt: "22 Sep 2026",
    },
    {
        id: 8,
        question: "How can I apply for an internship?",
        answer:
            "Open the Applications section and select Internships to review the available opportunity and submit an application.",
        category: "Applications",
        audience: "Students",
        language: "English",
        status: "Published",
        featured: false,
        order: 8,
        updatedAt: "21 Sep 2026",
    },
    {
        id: 9,
        question: "How can I register as an FPO?",
        answer:
            "FPO-related support and applications can be submitted through the relevant application or support workflow.",
        category: "FPO",
        audience: "FPOs",
        language: "English",
        status: "In Review",
        featured: false,
        order: 9,
        updatedAt: "20 Sep 2026",
    },
    {
        id: 10,
        question: "Are training certificates provided?",
        answer:
            "Certificate availability depends on the specific training or event and its configured completion requirements.",
        category: "Training",
        audience: "Participants",
        language: "English",
        status: "Published",
        featured: false,
        order: 10,
        updatedAt: "19 Sep 2026",
    },
]

const FAQs = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] =
        useState("All")
    const [categoryFilter, setCategoryFilter] =
        useState("All")
    const [audienceFilter, setAudienceFilter] =
        useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedId, setExpandedId] = useState(null)

    const itemsPerPage = 6

    const filteredFaqs = useMemo(() => {
        const searchValue = search
            .toLowerCase()
            .trim()

        return faqsData.filter((faq) => {
            const matchesSearch =
                !searchValue ||
                faq.question
                    .toLowerCase()
                    .includes(searchValue) ||
                faq.answer
                    .toLowerCase()
                    .includes(searchValue) ||
                faq.category
                    .toLowerCase()
                    .includes(searchValue) ||
                faq.audience
                    .toLowerCase()
                    .includes(searchValue)

            const matchesStatus =
                statusFilter === "All" ||
                faq.status === statusFilter

            const matchesCategory =
                categoryFilter === "All" ||
                faq.category === categoryFilter

            const matchesAudience =
                audienceFilter === "All" ||
                faq.audience === audienceFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory &&
                matchesAudience
            )
        })
    }, [
        search,
        statusFilter,
        categoryFilter,
        audienceFilter,
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredFaqs.length / itemsPerPage
        )
    )

    const safePage = Math.min(
        currentPage,
        totalPages
    )

    const paginatedFaqs = filteredFaqs.slice(
        (safePage - 1) * itemsPerPage,
        safePage * itemsPerPage
    )

    const publishedCount =
        faqsData.filter(
            (faq) => faq.status === "Published"
        ).length

    const featuredCount =
        faqsData.filter(
            (faq) => faq.featured
        ).length

    const reviewCount =
        faqsData.filter(
            (faq) => faq.status === "In Review"
        ).length

    const categories = [
        "All",
        ...new Set(
            faqsData.map((faq) => faq.category)
        ),
    ]

    const audiences = [
        "All",
        ...new Set(
            faqsData.map((faq) => faq.audience)
        ),
    ]

    const resetPage = () => {
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setCategoryFilter("All")
        setAudienceFilter("All")
        setCurrentPage(1)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium text-green-700">
                            <span>
                                Content Management
                            </span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                FAQs
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            FAQs
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage frequently asked questions,
                            categories, audiences and public website
                            visibility.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/faqs/new"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add FAQ
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={HelpCircle}
                        label="Total FAQs"
                        value={faqsData.length}
                        description="Questions in the library"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Published"
                        value={publishedCount}
                        description="Visible on website"
                    />

                    <SummaryCard
                        icon={HelpCircle}
                        label="Featured"
                        value={featuredCount}
                        description="Priority questions"
                    />

                    <SummaryCard
                        icon={Filter}
                        label="In Review"
                        value={reviewCount}
                        description="Awaiting content review"
                    />
                </div>

                {/* Information */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <HelpCircle className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-green-950">
                                FAQ content management
                            </h2>

                            <p className="mt-1 max-w-4xl text-xs leading-5 text-green-900/70">
                                Keep answers clear, current and relevant
                                to the intended audience. Featured FAQs
                                can be surfaced in high-visibility
                                sections of the public website.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                        <div className="relative min-w-0 flex-1">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(
                                        e.target.value
                                    )
                                    resetPage()
                                }}
                                placeholder="Search question, answer, category, audience..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                            <Filter className="h-4 w-4" />

                            <span className="text-xs font-semibold">
                                Filters
                            </span>
                        </div>

                        <FilterSelect
                            label="Status"
                            value={statusFilter}
                            onChange={(value) => {
                                setStatusFilter(
                                    value
                                )
                                resetPage()
                            }}
                            options={[
                                "All",
                                "Published",
                                "In Review",
                                "Draft",
                            ]}
                        />

                        <FilterSelect
                            label="Category"
                            value={categoryFilter}
                            onChange={(value) => {
                                setCategoryFilter(
                                    value
                                )
                                resetPage()
                            }}
                            options={categories}
                        />

                        <FilterSelect
                            label="Audience"
                            value={audienceFilter}
                            onChange={(value) => {
                                setAudienceFilter(
                                    value
                                )
                                resetPage()
                            }}
                            options={audiences}
                        />
                    </div>
                </div>

                {/* FAQ Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                FAQ Library
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredFaqs.length}{" "}
                                question
                                {filteredFaqs.length ===
                                1
                                    ? ""
                                    : "s"}{" "}
                                found
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-700">
                            UI preview data
                        </span>
                    </div>

                    {paginatedFaqs.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1100px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <TableHead>
                                                Question
                                            </TableHead>

                                            <TableHead>
                                                Category
                                            </TableHead>

                                            <TableHead>
                                                Audience
                                            </TableHead>

                                            <TableHead>
                                                Language
                                            </TableHead>

                                            <TableHead>
                                                Updated
                                            </TableHead>

                                            <TableHead>
                                                Featured
                                            </TableHead>

                                            <TableHead>
                                                Status
                                            </TableHead>

                                            <TableHead align="right">
                                                Actions
                                            </TableHead>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedFaqs.map(
                                            (faq) => {
                                                const isExpanded =
                                                    expandedId ===
                                                    faq.id

                                                return (
                                                    <tr
                                                        key={
                                                            faq.id
                                                        }
                                                        className="border-b border-gray-100 last:border-0 hover:bg-green-50/20"
                                                    >
                                                        <td className="px-5 py-4 sm:px-6">
                                                            <div className="max-w-[390px]">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setExpandedId(
                                                                            isExpanded
                                                                                ? null
                                                                                : faq.id
                                                                        )
                                                                    }
                                                                    className="group flex w-full items-start gap-3 text-left"
                                                                >
                                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                        <HelpCircle className="h-5 w-5" />
                                                                    </div>

                                                                    <div className="min-w-0 flex-1">
                                                                        <div className="flex items-start gap-2">
                                                                            <p className="text-sm font-bold leading-5 text-gray-900 group-hover:text-green-800">
                                                                                {
                                                                                    faq.question
                                                                                }
                                                                            </p>

                                                                            <ChevronDown
                                                                                className={`mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                                                                                    isExpanded
                                                                                        ? "rotate-180"
                                                                                        : ""
                                                                                }`}
                                                                            />
                                                                        </div>

                                                                        {isExpanded && (
                                                                            <p className="mt-2 text-xs leading-5 text-gray-500">
                                                                                {
                                                                                    faq.answer
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </td>

                                                        <td className="px-5 py-4 sm:px-6">
                                                            <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700">
                                                                {
                                                                    faq.category
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4 sm:px-6">
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {
                                                                    faq.audience
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4 sm:px-6">
                                                            <span className="text-sm text-gray-600">
                                                                {
                                                                    faq.language
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4 sm:px-6">
                                                            <span className="text-xs font-medium text-gray-500">
                                                                {
                                                                    faq.updatedAt
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-5 py-4 sm:px-6">
                                                            {faq.featured ? (
                                                                <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                                                                    Featured
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs text-gray-400">
                                                                    No
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="px-5 py-4 sm:px-6">
                                                            <StatusBadge
                                                                status={
                                                                    faq.status
                                                                }
                                                            />
                                                        </td>

                                                        <td className="px-5 py-4 sm:px-6">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Link
                                                                    to={`/admin/content/faqs/${faq.id}`}
                                                                    title="Preview"
                                                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>

                                                                <Link
                                                                    to={`/admin/content/faqs/${faq.id}/edit`}
                                                                    title="Edit"
                                                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                                >
                                                                    <Edit3 className="h-4 w-4" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                <p className="text-xs text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-700">
                                        {(safePage - 1) *
                                            itemsPerPage +
                                            1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-gray-700">
                                        {Math.min(
                                            safePage *
                                                itemsPerPage,
                                            filteredFaqs.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {
                                            filteredFaqs.length
                                        }
                                    </span>
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={
                                            safePage ===
                                            1
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (
                                                    page
                                                ) =>
                                                    Math.max(
                                                        1,
                                                        page -
                                                            1
                                                    )
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-xs font-bold text-white">
                                        {safePage}
                                    </div>

                                    <button
                                        type="button"
                                        disabled={
                                            safePage ===
                                            totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (
                                                    page
                                                ) =>
                                                    Math.min(
                                                        totalPages,
                                                        page +
                                                            1
                                                    )
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <EmptyState
                            onReset={clearFilters}
                        />
                    )}
                </div>
            </div>
        </section>
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
                <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon className="h-5 w-5" />
                </div>

                <span className="text-2xl font-bold text-gray-900">
                    {value}
                </span>
            </div>

            <p className="kr-hover-title mt-4 text-sm font-bold text-gray-900">
                {label}
            </p>

            <p className="mt-1 text-xs text-gray-500">
                {description}
            </p>
        </div>
    )
}

const FilterSelect = ({
    value,
    onChange,
    options,
    label,
}) => {
    return (
        <div className="relative min-w-[155px]">
            <label className="sr-only">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option === "All"
                            ? `All ${label}`
                            : option}
                    </option>
                ))}
            </select>
        </div>
    )
}

const TableHead = ({
    children,
    align = "left",
}) => {
    return (
        <th
            className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 sm:px-6 ${
                align === "right"
                    ? "text-right"
                    : "text-left"
            }`}
        >
            {children}
        </th>
    )
}

const StatusBadge = ({
    status,
}) => {
    const styles = {
        Published:
            "bg-green-50 text-green-700",
        "In Review":
            "bg-amber-50 text-amber-700",
        Draft:
            "bg-gray-100 text-gray-600",
    }

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                styles[status] ||
                "bg-gray-100 text-gray-600"
            }`}
        >
            {status}
        </span>
    )
}

const EmptyState = ({
    onReset,
}) => {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                <HelpCircle className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">
                No FAQs found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search or filters to find another
                question.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="mt-5 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
            >
                Clear Filters
            </button>
        </div>
    )
}

export default FAQs