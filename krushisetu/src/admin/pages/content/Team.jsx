import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    Edit3,
    Eye,
    Plus,
    Search,
    Users,
    UserRound,
    ShieldCheck,
    BriefcaseBusiness,
    ChevronLeft,
    ChevronRight,
    Filter,
} from "lucide-react"

const teamData = [
    {
        id: 1,
        name: "Founder & Director",
        displayName: "Founder & Director",
        role: "Founder",
        type: "Founder",
        department: "Leadership",
        location: "Maharashtra",
        status: "Published",
        featured: true,
        order: 1,
    },
    {
        id: 2,
        name: "Programme Director",
        displayName: "Programme Director",
        role: "Programme Director",
        type: "Leadership",
        department: "Programmes",
        location: "Maharashtra",
        status: "Published",
        featured: true,
        order: 2,
    },
    {
        id: 3,
        name: "Training Coordinator",
        displayName: "Training Coordinator",
        role: "Training Coordinator",
        type: "Team Member",
        department: "Training & Events",
        location: "Maharashtra",
        status: "Published",
        featured: false,
        order: 3,
    },
    {
        id: 4,
        name: "Community Programme Manager",
        displayName: "Community Programme Manager",
        role: "Programme Manager",
        type: "Team Member",
        department: "Community Development",
        location: "Maharashtra",
        status: "Published",
        featured: false,
        order: 4,
    },
    {
        id: 5,
        name: "Farmer Support Coordinator",
        displayName: "Farmer Support Coordinator",
        role: "Coordinator",
        type: "Team Member",
        department: "Farmer Support",
        location: "Maharashtra",
        status: "In Review",
        featured: false,
        order: 5,
    },
    {
        id: 6,
        name: "Operations Manager",
        displayName: "Operations Manager",
        role: "Operations Manager",
        type: "Team Member",
        department: "Operations",
        location: "Maharashtra",
        status: "Draft",
        featured: false,
        order: 6,
    },
    {
        id: 7,
        name: "Communications Lead",
        displayName: "Communications Lead",
        role: "Communications Lead",
        type: "Team Member",
        department: "Communications",
        location: "Maharashtra",
        status: "Published",
        featured: false,
        order: 7,
    },
    {
        id: 8,
        name: "Volunteer Coordinator",
        displayName: "Volunteer Coordinator",
        role: "Coordinator",
        type: "Team Member",
        department: "Volunteers",
        location: "Maharashtra",
        status: "Draft",
        featured: false,
        order: 8,
    },
]

const Team = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [typeFilter, setTypeFilter] = useState("All")
    const [departmentFilter, setDepartmentFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    const filteredTeam = useMemo(() => {
        return teamData.filter((member) => {
            const searchValue = search.toLowerCase().trim()

            const matchesSearch =
                !searchValue ||
                member.name.toLowerCase().includes(searchValue) ||
                member.role.toLowerCase().includes(searchValue) ||
                member.department.toLowerCase().includes(searchValue) ||
                member.location.toLowerCase().includes(searchValue)

            const matchesStatus =
                statusFilter === "All" ||
                member.status === statusFilter

            const matchesType =
                typeFilter === "All" ||
                member.type === typeFilter

            const matchesDepartment =
                departmentFilter === "All" ||
                member.department === departmentFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesDepartment
            )
        })
    }, [
        search,
        statusFilter,
        typeFilter,
        departmentFilter,
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTeam.length / itemsPerPage)
    )

    const safePage = Math.min(currentPage, totalPages)

    const paginatedTeam = filteredTeam.slice(
        (safePage - 1) * itemsPerPage,
        safePage * itemsPerPage
    )

    const publishedCount = teamData.filter(
        (member) => member.status === "Published"
    ).length

    const featuredCount = teamData.filter(
        (member) => member.featured
    ).length

    const leadershipCount = teamData.filter(
        (member) =>
            member.type === "Founder" ||
            member.type === "Leadership"
    ).length

    const departmentOptions = [
        "All",
        ...new Set(
            teamData.map((member) => member.department)
        ),
    ]

    const resetPage = () => {
        setCurrentPage(1)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <span>Content Management</span>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-500">
                                Team & Founder
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Team & Founder
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage founder, leadership and team profiles
                            displayed across the Krushisetu website.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/team/new"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Team Member
                    </Link>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={Users}
                        label="Total Profiles"
                        value={teamData.length}
                        description="Team & leadership profiles"
                    />

                    <SummaryCard
                        icon={CheckCircleIcon}
                        label="Published"
                        value={publishedCount}
                        description="Visible on website"
                    />

                    <SummaryCard
                        icon={ShieldCheck}
                        label="Leadership"
                        value={leadershipCount}
                        description="Founder & leadership"
                    />

                    <SummaryCard
                        icon={StarIcon}
                        label="Featured"
                        value={featuredCount}
                        description="Featured profiles"
                    />
                </div>

                {/* Information card */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                            <UserRound className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-green-950">
                                Team profile management
                            </h2>

                            <p className="mt-1 max-w-4xl text-xs leading-5 text-green-900/70">
                                Maintain consistent profile information,
                                biographies, roles, photographs, ordering
                                and publishing status for the founder and
                                organisation team.
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
                                    setSearch(e.target.value)
                                    resetPage()
                                }}
                                placeholder="Search name, role, department..."
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
                            value={statusFilter}
                            onChange={(value) => {
                                setStatusFilter(value)
                                resetPage()
                            }}
                            options={[
                                "All",
                                "Published",
                                "In Review",
                                "Draft",
                            ]}
                            label="Status"
                        />

                        <FilterSelect
                            value={typeFilter}
                            onChange={(value) => {
                                setTypeFilter(value)
                                resetPage()
                            }}
                            options={[
                                "All",
                                "Founder",
                                "Leadership",
                                "Team Member",
                            ]}
                            label="Type"
                        />

                        <FilterSelect
                            value={departmentFilter}
                            onChange={(value) => {
                                setDepartmentFilter(value)
                                resetPage()
                            }}
                            options={departmentOptions}
                            label="Department"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Team Profiles
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredTeam.length} profile
                                {filteredTeam.length === 1
                                    ? ""
                                    : "s"} found
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-700">
                            UI preview data
                        </span>
                    </div>

                    {paginatedTeam.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1000px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <TableHead>
                                                Profile
                                            </TableHead>

                                            <TableHead>
                                                Type
                                            </TableHead>

                                            <TableHead>
                                                Department
                                            </TableHead>

                                            <TableHead>
                                                Location
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
                                        {paginatedTeam.map(
                                            (member) => (
                                                <tr
                                                    key={member.id}
                                                    className="border-b border-gray-100 last:border-0 hover:bg-green-50/30"
                                                >
                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                <UserRound className="h-5 w-5" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-bold text-gray-900">
                                                                    {
                                                                        member.displayName
                                                                    }
                                                                </p>

                                                                <p className="mt-0.5 truncate text-xs text-gray-500">
                                                                    {
                                                                        member.role
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <TypeBadge
                                                            type={
                                                                member.type
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {
                                                                member.department
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-sm text-gray-600">
                                                            {
                                                                member.location
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        {member.featured ? (
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
                                                                member.status
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                to={`/admin/content/team/${member.id}`}
                                                                title="Preview"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/team/${member.id}/edit`}
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
                                            filteredTeam.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {filteredTeam.length}
                                    </span>
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={safePage === 1}
                                        onClick={() =>
                                            setCurrentPage(
                                                (page) =>
                                                    Math.max(
                                                        1,
                                                        page - 1
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
                                                (page) =>
                                                    Math.min(
                                                        totalPages,
                                                        page + 1
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
                            onReset={() => {
                                setSearch("")
                                setStatusFilter("All")
                                setTypeFilter("All")
                                setDepartmentFilter("All")
                                setCurrentPage(1)
                            }}
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
        <div className="relative min-w-[150px]">
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
    const isFounder = type === "Founder"
    const isLeadership = type === "Leadership"

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                isFounder
                    ? "bg-green-100 text-green-800"
                    : isLeadership
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-600"
            }`}
        >
            {isFounder || isLeadership ? (
                <ShieldCheck className="h-3 w-3" />
            ) : (
                <BriefcaseBusiness className="h-3 w-3" />
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
                <Users className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">
                No team profiles found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search or filters to find another
                profile.
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

const CheckCircleIcon = (props) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
    </svg>
)

const StarIcon = (props) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

export default Team