import { Link } from "react-router-dom"
import useSiteSettings from "../../hooks/useSiteSettings.js"

const NavbarLogo = ({ onClick }) => {


    const {
        data : settings,
        } = useSiteSettings()

    const siteName = settings?.englishName || "Krushisetu"

    return (
        <Link to="/" onClick={onClick} className="flex items-center gap-3 shrink-0">
            <img className="h-11 w-11 shrink-0 object-contain" src={`${import.meta.env.BASE_URL}images/leaf_img.png`} alt="Krushisetu" />

            <h1 className="whitespace-nowrap text-xl md:text-2xl font-bold tracking-[-0.03em] text-green-900">
                {siteName}
            </h1>
        </Link>
    )
}

export default NavbarLogo