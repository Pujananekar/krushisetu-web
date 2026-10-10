import { ArrowUp } from "lucide-react"
import { Link } from "react-router-dom"


const FooterBottom = ({ settings }) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }


    const siteName =
        settings?.englishName ||
        "Krushisetu"


    const parentOrganisation =
        settings?.parentOrganisation ||
        "An Initiative of Be The Change Foundation"


    const currentYear =
        new Date().getFullYear()


    return (
        <div className="flex flex-col gap-6 text-center md:text-left">

            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

                <p className="text-sm text-green-200">

                    © {currentYear} {siteName} —{" "}
                    {parentOrganisation}. All rights reserved.

                </p>


                <button
                    type="button"
                    onClick={scrollToTop}
                    className="group kr-hover-button flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-green-100 hover:bg-white hover:text-green-900"
                >

                    <span>
                        Back to top
                    </span>


                    <ArrowUp
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-y-1"
                    />

                </button>

            </div>


            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-green-200 md:justify-start">
                <a
                    href="https://scalezen.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white focus-visible:text-white focus-visible:underline"
                >
                    Designed and developed by{" "}
                    <span className="font-medium text-blue-300 underline-offset-2 hover:underline">
                        ScaleZen Technologies
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                </a>
            </div>

        </div>
    )
}


export default FooterBottom