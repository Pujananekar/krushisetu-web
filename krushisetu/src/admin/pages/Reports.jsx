import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ClipboardList,
    Download,
    FileText,
    Filter,
    RefreshCw,
    Users,
} from "lucide-react"

const reportData = {
    applications: {
        total: 248,
        previous: 221,
        trend: 12.2,
        label: "Total Applications",
        icon: ClipboardList,
    },
    enquiries: {
        total: 126,
        previous: 112,
        trend: 12.5,
        label: "Total Enquiries",
        icon: MessageSquareIcon,
    },
    registrations: {
        total: 184,
        previous: 159,
        trend: 15.7,
        label: "Registrations",
        icon: Users,
    },
    resolved: {
        total: 97,
        previous: 84,
        trend: 15.5,
        label: "Resolved Cases",
        icon: CheckCircle2,
    },
}

const applicationReport = [
    {
        label: "Farmers",
        value: 86,
        percentage: 34.7,
    },
    {
        label: "Training",
        value: 54,
        percentage: 21.8,
    },
    {
        label: "Services",
        value: 42,
        percentage: 16.9,
    },
    {
        label: "Internships",
        value: 28,
        percentage: 11.3,
    },
    {
        label: "FPO",
        value: 17,
        percentage: 6.9,
    },
    {
        label: "Partnerships",
        value: 12,
        percentage: 4.8,
    },
    {
        label: "Volunteers",
        value: 9,
        percentage: 3.6,
    },
]

const monthlyData = [
    {
        month: "Apr",
        applications: 24,
        enquiries: 16,
        registrations: 19,
    },
    {
        month: "May",
        applications: 31,
        enquiries: 18,
        registrations: 24,
    },
    {
        month: "Jun",
        applications: 38,
        enquiries: 22,
        registrations: 28,
    },
    {
        month: "Jul",
        applications: 42,
        enquiries: 25,
        registrations: 31,
    },
    {
        month: "Aug",
        applications: 51,
        enquiries: 27,
        registrations: 36,
    },
    {
        month: "Sep",
        applications: 62,
        enquiries: 18,
        registrations: 46,
    },
]

const recentReports = [
    {
        id: 1,
        name: "Monthly Application Report",
        type: "Applications",
        generatedBy: "Admin",
        date: "30 Sep 2026",
        status: "Ready",
    },
    {
        id: 2,
        name: "Training Registration Summary",
        type: "Training",
        generatedBy: "Training Manager",
        date: "29 Sep 2026",
        status: "Ready",
    },
    {
        id: 3,
        name: "CRM Enquiry Report",
        type: "CRM",
        generatedBy: "CRM Executive",
        date: "28 Sep 2026",
        status: "Ready",
    },
    {
        id: 4,
        name: "Programme Performance Report",
        type: "Impact",
        generatedBy: "Programme Manager",
        date: "25 Sep 2026",
        status: "Ready",
    },
]

function MessageSquareIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
    )
}

const Reports = () => {
    const [period, setPeriod] = useState("Last 6 Months")
    const [reportType, setReportType] = useState("All Reports")
    const [refreshing, setRefreshing] = useState(false)

    const filteredReports = useMemo(() => {
        if (reportType === "All Reports") {
            return recentReports
        }

        return recentReports.filter(
            (report) => report.type === reportType
        )
    }, [reportType])

    const handleRefresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 600)
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1500px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                            <span className="text-green-700">
                                Reports
                            </span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                Overview
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Reports & Analytics
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Monitor applications, enquiries, registrations
                            and operational performance across Krushisetu.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleRefresh}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${
                                    refreshing
                                        ? "animate-spin"
                                        : ""
                                }`}
                            />
                            Refresh
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-800"
                        >
                            <Download className="h-4 w-4" />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Filter className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-gray-800">
                                    Report Filters
                                </p>

                                <p className="text-xs text-gray-400">
                                    Adjust the reporting period and report
                                    category.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <FilterSelect
                                value={period}
                                onChange={setPeriod}
                                options={[
                                    "This Month",
                                    "Last 3 Months",
                                    "Last 6 Months",
                                    "This Year",
                                    "All Time",
                                ]}
                            />

                            <FilterSelect
                                value={reportType}
                                onChange={setReportType}
                                options={[
                                    "All Reports",
                                    "Applications",
                                    "Training",
                                    "CRM",
                                    "Impact",
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Object.values(reportData).map(
                        (item) => (
                            <ReportSummaryCard
                                key={item.label}
                                {...item}
                            />
                        )
                    )}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">

                    {/* Monthly Performance */}
                    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                        <BarChart3 className="h-4 w-4" />
                                    </div>

                                    <h2 className="text-base font-bold text-gray-900">
                                        Monthly Activity
                                    </h2>
                                </div>

                                <p className="mt-2 text-xs text-gray-500">
                                    Applications, enquiries and registrations
                                    over the selected period.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 text-[11px] font-medium text-gray-500">
                                <Legend
                                    label="Applications"
                                />

                                <Legend
                                    label="Enquiries"
                                />

                                <Legend
                                    label="Registrations"
                                />
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <ActivityChart />
                        </div>
                    </div>

                    {/* Application Breakdown */}
                    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <ClipboardList className="h-4 w-4" />
                                </div>

                                <h2 className="text-base font-bold text-gray-900">
                                    Application Breakdown
                                </h2>
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                Distribution across application categories.
                            </p>
                        </div>

                        <div className="space-y-5 p-5 sm:p-6">
                            {applicationReport.map(
                                (item) => (
                                    <ProgressRow
                                        key={item.label}
                                        {...item}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Operational Overview */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <MetricPanel
                        icon={Activity}
                        title="Resolution Rate"
                        value="77.0%"
                        description="Cases resolved against total cases"
                        trend="+5.2%"
                    />

                    <MetricPanel
                        icon={CalendarDays}
                        title="Average Follow-up"
                        value="2.4 days"
                        description="Average time between CRM actions"
                        trend="-0.6 days"
                        inverse
                    />

                    <MetricPanel
                        icon={Users}
                        title="Active Users"
                        value="18"
                        description="Admin and operational users"
                        trend="+3"
                    />
                </div>

                {/* Recent Reports */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                    <FileText className="h-4 w-4" />
                                </div>

                                <h2 className="text-base font-bold text-gray-900">
                                    Recent Reports
                                </h2>
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                Previously generated reports available to
                                authorised users.
                            </p>
                        </div>

                        <Link
                            to="/admin/reports/history"
                            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            View Report History
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">
                                    <TableHead>
                                        Report
                                    </TableHead>

                                    <TableHead>
                                        Type
                                    </TableHead>

                                    <TableHead>
                                        Generated By
                                    </TableHead>

                                    <TableHead>
                                        Date
                                    </TableHead>

                                    <TableHead>
                                        Status
                                    </TableHead>

                                    <TableHead>
                                        Action
                                    </TableHead>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredReports.map(
                                    (report) => (
                                        <tr
                                            key={report.id}
                                            className="transition hover:bg-green-50/30"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                                                        <FileText className="h-4 w-4" />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {
                                                                report.name
                                                            }
                                                        </p>

                                                        <p className="mt-0.5 text-[11px] text-gray-400">
                                                            Report #
                                                            {
                                                                report.id
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600">
                                                    {
                                                        report.type
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {
                                                    report.generatedBy
                                                }
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-500">
                                                {
                                                    report.date
                                                }
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    {
                                                        report.status
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                                >
                                                    <Download className="h-3.5 w-3.5" />
                                                    Download
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredReports.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                                <FileText className="h-5 w-5" />
                            </div>

                            <h3 className="mt-3 text-sm font-bold text-gray-700">
                                No reports found
                            </h3>

                            <p className="mt-1 text-xs text-gray-400">
                                Try changing the report category.
                            </p>
                        </div>
                    )}
                </div>

                {/* UI Notice */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                        <div>
                            <h3 className="text-sm font-bold text-gray-800">
                                UI preview mode
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Report figures, charts, exports and report
                                history currently use temporary UI data.
                                Backend analytics and export generation will
                                be connected later.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const ReportSummaryCard = ({
    total,
    previous,
    trend,
    label,
    icon: Icon,
}) => {
    const increased = trend >= 0

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-100 hover:shadow-lg hover:shadow-green-900/5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon className="h-5 w-5" />
                </div>

                <div
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        increased
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                    }`}
                >
                    {increased ? (
                        <ArrowUpRight className="h-3 w-3" />
                    ) : (
                        <ArrowDownRight className="h-3 w-3" />
                    )}

                    {Math.abs(trend)}%
                </div>
            </div>

            <div className="mt-5">
                <p className="text-3xl font-bold tracking-tight text-gray-900">
                    {total}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-700">
                    {label}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                    Previous period: {previous}
                </p>
            </div>
        </div>
    )
}

const MetricPanel = ({
    icon: Icon,
    title,
    value,
    description,
    trend,
    inverse = false,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon className="h-4 w-4" />
                </div>

                <span
                    className={`text-xs font-semibold ${
                        inverse
                            ? "text-green-700"
                            : "text-green-700"
                    }`}
                >
                    {trend}
                </span>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {title}
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
                {value}
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
                {description}
            </p>
        </div>
    )
}

const ProgressRow = ({
    label,
    value,
    percentage,
}) => {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-gray-700">
                    {label}
                </span>

                <span className="text-xs font-bold text-gray-800">
                    {value}
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full bg-green-600 transition-all"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <p className="mt-1 text-[10px] text-gray-400">
                {percentage}% of total
            </p>
        </div>
    )
}

const ActivityChart = () => {
    const maxValue = Math.max(
        ...monthlyData.flatMap((item) => [
            item.applications,
            item.enquiries,
            item.registrations,
        ])
    )

    return (
        <div>
            <div className="relative h-[300px]">
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[100, 75, 50, 25, 0].map(
                        (value) => (
                            <div
                                key={value}
                                className="flex items-center gap-3"
                            >
                                <span className="w-7 text-right text-[10px] text-gray-400">
                                    {Math.round(
                                        (maxValue *
                                            value) /
                                            100
                                    )}
                                </span>

                                <div className="h-px flex-1 bg-gray-100" />
                            </div>
                        )
                    )}
                </div>

                <div className="absolute bottom-0 left-10 right-0 top-0 flex items-end justify-between gap-3 pb-7 pt-2">
                    {monthlyData.map(
                        (item) => (
                            <div
                                key={item.month}
                                className="flex h-full flex-1 items-end justify-center gap-1"
                            >
                                <ChartBar
                                    value={
                                        item.applications
                                    }
                                    maxValue={
                                        maxValue
                                    }
                                />

                                <ChartBar
                                    value={
                                        item.enquiries
                                    }
                                    maxValue={
                                        maxValue
                                    }
                                />

                                <ChartBar
                                    value={
                                        item.registrations
                                    }
                                    maxValue={
                                        maxValue
                                    }
                                />
                            </div>
                        )
                    )}
                </div>

                <div className="absolute bottom-0 left-10 right-0 flex justify-between gap-3">
                    {monthlyData.map(
                        (item) => (
                            <span
                                key={item.month}
                                className="flex-1 text-center text-[10px] font-medium text-gray-400"
                            >
                                {item.month}
                            </span>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

const ChartBar = ({
    value,
    maxValue,
}) => {
    const height =
        maxValue > 0
            ? `${Math.max(
                  8,
                  (value / maxValue) * 100
              )}%`
            : "8%"

    return (
        <div
            className="w-full max-w-[14px] rounded-t-lg bg-green-600/80 transition-all hover:bg-green-700"
            style={{
                height,
            }}
            title={`${value}`}
        />
    )
}

const Legend = ({
    label,
}) => {
    return (
        <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            {label}
        </span>
    )
}

const FilterSelect = ({
    value,
    onChange,
    options,
}) => {
    return (
        <select
            value={value}
            onChange={(event) =>
                onChange(event.target.value)
            }
            className="h-11 min-w-[190px] rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
        >
            {options.map((option) => (
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    )
}

const TableHead = ({
    children,
}) => {
    return (
        <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {children}
        </th>
    )
}

export default Reports