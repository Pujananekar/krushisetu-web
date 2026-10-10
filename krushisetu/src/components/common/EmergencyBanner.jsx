import { AlertTriangle, ArrowUpRight, X } from "lucide-react"
import { useEffect, useState } from "react"
import useSiteSettings from "../../hooks/useSiteSettings.js"

const EmergencyBanner = () => {
    const { data: settings, isLoading } = useSiteSettings()

    const [dismissed, setDismissed] = useState(false)

    useEffect(() => {
        if (settings?.emergencyEnabled) {
            setDismissed(false)
        }
    }, [settings?.emergencyEnabled])

    useEffect(() => {
        if (settings?.emergencyEnabled && !dismissed) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [settings?.emergencyEnabled, dismissed])

    if (isLoading || dismissed) {
        return null
    }

    const enabled =
        settings?.emergencyEnabled === true ||
        settings?.emergencyEnabled === "true" ||
        settings?.emergencyEnabled === 1

    const message = settings?.emergencyText?.trim()
    const link = settings?.emergencyLink?.trim()

    if (!enabled || !message) {
        return null
    }

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 px-5 py-8 backdrop-blur-sm sm:px-8">
            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl">

                {/* Close button */}
                <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    aria-label="Close emergency announcement"
                    className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition duration-200 hover:bg-gray-100 hover:text-gray-700"
                >
                    <X
                        size={21}
                        strokeWidth={2}
                    />
                </button>

                <div className="px-6 py-8 sm:px-10 sm:py-10">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <AlertTriangle
                                size={30}
                                strokeWidth={2}
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-6 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-green-950 sm:text-3xl">
                            Important Notice
                        </h2>

                        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-green-600" />
                    </div>

                    {/* Message */}
                    <p className="mx-auto mt-6 max-w-lg text-center text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                        {message}
                    </p>

                    {/* Action */}
                    {link && (
                        <div className="mt-8 flex justify-center">
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-800 hover:shadow-md"
                            >
                                Learn More

                                <ArrowUpRight
                                    size={17}
                                    strokeWidth={2}
                                />
                            </a>
                        </div>
                    )}

                    {/* Footer note */}
                    <p className="mt-7 text-center text-xs text-gray-400">
                        This important announcement is provided by
                        Krushisetu.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmergencyBanner