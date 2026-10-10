import { useLocation } from "react-router-dom"
import DesktopNavItem from "./DesktopNavItem"

const isPathActive = (pathname, path) => {
    if (!path) return false
    if (path === "/") return pathname === "/"
    return pathname === path || pathname.startsWith(`${path}/`)
}

const DesktopNav = ({ navLinks }) => {
    const location = useLocation()

    const isActive = (path, children = []) => {
        if (isPathActive(location.pathname, path)) return true

        return children.some((child) =>
            isPathActive(location.pathname, child.path)
        )
    }

    return (
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 overflow-visible lg:flex xl:gap-3 2xl:gap-4">
            {navLinks.map((link) => (
                <DesktopNavItem
                    key={link.name}
                    link={link}
                    isActive={isActive(link.path, link.children)}
                />
            ))}
        </div>
    )
}

export default DesktopNav