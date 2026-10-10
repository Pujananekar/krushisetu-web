import { ArrowRight, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

const ResourcesCTA = () => {
    return (
        <section className="px-6 pt-8 pb-20 sm:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-green-800 bg-green-900 px-7 py-12 shadow-xl shadow-green-900/15 sm:px-10 lg:px-14 lg:py-14">
                    <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-green-700/30" />
                    <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-green-800/40" />
                    <div className="absolute bottom-0 -left-20 h-40 w-40 rounded-full bg-emerald-500/10" />

                    <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 text-green-200">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-800/70">
                                    <MessageCircle size={19} />
                                </div>

                                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                                    Need Guidance?
                                </span>
                            </div>

                            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                                Not sure where to start?
                            </h2>

                            <p className="mt-4 text-base leading-7 text-green-100 sm:text-lg">
                                Submit an enquiry and connect with the appropriate
                                Krushisetu support pathway.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="kr-hover-button group/resources-contact flex shrink-0 items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-green-900 shadow-lg hover:bg-green-50 hover:shadow-xl"
                        >
                            Contact Us
                            <ArrowRight
                                size={18}
                                className="transition-transform duration-200 group-hover/resources-contact:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResourcesCTA