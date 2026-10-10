import { Link, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"

const isPathActive = (pathname, path) => {
    if (!path) return false
    if (path === "/") return pathname === "/"
    return pathname === path || pathname.startsWith(`${path}/`)
}

const MobileNavItem = ({
    link,
    isActive,
    isOpen,
    onToggle,
    onClose,
}) => {
    const location = useLocation()

    if (!link.children) {
        return (
            <Link
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-lg tracking-wide transition-colors ${
                    isActive
                        ? "bg-green-100 font-semibold text-green-800"
                        : "font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
                }`}
            >
                {isActive && (
                    <span className="h-3 w-3 shrink-0 rounded-full bg-green-600" />
                )}

                <span>{link.name}</span>
            </Link>
        )
    }

    return (
        <div className="w-full">
            <div
                className={`flex items-center rounded-2xl transition-colors ${
                    isActive
                        ? "bg-green-100 text-green-800"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                }`}
            >
                <Link
                    to={link.path || "#"}
                    onClick={link.path ? onClose : undefined}
                    className={`flex flex-1 items-center gap-3 px-4 py-3 text-lg tracking-wide ${
                        isActive ? "font-semibold" : "font-medium"
                    }`}
                >
                    {isActive && (
                        <span className="h-3 w-3 shrink-0 rounded-full bg-green-600" />
                    )}

                    <span>{link.name}</span>
                </Link>

                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${link.name}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                >
                    <ChevronDown
                        size={20}
                        strokeWidth={2}
                        className={`transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>
            </div>

            {isOpen && (
                <div className="mt-1 ml-4 flex flex-col border-l border-green-200 pl-3">
                    {link.children.map((child) => {
                        const isChildActive = isPathActive(
                            location.pathname,
                            child.path
                        )

                        return (
                            <Link
                                key={child.path}
                                to={child.path}
                                onClick={onClose}
                                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-base tracking-wide transition-colors ${
                                    isChildActive
                                        ? "font-semibold text-green-800"
                                        : "font-medium text-gray-600 hover:bg-green-50 hover:text-green-800"
                                }`}
                            >
                                {isChildActive && (
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-600" />
                                )}

                                <span>{child.name}</span>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default MobileNavItem