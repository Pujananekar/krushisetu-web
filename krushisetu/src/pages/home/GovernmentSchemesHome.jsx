import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
    Sprout,
    ShieldCheck,
    CreditCard,
    Sun,
    Droplets,
    Warehouse,
    UsersRound,
    Tractor,
    Beef,
    ClipboardList,
    ArrowRight,
} from "lucide-react"

import { getSchemes } from "../../api/schemeApi.js"

const getSchemeIcon = (scheme) => {
    const category =
        scheme?.category?.toLowerCase() || ""

    const name =
        scheme?.name?.toLowerCase() || ""

    if (
        category.includes("insurance") ||
        name.includes("bima") ||
        name.includes("insurance")
    ) {
        return ShieldCheck
    }

    if (
        category.includes("soil") ||
        name.includes("soil")
    ) {
        return CreditCard
    }

    if (
        category.includes("solar") ||
        name.includes("kusum") ||
        name.includes("solar")
    ) {
        return Sun
    }

    if (
        category.includes("irrigation") ||
        category.includes("water") ||
        name.includes("irrigation") ||
        name.includes("per drop")
    ) {
        return Droplets
    }

    if (
        category.includes("infrastructure") ||
        name.includes("infrastructure")
    ) {
        return Warehouse
    }

    if (
        category.includes("fpo") ||
        category.includes("producer") ||
        name.includes("fpo") ||
        name.includes("producer organisation") ||
        name.includes("producer organization")
    ) {
        return UsersRound
    }

    if (
        category.includes("marketing") ||
        category.includes("market") ||
        name.includes("e-nam") ||
        name.includes("market")
    ) {
        return Tractor
    }

    if (
        category.includes("livestock") ||
        category.includes("dairy") ||
        name.includes("livestock") ||
        name.includes("dairy")
    ) {
        return Beef
    }

    if (
        category.includes("credit") ||
        category.includes("loan") ||
        category.includes("income") ||
        name.includes("credit") ||
        name.includes("interest") ||
        name.includes("kisan samman")
    ) {
        return ClipboardList
    }

    return Sprout
}

const getStatusLabel = (status) => {
    switch (status) {
        case "ACTIVE":
            return "Active"

        case "UPCOMING":
            return "Upcoming"

        case "CLOSED":
            return "Closed"

        case "INACTIVE":
            return "Inactive"

        default:
            return status || "Available"
    }
}

const getStatusClasses = (status) => {
    switch (status) {
        case "ACTIVE":
            return "border-green-200 bg-green-50 text-green-700"

        case "UPCOMING":
            return "border-blue-200 bg-blue-50 text-blue-700"

        case "CLOSED":
            return "border-red-200 bg-red-50 text-red-700"

        case "INACTIVE":
            return "border-gray-200 bg-gray-100 text-gray-600"

        default:
            return "border-gray-200 bg-gray-50 text-gray-600"
    }
}

const getLevelLabel = (level) => {
    switch (level) {
        case "CENTRAL":
            return "Central"

        case "STATE":
            return "State"

        default:
            return level || "Government"
    }
}

const GovernmentSchemesHome = () => {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["government-schemes-home"],
        queryFn: getSchemes,
    })

    const schemes = data?.schemes ?? []

    const displayedSchemes = schemes.slice(0, 4)

    return (
        <section
            id="government-schemes"
            className="relative min-h-screen w-full overflow-hidden"
        >
            <img
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt="Government schemes background"
            />

            <div className="relative z-10 mx-auto mt-10 w-full max-w-350 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
                {/* Section Header */}
                <div className="mx-auto max-w-4xl text-center">
                    <h3 className="flex items-center justify-center gap-3 text-sm font-bold tracking-widest text-green-700 sm:text-base">
                        <span>‹</span>
                        GOVERNMENT SCHEMES
                        <span>›</span>
                    </h3>

                    <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-gray-950 sm:text-5xl lg:text-6xl xl:text-7xl">
                        Schemes for Farmers,
                        <br />
                        Support for{" "}
                        <span className="text-green-800">
                            Growth
                        </span>
                    </h1>

                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className="h-0.5 w-12 rounded-full bg-green-600" />

                        <Sprout
                            className="text-green-700"
                            size={22}
                            strokeWidth={2}
                        />

                        <div className="h-0.5 w-12 rounded-full bg-green-600" />
                    </div>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
                        Explore government schemes and benefits
                        designed to strengthen agriculture,
                        empower farmers and build a prosperous
                        future.
                    </p>
                </div>

                {/* Scheme Cards */}
                {isLoading ? (
                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="min-h-75 animate-pulse rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-lg shadow-gray-900/10"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="h-14 w-14 rounded-2xl bg-gray-200" />

                                        <div className="h-7 w-16 rounded-full bg-gray-200" />
                                    </div>

                                    <div className="mt-6 h-6 w-4/5 rounded bg-gray-200" />

                                    <div className="mt-4 flex gap-2">
                                        <div className="h-6 w-20 rounded-full bg-gray-200" />
                                        <div className="h-6 w-24 rounded-full bg-gray-200" />
                                    </div>

                                    <div className="mt-5 space-y-2">
                                        <div className="h-3 w-full rounded bg-gray-200" />
                                        <div className="h-3 w-full rounded bg-gray-200" />
                                        <div className="h-3 w-3/4 rounded bg-gray-200" />
                                    </div>

                                    <div className="mt-6 h-4 w-28 rounded bg-gray-200" />
                                </div>
                            )
                        )}
                    </div>
                ) : isError ? (
                    <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-red-100 bg-white/80 px-6 py-10 text-center shadow-lg shadow-gray-900/10">
                        <h2 className="text-xl font-bold text-gray-950">
                            Unable to load government schemes
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Please visit the Government Schemes
                            directory to view the latest available
                            information.
                        </p>

                        <Link
                            to="/schemes"
                            className="mt-6 inline-flex items-center gap-2 rounded-[17px] bg-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
                        >
                            View All Schemes
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : displayedSchemes.length > 0 ? (
                    <>
                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {displayedSchemes.map(
                                (scheme) => {
                                    const Icon =
                                        getSchemeIcon(
                                            scheme
                                        )

                                    return (
                                        <Link
                                            key={
                                                scheme.id ||
                                                scheme.slug
                                            }
                                            to={`/schemes/${scheme.slug}`}
                                            className="group flex min-h-80 flex-col rounded-3xl border border-gray-200 bg-white/90 p-6 text-left shadow-lg shadow-gray-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/10 focus:outline-none focus:ring-4 focus:ring-green-100"
                                        >
                                            {/* Top Row */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="kr-hover-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-800 transition-transform duration-300 group-hover:scale-105">
                                                    <Icon
                                                        size={28}
                                                        strokeWidth={
                                                            1.9
                                                        }
                                                    />
                                                </div>

                                                <span
                                                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                                        scheme.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(
                                                        scheme.status
                                                    )}
                                                </span>
                                            </div>

                                            {/* Scheme Name */}
                                            <h3 className="mt-6 line-clamp-2 min-h-14 text-lg font-bold leading-7 text-gray-950 transition-colors duration-300 group-hover:text-green-800 sm:text-xl">
                                                {
                                                    scheme.name
                                                }
                                            </h3>

                                            {/* Metadata */}
                                            <div className="mt-4 flex min-h-7 flex-wrap gap-2">
                                                {scheme.level && (
                                                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                        {getLevelLabel(
                                                            scheme.level
                                                        )}
                                                    </span>
                                                )}

                                                {scheme.category && (
                                                    <span className="max-w-full truncate rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                        {
                                                            scheme.category
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            {/* Divider */}
                                            <div className="mt-5 h-px w-full bg-gray-100 transition-colors duration-300 group-hover:bg-green-100" />

                                            {/* Overview */}
                                            <p className="mt-5 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">
                                                {
                                                    scheme.overview
                                                }
                                            </p>

                                            {/* CTA */}
                                            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                                <span className="text-sm font-semibold text-green-700">
                                                    View Scheme
                                                </span>

                                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
                                                    <ArrowRight
                                                        size={16}
                                                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                                                    />
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                }
                            )}
                        </div>

                    </>
                ) : (
                    <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-gray-200 bg-white/80 px-6 py-10 text-center shadow-lg shadow-gray-900/10">
                        <Sprout
                            className="mx-auto text-green-700"
                            size={42}
                            strokeWidth={1.8}
                        />

                        <h2 className="mt-4 text-xl font-bold text-gray-950">
                            Government schemes will be
                            available here soon.
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Explore the complete Government
                            Schemes directory for available
                            information.
                        </p>

                        <Link
                            to="/schemes"
                            className="mt-6 inline-flex items-center gap-2 rounded-[17px] bg-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
                        >
                            Explore Schemes
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="kr-hover-card-soft mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-[26px] border border-gray-200 bg-white/70 px-7 py-7 shadow-lg shadow-gray-900/5 sm:px-10 md:flex-row">
                    <div className="flex items-center gap-5 text-center md:text-left">
                        <div className="kr-hover-icon hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700 sm:flex">
                            <Sprout
                                size={34}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">
                                Get the benefits you
                                deserve.
                            </h2>

                            <p className="mt-1 text-sm text-gray-600 sm:text-base">
                                Explore eligibility,
                                benefits and application
                                information for government
                                schemes.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/schemes"
                        className="kr-hover-button flex shrink-0 cursor-pointer items-center gap-3 rounded-[17px] bg-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
                    >
                        Explore All Schemes

                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GovernmentSchemesHome