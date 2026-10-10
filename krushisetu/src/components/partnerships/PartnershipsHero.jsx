import { ArrowRight, Handshake } from "lucide-react"
import { Link } from "react-router-dom"

const PartnershipsHero = () => {
    return (
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-8 lg:px-12 xl:px-16">
            <div className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-green-100/60" />
            <div className="absolute right-0 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-100/50" />

            <div className="mx-auto max-w-350">
                <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="kr-hover-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                <Handshake size={25} strokeWidth={2} />
                            </div>

                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                Collaboration & Partnerships
                            </span>
                        </div>

                        <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                            Collaborating
                            <span className="block text-green-800">
                                for Greater Impact
                            </span>
                        </h1>

                        <div className="kr-hover-line mt-6 h-1 w-28 rounded-full bg-green-600" />

                        <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                            Krushisetu seeks to collaborate with institutions,
                            organisations, companies, academic bodies, and
                            development partners working towards agricultural
                            and rural development.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#partnerships"
                                className="group/partnerships-explore kr-hover-button flex items-center gap-3 rounded-2xl bg-green-700 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-800 hover:shadow-xl hover:shadow-green-900/20"
                            >
                                Explore Opportunities
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover/partnerships-explore:translate-x-1"
                                />
                            </a>

                            <Link
                                to="/apply/partnership"
                                className="group/partnerships-apply kr-hover-button flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 shadow-lg shadow-gray-900/5 hover:border-green-200 hover:text-green-800 hover:shadow-xl hover:shadow-green-900/10"
                            >
                                Partner With Us
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover/partnerships-apply:translate-x-1"
                                />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="kr-hover-card relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/85 p-8 shadow-2xl shadow-green-900/10 sm:p-10">

                            <div className="kr-hover-icon relative flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/20">
                                <Handshake size={30} strokeWidth={2} />
                            </div>

                            <h2 className="relative mt-7 text-3xl font-bold leading-tight text-gray-950">
                                Stronger together,
                                <span className="block text-green-800">
                                    greater possibilities.
                                </span>
                            </h2>

                            <p className="relative mt-5 text-base leading-7 text-gray-600">
                                Collaboration can connect farmers and rural
                                communities with knowledge, institutions,
                                technology, finance, markets, and development
                                opportunities.
                            </p>

                            <div className="relative mt-8 grid grid-cols-2 gap-3">
                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Knowledge
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Expertise & learning
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Institutions
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Networks & linkages
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Resources
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Technology & support
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-2xl bg-green-50 p-4">
                                    <p className="text-sm font-bold text-green-800">
                                        Impact
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Shared development
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

export default PartnershipsHero