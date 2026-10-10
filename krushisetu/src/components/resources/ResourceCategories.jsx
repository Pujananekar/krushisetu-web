import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    FileText,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../../api/axiosInstance.js"



const resources = [
    {
        icon: FileText,
        title: "Government Schemes",
        description:
            "Explore verified information about government schemes, eligibility, benefits, documents, application processes, and official sources.",
        points: [
            "Scheme awareness",
            "Eligibility guidance",
            "Document support",
            "Application assistance",
        ],
        path: "/schemes",
        action: "Explore Schemes",
    },
    {
        icon: CalendarDays,
        title: "Training & Events",
        description:
            "Discover upcoming and completed training programs, workshops, camps, demonstrations, and agricultural learning opportunities.",
        points: [
            "Upcoming programs",
            "Training calendar",
            "Workshops & camps",
            "Registration",
        ],
        path: "/training-events",
        action: "View Training",
    },
]

const ResourceCategories = () => {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["public-resources"],
        queryFn: async () => {
            const response = await axiosInstance.get("/resources")
            return response.data
        },
    })

    const dbResources = Array.isArray(data?.resources)
        ? data.resources
        : []

    return (
        <section className="px-6 py-16 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Explore Resources
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
                        Find the support
                        <span className="text-green-800">
                            {" "}you need.
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Krushisetu brings together practical information and
                        support pathways for farmers, rural communities,
                        entrepreneurs, institutions, and other stakeholders.
                    </p>
                </div>

                {/* Existing resource categories */}
                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    {resources.map((resource) => {
                        const Icon = resource.icon

                        return (
                            <Link
                                key={resource.path}
                                to={resource.path}
                                className="kr-hover-card group relative overflow-hidden rounded-4xl border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10 sm:p-8"
                            >
                                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-green-100/40 " />

                                <div className="relative">
                                    <div className="kr-hover-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Icon
                                            size={27}
                                            strokeWidth={2}
                                        />
                                    </div>
                                </div>

                                <h3 className="kr-hover-title relative mt-7 text-2xl font-bold text-gray-950">
                                    {resource.title}
                                </h3>

                                <div className="kr-hover-line mt-4 h-1 w-12 rounded-full bg-green-600" />

                                <p className="mt-5 text-base leading-7 text-gray-600">
                                    {resource.description}
                                </p>

                                <div className="mt-7 space-y-3">
                                    {resource.points.map((point) => (
                                        <div
                                            key={point}
                                            className="flex items-center gap-3 text-sm font-medium text-gray-700"
                                        >
                                            <span className="h-2 w-2 shrink-0 rounded-full bg-green-600 transition-transform duration-200 group-hover:scale-110" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-green-700">
                                    <span>{resource.action}</span>

                                    <ArrowRight
                                        size={17}
                                        className="kr-hover-arrow"
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Database resources */}
                <div className="mt-24">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                            Farmer Resource Library
                        </p>

                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                            Practical knowledge for better farming
                        </h2>

                        <p className="mt-4 text-base leading-7 text-gray-600">
                            Browse agricultural guides, articles, FAQs,
                            videos, documents, and other useful resources
                            available through Krushisetu.
                        </p>
                    </div>

                    {isLoading && (
                        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                            <p className="text-sm font-medium text-gray-600">
                                Loading resources...
                            </p>
                        </div>
                    )}

                    {isError && (
                        <div className="mt-10 rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
                            <p className="font-semibold text-red-700">
                                Unable to load resources.
                            </p>

                            <p className="mt-2 text-sm text-red-600">
                                Please try again later.
                            </p>
                        </div>
                    )}

                    {!isLoading &&
                        !isError &&
                        dbResources.length === 0 && (
                            <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                                <BookOpen
                                    size={40}
                                    className="mx-auto text-green-700"
                                />

                                <h3 className="mt-4 text-xl font-bold text-gray-950">
                                    No resources available
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    Resources will appear here once they are
                                    published.
                                </p>
                            </div>
                        )}

                    {!isLoading &&
                        !isError &&
                        dbResources.length > 0 && (
                            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {dbResources.map((resource) => (
                                    <Link
                                        key={resource.id}
                                        to={`/resources/${resource.slug}`}
                                        className="kr-hover-card group rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                <FileText
                                                    size={23}
                                                    strokeWidth={2}
                                                />
                                            </div>

                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700">
                                                {resource.resource_type}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold text-gray-950">
                                            {resource.title}
                                        </h3>

                                        {resource.category && (
                                            <p className="mt-2 text-sm font-semibold text-green-700">
                                                {resource.category}
                                            </p>
                                        )}

                                        {resource.body && (
                                            <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                                                {resource.body}
                                            </p>
                                        )}

                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-green-700">
                                            <span>
                                                View Resource
                                            </span>

                                            <ArrowRight
                                                size={17}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </section>
    )
}

export default ResourceCategories