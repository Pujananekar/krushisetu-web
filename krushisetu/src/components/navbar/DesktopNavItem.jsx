import { Link, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import DesktopDropdown from "./DesktopDropdown"

const DesktopNavItem = ({ link, isActive }) => {
    const location = useLocation()

    if (link.children) {
        return (
            <div className="group relative shrink-0">
                <div className={`relative flex items-center gap-1 whitespace-nowrap py-2 text-[14px] font-medium transition-all duration-200 xl:text-[15px] 2xl:text-[16px] ${isActive ? "font-extrabold text-green-700" : "text-gray-400 hover:text-green-900"}`}>
                    <Link to={link.path || "#"}>{link.name}</Link>

                    <ChevronDown size={14} strokeWidth={2} className="shrink-0 transition-transform duration-200 group-hover:rotate-180" />

                    {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-green-700" />}
                </div>

                <DesktopDropdown items={link.children} parent={link} pathname={location.pathname} />
            </div>
        )
    }

    return (
        <Link to={link.path} className={`relative shrink-0 whitespace-nowrap py-2 text-[14px] font-medium transition-all duration-200 xl:text-[15px] 2xl:text-[16px] ${isActive ? "font-extrabold text-green-700" : "text-gray-400 hover:text-green-900"}`}>
            {link.name}

            {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-green-700" />}
        </Link>
    )
}

export default DesktopNavItem