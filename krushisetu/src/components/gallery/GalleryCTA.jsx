import { ArrowRight, Images } from "lucide-react"
import { Link } from "react-router-dom"

const GalleryCTA = () => {
    return (
        <section className="bg-[#F6FAF7] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
            <div className="relative mx-auto max-w-350 overflow-hidden rounded-4xl bg-green-900 px-7 py-10 shadow-2xl shadow-green-900/20 sm:px-10 lg:px-14 lg:py-12">
                <div className="absolute inset-0 bg-[url('/images/services_bg.png')] bg-cover bg-center opacity-25" />

                <div className="absolute inset-0 bg-linear-to-r from-green-950/95 via-green-900/90 to-green-800/70" />

                <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-green-500/20" />

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-300/10" />

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="kr-hover-icon flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                                <Images size={20} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-200">
                                Contribute to Our Gallery
                            </span>
                        </div>

                        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                            Have photos or{" "}
                            <span className="text-green-300">
                                videos to share?
                            </span>
                        </h2>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-green-50/80 sm:text-lg">
                            If you have photos or videos from Krushisetu-related
                            activities, events or projects, please get in touch
                            with us.
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className="group/gallery-contact kr-hover-button flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-gray-800 shadow-xl hover:bg-green-50"
                    >
                        Contact Us
                        <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover/gallery-contact:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GalleryCTA