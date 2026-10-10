import {
    Phone,
    Mail,
    MapPin,
    Clock,
} from "lucide-react"

import ContactMap from "./ContactMap"
import ContactSocialLinks from "./ContactSocialLinks"

import useSiteSettings from "../../hooks/useSiteSettings.js"


const ContactInformation = () => {

    const {
        data: settings,
    } = useSiteSettings()


    const phone =
        settings?.phone || ""


    const email =
        settings?.email || ""


    /* --------------------------------
       Current Day
    -------------------------------- */

    const currentDayIndex = new Date().getDay()

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]


    const currentDay = dayNames[currentDayIndex]


    const currentDayKey = currentDay.toLowerCase()


    const currentWorkingHours =
        settings?.[currentDayKey] || ""


    return (
        <div className="rounded-3xl border border-gray-200 bg-white/95 p-6 shadow-lg md:p-8">

            {/* Heading */}
            <h2 className="text-2xl font-bold text-green-900 md:text-3xl">
                Contact Information
            </h2>

            <div className="mt-3 h-1 w-10 rounded-full bg-green-600" />


            {/* Address */}
            <div className="mt-6 flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <MapPin size={24} />
                </div>


                <div className="min-w-0 flex-1">

                    <h3 className="font-bold text-green-900">
                        Address
                    </h3>


                    {(
                        settings?.addressLine1 ||
                        settings?.addressLine2 ||
                        settings?.city ||
                        settings?.district ||
                        settings?.state ||
                        settings?.pincode
                    ) ? (
                        <div className="mt-1 text-sm leading-7 text-gray-600 md:text-base">

                            {/* Address Line 1 */}
                            {settings?.addressLine1 && (
                                <p>
                                    {settings.addressLine1}
                                </p>
                            )}


                            {/* Address Line 2 */}
                            {settings?.addressLine2 && (
                                <p>
                                    {settings.addressLine2}
                                </p>
                            )}


                            {/* City + District */}
                            {(settings?.city || settings?.district) && (
                                <p>
                                    {settings?.city}

                                    {settings?.city &&
                                        settings?.district &&
                                        ", "}

                                    {settings?.district}
                                </p>
                            )}


                            {/* State + Pincode */}
                            {(settings?.state || settings?.pincode) && (
                                <p>
                                    {settings?.state}

                                    {settings?.state &&
                                        settings?.pincode &&
                                        " - "}

                                    {settings?.pincode}
                                </p>
                            )}

                        </div>
                    ) : (
                        <p className="mt-1 text-sm leading-relaxed text-gray-600 md:text-base">
                            Official address details will be added after approval.
                        </p>
                    )}

                </div>

            </div>


            {/* Phone + Email */}
            <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* Phone */}
                <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                        <Phone size={23} />
                    </div>


                    <div className="min-w-0">

                        <h3 className="font-bold text-green-900">
                            Phone
                        </h3>


                        {phone ? (
                            <a
                                href={`tel:${phone}`}
                                className="mt-1 block text-sm text-gray-600 transition-colors hover:text-green-700 md:text-base"
                            >
                                {phone}
                            </a>
                        ) : (
                            <p className="mt-1 text-sm text-gray-500 md:text-base">
                                Official phone number to be confirmed
                            </p>
                        )}

                    </div>

                </div>


                {/* Email */}
                <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                        <Mail size={23} />
                    </div>


                    <div className="min-w-0">

                        <h3 className="font-bold text-green-900">
                            Email
                        </h3>


                        {email ? (
                            <a
                                href={`mailto:${email}`}
                                className="mt-1 block break-all text-sm text-gray-600 transition-colors hover:text-green-700 md:text-base"
                            >
                                {email}
                            </a>
                        ) : (
                            <p className="mt-1 text-sm text-gray-500 md:text-base">
                                Official email to be confirmed
                            </p>
                        )}

                    </div>

                </div>

            </div>


            {/* Working Hours */}
            <div className="mt-5 flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <Clock size={23} />
                </div>


                <div className="min-w-0">

                    <h3 className="font-bold text-green-900">
                        Working Hours
                    </h3>


                    {currentWorkingHours ? (
                        <div className="mt-2">

                            <div className="flex flex-wrap items-center gap-2">

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                                    Today
                                </span>

                                <span className="text-sm font-semibold text-gray-700 md:text-base">
                                    {currentDay}
                                </span>

                            </div>


                            <p className="mt-3 text-sm font-medium text-gray-600 md:text-base">
                                {currentWorkingHours}
                            </p>

                        </div>
                    ) : (
                        <div className="mt-2">

                            <div className="flex flex-wrap items-center gap-2">

                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                                    Today
                                </span>

                                <span className="text-sm font-semibold text-gray-700 md:text-base">
                                    {currentDay}
                                </span>

                            </div>


                            <p className="mt-3 text-sm text-gray-500 md:text-base">
                                Working hours to be confirmed.
                            </p>

                        </div>
                    )}

                </div>

            </div>


            {/* Map */}
            <ContactMap
                settings={settings}
            />


            {/* Social Links */}
            <ContactSocialLinks
                settings={settings}
            />

        </div>
    )
}


export default ContactInformation