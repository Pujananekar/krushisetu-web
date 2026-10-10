import { Filter, X } from "lucide-react"

const TrainingFilters = ({
    trainingEvents = [],
    filters = {},
    onFilterChange,
    onClear,
    hasFilters = false,
}) => {
    const trainingTypes = [
        ...new Set(
            trainingEvents
                .map(
                    (event) =>
                        event?.training_type
                )
                .filter(Boolean)
        ),
    ].sort()

    const locations = [
        ...new Set(
            trainingEvents
                .map(
                    (event) =>
                        event?.location
                )
                .filter(Boolean)
        ),
    ].sort()

    const statuses = [
        "UPCOMING",
        "ONGOING",
        "COMPLETED",
        "CANCELLED",
    ]

    const formatStatus = (status) => {
        return status
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(
                /\b\w/g,
                (character) =>
                    character.toUpperCase()
            )
    }

    return (
        <div className="flex min-w-0 max-w-max flex-1 flex-col gap-3 lg:flex-row lg:items-center">
            {/* Mobile Filter Label */}
            <div className="flex shrink-0 items-center gap-2 lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Filter
                        size={18}
                        strokeWidth={2}
                    />
                </div>

                <span className="text-sm font-semibold text-gray-900">
                    Filters
                </span>
            </div>

            {/* Program Type */}
            <select
                value={
                    filters?.training_type || ""
                }
                onChange={(event) =>
                    onFilterChange(
                        "training_type",
                        event.target.value
                    )
                }
                title={
                    filters?.training_type ||
                    "All Program Types"
                }
                className="h-12 min-w-0 flex-[1.4] cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
            >
                <option value="">
                    All Program Type
                </option>

                {trainingTypes.map((type) => (
                    <option
                        key={type}
                        value={type}
                    >
                        {type}
                    </option>
                ))}
            </select>

            {/* Location */}
            <select
                value={
                    filters?.location || ""
                }
                onChange={(event) =>
                    onFilterChange(
                        "location",
                        event.target.value
                    )
                }
                title={
                    filters?.location ||
                    "All Locations"
                }
                className="h-12 min-w-0 flex-1 cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
            >
                <option value="">
                    All Locations
                </option>

                {locations.map((location) => (
                    <option
                        key={location}
                        value={location}
                    >
                        {location}
                    </option>
                ))}
            </select>

            {/* Status */}
            <select
                value={
                    filters?.status || ""
                }
                onChange={(event) =>
                    onFilterChange(
                        "status",
                        event.target.value
                    )
                }
                title={
                    filters?.status ||
                    "All Statuses"
                }
                className="h-12 min-w-0 flex-1 cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
            >
                <option value="">
                    All Statuses
                </option>

                {statuses.map((status) => (
                    <option
                        key={status}
                        value={status}
                    >
                        {formatStatus(status)}
                    </option>
                ))}
            </select>

            {/* Clear */}
            <button
                type="button"
                onClick={onClear}
                disabled={!hasFilters}
                title="Clear filters"
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-gray-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-gray-50 disabled:hover:text-gray-500"
            >
                <X size={16} />

                <span className="lg:hidden">
                    Clear Filters
                </span>

                <span className="hidden lg:inline">
                    Clear
                </span>
            </button>
        </div>
    )
}

export default TrainingFilters 