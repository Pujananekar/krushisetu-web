import { ExternalLink, MapPin } from "lucide-react"


const ContactMap = ({ settings }) => {

    const mapUrl = settings?.mapUrl?.trim()


    const addressParts = [
        settings?.addressLine1,
        settings?.addressLine2,
        settings?.city,
        settings?.district,
        settings?.state,
        settings?.pincode,
    ].filter(Boolean)


    const address = addressParts.join(", ")


    /*
     * Create a Google Maps embed URL from the official address.
     *
     * This allows the actual map to render without requiring
     * a Google Maps API key.
     */
    const embedUrl = address
        ? `https://www.google.com/maps?q=${encodeURIComponent(
            address
        )}&output=embed`
        : ""


    return (
        <div className="mt-7">

            {/* Heading */}
            <div>
                <h2 className="text-xl font-bold text-green-900">
                    Find Us
                </h2>

                <div className="mt-2 h-1 w-10 rounded-full bg-green-600" />
            </div>


            {/* Map Card */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="relative flex md:h-35 items-center justify-center overflow-hidden bg-linear-to-br from-green-50 via-white to-green-100 px-6 py-10">

                        <div className="absolute inset-0 opacity-40">
                            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-green-200" />

                            <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-green-100" />
                        </div>


                        <div className="relative z-10 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                                <MapPin size={26} />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-green-900">
                                Krushisetu
                            </h3>

                        </div>

                    </div>
            


                {/* Address + Google Maps Button */}
                <div className="px-5 py-5 sm:px-6">

                    {address && (
                        <div className="flex gap-3">

                            <MapPin
                                size={20}
                                className="mt-0.5 shrink-0 text-green-700"
                            />

                            <p className="text-sm leading-6 text-gray-600">
                                {address}
                            </p>

                        </div>
                    )}


                    {mapUrl && (
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 hover:shadow-lg sm:w-auto"
                        >
                            <ExternalLink size={16} />

                            Open in Google Maps
                        </a>
                    )}

                </div>

            </div>

        </div>
    )
}


export default ContactMap