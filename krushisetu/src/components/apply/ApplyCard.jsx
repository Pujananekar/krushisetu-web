import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const ApplyCard = ({ icon: Icon, title, description, path }) => {
    return (
        <Link
            to={path}
            className="kr-hover-card group rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5 md:p-7"
        >
            <div className="kr-hover-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <Icon size={26} />
            </div>

            <h3 className="kr-hover-title mt-6 text-xl font-bold text-green-950">
                {title}
            </h3>

            <p className="mt-3 min-h-14 text-sm leading-6 text-gray-600">
                {description}
            </p>

            <div className="mt-6 flex items-center gap-2 font-semibold text-green-700">
                <span>Continue</span>
                <ArrowRight size={18} className="kr-hover-arrow" />
            </div>
        </Link>
    )
}

export default ApplyCard