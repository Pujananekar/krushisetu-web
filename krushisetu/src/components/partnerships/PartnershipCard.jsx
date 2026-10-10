import { ArrowRight, Handshake } from "lucide-react"
import { Link } from "react-router-dom"

const PartnershipCard = ({ partnership }) => {
    return (
        <Link
            to={`/partnerships/${partnership.slug}`}
            className="kr-hover-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-xl shadow-gray-900/10"
        >
            <div className="kr-hover-line absolute left-0 right-0 top-0 h-1 origin-left bg-green-700" />

            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-100/50 transition-colors duration-500 group-hover:bg-green-200/70" />

            <div className="kr-hover-icon relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Handshake size={27} strokeWidth={2} />
            </div>

            <div className="relative mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                    {partnership.category || "Collaboration"}
                </p>

                <h3 className="kr-hover-title mt-2 text-xl font-bold leading-7 text-gray-950">
                    {partnership.title || "Collaboration Opportunity"}
                </h3>

                <div className="kr-hover-line mt-4 h-1 w-10 rounded-full bg-green-600" />

                <p className="mt-4 text-sm leading-6 text-gray-600">
                    {partnership.description ||
                        "Information about this collaboration opportunity will be available soon."}
                </p>
            </div>

            <div className="relative mt-auto flex items-center gap-2 pt-7 text-sm font-bold text-green-700">
                <span>Explore Opportunity</span>

                <ArrowRight
                    size={17}
                    className="kr-hover-arrow"
                />
            </div>
        </Link>
    )
}

export default PartnershipCard