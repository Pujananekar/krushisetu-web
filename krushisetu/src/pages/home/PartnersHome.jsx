import { ArrowRight, Handshake } from "lucide-react"
import { Link } from "react-router-dom"

import { partners } from "../../../src/data/partners.js"

const PartnersHome = () => {
    return (
        <section
            id="partners"
            className="relative min-h-screen w-full overflow-hidden"
        >
            <img
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-12 md:py-16">
                {/* Section Header */}
                <div className="flex w-full flex-col items-center text-center">
                    <p className="text-lg font-bold tracking-wide text-green-700">
                        OUR PARTNERS
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-green-950 md:text-5xl lg:text-6xl">
                        Government & Institutional Partners
                    </h1>

                    <div className="mt-4 h-1 w-10 rounded-full bg-green-700" />

                    <p className="mt-5 max-w-3xl text-base leading-relaxed tracking-wide text-gray-600 md:text-lg">
                        We collaborate with government bodies and institutions to bring
                        resources, knowledge and opportunities to farmers and rural
                        communities.
                    </p>

                    {/* Interaction Guidance */}
                    <div className="mt-6 flex flex-col items-center">
                        <p className="text-sm font-semibold text-green-800 md:text-base">
                            Explore our partners
                        </p>

                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
                            Click on a partner to learn more about their role,
                            initiatives, and contribution to agriculture.
                        </p>
                    </div>
                </div>

                {/* Featured Partner Cards */}
                <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {partners.slice(0, 4).map((partner) => {
                        const Icon = partner.icon

                        return (
                            <Link
                                key={partner.slug}
                                to={`/partners/${partner.slug}`}
                                aria-label={`View partner details for ${partner.name}`}
                                className="group flex min-h-56 cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white/85 p-5 text-center shadow-sm  transition-all duration-300 hover:-translate-y-1.5 hover:border-green-300 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                            >
                                {/* Partner Icon */}
                                <div className="flex flex-col items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-800 transition-all duration-300 group-hover:scale-105 group-hover:bg-green-100 group-hover:text-green-700">
                                        <Icon
                                            size={34}
                                            strokeWidth={1.7}
                                        />
                                    </div>

                                    {/* Partner Name */}
                                    <h3 className="mt-4 text-sm font-semibold leading-snug text-gray-800 transition-colors duration-300 group-hover:text-green-800 md:text-base">
                                        {partner.name}
                                    </h3>

                                    {/* Short Description */}
                                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 md:text-sm">
                                        {partner.shortDescription}
                                    </p>
                                </div>

                                {/* Divider + CTA */}
                                <div className="mt-auto pt-5">
                                    <div className="mb-4 h-px w-full bg-gray-200 transition-colors duration-300 group-hover:bg-green-100" />

                                    <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-green-700 transition-colors duration-300 group-hover:text-green-800">
                                        <span>View partner details</span>

                                        <ArrowRight
                                            size={16}
                                            strokeWidth={2}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Explore All Partners */}
                <div className="mt-8 flex justify-center">
                    <Link
                        to="/partners"
                        className="group inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 md:px-7 md:py-3.5 md:text-base"
                    >
                        <span>Explore all partners</span>

                        <ArrowRight
                            size={18}
                            strokeWidth={2}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Partnership Message */}
                <div className="kr-hover-card-soft mt-12 flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl border border-gray-200 bg-white/90 px-6 py-7 text-center shadow-md md:flex-row md:text-left">
                    <div className="kr-hover-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                        <Handshake
                            size={32}
                            strokeWidth={1.8}
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-green-900 md:text-2xl">
                            Stronger Partnerships. Greater Impact.
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">
                            Together with our partners, we are building a sustainable and
                            prosperous future for farmers and rural communities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PartnersHome