import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    Building2,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Eye,
    Filter,
    Globe2,
    Handshake,
    Plus,
    Search,
    ShieldCheck,
} from "lucide-react"

const partnersData = [
    {
        id: 1,
        name: "Maharashtra Rural Development Network",
        shortName: "MRDN",
        type: "Government",
        category: "Institutional",
        location: "Maharashtra",
        website: "https://example.com",
        status: "Published",
        featured: true,
        order: 1,
        description:
            "Institutional collaboration supporting rural development programmes.",
    },
    {
        id: 2,
        name: "Agri Development Foundation",
        shortName: "ADF",
        type: "NGO",
        category: "Development Partner",
        location: "Maharashtra",
        website: "https://example.com",
        status: "Published",
        featured: true,
        order: 2,
        description:
            "Partner organisation supporting farmer-focused development initiatives.",
    },
    {
        id: 3,
        name: "Rural Skills Initiative",
        shortName: "RSI",
        type: "Training Institution",
        category: "Training Partner",
        location: "Maharashtra",
        website: "https://example.com",
        status: "Published",
        featured: false,
        order: 3,
        description:
            "Training collaboration focused on rural skills and capacity building.",
    },
    {
        id: 4,
        name: "Community Finance Network",
        shortName: "CFN",
        type: "Financial Institution",
        category: "Finance Partner",
        location: "Pune",
        website: "https://example.com",
        status: "In Review",
        featured: false,
        order: 4,
        description:
            "Financial ecosystem partner supporting community initiatives.",
    },
    {
        id: 5,
        name: "Sustainable Agriculture Collective",
        shortName: "SAC",
        type: "NGO",
        category: "Technical Partner",
        location: "Nashik",
        website: "https://example.com",
        status: "Published",
        featured: false,
        order: 5,
        description:
            "Technical collaboration around sustainable agricultural practices.",
    },
    {
        id: 6,
        name: "Rural Enterprise Forum",
        shortName: "REF",
        type: "Industry",
        category: "Enterprise Partner",
        location: "Mumbai",
        website: "https://example.com",
        status: "Draft",
        featured: false,
        order: 6,
        description:
            "Enterprise network supporting rural entrepreneurship programmes.",
    },
    {
        id: 7,
        name: "Community Health Alliance",
        shortName: "CHA",
        type: "NGO",
        category: "Community Partner",
        location: "Ahmednagar",
        website: "https://example.com",
        status: "Published",
        featured: false,
        order: 7,
        description:
            "Community-focused organisation supporting local development activities.",
    },
    {
        id: 8,
        name: "Agricultural Research Centre",
        shortName: "ARC",
        type: "Research Institution",
        category: "Knowledge Partner",
        location: "Pune",
        website: "https://example.com",
        status: "In Review",
        featured: false,
        order: 8,
        description:
            "Knowledge and research collaboration supporting agriculture programmes.",
    },
]

const Partners = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [typeFilter, setTypeFilter] = useState("All")
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    const filteredPartners = useMemo(() => {
        return partnersData.filter((partner) => {
            const searchValue = search
                .toLowerCase()
                .trim()

            const matchesSearch =
                !searchValue ||
                partner.name
                    .toLowerCase()
                    .includes(searchValue) ||
                partner.shortName
                    .toLowerCase()
                    .includes(searchValue) ||
                partner.type
                    .toLowerCase()
                    .includes(searchValue) ||
                partner.category
                    .toLowerCase()
                    .includes(searchValue) ||
                partner.location
                    .toLowerCase()
                    .includes(searchValue)

            const matchesStatus =
                statusFilter === "All" ||
                partner.status === statusFilter

            const matchesType =
                typeFilter === "All" ||
                partner.type === typeFilter

            const matchesCategory =
                categoryFilter === "All" ||
                partner.category === categoryFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesCategory
            )
        })
    }, [
        search,
        statusFilter,
        typeFilter,
        categoryFilter,
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredPartners.length / itemsPerPage
        )
    )

    const safePage = Math.min(
        currentPage,
        totalPages
    )

    const paginatedPartners =
        filteredPartners.slice(
            (safePage - 1) * itemsPerPage,
            safePage * itemsPerPage
        )

    const publishedCount =
        partnersData.filter(
            (partner) =>
                partner.status === "Published"
        ).length

    const featuredCount =
        partnersData.filter(
            (partner) => partner.featured
        ).length

    const organisationTypes = [
        "All",
        ...new Set(
            partnersData.map(
                (partner) => partner.type
            )
        ),
    ]

    const categories = [
        "All",
        ...new Set(
            partnersData.map(
                (partner) => partner.category
            )
        ),
    ]

    const resetPage = () => {
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setTypeFilter("All")
        setCategoryFilter("All")
        setCurrentPage(1)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <span>
                                Content Management
                            </span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Partners
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Partners
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage partner organisations, institutional
                            collaborations and public partner profiles.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/partners/new"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Partner
                    </Link>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={Handshake}
                        label="Total Partners"
                        value={partnersData.length}
                        description="Partner organisations"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Published"
                        value={publishedCount}
                        description="Visible on website"
                    />

                    <SummaryCard
                        icon={ShieldCheck}
                        label="Featured"
                        value={featuredCount}
                        description="Featured partnerships"
                    />

                    <SummaryCard
                        icon={Building2}
                        label="Organisation Types"
                        value={
                            organisationTypes.length - 1
                        }
                        description="Different partner types"
                    />
                </div>

                {/* Information card */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <Handshake className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-green-950">
                                Partnership directory
                            </h2>

                            <p className="mt-1 max-w-4xl text-xs leading-5 text-green-900/70">
                                Keep partner names, organisation types,
                                categories, locations, descriptions and
                                website links consistent across the
                                public website.
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
                                placeholder="Search partner, type, category, location..."
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
                            label="Type"
                            value={typeFilter}
                            onChange={(value) => {
                                setTypeFilter(value)
                                resetPage()
                            }}
                            options={
                                organisationTypes
                            }
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
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Partner Directory
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredPartners.length}{" "}
                                partner
                                {filteredPartners.length ===
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

                    {paginatedPartners.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1100px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <TableHead>
                                                Partner
                                            </TableHead>

                                            <TableHead>
                                                Type
                                            </TableHead>

                                            <TableHead>
                                                Category
                                            </TableHead>

                                            <TableHead>
                                                Location
                                            </TableHead>

                                            <TableHead>
                                                Website
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
                                        {paginatedPartners.map(
                                            (
                                                partner
                                            ) => (
                                                <tr
                                                    key={
                                                        partner.id
                                                    }
                                                    className="border-b border-gray-100 last:border-0 hover:bg-green-50/30"
                                                >
                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                <Building2 className="h-5 w-5" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="max-w-[280px] truncate text-sm font-bold text-gray-900">
                                                                    {
                                                                        partner.name
                                                                    }
                                                                </p>

                                                                <p className="mt-0.5 text-xs font-medium text-gray-400">
                                                                    {
                                                                        partner.shortName
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <TypeBadge
                                                            type={
                                                                partner.type
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {
                                                                partner.category
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Globe2 className="h-4 w-4 text-gray-400" />
                                                            {
                                                                partner.location
                                                            }
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <a
                                                            href={
                                                                partner.website
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 transition hover:text-green-900"
                                                        >
                                                            Visit
                                                            Website
                                                        </a>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        {partner.featured ? (
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
                                                                partner.status
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                to={`/admin/content/partners/${partner.id}`}
                                                                title="Preview"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/partners/${partner.id}/edit`}
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
                                            filteredPartners.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {
                                            filteredPartners.length
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

const TypeBadge = ({
    type,
}) => {
    const isGovernment =
        type === "Government"

    const isInstitution =
        type === "Research Institution" ||
        type === "Training Institution" ||
        type === "Financial Institution"

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                isGovernment
                    ? "bg-blue-50 text-blue-700"
                    : isInstitution
                      ? "bg-purple-50 text-purple-700"
                      : "bg-gray-100 text-gray-600"
            }`}
        >
            {isGovernment ? (
                <ShieldCheck className="h-3 w-3" />
            ) : (
                <Building2 className="h-3 w-3" />
            )}

            {type}
        </span>
    )
}

const EmptyState = ({
    onReset,
}) => {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                <Handshake className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">
                No partners found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search or filters to find another
                partner.
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

export default Partners