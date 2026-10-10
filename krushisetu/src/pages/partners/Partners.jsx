import { ArrowLeft, ArrowRight, Handshake } from "lucide-react"
import { Link } from "react-router-dom"

import { partners } from "../../data/partners.js"

const Partners = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            <img
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt="Partners background image"
            />

            <div className="absolute inset-0 -z-10 bg-white/60" />

            <div className="relative z-10 mx-auto mt-10 w-full max-w-350 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <p className="text-lg font-bold tracking-wide text-green-700">
                        OUR PARTNERS
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-green-950 md:text-5xl lg:text-6xl">
                        Government & Institutional Partners
                    </h1>

                    <div className="mt-4 h-1 w-10 rounded-full bg-green-700" />

                    <p className="mt-5 max-w-3xl text-base leading-relaxed tracking-wide text-gray-600 md:text-lg">
                        Explore the government departments and institutions that
                        contribute to agriculture, rural development, and the
                        empowerment of farmers and communities.
                    </p>

                    <p className="mt-4 text-sm font-semibold text-green-800 md:text-base">
                        Select a partner to learn more.
                    </p>
                </div>

                {/* Partners */}
                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {partners.map((partner) => {
                        const Icon = partner.icon

                        return (
                            <Link
                                key={partner.slug}
                                to={`/partners/${partner.slug}`}
                                aria-label={`View partner details for ${partner.name}`}
                                className="group flex min-h-56 cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white/85 p-5 text-center shadow-sm  transition-all duration-300 hover:-translate-y-1.5 hover:border-green-300 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                            >
                                {/* Icon */}
                                <div className="flex flex-col items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-800 transition-all duration-300 group-hover:scale-105 group-hover:bg-green-100 group-hover:text-green-700">
                                        <Icon
                                            size={34}
                                            strokeWidth={1.7}
                                        />
                                    </div>

                                    {/* Name */}
                                    <h3 className="mt-4 text-sm font-semibold leading-snug text-gray-800 transition-colors duration-300 group-hover:text-green-800 md:text-base">
                                        {partner.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-500 md:text-sm">
                                        {partner.shortDescription}
                                    </p>
                                </div>

                                {/* CTA */}
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

                {/* Partnership Message */}
                <div className="mt-14 flex w-full flex-col items-center gap-5 rounded-3xl border border-gray-200 bg-white/90 px-6 py-8 text-center shadow-md md:flex-row md:px-8 md:text-left">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
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
                            Together with our partners, we are working towards a
                            sustainable and prosperous future for farmers and rural
                            communities.
                        </p>
                    </div>

                    <Link
                        to="/"
                        className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-green-700 transition-colors hover:text-green-900"
                    >

                        <ArrowLeft
                            size={17}
                            strokeWidth={2}
                            className="transition-transform duration-300 group-hover:translate-x-1"

                        />
                        <span>Back to home</span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Partners