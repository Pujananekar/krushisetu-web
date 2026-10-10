import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Filter } from "lucide-react"
import TrainingHero from "../../components/training/TrainingHero"
import TrainingSearch from "../../components/training/TrainingSearch"
import TrainingFilters from "../../components/training/TrainingFilters"
import TrainingGrid from "../../components/training/TrainingGrid"
import TrainingCTA from "../../components/training/TrainingCTA"

import Loader from "../../components/common/Loader.jsx"
import { getTrainingEvents } from "../../api/trainingEventsApi.js"

const Training = () => {
    const [search, setSearch] = useState("")

    const [filters, setFilters] = useState({
        training_type: "",
        location: "",
        status: "",
    })

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["training-events"],
        queryFn: getTrainingEvents,
    })

    const trainingEvents =
        data?.trainingEvents ?? []

    const filteredTrainingEvents = useMemo(() => {
        const searchValue = search
            .trim()
            .toLowerCase()

        return trainingEvents.filter((event) => {
            const matchesSearch =
                !searchValue ||
                event?.title
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event?.description
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event?.training_type
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event?.location
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event?.venue
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event?.trainer
                    ?.toLowerCase()
                    .includes(searchValue) ||
                event?.organiser
                    ?.toLowerCase()
                    .includes(searchValue)

            const matchesTrainingType =
                !filters.training_type ||
                event?.training_type ===
                filters.training_type

            const matchesLocation =
                !filters.location ||
                event?.location ===
                filters.location

            const matchesStatus =
                !filters.status ||
                event?.status ===
                filters.status

            return (
                matchesSearch &&
                matchesTrainingType &&
                matchesLocation &&
                matchesStatus
            )
        })
    }, [
        trainingEvents,
        search,
        filters,
    ])

    const handleFilterChange = (
        field,
        value
    ) => {
        setFilters((previous) => ({
            ...previous,
            [field]: value,
        }))
    }

    const clearFilters = () => {
        setSearch("")

        setFilters({
            training_type: "",
            location: "",
            status: "",
        })
    }

    const hasFilters =
        search.trim() !== "" ||
        filters.training_type !== "" ||
        filters.location !== "" ||
        filters.status !== ""

    return (
        <main className="min-h-screen bg-[#F6FAF7]">
            <TrainingHero />

            {isLoading ? (
                <Loader
                    variant="section"
                    text="Loading training & events..."
                />
            ) : isError ? (
                <section className="px-6 py-16 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-350 rounded-3xl border border-red-100 bg-white p-8 text-center shadow-lg shadow-gray-900/5">
                        <h2 className="text-xl font-bold text-gray-900">
                            Unable to load training & events
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Something went wrong while loading
                            the training information.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-5 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            Try Again
                        </button>
                    </div>
                </section>
            ) : (
                <>
                    {/* Training Directory */}
                    <section className="px-6 pt-10 sm:px-8 lg:px-12 xl:px-16">
                        {/* Heading */}
                        <div className="mb-8">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                Available Programs
                            </p>

                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                                Training & Event
                                <span className="text-green-800">
                                    {" "}
                                    Directory
                                </span>
                            </h2>

                            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
                                Explore training programs, workshops,
                                orientations and other events available
                                through Krushisetu.
                            </p>
                        </div>
                    </section>

                    {/* Compact Search + Filters */}
                    <section className="px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
                        <div className="mx-auto max-w-350">
                            <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white/90 p-3 shadow-xl shadow-gray-900/10 lg:flex-row lg:items-center">
                                {/* Search */}
                                <TrainingSearch
                                    search={search}
                                    onSearchChange={setSearch}
                                />

                                {/* Filter Label */}
                                <div className="hidden shrink-0 items-center gap-2 px-2 text-green-700 lg:flex">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
                                        <Filter />
                                    </span>

                                    <span className="text-sm font-semibold">
                                        Filters
                                    </span>
                                </div>

                                {/* Filters */}
                                <TrainingFilters
                                    trainingEvents={
                                        trainingEvents
                                    }
                                    filters={filters}
                                    onFilterChange={
                                        handleFilterChange
                                    }
                                    onClear={
                                        clearFilters
                                    }
                                    hasFilters={
                                        hasFilters
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* Results */}
                    <TrainingGrid
                        trainingEvents={
                            filteredTrainingEvents
                        }
                    />
                </>
            )}

            <TrainingCTA />
        </main>
    )
}

export default Training