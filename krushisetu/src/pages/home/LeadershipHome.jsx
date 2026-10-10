import {
    UserRound,
    GraduationCap,
    BriefcaseBusiness,
    Sprout,
    Lightbulb,
    Handshake,
    Target,
    ArrowRight,
} from "lucide-react"

import { Link } from "react-router-dom"

const LeadershipHome = () => {
    const values = [
        {
            icon: Sprout,
            title: "Farmer Centric",
            description:
                "Committed to uplifting farmers and rural communities.",
        },
        {
            icon: Lightbulb,
            title: "Visionary Leadership",
            description:
                "Driving innovation and sustainable agriculture.",
        },
        {
            icon: Handshake,
            title: "Strong Partnerships",
            description:
                "Building collaboration for greater impact.",
        },
        {
            icon: Target,
            title: "Results Oriented",
            description:
                "Focused on measurable impact and growth.",
        },
    ]

    return (
        <section
            id="leadership"
            className="relative min-h-screen w-full overflow-hidden"
        >
            {/* Background */}
            <img
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 py-12">
                {/* Heading */}
                <div className="flex flex-col items-center text-center">
                    <p className="text-xl font-bold tracking-wide text-green-700">
                        FOUNDER MESSAGE
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-green-950 md:text-5xl lg:text-6xl">
                        Founder & Managing Director
                    </h1>

                    <div className="mt-4 h-1 w-10 rounded-full bg-green-700" />

                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                        Meet the founder guiding Krushisetu&apos;s work in
                        farmer empowerment, agricultural entrepreneurship,
                        rural livelihoods, and sustainable development.
                    </p>
                </div>

                {/* Founder Card */}
                <div className="mt-10 w-full overflow-hidden rounded-4xl border border-green-100 bg-white/90 p-5 shadow-xl md:p-7 lg:p-8">
                    {/* Main Profile */}
                    <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        {/* Image */}
                        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border-2 border-green-700/30">
                            <img
                                className="h-100 w-full object-cover object-center transition-transform duration-300 hover:scale-105 md:h-112.5"
                                src={`${import.meta.env.BASE_URL}images/about_women_pic.png`}
                                alt="Rachana Pandit Salunke, Founder and Managing Director of Krushisetu"
                            />
                        </div>

                        {/* Information */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-green-900 md:text-4xl">
                                Rachana Pandit Salunke
                            </h2>

                            {/* Role */}
                            <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-green-800 px-4 py-2 text-sm font-semibold text-white md:text-base">
                                <UserRound size={20} />

                                <span>
                                    Founder & Managing Director, Krushisetu
                                </span>
                            </div>

                            <div className="my-5 h-px w-full bg-gray-200" />

                            {/* Founder Message */}
                            <div>
                                <h3 className="text-lg font-bold text-green-900 md:text-xl">
                                    Founder Message
                                </h3>

                                <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                                    Ms. Rachana Pandit Salunke is the Founder
                                    and Managing Director of Krushisetu and
                                    Secretary of Be The Change Foundation.
                                    Her academic background and commitment to
                                    social development guide Krushisetu&apos;s
                                    work in farmer empowerment, agricultural
                                    entrepreneurship, rural livelihoods, and
                                    sustainable development.
                                </p>
                            </div>

                            {/* Qualifications */}
                            <div className="mt-7 flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                                    <GraduationCap size={26} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-green-900">
                                        Qualifications
                                    </h3>

                                    <ul className="mt-2 space-y-1 text-sm text-gray-600 md:text-base">
                                        <li>• B.Sc. in Agriculture</li>
                                        <li>
                                            • Post Graduation in Agribusiness
                                            Management
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Foundation Role */}
                            <div className="mt-6 flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                                    <BriefcaseBusiness size={24} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-green-900">
                                        Role in the Foundation
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-600 md:text-base">
                                        Secretary, Be The Change Foundation
                                    </p>
                                </div>
                            </div>

                            {/* Founder Profile Link */}
                            <div className="mt-7">
                                <Link
                                    to="/about/founder"
                                    className="kr-hover-button inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-800 hover:shadow-lg"
                                >
                                    Read Founder Profile
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mt-8 grid grid-cols-1 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                        {values.map((item) => {
                            const Icon = item.icon

                            return (
                                <div
                                    key={item.title}
                                    className="kr-hover-card-soft flex items-center gap-4 p-5"
                                >
                                    <div className="kr-hover-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                                        <Icon
                                            size={24}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="kr-hover-title font-bold text-green-900">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-xs leading-relaxed text-gray-600 md:text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LeadershipHome