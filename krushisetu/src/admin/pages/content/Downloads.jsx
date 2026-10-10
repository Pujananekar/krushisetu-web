import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    Archive,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Download,
    Edit3,
    Eye,
    FileText,
    Filter,
    FolderOpen,
    Plus,
    Search,
} from "lucide-react"

const downloadsData = [
    {
        id: 1,
        title: "Krushisetu Organisation Profile",
        description:
            "Official organisation profile and overview document.",
        category: "Organisation",
        fileType: "PDF",
        fileSize: "2.4 MB",
        downloads: 128,
        language: "English",
        status: "Published",
        featured: true,
        updatedAt: "28 Sep 2026",
    },
    {
        id: 2,
        title: "Farmer Scheme Application Guide",
        description:
            "Reference guide for understanding scheme application procedures.",
        category: "Schemes",
        fileType: "PDF",
        fileSize: "3.8 MB",
        downloads: 246,
        language: "English",
        status: "Published",
        featured: true,
        updatedAt: "27 Sep 2026",
    },
    {
        id: 3,
        title: "Training Programme Calendar 2026",
        description:
            "Upcoming training programmes and important dates.",
        category: "Training",
        fileType: "PDF",
        fileSize: "1.6 MB",
        downloads: 184,
        language: "English",
        status: "Published",
        featured: false,
        updatedAt: "26 Sep 2026",
    },
    {
        id: 4,
        title: "Farmer Resource Handbook",
        description:
            "Practical reference material for farmers and rural communities.",
        category: "Resources",
        fileType: "PDF",
        fileSize: "5.2 MB",
        downloads: 312,
        language: "English",
        status: "Published",
        featured: true,
        updatedAt: "25 Sep 2026",
    },
    {
        id: 5,
        title: "Partnership Information Pack",
        description:
            "Information for organisations interested in collaborating with Krushisetu.",
        category: "Partnerships",
        fileType: "PDF",
        fileSize: "2.1 MB",
        downloads: 74,
        language: "English",
        status: "In Review",
        featured: false,
        updatedAt: "24 Sep 2026",
    },
    {
        id: 6,
        title: "FPO Registration Reference",
        description:
            "Reference material for FPO-related registration and support.",
        category: "FPO",
        fileType: "PDF",
        fileSize: "2.8 MB",
        downloads: 96,
        language: "English",
        status: "Published",
        featured: false,
        updatedAt: "23 Sep 2026",
    },
    {
        id: 7,
        title: "Community Programme Brochure",
        description:
            "Overview brochure for community development programmes.",
        category: "Programmes",
        fileType: "PDF",
        fileSize: "4.3 MB",
        downloads: 61,
        language: "Marathi",
        status: "Draft",
        featured: false,
        updatedAt: "22 Sep 2026",
    },
    {
        id: 8,
        title: "Internship Information Guide",
        description:
            "Information for students interested in internship opportunities.",
        category: "Internships",
        fileType: "PDF",
        fileSize: "1.9 MB",
        downloads: 153,
        language: "English",
        status: "Published",
        featured: false,
        updatedAt: "21 Sep 2026",
    },
]

const Downloads = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] =
        useState("All")
    const [categoryFilter, setCategoryFilter] =
        useState("All")
    const [typeFilter, setTypeFilter] =
        useState("All")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    const filteredDownloads = useMemo(() => {
        const searchValue = search
            .toLowerCase()
            .trim()

        return downloadsData.filter((item) => {
            const matchesSearch =
                !searchValue ||
                item.title
                    .toLowerCase()
                    .includes(searchValue) ||
                item.description
                    .toLowerCase()
                    .includes(searchValue) ||
                item.category
                    .toLowerCase()
                    .includes(searchValue) ||
                item.language
                    .toLowerCase()
                    .includes(searchValue)

            const matchesStatus =
                statusFilter === "All" ||
                item.status === statusFilter

            const matchesCategory =
                categoryFilter === "All" ||
                item.category === categoryFilter

            const matchesType =
                typeFilter === "All" ||
                item.fileType === typeFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory &&
                matchesType
            )
        })
    }, [
        search,
        statusFilter,
        categoryFilter,
        typeFilter,
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredDownloads.length / itemsPerPage
        )
    )

    const safePage = Math.min(
        currentPage,
        totalPages
    )

    const paginatedDownloads =
        filteredDownloads.slice(
            (safePage - 1) * itemsPerPage,
            safePage * itemsPerPage
        )

    const publishedCount =
        downloadsData.filter(
            (item) => item.status === "Published"
        ).length

    const featuredCount =
        downloadsData.filter(
            (item) => item.featured
        ).length

    const totalDownloads =
        downloadsData.reduce(
            (total, item) =>
                total + item.downloads,
            0
        )

    const categories = [
        "All",
        ...new Set(
            downloadsData.map(
                (item) => item.category
            )
        ),
    ]

    const fileTypes = [
        "All",
        ...new Set(
            downloadsData.map(
                (item) => item.fileType
            )
        ),
    ]

    const resetPage = () => {
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setCategoryFilter("All")
        setTypeFilter("All")
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
                                Downloads
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Downloads
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage downloadable documents, guides,
                            brochures and other public resources.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/downloads/new"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Download
                    </Link>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={Archive}
                        label="Total Downloads"
                        value={downloadsData.length}
                        description="Documents in library"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Published"
                        value={publishedCount}
                        description="Publicly available"
                    />

                    <SummaryCard
                        icon={FolderOpen}
                        label="Featured"
                        value={featuredCount}
                        description="Featured documents"
                    />

                    <SummaryCard
                        icon={Download}
                        label="Total Downloads"
                        value={totalDownloads}
                        description="Recorded download count"
                    />
                </div>

                {/* Information */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <FileText className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-green-950">
                                Download library
                            </h2>

                            <p className="mt-1 max-w-4xl text-xs leading-5 text-green-900/70">
                                Keep public documents organised by category,
                                language and file type. Verify document
                                versions before publishing updated files.
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
                                placeholder="Search document, category, description..."
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
                            label="File Type"
                            value={typeFilter}
                            onChange={(value) => {
                                setTypeFilter(
                                    value
                                )
                                resetPage()
                            }}
                            options={fileTypes}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Download Library
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredDownloads.length}{" "}
                                document
                                {filteredDownloads.length ===
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

                    {paginatedDownloads.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1150px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <TableHead>
                                                Document
                                            </TableHead>

                                            <TableHead>
                                                Category
                                            </TableHead>

                                            <TableHead>
                                                File
                                            </TableHead>

                                            <TableHead>
                                                Language
                                            </TableHead>

                                            <TableHead>
                                                Downloads
                                            </TableHead>

                                            <TableHead>
                                                Updated
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
                                        {paginatedDownloads.map(
                                            (item) => (
                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                    className="border-b border-gray-100 last:border-0 hover:bg-green-50/20"
                                                >
                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                <FileText className="h-5 w-5" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="max-w-[320px] truncate text-sm font-bold text-gray-900">
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </p>

                                                                    {item.featured && (
                                                                        <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                                                            Featured
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <p className="mt-0.5 max-w-[380px] truncate text-xs text-gray-500">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700">
                                                            {
                                                                item.category
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div>
                                                            <span className="text-xs font-bold text-gray-700">
                                                                {
                                                                    item.fileType
                                                                }
                                                            </span>

                                                            <p className="mt-0.5 text-[11px] text-gray-400">
                                                                {
                                                                    item.fileSize
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-sm font-medium text-gray-600">
                                                            {
                                                                item.language
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center gap-2">
                                                            <Download className="h-4 w-4 text-gray-400" />

                                                            <span className="text-sm font-semibold text-gray-700">
                                                                {item.downloads.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-xs font-medium text-gray-500">
                                                            {
                                                                item.updatedAt
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <StatusBadge
                                                            status={
                                                                item.status
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                to={`/admin/content/downloads/${item.id}`}
                                                                title="Preview"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/downloads/${item.id}/edit`}
                                                                title="Edit"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Edit3 className="h-4 w-4" />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
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
                                            filteredDownloads.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {
                                            filteredDownloads.length
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
                <Download className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">
                No downloads found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search or filters to find another
                document.
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

export default Downloads