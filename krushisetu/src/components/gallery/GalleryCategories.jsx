import {
    Folder,
    GraduationCap,
    Leaf,
    MapPin,
    Users,
    Grid2X2,
} from "lucide-react"

const categories = [
    {
        title: "Departments",
        description: "Activities and initiatives across departments",
        icon: Leaf,
        iconClass: "bg-green-100 text-green-700",
    },
    {
        title: "Projects",
        description: "Project implementation and field activities",
        icon: Folder,
        iconClass: "bg-amber-100 text-amber-600",
    },
    {
        title: "Training Programs",
        description: "Workshops, trainings and capacity building",
        icon: GraduationCap,
        iconClass: "bg-blue-100 text-blue-600",
    },
    {
        title: "Events",
        description: "Seminars, meetings and special events",
        icon: Users,
        iconClass: "bg-red-100 text-red-500",
    },
    {
        title: "Locations",
        description: "Activities across regions and districts",
        icon: MapPin,
        iconClass: "bg-purple-100 text-purple-600",
    },
]

const GalleryCategories = () => {
    return (
        <section
            id="gallery-categories"
            className="bg-[#F6FAF7] py-16 lg:py-20"
        >
            <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-12">

                <div className="mb-9">

                    <div className="mb-4 flex items-center gap-3">

                        <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                            <Grid2X2
                                size={21}
                                strokeWidth={2}
                            />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-800">
                            Gallery Categories
                        </span>

                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                        Browse by{" "}
                        <span className="text-green-700">
                            category.
                        </span>
                    </h2>

                    <p className="mt-3 max-w-3xl text-base leading-7 text-gray-500 sm:text-lg">
                        Explore photo and video collections organised
                        by key areas of Krushisetu&apos;s work.
                    </p>

                </div>


                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                    {categories.map((category) => {

                        const Icon = category.icon

                        return (
                            <div
                                key={category.title}
                                className="kr-hover-card rounded-3xl border border-gray-200/80 bg-white p-6 text-center shadow-sm"
                            >

                                <div
                                    className={`kr-hover-icon mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${category.iconClass}`}
                                >
                                    <Icon
                                        size={27}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <h3 className="kr-hover-title mt-5 text-base font-extrabold text-gray-900">
                                    {category.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
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

export default GalleryCategories