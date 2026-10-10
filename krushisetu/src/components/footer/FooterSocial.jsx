import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa"

import { FaXTwitter } from "react-icons/fa6"


const FooterSocial = ({ settings }) => {

    const socialLinks = [
        {
            name: "Facebook",
            url: settings?.facebook,
            icon: <FaFacebookF size={18} />,
            hover: "hover:text-blue-600",
        },
        {
            name: "Instagram",
            url: settings?.instagram,
            icon: <FaInstagram size={19} />,
            hover: "hover:text-pink-600",
        },
        {
            name: "X",
            url: settings?.twitter,
            icon: <FaXTwitter size={18} />,
            hover: "hover:text-gray-900",
        },
        {
            name: "YouTube",
            url: settings?.youtube,
            icon: <FaYoutube size={19} />,
            hover: "hover:text-red-600",
        },
        {
            name: "LinkedIn",
            url: settings?.linkedin,
            icon: <FaLinkedinIn size={19} />,
            hover: "hover:text-blue-500",
        },
    ]


    const whatsappNumber =
        settings?.whatsapp?.replace(/\D/g, "")


    const whatsappUrl =
        whatsappNumber
            ? `https://wa.me/${whatsappNumber}`
            : ""


    return (
        <div>

            {/* Social Description */}
            <p className="text-sm leading-relaxed text-green-200">
                Follow Krushisetu and stay connected with our latest
                agriculture initiatives and programs.
            </p>


            {/* Social Links */}
            <div className="mt-5 flex flex-wrap gap-3">

                {socialLinks.map((social) => {

                    if (social.url) {
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit Krushisetu on ${social.name}`}
                                className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg ${social.hover}`}
                            >
                                {social.icon}
                            </a>
                        )
                    }


                    return (
                        <button
                            key={social.name}
                            type="button"
                            disabled
                            aria-label={`${social.name} link coming soon`}
                            className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full bg-white/10 text-white opacity-60"
                        >
                            {social.icon}
                        </button>
                    )
                })}


                {/* WhatsApp */}
                {whatsappUrl ? (
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat with Krushisetu on WhatsApp"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-green-600 hover:shadow-lg"
                    >
                        <FaWhatsapp size={21} />
                    </a>
                ) : (
                    <button
                        type="button"
                        disabled
                        aria-label="WhatsApp link coming soon"
                        className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full bg-white/10 text-white opacity-60"
                    >
                        <FaWhatsapp size={21} />
                    </button>
                )}

            </div>

        </div>
    )
}


export default FooterSocial