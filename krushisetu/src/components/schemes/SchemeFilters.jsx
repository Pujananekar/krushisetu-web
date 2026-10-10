import { Filter, X } from "lucide-react"

const SchemeFilters = ({
    category,
    level,
    status,
    categories,
    onCategoryChange,
    onLevelChange,
    onStatusChange,
    onClear,
}) => {
    const hasFilters =
        category !== "All" ||
        level !== "All" ||
        status !== "All"

    return (
        <section className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="grid gap-6 rounded-4xl border border-gray-200 bg-white/90 p-6 shadow-xl shadow-gray-900/10 sm:p-8 lg:grid-cols-[220px_1fr] lg:items-center">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                            <Filter
                                size={21}
                                strokeWidth={2}
                            />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-950">
                                Filter Schemes
                            </h3>

                            <p className="text-xs text-gray-500">
                                Refine available information
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {/* Category */}
                        <select
                            value={category}
                            onChange={(event) =>
                                onCategoryChange(event.target.value)
                            }
                            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-colors duration-300 hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
                        >
                            {categories.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item === "All"
                                        ? "All Categories"
                                        : item}
                                </option>
                            ))}
                        </select>

                        {/* Level */}
                        <select
                            value={level}
                            onChange={(event) =>
                                onLevelChange(event.target.value)
                            }
                            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-colors duration-300 hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
                        >
                            <option value="All">
                                All Levels
                            </option>

                            <option value="CENTRAL">
                                Central
                            </option>

                            <option value="STATE">
                                State
                            </option>
                        </select>

                        {/* Status */}
                        <select
                            value={status}
                            onChange={(event) =>
                                onStatusChange(event.target.value)
                            }
                            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-colors duration-300 hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
                        >
                            <option value="All">
                                All Statuses
                            </option>

                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="UPCOMING">
                                Upcoming
                            </option>

                            <option value="CLOSED">
                                Closed
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>
                        </select>

                        {/* Clear */}
                        <button
                            type="button"
                            onClick={onClear}
                            disabled={!hasFilters}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-gray-500 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-gray-50 disabled:hover:text-gray-500"
                        >
                            <X size={16} />
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SchemeFilters