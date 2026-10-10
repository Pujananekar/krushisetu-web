import { Search } from "lucide-react"

const TrainingSearch = ({
    search = "",
    onSearchChange,
}) => {
    return (
        <div className="min-w-0 flex-1">
            <div className="relative">
                <Search
                    size={19}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(
                            event.target.value
                        )
                    }
                    placeholder="Search training or events..."
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 hover:border-green-200 focus:border-green-300 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
            </div>
        </div>
    )
}

export default TrainingSearch