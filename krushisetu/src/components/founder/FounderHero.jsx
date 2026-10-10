import { ArrowLeft, UserRound } from "lucide-react"
import { Link } from "react-router-dom"

const FounderHero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#F6FAF7] px-6 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
            {/* Background Decoration */}
            <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-green-100/50 " />
            <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-lime-100/40 " />

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-350">
                {/* Back Button */}
                <Link
                    to="/about"
                    className="group/back kr-hover-button mt-7 inline-flex items-center gap-2 rounded-2xl border border-green-100 bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/20 hover:border-green-700 hover:bg-green-900 hover:shadow-xl hover:shadow-green-900/25"
                >
                    <ArrowLeft
                        size={22}
                        strokeWidth={1.5}
                        className="transition-transform duration-200 group-hover/back:-translate-x-1"
                    />

                    Back to About
                </Link>

                {/* Hero Content */}
                <div className="mt-12 max-w-4xl">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-3 text-green-700">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100">
                            <UserRound
                                size={18}
                                strokeWidth={2}
                            />
                        </div>

                        <p className="text-sm font-bold tracking-widest">
                            FOUNDER PROFILE
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-6 text-5xl font-bold leading-[1.02] tracking-wide text-gray-950 sm:text-6xl lg:text-7xl">
                        Meet the person behind{" "}
                        <span className="text-green-800">
                            Krushisetu
                        </span>
                    </h1>

                    {/* Accent */}
                    <div className="mt-6 h-0.5 w-28 rounded-2xl bg-green-600" />

                    {/* Description */}
                    <p className="mt-7 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg lg:text-xl">
                        Learn about the founder, her academic background,
                        leadership role, and the agricultural and rural
                        development focus behind Krushisetu.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default FounderHero