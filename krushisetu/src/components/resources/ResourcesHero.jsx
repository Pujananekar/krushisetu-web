import { BookOpen, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const ResourcesHero = () => {
    return (
        <section className="relative overflow-hidden px-6 pt-32 pb-16 sm:px-8 lg:px-12 xl:px-16">
            <div className="absolute top-0 left-0 -z-10 h-96 w-96 rounded-full bg-green-100/60 blur-3xl" />
            <div className="absolute top-20 right-0 -z-10 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

            <div className="mx-auto max-w-350">
                <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="kr-hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <BookOpen size={25} strokeWidth={2} />
                            </div>

                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                Knowledge & Support
                            </span>
                        </div>

                        <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                            Resources for
                            <span className="block text-green-800">
                                Better Agriculture
                            </span>
                        </h1>

                        <div className="kr-hover-line mt-6 h-1 w-28 rounded-full bg-green-600" />

                        <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                            Access practical agricultural information,
                            government scheme awareness, training
                            opportunities, and farmer resources designed to
                            support informed decisions and sustainable rural
                            development.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/schemes"
                                className="kr-hover-button group/schemes flex items-center gap-3 rounded-2xl bg-green-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-800 hover:shadow-xl hover:shadow-green-900/20"
                            >
                                Explore Schemes
                                <ArrowRight size={18} className="transition-transform duration-200 group-hover/schemes:translate-x-1" />
                            </Link>

                            <Link
                                to="/training-events"
                                className="kr-hover-button group/training flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 shadow-lg shadow-gray-900/5 hover:border-green-200 hover:text-green-800 hover:shadow-xl hover:shadow-green-900/10"
                            >
                                View Training
                                <ArrowRight size={18} className="transition-transform duration-200 group-hover/training:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 rounded-[2.5rem] bg-green-100/40 blur-2xl" />

                        <div className="kr-hover-card relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/90 p-8 shadow-2xl shadow-green-900/10 sm:p-10">
                            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-green-100/50 blur-2xl" />

                            <div className="kr-hover-icon relative flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/20">
                                <BookOpen size={30} strokeWidth={2} />
                            </div>

                            <h2 className="relative mt-7 text-3xl font-bold leading-tight text-gray-950">
                                Practical knowledge,
                                <span className="block text-green-800">
                                    accessible support.
                                </span>
                            </h2>

                            <p className="relative mt-5 text-base leading-7 text-gray-600">
                                Explore information covering schemes,
                                training, crop and farming guidance, market
                                awareness, digital agriculture, climate-smart
                                agriculture, and more.
                            </p>

                            <div className="relative mt-8 grid grid-cols-2 gap-3">
                                <div className="kr-hover-card-soft rounded-2xl border border-transparent bg-green-50 p-4">
                                    <p className="kr-hover-title text-sm font-bold text-green-800">
                                        Schemes
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Awareness & assistance
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl border border-transparent bg-green-50 p-4">
                                    <p className="kr-hover-title text-sm font-bold text-green-800">
                                        Training
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Programs & events
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl border border-transparent bg-green-50 p-4">
                                    <p className="kr-hover-title text-sm font-bold text-green-800">
                                        Advisories
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Farming knowledge
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl border border-transparent bg-green-50 p-4">
                                    <p className="kr-hover-title text-sm font-bold text-green-800">
                                        Downloads
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Guides & documents
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResourcesHero