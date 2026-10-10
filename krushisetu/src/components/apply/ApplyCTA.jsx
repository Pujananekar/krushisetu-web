import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const ApplyCTA = () => {
    return (
        <section className="px-5 pb-20 md:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350 overflow-hidden rounded-4xl bg-green-900 px-6 py-14 text-center shadow-xl shadow-green-900/20 md:px-12">
                <p className="text-sm font-bold uppercase tracking-widest text-green-200">
                    Need Help?
                </p>

                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                    Not sure which pathway to choose?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-green-100">
                    You can contact Krushisetu with your requirement and the
                    appropriate enquiry pathway can be selected.
                </p>

                <Link
                    to="/contact"
                    className="kr-hover-button group/apply-contact mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-green-900 shadow-lg hover:bg-green-50 hover:shadow-xl"
                >
                    Contact Us
                    <ArrowRight
                        size={19}
                        className="transition-transform duration-200 group-hover/apply-contact:translate-x-1"
                    />
                </Link>
            </div>
        </section>
    )
}

export default ApplyCTA