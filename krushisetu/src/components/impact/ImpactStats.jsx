import { useQuery } from "@tanstack/react-query"
import {
    BarChart3,
    Map,
    Target,
    Users,
} from "lucide-react"
import axiosInstance from "../../api/axiosInstance.js"



const ImpactStats = () => {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["public-impact"],
        queryFn: async () => {
            const response = await axiosInstance.get(
                "/impact"
            )

            return response.data
        },
    })

    const indicators = Array.isArray(
        data?.impactIndicators
    )
        ? data.impactIndicators
        : []

    const peopleUnits = new Set([
        "farmer",
        "farmers",
        "participant",
        "participants",
        "people",
        "person",
        "persons",
        "beneficiary",
        "beneficiaries",
        "household",
        "households",
    ])

    const peopleReached = indicators
        .filter((indicator) =>
            peopleUnits.has(
                String(indicator.unit || "")
                    .trim()
                    .toLowerCase()
            )
        )
        .reduce(
            (total, indicator) =>
                total + Number(indicator.value || 0),
            0
        )

    const locationsCovered = new Set(
        indicators
            .map((indicator) =>
                String(indicator.location || "").trim()
            )
            .filter(Boolean)
    ).size

    const initiatives = new Set(
        indicators
            .map((indicator) => indicator.project_id)
            .filter(
                (projectId) =>
                    projectId !== null &&
                    projectId !== undefined
            )
    ).size

    const documentedOutcomes = indicators.length

    const formatNumber = (value) => {
        if (!Number.isFinite(value)) {
            return "—"
        }

        return new Intl.NumberFormat("en-IN").format(
            value
        )
    }

    const stats = [
        {
            icon: Users,
            value:
                indicators.length > 0
                    ? formatNumber(peopleReached)
                    : "—",
            label: "People Reached",
        },
        {
            icon: Map,
            value:
                indicators.length > 0
                    ? formatNumber(locationsCovered)
                    : "—",
            label: "Locations Covered",
        },
        {
            icon: Target,
            value:
                indicators.length > 0
                    ? formatNumber(initiatives)
                    : "—",
            label: "Initiatives",
        },
        {
            icon: BarChart3,
            value:
                indicators.length > 0
                    ? formatNumber(documentedOutcomes)
                    : "—",
            label: "Documented Outcomes",
        },
    ]

    const getDescription = () => {
        if (isLoading) {
            return "Loading approved impact indicators..."
        }

        if (isError) {
            return "Impact information is temporarily unavailable."
        }

        if (indicators.length === 0) {
            return "Verified impact indicators will appear here after approved records are published."
        }

        return "Showing verified impact indicators published from approved records."
    }

    return (
        <section className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">

                {/* Heading */}
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Impact Dashboard
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                        Measuring what
                        <span className="text-green-800">
                            {" "}
                            matters.
                        </span>
                    </h2>

                    <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
                        {getDescription()}
                    </p>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon

                            return (
                                <div
                                    key={stat.label}
                                    className="animate-pulse rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-xl shadow-gray-900/10"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                                        <Icon
                                            size={23}
                                            strokeWidth={2}
                                            className="text-gray-300"
                                        />
                                    </div>

                                    <div className="mt-6 h-9 w-20 rounded-lg bg-gray-200" />

                                    <div className="mt-3 h-4 w-32 rounded bg-gray-200" />

                                    <div className="mt-3 h-3 w-40 rounded bg-gray-100" />
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Error */}
                {!isLoading && isError && (
                    <div className="rounded-3xl border border-gray-200 bg-white/85 p-8 text-center shadow-xl shadow-gray-900/10">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <BarChart3
                                size={23}
                                strokeWidth={2}
                            />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-gray-900">
                            Impact data unavailable
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            We could not load the approved impact
                            records right now. Please try again later.
                        </p>
                    </div>
                )}

                {/* Empty */}
                {!isLoading &&
                    !isError &&
                    indicators.length === 0 && (
                        <div className="rounded-3xl border border-gray-200 bg-white/85 p-8 text-center shadow-xl shadow-gray-900/10">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                <BarChart3
                                    size={23}
                                    strokeWidth={2}
                                />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-gray-900">
                                Verified impact records coming soon
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                Impact figures will be published here
                                after the relevant records have been
                                reviewed and approved.
                            </p>
                        </div>
                    )}

                {/* Data */}
                {!isLoading &&
                    !isError &&
                    indicators.length > 0 && (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => {
                                const Icon = stat.icon

                                return (
                                    <div
                                        key={stat.label}
                                        className="kr-hover-card group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-xl shadow-gray-900/10"
                                    >
                                        <div className="relative kr-hover-icon flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
                                            <Icon
                                                size={23}
                                                strokeWidth={2}
                                            />
                                        </div>

                                        <p className="relative mt-6 text-3xl font-extrabold text-gray-950">
                                            {stat.value}
                                        </p>

                                        <h3 className="relative mt-2 text-sm font-bold text-gray-900">
                                            {stat.label}
                                        </h3>

                                        <p className="relative mt-2 text-xs leading-5 text-gray-500">
                                            Verified impact data
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

            </div>
        </section>
    )
}

export default ImpactStats