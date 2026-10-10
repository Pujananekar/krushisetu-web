import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react"


const FooterContact = ({ settings }) => {

    const addressParts = [
        settings?.addressLine1,
        settings?.addressLine2,
        settings?.city,
        settings?.district,
        settings?.state,
        settings?.pincode,
    ].filter(Boolean)


    const address =
        addressParts.length > 0
            ? addressParts
            : ["Official address details"]


    const phone =
        settings?.phone ||
        "Official phone number to be confirmed"


    const email =
        settings?.email ||
        "Official email to be confirmed"


    return (
        <div>

            {/* Contact Information */}
            <div className="space-y-5">

                {/* Address */}
                <div className="flex gap-3">

                    <MapPin
                        size={20}
                        className="mt-0.5 shrink-0 text-green-400"
                    />

                    <p className="text-sm leading-relaxed text-green-100">

                        {address.map((part, index) => (
                            <span key={index}>
                                {part}

                                {index < address.length - 1 && (
                                    <br />
                                )}
                            </span>
                        ))}

                    </p>

                </div>


                {/* Phone */}
                <div className="flex items-center gap-3 text-sm text-green-100">

                    <Phone
                        size={20}
                        className="shrink-0 text-green-400"
                    />

                    {settings?.phone ? (
                        <a
                            href={`tel:${settings.phone}`}
                            className="transition-colors hover:text-white"
                        >
                            {phone}
                        </a>
                    ) : (
                        <span>
                            {phone}
                        </span>
                    )}

                </div>


                {/* Email */}
                <div className="flex items-center gap-3 text-sm text-green-100">

                    <Mail
                        size={20}
                        className="shrink-0 text-green-400"
                    />

                    {settings?.email ? (
                        <a
                            href={`mailto:${settings.email}`}
                            className="break-all transition-colors hover:text-white"
                        >
                            {email}
                        </a>
                    ) : (
                        <span>
                            {email}
                        </span>
                    )}

                </div>

            </div>

        </div>
    )
}


export default FooterContact