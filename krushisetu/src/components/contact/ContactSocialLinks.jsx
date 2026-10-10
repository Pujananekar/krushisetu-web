import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaXTwitter,
    FaWhatsapp,
} from "react-icons/fa6"

const ContactSocialLinks = ({ settings }) => {
    const socialLinks = [
        {
            key: "facebook",
            label: "Facebook",
            url: settings?.facebook,
            icon: <FaFacebookF size={20} />,
            className:
                "bg-blue-600 hover:bg-blue-700",
        },
        {
            key: "instagram",
            label: "Instagram",
            url: settings?.instagram,
            icon: <FaInstagram size={21} />,
            className:
                "bg-pink-600 hover:bg-pink-700",
        },
        {
            key: "youtube",
            label: "YouTube",
            url: settings?.youtube,
            icon: <FaYoutube size={21} />,
            className:
                "bg-red-600 hover:bg-red-700",
        },
        {
            key: "linkedin",
            label: "LinkedIn",
            url: settings?.linkedin,
            icon: <FaLinkedinIn size={21} />,
            className:
                "bg-blue-700 hover:bg-blue-800",
        },
        {
            key: "twitter",
            label: "X",
            url: settings?.twitter,
            icon: <FaXTwitter size={19} />,
            className:
                "bg-black hover:bg-gray-800",
        },
        {
            key: "whatsapp",
            label: "WhatsApp",
            url: settings?.whatsapp
                ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                      "Hello Krushisetu, I would like to know more about your services."
                  )}`
                : "",
            icon: <FaWhatsapp size={21} />,
            className:
                "bg-green-600 hover:bg-green-700",
        },
    ].filter((item) => item.url)

    if (socialLinks.length === 0) {
        return null
    }

    return (
        <div className="mt-7">
            <h2 className="text-xl font-bold text-green-900">
                Follow Us
            </h2>

            <div className="mt-2 h-1 w-10 rounded-full bg-green-600" />

            <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                    <a
                        key={social.key}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`kr-hover-button flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm transition-all duration-200 hover:shadow-lg ${social.className}`}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default ContactSocialLinks