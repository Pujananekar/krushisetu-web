import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const FounderSection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#F6FAF7] px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            {/* Background Decoration */}

            <div className="relative z-10 mx-auto max-w-350">
                {/* Section Heading */}
                <div className="max-w-3xl">
                    <p className="text-sm font-bold tracking-widest text-green-700">
                        OUR FOUNDER
                    </p>

                    <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-5xl lg:text-6xl">
                        Meet the person behind{" "}
                        <span className="text-green-800">
                            Krushisetu
                        </span>
                    </h2>

                    <div className="mt-5 h-0.5 w-28 rounded-2xl bg-green-600" />
                </div>

                {/* Founder Card */}
                <div className="kr-hover-card group relative mt-12 overflow-hidden rounded-4xl border border-gray-200 bg-white/85 shadow-xl shadow-gray-900/10">
                    {/* Card Hover Glow */}

                    <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr]">
                        {/* Founder Image */}
                        <div className="group/image relative flex min-h-100 items-center justify-center overflow-hidden bg-[#EAF6EC] lg:min-h-130">
                            {/* Image Background Decoration */}
                            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-green-200/50  transition-transform duration-500 group-hover/image:scale-110" />

                            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-lime-100/70  transition-transform duration-500 group-hover/image:scale-110" />

                            {/* Founder Image */}
                            <img
                                className="relative z-10 h-64 w-64 rounded-full border-8 border-white object-cover object-center shadow-xl transition-transform duration-300 group-hover/image:scale-105 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                                src={`${import.meta.env.BASE_URL}images/about_women_pic.png`}
                                alt="Rachana Pandit Salunke"
                            />
                        </div>

                        {/* Founder Information */}
                        <div className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14 lg:py-14">
                            <p className="text-sm font-bold tracking-widest text-green-700">
                                FOUNDER & MANAGING DIRECTOR
                            </p>

                            <h3 className="mt-4 text-3xl font-bold leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
                                Rachana Pandit Salunke
                            </h3>

                            <div className="kr-hover-line mt-5 h-0.5 w-20 rounded-full bg-green-600" />

                            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                                Rachana Pandit Salunke is the Founder and
                                Managing Director of Krushisetu and serves as
                                the Secretary of Be The Change Foundation.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                                Her academic background in agriculture and
                                agribusiness management forms an important
                                foundation for Krushisetu's work in
                                agricultural development and farmer
                                empowerment.
                            </p>

                            {/* Qualifications */}
                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* B.Sc. Agriculture */}
                                <div className="kr-hover-card-soft rounded-3xl border border-gray-200 bg-gray-50 px-5 py-5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Qualification
                                    </p>

                                    <p className="mt-2 text-base font-bold text-green-900">
                                        B.Sc. Agriculture
                                    </p>

                                    <div className="kr-hover-line mt-3 h-1 w-8 rounded-full bg-green-600" />
                                </div>

                                {/* Agribusiness Management */}
                                <div className="kr-hover-card-soft rounded-3xl border border-gray-200 bg-gray-50 px-5 py-5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Post Graduation
                                    </p>

                                    <p className="mt-2 text-base font-bold text-green-900">
                                        Agribusiness Management
                                    </p>

                                    <div className="kr-hover-line mt-3 h-1 w-8 rounded-full bg-green-600" />
                                </div>
                            </div>

                            {/* Foundation Role */}
                            <div className="kr-hover-card-soft mt-4 rounded-3xl border border-green-100 bg-green-50 px-5 py-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                    Role in Foundation
                                </p>

                                <p className="mt-2 text-base font-bold text-gray-900">
                                    Secretary, Be The Change Foundation
                                </p>

                                <div className="kr-hover-line mt-3 h-1 w-8 rounded-full bg-green-600" />
                            </div>

                            {/* Founder Page CTA */}
                            <Link
                                to="/about/founder"
                                className="group/founder-button kr-hover-button mt-7 inline-flex w-fit items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-900 hover:shadow-xl hover:shadow-green-900/25"
                            >
                                Meet Our Founder

                                <ArrowRight
                                    size={18}
                                    strokeWidth={2}
                                    className="transition-transform duration-200 group-hover/founder-button:translate-x-1"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FounderSection