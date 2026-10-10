import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import {
    BookOpen,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Edit3,
    Eye,
    FileText,
    Filter,
    Leaf,
    MapPin,
    Plus,
    Search,
    UserRound,
} from "lucide-react"

import Loader from "../../../components/common/Loader"
import { getAdminResources } from "../../api/adminResourcesApi.js"

const resourceTypes = [
    "ARTICLE",
    "PDF",
    "INFOGRAPHIC",
    "VIDEO",
    "FAQ",
    "OFFICIAL_LINK",
    "DOWNLOADABLE_FORM",
]

const formatResourceType = (type) => {
    if (!type) return "—"

    return type
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        )
}

const formatDate = (date) => {
    if (!date) return "—"

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return "—"
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const Resources = () => {
    const [search, setSearch] = useState("")
    const [typeFilter, setTypeFilter] = useState("All")
    const [categoryFilter, setCategoryFilter] = useState("All")
    const [languageFilter, setLanguageFilter] = useState("All")
    const [page, setPage] = useState(1)

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["admin-resources"],
        queryFn: getAdminResources,
    })

    const resources = data?.resources ?? []

    const categories = useMemo(() => {
        return [
            ...new Set(
                resources
                    .map((resource) => resource.category)
                    .filter(Boolean)
            ),
        ].sort()
    }, [resources])

    const languages = useMemo(() => {
        return [
            ...new Set(
                resources
                    .map((resource) => resource.language)
                    .filter(Boolean)
            ),
        ].sort()
    }, [resources])

    const filteredResources = useMemo(() => {
        const query = search.toLowerCase().trim()

        return resources.filter((resource) => {
            const searchableText = [
                resource.title,
                resource.slug,
                resource.resource_type,
                resource.category,
                resource.crop,
                resource.crop_applicability,
                resource.season,
                resource.language,
                resource.author,
                resource.reviewer,
                resource.region,
                resource.tags,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()

            const matchesSearch =
                !query || searchableText.includes(query)

            const matchesType =
                typeFilter === "All" ||
                resource.resource_type === typeFilter

            const matchesCategory =
                categoryFilter === "All" ||
                resource.category === categoryFilter

            const matchesLanguage =
                languageFilter === "All" ||
                resource.language === languageFilter

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory &&
                matchesLanguage
            )
        })
    }, [
        resources,
        search,
        typeFilter,
        categoryFilter,
        languageFilter,
    ])

    const totalResources = resources.length

    const categoryCount = new Set(
        resources
            .map((resource) => resource.category)
            .filter(Boolean)
    ).size

    const languageCount = new Set(
        resources
            .map((resource) => resource.language)
            .filter(Boolean)
    ).size

    const articleCount = resources.filter(
        (resource) => resource.resource_type === "ARTICLE"
    ).length

    const pageSize = 6

    const totalPages = Math.max(
        1,
        Math.ceil(filteredResources.length / pageSize)
    )

    const currentPage = Math.min(page, totalPages)

    const paginatedResources = filteredResources.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const clearFilters = () => {
        setSearch("")
        setTypeFilter("All")
        setCategoryFilter("All")
        setLanguageFilter("All")
        setPage(1)
    }

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const handleType = (value) => {
        setTypeFilter(value)
        setPage(1)
    }

    const handleCategory = (value) => {
        setCategoryFilter(value)
        setPage(1)
    }

    const handleLanguage = (value) => {
        setLanguageFilter(value)
        setPage(1)
    }

    const hasActiveFilters =
        Boolean(search) ||
        typeFilter !== "All" ||
        categoryFilter !== "All" ||
        languageFilter !== "All"

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading resources..."
            />
        )
    }

    if (isError) {
        return (
            <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center">
                    <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-gray-900/5">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <FileText size={24} />
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-gray-900">
                            Unable to load resources
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Something went wrong while loading the resource
                            library.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="kr-hover-button mt-5 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700">
                            <BookOpen className="h-4 w-4" />
                            <span>Content Management</span>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-500">
                                Resources
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Resources
                        </h1>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Manage agricultural articles, PDFs, infographics,
                            videos, FAQs and other farmer resources.
                        </p>
                    </div>

                    <Link
                        to="/admin/content/resources/new"
                        className="kr-hover-button inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Resource
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Resources
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {totalResources}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <BookOpen className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Across the resource library
                        </p>
                    </div>

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Articles
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {articleCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                <FileText className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Article-based resources
                        </p>
                    </div>

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Categories
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {categoryCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                <Leaf className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Resource categories
                        </p>
                    </div>

                    <div className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Languages
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {languageCount}
                                </p>
                            </div>

                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                                <BookOpen className="h-5 w-5" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Available resource languages
                        </p>
                    </div>
                </div>

                {/* Resource quality reminder */}
                <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                <FileText className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-green-900">
                                    Resource publishing checklist
                                </h2>

                                <p className="mt-1 max-w-3xl text-xs leading-5 text-green-800/80">
                                    Keep author, reviewer, publication date,
                                    last updated date, region or crop
                                    applicability and disclaimer information
                                    complete before publishing a resource.
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-green-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-700">
                            Content quality
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    handleSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search resources, authors, reviewers, regions or crops..."
                                className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                            />
                        </div>

                        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
                            <div className="relative">
                                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <select
                                    value={typeFilter}
                                    onChange={(event) =>
                                        handleType(
                                            event.target.value
                                        )
                                    }
                                    className="h-11 w-full min-w-[200px] appearance-none rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50"
                                >
                                    <option value="All">
                                        All resource types
                                    </option>

                                    {resourceTypes.map((type) => (
                                        <option
                                            key={type}
                                            value={type}
                                        >
                                            {formatResourceType(type)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <select
                                value={categoryFilter}
                                onChange={(event) =>
                                    handleCategory(
                                        event.target.value
                                    )
                                }
                                className="h-11 w-full min-w-[220px] appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 lg:w-auto"
                            >
                                <option value="All">
                                    All categories
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={languageFilter}
                                onChange={(event) =>
                                    handleLanguage(
                                        event.target.value
                                    )
                                }
                                className="h-11 w-full min-w-[180px] appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-50 lg:w-auto"
                            >
                                <option value="All">
                                    All languages
                                </option>

                                {languages.map((language) => (
                                    <option
                                        key={language}
                                        value={language}
                                    >
                                        {language}
                                    </option>
                                ))}
                            </select>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="h-11 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resource Library */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Resource Library
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {filteredResources.length} resource
                                {filteredResources.length !== 1
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

                    {filteredResources.length > 0 ? (
                        <>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1250px]">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/70">
                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Resource
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Type / Category
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Author / Reviewer
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Published
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Last Updated
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Region / Crops
                                            </th>

                                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {paginatedResources.map(
                                            (resource) => (
                                                <tr
                                                    key={resource.id}
                                                    className="group transition hover:bg-green-50/30"
                                                >
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                                <BookOpen className="h-4 w-4" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="max-w-[270px] truncate text-sm font-semibold text-gray-900">
                                                                    {
                                                                        resource.title
                                                                    }
                                                                </p>

                                                                <div className="mt-1 flex items-center gap-2">
                                                                    <span className="text-xs text-gray-400">
                                                                        {resource.language ||
                                                                            "—"}
                                                                    </span>

                                                                    <span className="h-1 w-1 rounded-full bg-gray-300" />

                                                                    <span className="text-xs text-gray-400">
                                                                        ID #
                                                                        {
                                                                            resource.id
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <p className="text-sm font-semibold text-gray-700">
                                                            {formatResourceType(
                                                                resource.resource_type
                                                            )}
                                                        </p>

                                                        <p className="mt-1 max-w-[180px] truncate text-xs text-gray-500">
                                                            {resource.category ||
                                                                "—"}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-2">
                                                            <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                            <div>
                                                                <p className="max-w-[170px] truncate text-sm font-medium text-gray-700">
                                                                    {resource.author ||
                                                                        "—"}
                                                                </p>

                                                                <p className="mt-1 max-w-[170px] truncate text-xs text-gray-400">
                                                                    Reviewer:{" "}
                                                                    {resource.reviewer ||
                                                                        "—"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays className="h-4 w-4 text-gray-400" />

                                                            <span className="text-sm text-gray-600">
                                                                {formatDate(
                                                                    resource.publication_date
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="text-sm text-gray-600">
                                                            {formatDate(
                                                                resource.last_updated_date
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-2">
                                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                                                            <div>
                                                                <p className="max-w-[150px] truncate text-sm font-medium text-gray-700">
                                                                    {resource.region ||
                                                                        "—"}
                                                                </p>

                                                                <p className="mt-1 max-w-[180px] truncate text-xs text-gray-400">
                                                                    {resource.crop_applicability ||
                                                                        resource.crop ||
                                                                        "Not crop specific"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Link
                                                                to={`/admin/content/resources/${resource.id}`}
                                                                title="View"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Link>

                                                            <Link
                                                                to={`/admin/content/resources/${resource.id}/edit`}
                                                                title="Edit"
                                                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-green-50 hover:text-green-700"
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
                            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-700">
                                        {(currentPage - 1) *
                                            pageSize +
                                            1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-gray-700">
                                        {Math.min(
                                            currentPage *
                                                pageSize,
                                            filteredResources.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-700">
                                        {
                                            filteredResources.length
                                        }
                                    </span>
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setPage(
                                                (previous) =>
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
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                        onClick={() =>
                                            setPage(
                                                (previous) =>
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
                        </>
                    ) : (
                        /* Empty / Filtered Fallback */
                        <div className="flex min-h-80 items-center justify-center px-6 py-16">
                            <div className="flex max-w-md flex-col items-center text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <BookOpen className="h-7 w-7" />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-gray-900">
                                    No resources found
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {resources.length === 0
                                        ? "No resources have been added yet. Add your first resource to start building the resource library."
                                        : "No resources match the current search or filters."}
                                </p>

                                {resources.length === 0 ? (
                                    <Link
                                        to="/admin/content/resources/new"
                                        className="kr-hover-button mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Resource
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="kr-hover-button mt-5 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Disclaimer reminder */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <FileText className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900">
                                Content and disclaimer
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Resource-specific disclaimer content will be
                                managed from the resource editor before
                                publication.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Resources