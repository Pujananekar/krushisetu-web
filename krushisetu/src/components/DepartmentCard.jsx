import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import departmentIcons from "../constants/departmentIcons"

const DepartmentCard = ({ department }) => {
    const Icon = departmentIcons[department.icon]

    return (
        <Link
            to={`/departments/${department.slug}`}
            className="kr-hover-card flex h-full min-h-0  cursor-pointer flex-col items-center overflow-hidden rounded-3xl border border-gray-200 bg-white/95 px-6 py-7 text-center shadow-lg shadow-gray-900/10"
        >
            <div className="kr-hover-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-800">
                {Icon && <Icon size={28} strokeWidth={2} />}
            </div>

            <h3 className="kr-hover-title mt-5 text-base font-bold leading-6 text-gray-900 sm:text-lg">
                {department.title}
            </h3>

            <div className="kr-hover-line mt-4 h-0.5 w-10 shrink-0 rounded-full bg-green-600" />

            <p className="mt-4 flex-1 text-sm leading-6 text-gray-600  line-clamp-4 ">
                {department.description}
            </p>

            <div className="mt-6 flex shrink-0 items-center gap-2 text-sm font-semibold text-green-700">
                <span>View Department</span>

                <ArrowRight
                    size={17}
                    strokeWidth={2}
                    className="kr-hover-arrow"
                />
            </div>
        </Link>
    )
}

export default DepartmentCard