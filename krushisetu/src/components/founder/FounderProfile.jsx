import {
    GraduationCap,
    Building2,
    Sprout,
} from "lucide-react"

const FounderProfile = () => {
    return (
        <section className="relative w-full overflow-hidden bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
            <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-green-100/40 " />
            <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-lime-100/40 " />

            <div className="relative z-10 mx-auto max-w-350">
                {/* Founder Card */}
                <div className="kr-hover-card group relative overflow-hidden rounded-4xl border border-gray-200 bg-white/85 shadow-xl shadow-gray-900/10">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr]">
                        {/* Founder Image */}
                        <div className="group/image relative flex min-h-100 items-center justify-center overflow-hidden bg-[#EAF6EC] lg:min-h-130">
                            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-green-200/50 " />

                            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-lime-100/70 " />

                            <img
                                className="relative z-10 h-64 w-64 rounded-full border-8 border-white object-cover object-center shadow-xl transition-transform duration-300 group-hover/image:scale-105 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                                src={`${import.meta.env.BASE_URL}images/about_women_pic.png`}
                                alt="Rachana Pandit Salunke"
                            />
                        </div>

                        {/* Founder Information */}
                        <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14 lg:py-14">
                            <p className="text-sm font-bold tracking-widest text-green-700">
                                FOUNDER & MANAGING DIRECTOR
                            </p>

                            <h2 className="mt-4 text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
                                Rachana Pandit Salunke
                            </h2>

                            <div className="mt-5 h-0.5 w-20 rounded-full bg-green-600" />

                            <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                                Rachana Pandit Salunke is the Founder and
                                Managing Director of Krushisetu and serves as
                                the Secretary of Be The Change Foundation.
                            </p>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                                Her academic background and commitment to
                                social development guide Krushisetu's work in
                                farmer empowerment, agricultural
                                entrepreneurship, rural livelihoods, and
                                sustainable development.
                            </p>

                            {/* Qualifications */}
                            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="kr-hover-card-soft rounded-3xl border border-gray-200 bg-gray-50 px-5 py-5">
                                    <div className="kr-hover-icon flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                        <GraduationCap
                                            size={24}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Qualification
                                    </p>

                                    <p className="mt-2 text-base font-bold text-green-900">
                                        B.Sc. Agriculture
                                    </p>
                                </div>

                                <div className="kr-hover-card-soft rounded-3xl border border-gray-200 bg-gray-50 px-5 py-5">
                                    <div className="kr-hover-icon flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                        <Sprout
                                            size={24}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Post Graduation
                                    </p>

                                    <p className="mt-2 text-base font-bold text-green-900">
                                        Agribusiness Management
                                    </p>
                                </div>
                            </div>

                            {/* Foundation Role */}
                            <div className="kr-hover-card-soft mt-4 rounded-3xl border border-green-100 bg-green-50 px-5 py-5">
                                <div className="kr-hover-icon flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                    <Building2
                                        size={24}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-green-700">
                                    Role in Foundation
                                </p>

                                <p className="mt-2 text-base font-bold text-gray-900">
                                    Secretary, Be The Change Foundation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FounderProfile