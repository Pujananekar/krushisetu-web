import { Filter, Search, X } from "lucide-react"

const SchemeSearch = ({
    search,
    onSearchChange,
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
        search.trim() !== "" ||
        category !== "All" ||
        level !== "All" ||
        status !== "All"

    return (
        <section className="px-6 py-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="rounded-3xl border border-gray-200 bg-white/90 p-4 shadow-lg shadow-gray-900/8">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        {/* Search */}
                        <div className="relative min-w-0 flex-1">
                            <Search
                                size={18}
                                strokeWidth={2}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    onSearchChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Search schemes..."
                                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        {/* Filter label */}
                        <div className="hidden items-center gap-2 xl:flex">
                            <Filter
                                size={17}
                                strokeWidth={2}
                                className="text-green-700"
                            />

                            <span className="text-sm font-semibold text-gray-700">
                                Filters
                            </span>
                        </div>

                        {/* Category */}
                        <select
                            value={category}
                            onChange={(event) =>
                                onCategoryChange(
                                    event.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100 lg:w-40"
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
                                onLevelChange(
                                    event.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100 lg:w-32"
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
                                onStatusChange(
                                    event.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100 lg:w-36"
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
                            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-gray-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-gray-50 disabled:hover:text-gray-500"
                        >
                            <X size={15} />

                            <span className="hidden sm:inline">
                                Clear
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SchemeSearch