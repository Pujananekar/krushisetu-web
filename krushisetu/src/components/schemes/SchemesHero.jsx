import { ArrowRight, FileText } from "lucide-react"
import { Link } from "react-router-dom"

const SchemesHero = () => {
    return (
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-8 lg:px-12 xl:px-16">
            <div className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-green-100/60" />
            <div className="absolute right-0 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-100/50" />

            <div className="mx-auto max-w-350">
                <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="kr-hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <FileText size={25} strokeWidth={2} />
                            </div>

                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                Government Support
                            </span>
                        </div>

                        <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                            Government
                            <span className="block text-green-800">
                                Schemes
                            </span>
                        </h1>

                        <div className="kr-hover-line mt-6 h-1 w-28 rounded-full bg-green-600" />

                        <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                            Discover information about agricultural and rural
                            development schemes, eligibility, benefits,
                            application processes, and official sources.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            
                            <Link
                                to="/contact"
                                className="group/schemes-assistance kr-hover-button flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 shadow-lg shadow-gray-900/5 hover:border-green-200 hover:text-green-800 hover:shadow-xl hover:shadow-green-900/10"
                            >
                                Need Assistance
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover/schemes-assistance:translate-x-1"
                                />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="kr-hover-card relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/90 p-8 shadow-2xl shadow-green-900/10 sm:p-10">

                            <div className="kr-hover-icon relative flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/20">
                                <FileText size={30} strokeWidth={2} />
                            </div>

                            <h2 className="relative mt-7 text-3xl font-bold leading-tight text-gray-950">
                                Information,
                                <span className="block text-green-800">
                                    made accessible.
                                </span>
                            </h2>

                            <p className="relative mt-5 text-base leading-7 text-gray-600">
                                Krushisetu aims to make government scheme
                                information easier to understand and navigate
                                while directing users towards official sources.
                            </p>

                            <div className="relative mt-8 grid grid-cols-2 gap-3">
                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Eligibility
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Understand requirements
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Benefits
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Know available support
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Documents
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Prepare requirements
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Application
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Follow official process
                                    </p>
                                </div>
                            </div>

                            <p className="relative mt-6 text-xs leading-5 text-gray-500">
                                Krushisetu is a facilitation and awareness
                                initiative and is not an official government
                                portal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SchemesHero