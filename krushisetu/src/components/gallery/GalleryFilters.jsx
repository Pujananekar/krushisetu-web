import { Search } from "lucide-react"
import { useEffect, useState } from "react"

const filters = [
    "All",
    "Photos",
    "Videos",
    "Featured",
]

const GalleryFilters = ({
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
}) => {
    const [searchValue, setSearchValue] =
        useState(search || "")

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchValue)
        }, 400)

        return () => clearTimeout(timer)
    }, [searchValue, setSearch])

    return (
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center">

            <div className="flex flex-1 flex-wrap items-center gap-1.5 rounded-2xl border border-green-100 bg-green-50/70 p-1.5 shadow-sm">

                {filters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() =>
                            setActiveFilter(filter)
                        }
                        className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                            activeFilter === filter
                                ? "bg-green-700 text-white shadow-md shadow-green-900/10"
                                : "text-gray-600 hover:bg-white hover:text-green-800"
                        }`}
                    >
                        {filter}
                    </button>
                ))}

            </div>

            <div className="flex h-13 w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 shadow-sm transition-all duration-200 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100 xl:w-60 2xl:w-72">

                <Search
                    size={19}
                    className="shrink-0 text-gray-400"
                />

                <input
                    type="text"
                    value={searchValue}
                    onChange={(event) =>
                        setSearchValue(
                            event.target.value
                        )
                    }
                    placeholder="Search gallery..."
                    className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

            </div>

        </div>
    )
}

export default GalleryFilters