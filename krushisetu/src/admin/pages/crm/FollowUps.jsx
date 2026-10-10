import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Edit3,
    Eye,
    Filter,
    MessageSquare,
    Plus,
    Search,
    UserRound,
} from "lucide-react"

const followUpsData = [
    {
        id: "FU-1001",
        enquiryId: "ENQ-1001",
        contact: "Rahul Patil",
        subject: "Government scheme assistance",
        category: "Schemes",
        assignedTo: "Support Executive",
        dueDate: "01 Oct 2026",
        dueTime: "11:00 AM",
        status: "Pending",
        priority: "High",
        type: "Phone Call",
        createdAt: "30 Sep 2026",
        notes: "Confirm required documents and scheme eligibility.",
    },
    {
        id: "FU-1002",
        enquiryId: "ENQ-1002",
        contact: "Sneha Jadhav",
        subject: "FPO registration support",
        category: "FPO",
        assignedTo: "CRM Executive",
        dueDate: "03 Oct 2026",
        dueTime: "02:30 PM",
        status: "Pending",
        priority: "Medium",
        type: "Phone Call",
        createdAt: "30 Sep 2026",
        notes: "Share the next steps for FPO registration.",
    },
    {
        id: "FU-1003",
        enquiryId: "ENQ-1004",
        contact: "Meera Kulkarni",
        subject: "Partnership opportunity",
        category: "Partnerships",
        assignedTo: "CRM Executive",
        dueDate: "02 Oct 2026",
        dueTime: "10:30 AM",
        status: "Pending",
        priority: "High",
        type: "Meeting",
        createdAt: "29 Sep 2026",
        notes: "Discuss partnership requirements and proposal process.",
    },
    {
        id: "FU-1004",
        enquiryId: "ENQ-1006",
        contact: "Pooja Deshmukh",
        subject: "Project collaboration enquiry",
        category: "Projects",
        assignedTo: "Programme Manager",
        dueDate: "04 Oct 2026",
        dueTime: "12:00 PM",
        status: "Scheduled",
        priority: "Medium",
        type: "Email",
        createdAt: "28 Sep 2026",
        notes: "Send project collaboration information pack.",
    },
    {
        id: "FU-1005",
        enquiryId: "ENQ-1007",
        contact: "Sagar Pawar",
        subject: "Scheme eligibility question",
        category: "Schemes",
        assignedTo: "Scheme Manager",
        dueDate: "30 Sep 2026",
        dueTime: "04:00 PM",
        status: "Overdue",
        priority: "Medium",
        type: "Phone Call",
        createdAt: "28 Sep 2026",
        notes: "Confirm eligibility after reviewing submitted details.",
    },
    {
        id: "FU-1006",
        enquiryId: "ENQ-1009",
        contact: "Ramesh Gaikwad",
        subject: "FPO programme enquiry",
        category: "FPO",
        assignedTo: "CRM Executive",
        dueDate: "01 Oct 2026",
        dueTime: "03:00 PM",
        status: "Pending",
        priority: "High",
        type: "Phone Call",
        createdAt: "27 Sep 2026",
        notes: "Follow up regarding programme participation.",
    },
    {
        id: "FU-1007",
        enquiryId: "ENQ-1003",
        contact: "Amit Shinde",
        subject: "Training programme information",
        category: "Training",
        assignedTo: "Training Manager",
        dueDate: "29 Sep 2026",
        dueTime: "01:00 PM",
        status: "Completed",
        priority: "Low",
        type: "Email",
        createdAt: "27 Sep 2026",
        notes: "Training registration information shared.",
    },
    {
        id: "FU-1008",
        enquiryId: "ENQ-1005",
        contact: "Vikas More",
        subject: "Farmer resource request",
        category: "Resources",
        assignedTo: "Support Executive",
        dueDate: "28 Sep 2026",
        dueTime: "11:30 AM",
        status: "Completed",
        priority: "Low",
        type: "Email",
        createdAt: "26 Sep 2026",
        notes: "Requested resource document sent successfully.",
    },
    {
        id: "FU-1009",
        enquiryId: "ENQ-1008",
        contact: "Neha Chavan",
        subject: "Internship information",
        category: "Internships",
        assignedTo: "HR Support",
        dueDate: "27 Sep 2026",
        dueTime: "03:30 PM",
        status: "Completed",
        priority: "Low",
        type: "Phone Call",
        createdAt: "25 Sep 2026",
        notes: "Internship information provided.",
    },
    {
        id: "FU-1010",
        enquiryId: "ENQ-1010",
        contact: "Kiran Wagh",
        subject: "General information",
        category: "General",
        assignedTo: "Support Executive",
        dueDate: "26 Sep 2026",
        dueTime: "10:00 AM",
        status: "Cancelled",
        priority: "Low",
        type: "Phone Call",
        createdAt: "24 Sep 2026",
        notes: "Follow-up no longer required.",
    },
]

const FollowUps = () => {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] =
        useState("All")
    const [priorityFilter, setPriorityFilter] =
        useState("All")
    const [categoryFilter, setCategoryFilter] =
        useState("All")
    const [typeFilter, setTypeFilter] =
        useState("All")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    const filteredFollowUps = useMemo(() => {
        const searchValue = search
            .toLowerCase()
            .trim()

        return followUpsData.filter((followUp) => {
            const matchesSearch =
                !searchValue ||
                followUp.id
                    .toLowerCase()
                    .includes(searchValue) ||
                followUp.enquiryId
                    .toLowerCase()
                    .includes(searchValue) ||
                followUp.contact
                    .toLowerCase()
                    .includes(searchValue) ||
                followUp.subject
                    .toLowerCase()
                    .includes(searchValue) ||
                followUp.assignedTo
                    .toLowerCase()
                    .includes(searchValue) ||
                followUp.notes
                    .toLowerCase()
                    .includes(searchValue)

            const matchesStatus =
                statusFilter === "All" ||
                followUp.status === statusFilter

            const matchesPriority =
                priorityFilter === "All" ||
                followUp.priority === priorityFilter

            const matchesCategory =
                categoryFilter === "All" ||
                followUp.category === categoryFilter

            const matchesType =
                typeFilter === "All" ||
                followUp.type === typeFilter

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesCategory &&
                matchesType
            )
        })
    }, [
        search,
        statusFilter,
        priorityFilter,
        categoryFilter,
        typeFilter,
    ])

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredFollowUps.length / itemsPerPage
        )
    )

    const safePage = Math.min(
        currentPage,
        totalPages
    )

    const paginatedFollowUps =
        filteredFollowUps.slice(
            (safePage - 1) * itemsPerPage,
            safePage * itemsPerPage
        )

    const pendingCount = followUpsData.filter(
        (item) => item.status === "Pending"
    ).length

    const overdueCount = followUpsData.filter(
        (item) => item.status === "Overdue"
    ).length

    const completedCount = followUpsData.filter(
        (item) => item.status === "Completed"
    ).length

    const highPriorityCount =
        followUpsData.filter(
            (item) =>
                item.priority === "High" &&
                item.status !== "Completed" &&
                item.status !== "Cancelled"
        ).length

    const categories = [
        "All",
        ...new Set(
            followUpsData.map(
                (item) => item.category
            )
        ),
    ]

    const types = [
        "All",
        ...new Set(
            followUpsData.map(
                (item) => item.type
            )
        ),
    ]

    const resetPage = () => {
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearch("")
        setStatusFilter("All")
        setPriorityFilter("All")
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
                            <span>CRM</span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Follow-ups
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Follow-ups
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Schedule, assign and track follow-up actions
                            connected to enquiries and support requests.
                        </p>
                    </div>

                    <Link
                        to="/admin/crm/follow-ups/new"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Follow-up
                    </Link>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={Clock3}
                        label="Pending"
                        value={pendingCount}
                        description="Upcoming follow-ups"
                    />

                    <SummaryCard
                        icon={AlertCircle}
                        label="Overdue"
                        value={overdueCount}
                        description="Require immediate attention"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Completed"
                        value={completedCount}
                        description="Successfully completed"
                    />

                    <SummaryCard
                        icon={CalendarDays}
                        label="High Priority"
                        value={highPriorityCount}
                        description="Open priority actions"
                    />
                </div>

                {/* CRM Notice */}
                <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                            <Clock3 className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-amber-950">
                                Follow-up tracking
                            </h2>

                            <p className="mt-1 max-w-4xl text-xs leading-5 text-amber-900/70">
                                Keep every enquiry moving by recording the
                                next action, responsible team member, due
                                date and outcome. Overdue follow-ups should
                                be reviewed promptly.
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
                                placeholder="Search follow-up, enquiry, contact, subject..."
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
                                "Pending",
                                "Scheduled",
                                "Overdue",
                                "Completed",
                                "Cancelled",
                            ]}
                        />

                        <FilterSelect
                            label="Priority"
                            value={priorityFilter}
                            onChange={(value) => {
                                setPriorityFilter(
                                    value
                                )
                                resetPage()
                            }}
                            options={[
                                "All",
                                "High",
                                "Medium",
                                "Low",
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
                            label="Type"
                            value={typeFilter}
                            onChange={(value) => {
                                setTypeFilter(
                                    value
                                )
                                resetPage()
                            }}
                            options={types}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Follow-up Queue
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredFollowUps.length}{" "}
                                follow-up
                                {filteredFollowUps.length ===
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

                    {paginatedFollowUps.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1250px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <TableHead>
                                                Follow-up
                                            </TableHead>

                                            <TableHead>
                                                Contact
                                            </TableHead>

                                            <TableHead>
                                                Assigned To
                                            </TableHead>

                                            <TableHead>
                                                Due
                                            </TableHead>

                                            <TableHead>
                                                Priority
                                            </TableHead>

                                            <TableHead>
                                                Status
                                            </TableHead>

                                            <TableHead>
                                                Type
                                            </TableHead>

                                            <TableHead align="right">
                                                Actions
                                            </TableHead>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedFollowUps.map(
                                            (followUp) => (
                                                <tr
                                                    key={
                                                        followUp.id
                                                    }
                                                    className="border-b border-gray-100 last:border-0 hover:bg-green-50/20"
                                                >
                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                                <MessageSquare className="h-5 w-5" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-sm font-bold text-gray-900">
                                                                        {
                                                                            followUp.id
                                                                        }
                                                                    </p>

                                                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">
                                                                        {
                                                                            followUp.enquiryId
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <p className="mt-1 max-w-[300px] truncate text-xs font-medium text-gray-600">
                                                                    {
                                                                        followUp.subject
                                                                    }
                                                                </p>

                                                                <p className="mt-1 max-w-[320px] truncate text-[11px] text-gray-400">
                                                                    {
                                                                        followUp.notes
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center gap-2">
                                                            <UserRound className="h-4 w-4 text-gray-400" />

                                                            <span className="text-sm font-semibold text-gray-700">
                                                                {
                                                                    followUp.contact
                                                                }
                                                            </span>
                                                        </div>

                                                        <span className="mt-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
                                                            {
                                                                followUp.category
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {
                                                                followUp.assignedTo
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-start gap-2">
                                                            <CalendarDays className="mt-0.5 h-4 w-4 text-gray-400" />

                                                            <div>
                                                                <p className="text-xs font-bold text-gray-700">
                                                                    {
                                                                        followUp.dueDate
                                                                    }
                                                                </p>

                                                                <p className="mt-0.5 text-[11px] text-gray-400">
                                                                    {
                                                                        followUp.dueTime
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <PriorityBadge
                                                            priority={
                                                                followUp.priority
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <StatusBadge
                                                            status={
                                                                followUp.status
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <span className="text-xs font-medium text-gray-600">
                                                            {
                                                                followUp.type
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4 sm:px-6">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                to={`/admin/crm/follow-ups/${followUp.id}`}
                                                                title="View follow-up"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/crm/follow-ups/${followUp.id}/edit`}
                                                                title="Edit follow-up"
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
                                            filteredFollowUps.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {
                                            filteredFollowUps.length
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

const PriorityBadge = ({
    priority,
}) => {
    const styles = {
        High: "bg-red-50 text-red-700",
        Medium: "bg-amber-50 text-amber-700",
        Low: "bg-gray-100 text-gray-600",
    }

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                styles[priority] ||
                "bg-gray-100 text-gray-600"
            }`}
        >
            {priority}
        </span>
    )
}

const StatusBadge = ({
    status,
}) => {
    const styles = {
        Pending: "bg-blue-50 text-blue-700",
        Scheduled:
            "bg-green-50 text-green-700",
        Overdue:
            "bg-red-50 text-red-700",
        Completed:
            "bg-gray-100 text-gray-600",
        Cancelled:
            "bg-gray-100 text-gray-500",
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
                <Clock3 className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-900">
                No follow-ups found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search or filters to find another
                follow-up.
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

export default FollowUps