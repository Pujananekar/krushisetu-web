import { useState } from "react"
import NavbarLogo from "./NavbarLogo"
import DesktopNav from "./DesktopNav"
import GetStartedButton from "./GetStartedButton"
import MobileMenuButton from "./MobileMenuButton"
import MobileMenu from "./MobileMenu"

const navLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "About",
        path: "/about",
        children: [
            {
                name: "Founder",
                path: "/about/founder",
            },
        ],
    },
    {
        name: "Departments",
        path: "/departments",
    },
    {
        name: "Resources",
        path: "/resources",
        children: [
            {
                name: "Government Schemes",
                path: "/schemes",
            },
            {
                name: "Training & Events",
                path: "/training-events",
            },
        ],
    },
    {
        name: "Impact",
         path: "/impact",
        children: [
            {
                name: "Projects",
                path: "/projects",
            },
            {
                name: "Success Stories",
                path: "/success-stories",
            },
        ],
    },
    {
        name: "Partnerships",
        path: "/partnerships",
    },
    {
        name: "Gallery",
        path: "/gallery",
    },
    {
        name: "Join / Apply",
        path: "/apply",
        children: [
            {
                name: "Farmer",
                path: "/apply/farmer",
            },
            {
                name: "Training",
                path: "/apply/training",
            },
            {
                name: "Internship",
                path: "/apply/internship",
            },
            {
                name: "Partnership",
                path: "/apply/partnership",
            },
        ],
    },
    {
        name: "Contact",
        path: "/contact",
    },
]

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <section>
            <nav className="fixed top-5 left-1/2 z-99 flex h-19 w-[96%] max-w-350 -translate-x-1/2 items-center gap-3 rounded-[28px] border border-gray-200 bg-white/30 px-5 shadow-2xl shadow-gray-500 backdrop-blur-[9px] md:px-6 xl:gap-4 xl:px-7 2xl:gap-5">
                <NavbarLogo onClick={closeMobileMenu} />

                <DesktopNav navLinks={navLinks} />


                <GetStartedButton />

                <MobileMenuButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((prev) => !prev)} />
            </nav>

            <MobileMenu isOpen={isMobileMenuOpen} navLinks={navLinks} onClose={closeMobileMenu} />
        </section>
    )
}

export default Navbar