import { BriefcaseBusiness, Leaf, Users, Wheat } from "lucide-react"

const categories = [
    {
        icon: Wheat,
        title: "Farmer Stories",
        description:
            "Experiences related to agricultural knowledge, advisory support, and improved farming practices.",
    },
    {
        icon: Users,
        title: "Community Stories",
        description:
            "Stories highlighting collective initiatives and inclusive rural development.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Enterprise Stories",
        description:
            "Experiences connected with agribusiness, value addition, entrepreneurship, and livelihoods.",
    },
    {
        icon: Leaf,
        title: "Sustainability Stories",
        description:
            "Stories demonstrating practical approaches to sustainable and resilient agriculture.",
    },
]

const SuccessStoryCategories = () => {
    return (
        <section className="px-6 py-16 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Story Categories
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
                        Stories from
                        <span className="text-green-800"> the field.</span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Stories will be organised around the areas where
                        Krushisetu works with farmers, communities,
                        entrepreneurs, and development partners.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => {
                        const Icon = category.icon

                        return (
                            <div
                                key={category.title}
                                className="kr-hover-card relative overflow-hidden rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-lg shadow-gray-900/10"
                            >
                                <div className="kr-hover-icon relative flex h-13 w-13 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Icon size={25} strokeWidth={2} />
                                </div>

                                <h3 className="kr-hover-title relative mt-6 text-lg font-bold text-gray-950">
                                    {category.title}
                                </h3>

                                <div className="kr-hover-line mt-3 h-1 w-9 rounded-full bg-green-600" />

                                <p className="mt-4 text-sm leading-6 text-gray-600">
                                    {category.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SuccessStoryCategories