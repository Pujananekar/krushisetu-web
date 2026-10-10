import { Sprout } from "lucide-react"


const FooterBrand = ({ settings }) => {

    const siteName =
        settings?.englishName ||
        "KRUSHISETU"

    const tagline =
        settings?.tagline ||
        "Empowering Farmers • Transforming Agriculture"

    const footerText =
        settings?.footerText ||
        "Krushisetu provides information, awareness, training and facilitation support for farmers and rural communities."

    const parentOrganisation =
        settings?.parentOrganisation ||
        "An Initiative of Be The Change Foundation"


    return (
        <div className="lg:col-span-1">

            <div className="flex items-center gap-3">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-700">

                    <Sprout
                        size={30}
                        strokeWidth={1.8}
                    />

                </div>


                <div>

                    <h2 className="text-2xl font-bold tracking-wide">
                        {siteName.toUpperCase()}
                    </h2>


                    <p className="text-xs tracking-wider text-green-200">
                        Agriculture Development Wing
                    </p>

                </div>

            </div>


            <p className="mt-5 max-w-xs text-sm leading-relaxed text-green-100">
                {tagline}
            </p>


            <p className="mt-4 max-w-sm text-sm leading-relaxed text-green-200">
                {footerText}
            </p>


            <p className="mt-3 max-w-sm text-xs leading-relaxed text-green-300">
                {parentOrganisation}
            </p>

        </div>
    )
}


export default FooterBrand