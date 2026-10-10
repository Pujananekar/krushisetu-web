import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { getSchemes } from "../../api/schemeApi.js"

import SchemesCTA from "../../components/schemes/SchemeCTA"
import SchemeGrid from "../../components/schemes/SchemeGrid"
import SchemeSearch from "../../components/schemes/SchemeSearch"
import SchemesHero from "../../components/schemes/SchemesHero"

const Schemes = () => {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [level, setLevel] = useState("All")
    const [status, setStatus] = useState("All")

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["schemes"],
        queryFn: getSchemes,
    })

    const schemes = data?.schemes ?? []

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(
                schemes
                    .map((scheme) => scheme?.category)
                    .filter(Boolean)
            ),
        ]
    }, [schemes])

    const filteredSchemes = useMemo(() => {
        const searchValue = search.trim().toLowerCase()

        return schemes.filter((scheme) => {
            const matchesSearch =
                !searchValue ||
                scheme?.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                scheme?.authority
                    ?.toLowerCase()
                    .includes(searchValue) ||
                scheme?.category
                    ?.toLowerCase()
                    .includes(searchValue) ||
                scheme?.beneficiary
                    ?.toLowerCase()
                    .includes(searchValue)

            const matchesCategory =
                category === "All" ||
                scheme?.category === category

            const matchesLevel =
                level === "All" ||
                scheme?.level === level

            const matchesStatus =
                status === "All" ||
                scheme?.status === status

            return (
                matchesSearch &&
                matchesCategory &&
                matchesLevel &&
                matchesStatus
            )
        })
    }, [
        schemes,
        search,
        category,
        level,
        status,
    ])

    const clearFilters = () => {
        setSearch("")
        setCategory("All")
        setLevel("All")
        setStatus("All")
    }

    const hasFilters =
        search.trim() !== "" ||
        category !== "All" ||
        level !== "All" ||
        status !== "All"

    return (
        <main className="min-h-screen bg-[#F6FAF7]">
            <SchemesHero />

            {/* Scheme Directory */}
            <section className="px-6 pb-4 pt-10 sm:px-8 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-350">
                    {/* Section Header */}
                    <div className="mb-8">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                            Available Information
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                            Government Scheme
                            <span className="text-green-800">
                                {" "}
                                Directory
                            </span>
                        </h2>

                        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
                            Explore government schemes with information about
                            eligibility, benefits, documents, application steps,
                            and official sources.
                        </p>
                    </div>

                    {/* Search + Filters */}
                    <div className="mt-8">
                        <SchemeSearch
                            search={search}
                            onSearchChange={setSearch}
                            category={category}
                            level={level}
                            status={status}
                            categories={categories}
                            onCategoryChange={setCategory}
                            onLevelChange={setLevel}
                            onStatusChange={setStatus}
                            onClear={clearFilters}
                        />
                    </div>
                </div>
            </section>

            {/* Scheme Results */}
            <SchemeGrid
                schemes={filteredSchemes}
                isLoading={isLoading}
                isError={isError}
                onRetry={refetch}
                hasFilters={hasFilters}
                onClearFilters={clearFilters}
            />

            <SchemesCTA />
        </main>
    )
}

export default Schemes