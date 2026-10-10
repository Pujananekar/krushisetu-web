import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MobileNavItem from "./MobileNavItem"

const isPathActive = (pathname, path) => {
    if (!path) return false
    if (path === "/") return pathname === "/"
    return pathname === path || pathname.startsWith(`${path}/`)
}

const MobileMenu = ({ isOpen, navLinks, onClose }) => {
    const [openDropdown, setOpenDropdown] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = ""
            return
        }

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

    const isActive = (path, children = []) => {
        if (isPathActive(location.pathname, path)) return true

        return children.some((child) =>
            isPathActive(location.pathname, child.path)
        )
    }

    const toggleDropdown = (key) => {
        setOpenDropdown((current) => (current === key ? null : key))
    }

    const handleWheel = (event) => event.stopPropagation()
    const handleTouchMove = (event) => event.stopPropagation()

    return (
        <div className="fixed bottom-5 left-1/2 top-28 z-50 w-[94%] max-w-sm -translate-x-1/2 overflow-hidden rounded-3xl border border-green-200 bg-white/85 shadow-2xl shadow-gray-900/20 backdrop-blur-xl lg:hidden">
            <div onWheel={handleWheel} onTouchMove={handleTouchMove} className="scrollbar-none absolute inset-0 overflow-y-scroll overscroll-contain px-4 py-5 touch-pan-y sm:px-6 sm:py-6">
                <div className="flex min-h-full flex-col gap-1">
                    {navLinks.map((link) => (
                        <MobileNavItem
                            key={link.name}
                            link={link}
                            isActive={isActive(link.path, link.children)}
                            isOpen={openDropdown === link.name}
                            onToggle={() => toggleDropdown(link.name)}
                            onClose={onClose}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MobileMenu