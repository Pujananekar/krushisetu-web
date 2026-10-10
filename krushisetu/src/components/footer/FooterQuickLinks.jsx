import { Link } from "react-router-dom"

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Founder", path: "/about/founder" },
    { name: "Departments", path: "/departments" },
    { name: "Farmer Resources", path: "/resources" },
    { name: "Government Schemes", path: "/schemes" },
    { name: "Training & Events", path: "/training-events" },
    { name: "Projects", path: "/projects" },
    { name: "Impact", path: "/impact" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "Partnerships", path: "/partnerships" },
    { name: "Gallery", path: "/gallery" },
    { name: "Join / Apply", path: "/apply" },
    { name: "Contact", path: "/contact" },
]

const FooterQuickLinks = () => {
    return (
        <div>
            <h3 className="text-lg font-bold">Quick Links</h3>

            <div className="mt-2 h-1 w-8 rounded-full bg-green-500" />

            <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                    <li key={link.path}>
                        <Link
                            to={link.path}
                            className="kr-hover-link inline-block text-sm text-green-100 hover:text-white"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FooterQuickLinks