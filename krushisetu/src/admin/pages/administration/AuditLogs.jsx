import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import {
    Activity,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Download,
    Eye,
    FileText,
    Filter,
    Globe2,
    Loader2,
    Search,
    ShieldCheck,
    UserRound,
    X,
} from "lucide-react"

import {
    getAuditLogs,
    getAuditLogStats,
    getAuditLogById,
    exportAuditLogs,
} from "../../../admin/api/adminAuditLogApi.js"


const ACTION_OPTIONS = [
    {
        label: "All Actions",
        value: "",
    },
    {
        label: "Created",
        value: "CREATE",
    },
    {
        label: "Updated",
        value: "UPDATE",
    },
    {
        label: "Published",
        value: "PUBLISH",
    },
    {
        label: "Viewed",
        value: "VIEW",
    },
    {
        label: "Exported",
        value: "EXPORT",
    },
    {
        label: "Deleted",
        value: "DELETE",
    },
]


const SEVERITY_OPTIONS = [
    {
        label: "All Severity",
        value: "",
    },
    {
        label: "Normal",
        value: "NORMAL",
    },
    {
        label: "High",
        value: "HIGH",
    },
]


const PAGE_SIZE = 10


const formatDateTime = (value) => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date)
}


const formatDateForApi = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}


const getDateRange = (filter) => {
    if (filter === "All Dates") {
        return {
            start_date: undefined,
            end_date: undefined,
        }
    }

    const today = new Date()

    today.setHours(0, 0, 0, 0)

    if (filter === "Today") {
        return {
            start_date: formatDateForApi(today),
            end_date: formatDateForApi(today),
        }
    }

    if (filter === "Yesterday") {
        const yesterday = new Date(today)

        yesterday.setDate(
            yesterday.getDate() - 1
        )

        return {
            start_date: formatDateForApi(yesterday),
            end_date: formatDateForApi(yesterday),
        }
    }

    if (filter === "This Week") {
        const startOfWeek = new Date(today)

        const day = startOfWeek.getDay()

        const difference =
            day === 0
                ? 6
                : day - 1

        startOfWeek.setDate(
            startOfWeek.getDate() - difference
        )

        return {
            start_date: formatDateForApi(startOfWeek),
            end_date: formatDateForApi(today),
        }
    }

    return {
        start_date: undefined,
        end_date: undefined,
    }
}


const getActionLabel = (action) => {
    const normalized = String(action || "")
        .trim()
        .toUpperCase()

    const actionMap = {
        CREATE: "Created",
        CREATED: "Created",

        UPDATE: "Updated",
        UPDATED: "Updated",

        PUBLISH: "Published",
        PUBLISHED: "Published",

        VIEW: "Viewed",
        VIEWED: "Viewed",

        EXPORT: "Exported",
        EXPORTED: "Exported",

        DELETE: "Deleted",
        DELETED: "Deleted",

        UNPUBLISH: "Unpublished",
        UNPUBLISHED: "Unpublished",

        STATUS_CHANGE: "Status Changed",
        PERMISSION_CHANGE: "Permission Changed",
    }

    return actionMap[normalized] || action || "—"
}


const getSeverityLabel = (severity) => {
    if (!severity) {
        return "Normal"
    }

    const normalized = String(severity)
        .trim()
        .toUpperCase()

    if (normalized === "HIGH") {
        return "High"
    }

    if (normalized === "MEDIUM") {
        return "Medium"
    }

    return "Normal"
}


const normalizeLog = (log) => {
    return {
        id:
            log?.id ??
            log?.audit_id ??
            log?.auditLogId,

        adminId:
            log?.admin_id ??
            log?.adminId ??
            log?.actor_id ??
            log?.actorId ??
            null,

        actor:
            log?.admin_name ??
            log?.adminName ??
            log?.actor_name ??
            log?.actorName ??
            log?.actor ??
            "Unknown Admin",

        email:
            log?.admin_email ??
            log?.adminEmail ??
            log?.actor_email ??
            log?.actorEmail ??
            log?.email ??
            "—",

        action: getActionLabel(
            log?.action
        ),

        rawAction:
            log?.action ??
            "",

        module:
            log?.module ??
            "—",

        record:
            log?.record_label ??
            log?.recordLabel ??
            log?.record ??
            "—",

        recordId:
            log?.record_id ??
            log?.recordId ??
            "—",

        timestamp:
            formatDateTime(
                log?.created_at ??
                log?.createdAt ??
                log?.timestamp
            ),

        rawTimestamp:
            log?.created_at ??
            log?.createdAt ??
            log?.timestamp ??
            null,

        ip:
            log?.ip_address ??
            log?.ipAddress ??
            log?.ip ??
            "—",

        device:
            log?.device ??
            log?.device_name ??
            log?.deviceName ??
            "—",

        source:
            log?.source ??
            "Web",

        oldValue:
            log?.old_value ??
            log?.oldValue ??
            "—",

        newValue:
            log?.new_value ??
            log?.newValue ??
            "—",

        description:
            log?.description ??
            "Audit activity recorded.",

        severity:
            getSeverityLabel(
                log?.severity
            ),

        requestMethod:
            log?.request_method ??
            log?.requestMethod ??
            "—",

        userAgent:
            log?.user_agent ??
            log?.userAgent ??
            "—",

        metadata:
            log?.metadata ??
            log?.request_metadata ??
            log?.requestMetadata ??
            null,
    }
}


const getLogsFromResponse = (response) => {
    if (Array.isArray(response?.data)) {
        return response.data
    }

    if (Array.isArray(response?.data?.logs)) {
        return response.data.logs
    }

    if (Array.isArray(response?.logs)) {
        return response.logs
    }

    return []
}


const getPaginationFromResponse = (
    response
) => {
    const pagination =
        response?.pagination ??
        response?.data?.pagination ??
        {}

    const total =
        Number(
            pagination.total ??
            response?.total ??
            response?.data?.total ??
            0
        )

    const page =
        Number(
            pagination.page ??
            response?.page ??
            1
        )

    const limit =
        Number(
            pagination.limit ??
            response?.limit ??
            PAGE_SIZE
        )

    const totalPages =
        Number(
            pagination.totalPages ??
            pagination.total_pages ??
            response?.totalPages ??
            Math.max(
                1,
                Math.ceil(total / limit)
            )
        )

    return {
        total,
        page,
        limit,
        totalPages,
    }
}


const AuditLogs = () => {
    const [search, setSearch] = useState("")

    const [actionFilter, setActionFilter] =
        useState("")

    const [moduleFilter, setModuleFilter] =
        useState("")

    const [actorFilter, setActorFilter] =
        useState("")

    const [severityFilter, setSeverityFilter] =
        useState("")

    const [dateFilter, setDateFilter] =
        useState("All Dates")

    const [page, setPage] = useState(1)

    const [openMenu, setOpenMenu] =
        useState(null)

    const [selectedLogId, setSelectedLogId] =
        useState(null)

    const [selectedLogs, setSelectedLogs] =
        useState([])

    const dateRange = useMemo(
        () => getDateRange(dateFilter),
        [dateFilter]
    )

    const queryParams = useMemo(() => {
        const params = {
            page,
            limit: PAGE_SIZE,
        }

        if (search.trim()) {
            params.search = search.trim()
        }

        if (actionFilter) {
            params.action = actionFilter
        }

        if (moduleFilter) {
            params.module = moduleFilter
        }

        if (actorFilter) {
            params.admin_id = actorFilter
        }

        if (severityFilter) {
            params.severity = severityFilter
        }

        if (dateRange.start_date) {
            params.start_date =
                dateRange.start_date
        }

        if (dateRange.end_date) {
            params.end_date =
                dateRange.end_date
        }

        return params
    }, [
        page,
        search,
        actionFilter,
        moduleFilter,
        actorFilter,
        severityFilter,
        dateRange,
    ])

    const {
        data: logsResponse,
        isLoading: isLogsLoading,
        isFetching: isLogsFetching,
        isError: isLogsError,
        error: logsError,
        refetch: refetchLogs,
    } = useQuery({
        queryKey: [
            "admin-audit-logs",
            queryParams,
        ],
        queryFn: () =>
            getAuditLogs(queryParams),
        keepPreviousData: true,
        retry: false,
    })


    const {
        data: statsResponse,
        isLoading: isStatsLoading,
    } = useQuery({
        queryKey: [
            "admin-audit-log-stats",
            {
                action: actionFilter,
                module: moduleFilter,
                admin_id: actorFilter,
                severity: severityFilter,
                start_date:
                    dateRange.start_date,
                end_date:
                    dateRange.end_date,
            },
        ],
        queryFn: () =>
            getAuditLogStats({
                action:
                    actionFilter ||
                    undefined,

                module:
                    moduleFilter ||
                    undefined,

                admin_id:
                    actorFilter ||
                    undefined,

                severity:
                    severityFilter ||
                    undefined,

                start_date:
                    dateRange.start_date,

                end_date:
                    dateRange.end_date,
            }),
        retry: false,
    })


    const {
        data: detailResponse,
        isLoading: isDetailLoading,
        isError: isDetailError,
    } = useQuery({
        queryKey: [
            "admin-audit-log",
            selectedLogId,
        ],
        queryFn: () =>
            getAuditLogById(
                selectedLogId
            ),
        enabled:
            Boolean(selectedLogId),
        retry: false,
    })


    const logs = useMemo(() => {
        return getLogsFromResponse(
            logsResponse
        ).map(normalizeLog)
    }, [logsResponse])


    const pagination = useMemo(() => {
        return getPaginationFromResponse(
            logsResponse
        )
    }, [logsResponse])


    const stats = useMemo(() => {
        const data =
            statsResponse?.data ??
            statsResponse ??
            {}

        return {
            total:
                Number(
                    data?.total ??
                    data?.totalEvents ??
                    pagination.total ??
                    0
                ),

            updates:
                Number(
                    data?.updates ??
                    data?.updated ??
                    0
                ),

            created:
                Number(
                    data?.created ??
                    data?.creates ??
                    0
                ),

            exports:
                Number(
                    data?.exports ??
                    data?.exported ??
                    0
                ),

            highRisk:
                Number(
                    data?.highRisk ??
                    data?.high_risk ??
                    data?.high ??
                    0
                ),
        }
    }, [
        statsResponse,
        pagination.total,
    ])


    const uniqueModules = useMemo(() => {
        const moduleMap =
            new Map()

        logs.forEach((log) => {
            if (
                log.module &&
                log.module !== "—"
            ) {
                moduleMap.set(
                    log.module,
                    log.module
                )
            }
        })

        return [
            ...moduleMap.values(),
        ].sort()
    }, [logs])


    const uniqueActors = useMemo(() => {
        const actorMap =
            new Map()

        logs.forEach((log) => {
            if (
                log.adminId &&
                log.actor
            ) {
                actorMap.set(
                    String(log.adminId),
                    {
                        value:
                            String(
                                log.adminId
                            ),
                        label:
                            log.actor,
                    }
                )
            }
        })

        return [
            ...actorMap.values(),
        ].sort((a, b) =>
            a.label.localeCompare(
                b.label
            )
        )
    }, [logs])


    const selectedDetail = useMemo(() => {
        if (!detailResponse) {
            return null
        }

        const detail =
            detailResponse?.data ??
            detailResponse?.log ??
            detailResponse

        if (!detail) {
            return null
        }

        return normalizeLog(detail)
    }, [detailResponse])


    const hasFilters =
        Boolean(search.trim()) ||
        Boolean(actionFilter) ||
        Boolean(moduleFilter) ||
        Boolean(actorFilter) ||
        Boolean(severityFilter) ||
        dateFilter !== "All Dates"


    const toggleSelected = (id) => {
        setSelectedLogs((current) =>
            current.includes(id)
                ? current.filter(
                    (item) =>
                        item !== id
                )
                : [
                    ...current,
                    id,
                ]
        )
    }


    const toggleAll = () => {
        const visibleIds =
            logs
                .map(
                    (log) => log.id
                )
                .filter(Boolean)

        if (
            selectedLogs.length ===
            visibleIds.length &&
            visibleIds.length > 0
        ) {
            setSelectedLogs([])
            return
        }

        setSelectedLogs(
            visibleIds
        )
    }


    const clearFilters = () => {
        setSearch("")
        setActionFilter("")
        setModuleFilter("")
        setActorFilter("")
        setSeverityFilter("")
        setDateFilter("All Dates")
        setPage(1)
        setSelectedLogs([])
    }


    const handleSearchChange = (
        event
    ) => {
        setSearch(
            event.target.value
        )
        setPage(1)
        setSelectedLogs([])
    }


    const handleActionChange = (
        value
    ) => {
        setActionFilter(value)
        setPage(1)
        setSelectedLogs([])
    }


    const handleModuleChange = (
        value
    ) => {
        setModuleFilter(value)
        setPage(1)
        setSelectedLogs([])
    }


    const handleActorChange = (
        value
    ) => {
        setActorFilter(value)
        setPage(1)
        setSelectedLogs([])
    }


    const handleSeverityChange = (
        value
    ) => {
        setSeverityFilter(value)
        setPage(1)
        setSelectedLogs([])
    }


    const handleDateChange = (
        event
    ) => {
        setDateFilter(
            event.target.value
        )
        setPage(1)
        setSelectedLogs([])
    }


    const downloadBlob = (
        response,
        fallbackName = "audit-logs.csv"
    ) => {
        const blob =
            response?.data

        if (!blob) {
            return
        }

        const contentDisposition =
            response?.headers?.[
            "content-disposition"
            ]

        let fileName =
            fallbackName

        if (
            contentDisposition
        ) {
            const match =
                contentDisposition.match(
                    /filename="?([^"]+)"?/i
                )

            if (match?.[1]) {
                fileName =
                    match[1]
            }
        }

        const url =
            window.URL.createObjectURL(
                blob
            )

        const link =
            document.createElement(
                "a"
            )

        link.href = url
        link.download = fileName

        document.body.appendChild(
            link
        )

        link.click()

        link.remove()

        window.URL.revokeObjectURL(
            url
        )
    }


    const handleExport = async (
        logId = null
    ) => {
        try {
            setOpenMenu(null)

            const params = {
                ...queryParams,
            }

            delete params.page
            delete params.limit

            if (logId) {
                params.id =
                    logId
            }

            const response =
                await exportAuditLogs(
                    params
                )

            downloadBlob(
                response,
                logId
                    ? `audit-log-${logId}.csv`
                    : "audit-logs.csv"
            )
        } catch (error) {
            console.error(
                "Audit log export failed:",
                error
            )
        }
    }


    const openDetails = (
        id
    ) => {
        setOpenMenu(null)
        setSelectedLogId(id)
    }


    const closeDetails = () => {
        setSelectedLogId(null)
    }


    const handlePreviousPage = () => {
        if (page <= 1) {
            return
        }

        setPage(
            (current) =>
                Math.max(
                    1,
                    current - 1
                )
        )

        setSelectedLogs([])
    }


    const handleNextPage = () => {
        if (
            page >=
            pagination.totalPages
        ) {
            return
        }

        setPage(
            (current) =>
                Math.min(
                    pagination.totalPages,
                    current + 1
                )
        )

        setSelectedLogs([])
    }


    const getPageStart = () => {
        if (
            pagination.total ===
            0
        ) {
            return 0
        }

        return (
            (page - 1) *
            pagination.limit +
            1
        )
    }


    const getPageEnd = () => {
        return Math.min(
            page *
            pagination.limit,
            pagination.total
        )
    }


    return (
        <div className="min-h-screen bg-[#F6FAF7]">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

                {/* Header */}

                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <ShieldCheck className="h-4 w-4" />

                            Administration

                            <span className="text-gray-400">
                                /
                            </span>

                            Audit Logs
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Audit Logs
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Review who created, edited, published, exported
                            or deleted records and when those actions occurred.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleExport()}
                        disabled={
                            isLogsLoading ||
                            isLogsFetching ||
                            pagination.total === 0
                        }
                        className="kr-hover-button inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLogsFetching ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="h-4 w-4" />
                        )}

                        Export Logs
                    </button>
                </div>


                {/* Summary cards */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    <SummaryCard
                        icon={Activity}
                        label="Total Events"
                        value={
                            isStatsLoading
                                ? "—"
                                : stats.total
                        }
                        description="Recorded actions"
                    />

                    <SummaryCard
                        icon={FileText}
                        label="Updates"
                        value={
                            isStatsLoading
                                ? "—"
                                : stats.updates
                        }
                        description="Record changes"
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Created"
                        value={
                            isStatsLoading
                                ? "—"
                                : stats.created
                        }
                        description="New records"
                    />

                    <SummaryCard
                        icon={Download}
                        label="Exports"
                        value={
                            isStatsLoading
                                ? "—"
                                : stats.exports
                        }
                        description="Logged exports"
                    />

                    <SummaryCard
                        icon={ShieldCheck}
                        label="High Risk"
                        value={
                            isStatsLoading
                                ? "—"
                                : stats.highRisk
                        }
                        description="Sensitive actions"
                    />
                </div>


                {/* Notice */}

                <div className="mb-6 flex items-start gap-3 rounded-3xl border border-green-100 bg-green-50/70 p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />

                    <div>
                        <p className="text-sm font-bold text-gray-900">
                            Audit trail
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-600">
                            This area is designed as a read-only operational
                            history. Audit activity is loaded from the
                            backend and records actor, action, module,
                            record, timestamp and request metadata.
                        </p>
                    </div>
                </div>


                {/* Filters */}

                <section className="mb-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="mb-4 flex items-center gap-2">
                        <Filter className="h-4 w-4 text-green-700" />

                        <h2 className="text-sm font-bold text-gray-900">
                            Filter Activity
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">

                        {/* Search */}

                        <div className="relative xl:col-span-2">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={
                                    handleSearchChange
                                }
                                placeholder="Search actor, module, record..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                            />
                        </div>


                        {/* Action */}

                        <FilterSelect
                            value={
                                actionFilter
                            }
                            onChange={
                                handleActionChange
                            }
                            options={
                                ACTION_OPTIONS
                            }
                        />


                        {/* Module */}

                        <FilterSelect
                            value={
                                moduleFilter
                            }
                            onChange={
                                handleModuleChange
                            }
                            options={[
                                {
                                    label:
                                        "All Modules",
                                    value:
                                        "",
                                },
                                ...uniqueModules.map(
                                    (
                                        module
                                    ) => ({
                                        label:
                                            module,
                                        value:
                                            module,
                                    })
                                ),
                            ]}
                        />


                        {/* Actor */}

                        <FilterSelect
                            value={
                                actorFilter
                            }
                            onChange={
                                handleActorChange
                            }
                            options={[
                                {
                                    label:
                                        "All Actors",
                                    value:
                                        "",
                                },
                                ...uniqueActors,
                            ]}
                        />


                        {/* Severity */}

                        <FilterSelect
                            value={
                                severityFilter
                            }
                            onChange={
                                handleSeverityChange
                            }
                            options={
                                SEVERITY_OPTIONS
                            }
                        />
                    </div>


                    <div className="mt-3 flex flex-wrap items-center gap-3">

                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-gray-400" />

                            <select
                                value={
                                    dateFilter
                                }
                                onChange={
                                    handleDateChange
                                }
                                className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs font-medium text-gray-600 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                            >
                                <option>
                                    All Dates
                                </option>

                                <option>
                                    Today
                                </option>

                                <option>
                                    Yesterday
                                </option>

                                <option>
                                    This Week
                                </option>
                            </select>
                        </div>


                        {hasFilters && (
                            <button
                                type="button"
                                onClick={
                                    clearFilters
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                            >
                                <X className="h-3.5 w-3.5" />

                                Clear filters
                            </button>
                        )}


                        <span className="ml-auto text-xs text-gray-400">
                            Showing{" "}

                            <span className="font-semibold text-gray-700">
                                {
                                    getPageStart()
                                }
                            </span>

                            {" "}to{" "}

                            <span className="font-semibold text-gray-700">
                                {
                                    getPageEnd()
                                }
                            </span>

                            {" "}of{" "}

                            <span className="font-semibold text-gray-700">
                                {
                                    pagination.total
                                }
                            </span>

                            {" "}events
                        </span>
                    </div>
                </section>


                {/* Selection bar */}

                {selectedLogs.length >
                    0 && (
                        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                            <span className="text-sm font-semibold text-green-800">
                                {
                                    selectedLogs.length
                                }{" "}
                                selected
                            </span>

                            <span className="text-xs text-green-700">
                                Audit records are read-only and cannot be edited or
                                deleted.
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedLogs(
                                        []
                                    )
                                }
                                className="ml-auto rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50"
                            >
                                Clear selection
                            </button>
                        </div>
                    )}


                {/* Table */}
                {/* Audit Logs */}

                {isLogsLoading ? (
                    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <LoadingState />
                    </section>
                ) : isLogsError ? (
                    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <ErrorState
                            error={logsError}
                            onRetry={refetchLogs}
                        />
                    </section>
                ) : logs.length === 0 ? (
                    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <EmptyState
                            onClear={clearFilters}
                        />
                    </section>
                ) : (
                    <section className="overflow-visible rounded-3xl border border-gray-200 bg-white shadow-sm">

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1250px]">

                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50/80 text-left">

                                        <th className="w-12 px-5 py-4">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    logs.length > 0 &&
                                                    selectedLogs.length === logs.length
                                                }
                                                onChange={toggleAll}
                                                className="h-4 w-4 rounded border-gray-300 text-green-700 accent-green-700"
                                            />
                                        </th>

                                        <TableHead>
                                            Activity
                                        </TableHead>

                                        <TableHead>
                                            Actor
                                        </TableHead>

                                        <TableHead>
                                            Module / Record
                                        </TableHead>

                                        <TableHead>
                                            Change
                                        </TableHead>

                                        <TableHead>
                                            Date & Time
                                        </TableHead>

                                        <TableHead>
                                            Source
                                        </TableHead>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Action
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {logs.map((log) => (
                                        <tr
                                            key={log.id}
                                            className="transition hover:bg-gray-50/70"
                                        >

                                            <td className="px-5 py-4 align-top">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLogs.includes(log.id)}
                                                    onChange={() =>
                                                        toggleSelected(log.id)
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-green-700 accent-green-700"
                                                />
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <div className="flex items-start gap-3">

                                                    <ActionIcon
                                                        action={log.action}
                                                    />

                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="text-sm font-semibold text-gray-900">
                                                                {log.action}
                                                            </span>

                                                            <SeverityBadge
                                                                severity={log.severity}
                                                            />
                                                        </div>

                                                        <p className="mt-1 max-w-[260px] text-xs leading-5 text-gray-500">
                                                            {log.description}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <div className="flex items-start gap-2.5">

                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                                                        <UserRound className="h-4 w-4" />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {log.actor}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {log.email}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {log.module}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {log.record}
                                                </p>

                                                <span className="mt-1.5 inline-flex rounded-lg bg-gray-100 px-2 py-1 font-mono text-[10px] text-gray-500">
                                                    {log.recordId}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <div className="max-w-[240px]">

                                                    <p className="text-xs text-gray-400">
                                                        Old
                                                    </p>

                                                    <p className="mt-0.5 truncate text-xs font-medium text-gray-600">
                                                        {log.oldValue}
                                                    </p>

                                                    <p className="mt-2 text-xs text-gray-400">
                                                        New
                                                    </p>

                                                    <p className="mt-0.5 truncate text-xs font-semibold text-gray-800">
                                                        {log.newValue}
                                                    </p>

                                                </div>
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <div className="flex items-start gap-2">

                                                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                    <div>
                                                        <p className="whitespace-nowrap text-xs font-semibold text-gray-700">
                                                            {log.timestamp}
                                                        </p>

                                                        <p className="mt-1 text-[11px] text-gray-400">
                                                            {log.ip}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                                    <Globe2 className="h-4 w-4 text-gray-400" />

                                                    {log.source}
                                                </div>

                                                <p className="mt-1 text-[11px] text-gray-400">
                                                    {log.device}
                                                </p>
                                            </td>

                                            <td className="relative px-5 py-4 text-right align-top">

                                                <button
                                                    type="button"
                                                    title="View audit details"
                                                    onClick={() =>
                                                        openDetails(log.id)
                                                    }
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="More actions"
                                                    onClick={() =>
                                                        setOpenMenu(
                                                            openMenu === log.id
                                                                ? null
                                                                : log.id
                                                        )
                                                    }
                                                    className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                                >
                                                    <ChevronDown className="h-4 w-4" />
                                                </button>

                                                {openMenu === log.id && (
                                                    <div className="absolute right-5 top-14 z-20 w-48 rounded-2xl border border-gray-200 bg-white p-2 text-left shadow-xl shadow-gray-900/10">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openDetails(log.id)
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Eye className="h-4 w-4" />

                                                            View Details
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleExport(log.id)
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                                                        >
                                                            <Download className="h-4 w-4" />

                                                            Export Record
                                                        </button>

                                                    </div>
                                                )}

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>


                        {/* Pagination */}

                        {pagination.total > 0 && (
                            <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-xs text-gray-500">
                                    Showing{" "}

                                    <span className="font-semibold text-gray-700">
                                        {getPageStart()}
                                    </span>

                                    {" "}to{" "}

                                    <span className="font-semibold text-gray-700">
                                        {getPageEnd()}
                                    </span>

                                    {" "}of{" "}

                                    <span className="font-semibold text-gray-700">
                                        {pagination.total}
                                    </span>

                                    {" "}events
                                </p>


                                <div className="flex items-center gap-1">

                                    <button
                                        type="button"
                                        onClick={handlePreviousPage}
                                        disabled={
                                            page <= 1 ||
                                            isLogsFetching
                                        }
                                        className="flex h-9 items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft className="h-4 w-4" />

                                        Previous
                                    </button>

                                    <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-xs font-semibold text-white">
                                        {page}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleNextPage}
                                        disabled={
                                            page >=
                                            pagination.totalPages ||
                                            isLogsFetching
                                        }
                                        className="flex h-9 items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Next

                                        <ChevronRight className="h-4 w-4" />
                                    </button>

                                </div>
                            </div>
                        )}

                    </section>
                )}


                {/* Backend status */}

                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />

                    Audit events are loaded from the backend.
                    Audit records remain read-only.
                </div>
            </div>


            {/* Detail Modal */}

            {selectedLogId && (
                <AuditDetailModal
                    log={
                        selectedDetail
                    }
                    fallbackLog={
                        logs.find(
                            (log) =>
                                log.id ===
                                selectedLogId
                        )
                    }
                    loading={
                        isDetailLoading
                    }
                    error={
                        isDetailError
                    }
                    onClose={
                        closeDetails
                    }
                />
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
}) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-9 text-sm font-medium text-gray-600 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >
                {options.map(
                    (option) => (
                        <option
                            key={
                                option.value
                            }
                            value={
                                option.value
                            }
                        >
                            {
                                option.label
                            }
                        </option>
                    )
                )}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
    )
}


const TableHead = ({
    children,
}) => {
    return (
        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {children}
        </th>
    )
}


const ActionIcon = ({
    action,
    large = false,
}) => {
    const styles = {
        Created:
            "bg-green-50 text-green-700",

        Updated:
            "bg-blue-50 text-blue-700",

        Published:
            "bg-emerald-50 text-emerald-700",

        Viewed:
            "bg-gray-100 text-gray-600",

        Exported:
            "bg-amber-50 text-amber-700",

        Deleted:
            "bg-red-50 text-red-700",

        Unpublished:
            "bg-orange-50 text-orange-700",

        "Status Changed":
            "bg-purple-50 text-purple-700",

        "Permission Changed":
            "bg-red-50 text-red-700",
    }

    const iconClass =
        large
            ? "h-5 w-5"
            : "h-4 w-4"

    return (
        <div
            className={`flex ${large
                ? "h-11 w-11 rounded-2xl"
                : "h-9 w-9 rounded-xl"
                } shrink-0 items-center justify-center ${styles[action] ||
                "bg-gray-100 text-gray-600"
                }`}
        >
            <Activity
                className={
                    iconClass
                }
            />
        </div>
    )
}


const SeverityBadge = ({
    severity,
}) => {
    const styles = {
        Normal:
            "bg-gray-100 text-gray-600",

        Medium:
            "bg-amber-50 text-amber-700",

        High:
            "bg-red-50 text-red-700",
    }

    return (
        <span
            className={`inline-flex rounded-lg px-2 py-1 text-[10px] font-bold ${styles[severity] ||
                styles.Normal
                }`}
        >
            {severity}
        </span>
    )
}


const LoadingState = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-900">
                Loading audit events
            </h3>

            <p className="mt-1 text-sm text-gray-500">
                Fetching the latest audit activity.
            </p>
        </div>
    )
}


const ErrorState = ({
    error,
    onRetry,
}) => {
    return (
        <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <X className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-900">
                Unable to load audit events
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                {error?.response?.data?.message ||
                    "Something went wrong while loading the audit logs."}
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800"
            >
                Try Again
            </button>
        </div>
    )
}


const EmptyState = ({
    onClear,
}) => {
    return (
        <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <Search className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-gray-900">
                No audit events found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                No audit records match the current search and filter
                combination.
            </p>

            <button
                type="button"
                onClick={onClear}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800"
            >
                Clear Filters
            </button>
        </div>
    )
}


const AuditDetailModal = ({
    log,
    fallbackLog,
    loading,
    error,
    onClose,
}) => {
    const displayLog =
        log || fallbackLog

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/30 p-4">

            <button
                type="button"
                aria-label="Close audit details"
                onClick={onClose}
                className="absolute inset-0 cursor-default"
            />

            <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

                {/* Modal header */}

                <div className="flex items-start justify-between border-b border-gray-200 px-5 py-5 sm:px-6">
                    <div className="flex items-start gap-3">

                        {displayLog && (
                            <ActionIcon
                                action={
                                    displayLog.action
                                }
                                large
                            />
                        )}

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Audit Event
                                </h2>

                                {displayLog && (
                                    <SeverityBadge
                                        severity={
                                            displayLog.severity
                                        }
                                    />
                                )}
                            </div>

                            {displayLog && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {
                                        displayLog.action
                                    }

                                    {" · "}

                                    {
                                        displayLog.module
                                    }
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>


                {/* Modal body */}

                <div className="overflow-y-auto p-5 sm:p-6">

                    {loading ? (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <div className="text-center">
                                <Loader2 className="mx-auto h-7 w-7 animate-spin text-green-700" />

                                <p className="mt-3 text-sm font-medium text-gray-600">
                                    Loading audit details...
                                </p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                                    <X className="h-5 w-5" />
                                </div>

                                <p className="mt-3 text-sm font-semibold text-gray-800">
                                    Unable to load audit details.
                                </p>
                            </div>
                        </div>
                    ) : displayLog ? (
                        <div className="grid gap-5 sm:grid-cols-2">

                            <InfoSection title="Actor">
                                <DetailRow
                                    label="User"
                                    value={
                                        displayLog.actor
                                    }
                                />

                                <DetailRow
                                    label="Email"
                                    value={
                                        displayLog.email
                                    }
                                />

                                <DetailRow
                                    label="Admin ID"
                                    value={
                                        displayLog.adminId ??
                                        "—"
                                    }
                                />
                            </InfoSection>


                            <InfoSection title="Event">
                                <DetailRow
                                    label="Action"
                                    value={
                                        displayLog.action
                                    }
                                />

                                <DetailRow
                                    label="Module"
                                    value={
                                        displayLog.module
                                    }
                                />

                                <DetailRow
                                    label="Record"
                                    value={
                                        displayLog.record
                                    }
                                />

                                <DetailRow
                                    label="Record ID"
                                    value={
                                        displayLog.recordId
                                    }
                                />
                            </InfoSection>


                            <InfoSection title="Change Metadata">
                                <DetailRow
                                    label="Old Value"
                                    value={
                                        displayLog.oldValue
                                    }
                                />

                                <DetailRow
                                    label="New Value"
                                    value={
                                        displayLog.newValue
                                    }
                                />

                                <DetailRow
                                    label="Description"
                                    value={
                                        displayLog.description
                                    }
                                />

                                <DetailRow
                                    label="Severity"
                                    value={
                                        displayLog.severity
                                    }
                                />
                            </InfoSection>


                            <InfoSection title="Request Metadata">
                                <DetailRow
                                    label="Date & Time"
                                    value={
                                        displayLog.timestamp
                                    }
                                />

                                <DetailRow
                                    label="IP Address"
                                    value={
                                        displayLog.ip
                                    }
                                />

                                <DetailRow
                                    label="Source"
                                    value={
                                        displayLog.source
                                    }
                                />

                                <DetailRow
                                    label="Device"
                                    value={
                                        displayLog.device
                                    }
                                />

                                <DetailRow
                                    label="Request Method"
                                    value={
                                        displayLog.requestMethod
                                    }
                                />
                            </InfoSection>


                            {displayLog.userAgent &&
                                displayLog.userAgent !==
                                "—" && (
                                    <div className="sm:col-span-2">
                                        <InfoSection title="User Agent">
                                            <DetailRow
                                                label="Browser / Client"
                                                value={
                                                    displayLog.userAgent
                                                }
                                            />
                                        </InfoSection>
                                    </div>
                                )}

                            {displayLog.description && (
                                <div className="sm:col-span-2">
                                    <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">
                                        <div className="flex items-start gap-3">
                                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />

                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wide text-green-800">
                                                    Activity Description
                                                </p>

                                                <p className="mt-1 text-sm leading-6 text-gray-700">
                                                    {
                                                        displayLog.description
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <p className="text-sm text-gray-500">
                                Audit details not found.
                            </p>
                        </div>
                    )}
                </div>


                {/* Modal footer */}

                {displayLog && (
                    <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50/70 px-5 py-4 sm:px-6">
                        <div className="text-xs text-gray-400">
                            Audit records are read-only.
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}


const InfoSection = ({
    title,
    children,
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                {title}
            </h3>

            <div className="divide-y divide-gray-200">
                {children}
            </div>
        </div>
    )
}


const DetailRow = ({
    label,
    value,
}) => {
    return (
        <div className="flex items-start justify-between gap-4 py-2.5">
            <span className="text-xs font-medium text-gray-500">
                {label}
            </span>

            <span className="max-w-[65%] break-words text-right text-xs font-semibold text-gray-800">
                {value || "—"}
            </span>
        </div>
    )
}


export default AuditLogs