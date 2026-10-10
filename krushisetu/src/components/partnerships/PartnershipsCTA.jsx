import { ArrowRight, Handshake } from "lucide-react"
import { Link } from "react-router-dom"

const PartnershipsCTA = () => {
    return (
        <section className="px-6 pb-20 pt-12 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-green-900 px-7 py-12 shadow-2xl shadow-green-900/20 sm:px-10 lg:px-14 lg:py-14">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-700/40" />

                    <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-green-800/60" />

                    <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 text-green-200">
                                <div className="kr-hover-icon flex h-9 w-9 items-center justify-center rounded-xl bg-green-800/60">
                                    <Handshake size={19} />
                                </div>

                                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                                    Partner With Us
                                </span>
                            </div>

                            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                                Let&apos;s create greater impact together.
                            </h2>

                            <p className="mt-4 text-base leading-7 text-green-100 sm:text-lg">
                                If your institution or organisation is
                                interested in agricultural and rural
                                development collaboration, connect with
                                Krushisetu.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="group/partnership-contact kr-hover-button flex shrink-0 items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-green-900 shadow-xl hover:bg-green-50 hover:shadow-2xl hover:shadow-green-950/20"
                        >
                            Partner With Us
                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover/partnership-contact:translate-x-1.5"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PartnershipsCTA