import { CalendarDays, ExternalLink, Landmark } from "lucide-react"
import { Link } from "react-router-dom"

const formatDate = (value) => {
    if (!value) {
        return null
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return null
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date)
}

const statusStyles = {
    ACTIVE: "bg-green-50 text-green-700 border-green-200",
    UPCOMING: "bg-blue-50 text-blue-700 border-blue-200",
    CLOSED: "bg-red-50 text-red-700 border-red-200",
    INACTIVE: "bg-gray-100 text-gray-600 border-gray-200",
}

const statusLabels = {
    ACTIVE: "Active",
    UPCOMING: "Upcoming",
    CLOSED: "Closed",
    INACTIVE: "Inactive",
}

const levelLabels = {
    CENTRAL: "Central",
    STATE: "State",
}

const SchemeGrid = ({
    schemes = [],
    isLoading = false,
    isError = false,
    onRetry,
    hasFilters = false,
    onClearFilters,
}) => {
    return (
        <section className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                {/* Loading */}
                {isLoading && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-4xl border border-gray-200 bg-white p-7 shadow-lg shadow-gray-900/5"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-gray-100" />

                                <div className="mt-6 h-5 w-3/4 rounded bg-gray-100" />

                                <div className="mt-3 h-4 w-full rounded bg-gray-100" />

                                <div className="mt-2 h-4 w-5/6 rounded bg-gray-100" />

                                <div className="mt-8 h-10 w-28 rounded-xl bg-gray-100" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!isLoading && isError && (
                    <div className="rounded-4xl border border-red-200 bg-white p-8 text-center shadow-lg shadow-gray-900/5 sm:p-10">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <Landmark size={25} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-gray-950">
                            Unable to load schemes
                        </h3>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
                            We could not load the government scheme
                            information right now. Please try again.
                        </p>

                        <button
                            type="button"
                            onClick={onRetry}
                            className="kr-hover-button mt-6 inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!isLoading && !isError && schemes.length === 0 && (
                    <div className="rounded-4xl border border-gray-200 bg-white p-8 text-center shadow-lg shadow-gray-900/5 sm:p-10">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <Landmark size={25} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-gray-950">
                            No schemes found
                        </h3>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
                            {hasFilters
                                ? "No government schemes match your current search or filters."
                                : "Government scheme information is not available yet."}
                        </p>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={onClearFilters}
                                className="kr-hover-button mt-6 inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/10 hover:bg-green-800"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Scheme Cards */}
                {!isLoading &&
                    !isError &&
                    schemes.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {schemes.map((scheme) => {
                                const deadline = formatDate(
                                    scheme.deadline
                                )

                                return (
                                    <article
                                        key={scheme.id}
                                        className="kr-hover-card group flex h-full flex-col rounded-4xl border border-gray-200 bg-white/95 p-7 shadow-lg shadow-gray-900/5"
                                    >
                                        {/* Icon + Status */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="kr-hover-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                <Landmark
                                                    size={23}
                                                    strokeWidth={2}
                                                />
                                            </div>

                                            <span
                                                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                                    statusStyles[
                                                        scheme.status
                                                    ] ??
                                                    "border-gray-200 bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {statusLabels[
                                                    scheme.status
                                                ] ??
                                                    scheme.status}
                                            </span>
                                        </div>

                                        {/* Scheme Info */}
                                        <div className="mt-6 flex-1">
                                            <h3 className="kr-hover-title text-xl font-bold leading-7 text-gray-950">
                                                {scheme.name}
                                            </h3>

                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                {scheme.level && (
                                                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                        {levelLabels[
                                                            scheme.level
                                                        ] ??
                                                            scheme.level}
                                                    </span>
                                                )}

                                                {scheme.category && (
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                        {scheme.category}
                                                    </span>
                                                )}
                                            </div>

                                            {scheme.authority && (
                                                <p className="mt-4 text-sm font-medium text-gray-700">
                                                    {scheme.authority}
                                                </p>
                                            )}

                                            {scheme.overview && (
                                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                                    {scheme.overview}
                                                </p>
                                            )}

                                            {scheme.beneficiary && (
                                                <div className="mt-5 rounded-2xl bg-[#F6FAF7] p-4">
                                                    <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                                                        Beneficiary
                                                    </p>

                                                    <p className="mt-1 text-sm leading-6 text-gray-700">
                                                        {
                                                            scheme.beneficiary
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-7 border-t border-gray-100 pt-5">
                                            <div className="flex items-center justify-between gap-4">
                                                {deadline ? (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <CalendarDays
                                                            size={15}
                                                            className="text-green-600"
                                                        />

                                                        <span>
                                                            Deadline:{" "}
                                                            <span className="font-semibold text-gray-700">
                                                                {
                                                                    deadline
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        No deadline
                                                    </span>
                                                )}

                                                <Link
                                                    to={`/schemes/${scheme.slug}`}
                                                    className="kr-hover-link inline-flex shrink-0 items-center gap-2 text-sm font-bold text-green-700"
                                                >
                                                    View Details
                                                    <ExternalLink
                                                        size={15}
                                                    />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="kr-hover-line mt-5 h-0.5 w-10 rounded-full bg-green-600" />
                                    </article>
                                )
                            })}
                        </div>
                    )}
            </div>
        </section>
    )
}

export default SchemeGrid