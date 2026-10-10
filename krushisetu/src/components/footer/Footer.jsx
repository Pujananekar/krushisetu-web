import FooterBrand from "./FooterBrand"
import FooterQuickLinks from "./FooterQuickLinks"
import FooterContact from "./FooterContact"
import FooterSocial from "./FooterSocial"
import FooterBottom from "./FooterBottom"
import useSiteSettings from "../../hooks/useSiteSettings.js"

const Footer = () => {

    const { data: settings } = useSiteSettings()

    return (
        <footer className="relative w-full overflow-hidden bg-green-950 text-white">

            {/* Background */}
            <div className="absolute inset-0 opacity-10">
                <img
                    src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>


            {/* Footer Content */}
            <div className="relative z-10 mx-auto w-full max-w-350 px-6 py-12 md:py-16">

                {/* Main Footer */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.4fr]">

                    {/* Brand */}
                    <FooterBrand settings={settings} />


                    {/* Quick Links */}
                    <FooterQuickLinks settings={settings} />


                    {/* Contact & Connect */}
                    <div className="min-w-0">

                        <div className="mb-6">

                            <h3 className="text-xl font-bold text-white">
                                Contact &amp; Connect
                            </h3>

                            <div className="mt-3 h-1 w-11 rounded-full bg-green-500" />

                        </div>


                        {/* Contact Information */}
                        <FooterContact
                            settings={settings}
                            hideTitle={true}
                        />


                        {/* Social Media */}
                        <div className="mt-8">
                            <FooterSocial
                                settings={settings}
                                hideTitle={true}
                            />
                        </div>

                    </div>

                </div>


                {/* Divider */}
                <div className="my-10 h-px w-full bg-white/15" />


                {/* Bottom */}
                <FooterBottom settings={settings} />

            </div>

        </footer>
    )
}

export default Footer