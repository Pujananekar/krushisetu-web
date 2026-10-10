import { ArrowRight, CalendarDays } from "lucide-react"
import { Link } from "react-router-dom"

const TrainingCard = ({ training }) => {
    return (
        <Link
            to={`/training/${training.slug}`}
            className="kr-hover-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white/95 p-6 shadow-xl shadow-gray-900/10"
        >
            <div className="kr-hover-line absolute left-0 right-0 top-0 h-1 origin-left w-0 bg-green-700" />

            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-100/60" />

            <div className="relative flex items-start justify-between gap-4">
                <div className="kr-hover-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <CalendarDays size={27} strokeWidth={2} />
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {training.status || "Information Soon"}
                </span>
            </div>

            <div className="relative mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-700">
                    {training.type || "Training Program"}
                </p>

                <h3 className="kr-hover-title mt-2 text-xl font-bold leading-7 text-gray-950">
                    {training.title || "Training Program"}
                </h3>

                <div className="kr-hover-line mt-4 h-1 w-10 rounded-full bg-green-600" />

                <p className="mt-4 text-sm leading-6 text-gray-600">
                    {training.description ||
                        "Verified information about this training program will be available soon."}
                </p>
            </div>

            <div className="relative mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                    <span className="text-xs font-medium text-gray-500">
                        Audience
                    </span>

                    <span className="text-xs font-semibold text-gray-700">
                        {training.audience || "Coming Soon"}
                    </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                    <span className="text-xs font-medium text-gray-500">
                        Mode
                    </span>

                    <span className="text-xs font-semibold text-gray-700">
                        {training.mode || "Coming Soon"}
                    </span>
                </div>
            </div>

            <div className="relative mt-auto pt-7">
                <div className="flex items-center gap-2 text-sm font-bold text-green-700">
                    <span>View Program</span>
                    <ArrowRight size={17} className="kr-hover-arrow" />
                </div>
            </div>
        </Link>
    )
}

export default TrainingCard