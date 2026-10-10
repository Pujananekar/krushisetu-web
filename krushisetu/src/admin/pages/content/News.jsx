import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
    Bell,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Eye,
    FileText,
    Filter,
    Image,
    Plus,
    Search,
} from "lucide-react";
import { getAdminNews } from "../../api/adminNewsApi.js";



const statusOptions = ["Published", "Draft"];

const categoryOptions = [
    "Announcement",
    "Training",
    "Schemes",
    "Community",
    "Resources",
    "Events",
    "Partnerships",
    "Campaign",
    "Updates",
];

const getStatusLabel = (status) => {
    if (status === "PUBLISHED") return "Published";
    if (status === "DRAFT") return "Draft";

    return status || "Draft";
};

const getStatusClasses = (status) => {
    switch (status) {
        case "PUBLISHED":
            return "border-green-200 bg-green-50 text-green-700";

        case "DRAFT":
            return "border-gray-200 bg-gray-50 text-gray-600";

        default:
            return "border-gray-200 bg-gray-50 text-gray-600";
    }
};

const formatDate = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const News = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [page, setPage] = useState(1);

    const pageSize = 6;

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-news"],
        queryFn: getAdminNews,
    });

    const newsItems = data?.news || [];

    const filteredNews = useMemo(() => {
        const query = search.toLowerCase().trim();

        return newsItems.filter((item) => {
            const title = item.title?.toLowerCase() || "";
            const category = item.category?.toLowerCase() || "";
            const author = item.author?.toLowerCase() || "";
            const summary = item.summary?.toLowerCase() || "";

            const matchesSearch =
                !query ||
                title.includes(query) ||
                category.includes(query) ||
                author.includes(query) ||
                summary.includes(query);

            const displayStatus = getStatusLabel(item.status);

            const matchesStatus =
                statusFilter === "All" ||
                displayStatus === statusFilter;

            const matchesCategory =
                categoryFilter === "All" ||
                item.category === categoryFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory
            );
        });
    }, [
        newsItems,
        search,
        statusFilter,
        categoryFilter,
    ]);

    const publishedCount = newsItems.filter(
        (item) => item.status === "PUBLISHED"
    ).length;

    const draftCount = newsItems.filter(
        (item) => item.status === "DRAFT"
    ).length;

    const totalPages = Math.max(
        1,
        Math.ceil(filteredNews.length / pageSize)
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("All");
        setCategoryFilter("All");
        setPage(1);
    };

    const hasFilters =
        search ||
        statusFilter !== "All" ||
        categoryFilter !== "All";

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <Bell className="h-4 w-4" />

                            <span>Content Management</span>

                            <span className="text-gray-400">
                                /
                            </span>

                            <span className="text-gray-500">
                                News & Announcements
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            News & Announcements
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage public announcements, updates,
                            campaign news and important organisational
                            information.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/news/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add News
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                    <SummaryCard
                        label="Total News"
                        value={newsItems.length}
                        description="All news records"
                        icon={<Bell className="h-5 w-5" />}
                        iconClass="bg-green-50 text-green-700"
                    />

                    <SummaryCard
                        label="Published"
                        value={publishedCount}
                        description="Currently visible"
                        icon={<Eye className="h-5 w-5" />}
                        iconClass="bg-emerald-50 text-emerald-700"
                    />

                    <SummaryCard
                        label="Drafts"
                        value={draftCount}
                        description="Currently unpublished"
                        icon={<FileText className="h-5 w-5" />}
                        iconClass="bg-gray-50 text-gray-600"
                    />

                </div>

                {/* Publishing Notice */}
                <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                                <CalendarDays className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-blue-950">
                                    Publishing workflow
                                </h2>

                                <p className="mt-1 max-w-3xl text-xs leading-5 text-blue-900/70">
                                    News can currently be maintained as
                                    draft content or published content.
                                    Published records are visible to the
                                    public website.
                                </p>
                            </div>
                        </div>

                        <div className="text-xs font-semibold text-blue-800">
                            {draftCount} draft
                            {draftCount !== 1 ? "s" : ""} currently available
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_210px_220px_auto]">

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search news, category, author..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        {/* Status */}
                        <div className="relative">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            >
                                <option value="All">
                                    All statuses
                                </option>

                                {statusOptions.map((status) => (
                                    <option
                                        key={status}
                                        value={status}
                                    >
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category */}
                        <div className="relative">
                            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <select
                                value={categoryFilter}
                                onChange={(e) => {
                                    setCategoryFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="h-11 w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            >
                                <option value="All">
                                    All categories
                                </option>

                                {categoryOptions.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Clear */}
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="rounded-3xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-green-700" />

                        <p className="mt-4 text-sm font-medium text-gray-600">
                            Loading news...
                        </p>
                    </div>
                )}

                {/* Error */}
                {isError && !isLoading && (
                    <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <Bell className="h-6 w-6" />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-gray-900">
                            Failed to load news
                        </h3>

                        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-500">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Something went wrong while loading news records."}
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-5 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Table */}
                {!isLoading && !isError && (
                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-bold text-gray-900">
                                    News Records
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    {filteredNews.length} record
                                    {filteredNews.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                    found
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Live database data
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1200px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/70">

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            News
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Author
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Published
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Media
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {paginatedNews.length > 0 ? (
                                        paginatedNews.map((item) => {
                                            const publishedDate =
                                                formatDate(
                                                    item.published_date
                                                );

                                            const updatedDate =
                                                formatDate(
                                                    item.updated_at
                                                );

                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="group transition hover:bg-green-50/30"
                                                >

                                                    {/* News */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-3">

                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                                <Bell className="h-4 w-4" />
                                                            </div>

                                                            <div className="min-w-0">

                                                                <div className="flex items-center gap-2">
                                                                    <p className="max-w-[330px] truncate text-sm font-semibold text-gray-900">
                                                                        {item.title}
                                                                    </p>
                                                                </div>

                                                                <p className="mt-1 max-w-[380px] truncate text-xs text-gray-400">
                                                                    {item.summary ||
                                                                        "No summary available."}
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Category */}
                                                    <td className="px-5 py-4">
                                                        <span className="rounded-xl bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">
                                                            {item.category ||
                                                                "Uncategorized"}
                                                        </span>
                                                    </td>

                                                    {/* Author */}
                                                    <td className="px-5 py-4">
                                                        <span className="text-sm text-gray-600">
                                                            {item.author ||
                                                                "—"}
                                                        </span>
                                                    </td>

                                                    {/* Published */}
                                                    <td className="px-5 py-4">
                                                        {publishedDate ? (
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700">
                                                                    {publishedDate}
                                                                </p>

                                                                {updatedDate && (
                                                                    <p className="mt-1 text-[11px] text-gray-400">
                                                                        Updated{" "}
                                                                        {
                                                                            updatedDate
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">
                                                                Not published
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Media */}
                                                    <td className="px-5 py-4">
                                                        {item.image_url ? (
                                                            <span className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                                                                <Image className="h-3.5 w-3.5" />
                                                                Available
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                                                                <Image className="h-3.5 w-3.5" />
                                                                None
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                                                item.status
                                                            )}`}
                                                        >
                                                            {getStatusLabel(
                                                                item.status
                                                            )}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center justify-end gap-1">

                                                            <Link
                                                                to={`/admin/content/news/${item.id}`}
                                                                title="View"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/news/${item.id}/edit`}
                                                                title="Edit"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Edit3 className="h-4 w-4" />
                                                            </Link>

                                                        </div>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="mx-auto flex max-w-sm flex-col items-center">

                                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                                        <Bell className="h-6 w-6" />
                                                    </div>

                                                    <h3 className="mt-4 text-sm font-bold text-gray-900">
                                                        No news found
                                                    </h3>

                                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                                        {hasFilters
                                                            ? "Try changing your search or filters."
                                                            : "No news records have been created yet."}
                                                    </p>

                                                    {hasFilters && (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                clearFilters
                                                            }
                                                            className="mt-4 text-sm font-semibold text-green-700 transition hover:text-green-800"
                                                        >
                                                            Clear filters
                                                        </button>
                                                    )}

                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                            <p className="text-xs text-gray-500">
                                Showing{" "}
                                <span className="font-semibold text-gray-700">
                                    {filteredNews.length === 0
                                        ? 0
                                        : (currentPage - 1) *
                                              pageSize +
                                          1}
                                </span>{" "}
                                to{" "}
                                <span className="font-semibold text-gray-700">
                                    {Math.min(
                                        currentPage * pageSize,
                                        filteredNews.length
                                    )}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-700">
                                    {filteredNews.length}
                                </span>
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setPage((previous) =>
                                            Math.max(
                                                1,
                                                previous - 1
                                            )
                                        )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>

                                <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-green-700 px-3 text-xs font-semibold text-white">
                                    {currentPage}
                                </div>

                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setPage((previous) =>
                                            Math.min(
                                                totalPages,
                                                previous + 1
                                            )
                                        )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>

                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Information Cards */}
                {!isLoading && !isError && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <InfoCard
                            icon={
                                <FileText className="h-5 w-5" />
                            }
                            title="Content Management"
                            description={`${draftCount} news ${
                                draftCount === 1
                                    ? "item is"
                                    : "items are"
                            } currently saved as draft content.`}
                            action="Manage drafts"
                            onClick={() => {
                                setStatusFilter("Draft");
                                setPage(1);
                            }}
                        />

                        <InfoCard
                            icon={
                                <CalendarDays className="h-5 w-5" />
                            }
                            title="Publishing"
                            description="Published news records contain their publication date and are available for the public website."
                            action="View published"
                            onClick={() => {
                                setStatusFilter("Published");
                                setPage(1);
                            }}
                        />

                    </div>
                )}

            </div>
        </section>
    );
};

const SummaryCard = ({
    label,
    value,
    description,
    icon,
    iconClass,
}) => {
    return (
        <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {value}
                    </p>
                </div>

                <div
                    className={`kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
                >
                    {icon}
                </div>

            </div>

            <p className="mt-3 text-xs text-gray-500">
                {description}
            </p>
        </div>
    );
};

const InfoCard = ({
    icon,
    title,
    description,
    action,
    onClick,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    {icon}
                </div>

                <div>
                    <h3 className="text-sm font-bold text-gray-900">
                        {title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        {description}
                    </p>

                    <button
                        type="button"
                        onClick={onClick}
                        className="kr-hover-link mt-3 text-xs font-semibold text-green-700"
                    >
                        {action}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default News;