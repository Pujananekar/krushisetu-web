import { Eye, Handshake } from "lucide-react"

const VisionMissionSection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#F6FAF7] px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-green-100/50 " />
            <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-lime-100/40 " />

            <div className="relative z-10 mx-auto max-w-350">
                {/* Heading */}
                <div className="max-w-4xl">
                    <p className="text-sm font-bold tracking-widest text-green-700">
                        OUR DIRECTION
                    </p>

                    <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-5xl lg:text-6xl">
                        Vision &{" "}
                        <span className="text-green-800">
                            Mission
                        </span>
                    </h2>

                    <div className="mt-5 h-0.5 w-28 rounded-2xl bg-green-600" />

                    <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                        Our vision and mission guide Krushisetu in building
                        practical, inclusive and sustainable opportunities for
                        farmers and rural communities.
                    </p>
                </div>

                {/* Vision & Mission Cards */}
                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* Vision */}
                    <div className="kr-hover-card group relative overflow-hidden rounded-4xl border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10 sm:p-9 lg:p-10">
                        {/* Hover Background */}
                        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-100/0  transition-colors duration-300 group-hover:bg-green-100/70" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="kr-hover-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                                    <Eye
                                        size={27}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-bold tracking-widest text-green-700">
                                        OUR VISION
                                    </p>

                                    <h3 className="kr-hover-title mt-1 text-2xl font-bold text-gray-950 sm:text-3xl">
                                        A stronger rural future
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-7 h-px w-full bg-gray-200" />

                            <p className="mt-7 text-base leading-8 text-gray-600 sm:text-lg">
                                To empower farmers through knowledge,
                                technology, market access, and
                                government-scheme awareness while building
                                resilient, prosperous, and sustainable rural
                                communities.
                            </p>

                            <div className="kr-hover-line mt-8 h-1 w-12 rounded-full bg-green-600" />
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="kr-hover-card group relative overflow-hidden rounded-4xl border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10 sm:p-9 lg:p-10">
                        {/* Hover Background */}
                        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-100/0  transition-colors duration-300 group-hover:bg-green-100/70" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="kr-hover-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                                    <Handshake
                                        size={27}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-bold tracking-widest text-green-700">
                                        OUR MISSION
                                    </p>

                                    <h3 className="kr-hover-title mt-1 text-2xl font-bold text-gray-950 sm:text-3xl">
                                        Connecting farmers to opportunity
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-7 h-px w-full bg-gray-200" />

                            <p className="mt-7 text-base leading-8 text-gray-600 sm:text-lg">
                                To serve as a trusted bridge between farmers
                                and the resources required for agricultural
                                progress by delivering practical advisory
                                support, quality training, institutional
                                linkages, entrepreneurship guidance, digital
                                solutions, and inclusive rural development
                                programs.
                            </p>

                            <div className="kr-hover-line mt-8 h-1 w-12 rounded-full bg-green-600" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VisionMissionSection