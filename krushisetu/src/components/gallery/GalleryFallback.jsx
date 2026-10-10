import {
    CalendarDays,
    Camera,
    ImageIcon,
    MapPin,
    Play,
} from "lucide-react"

const GalleryFallback = () => {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-linear-to-br from-[#F8FCF9] via-white to-[#F1F9F3] px-6 py-16 shadow-sm sm:px-10 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute left-8 top-8 grid grid-cols-5 gap-3 opacity-30">
                {Array.from({ length: 20 }).map((_, index) => (
                    <span
                        key={index}
                        className="h-1.5 w-1.5 rounded-full bg-green-300"
                    />
                ))}
            </div>

            <div className="pointer-events-none absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-green-100/40" />

            <div className="pointer-events-none absolute -right-7.5 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-green-100/50" />

            <div className="relative mx-auto max-w-3xl text-center">
                <div className="kr-hover-icon mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
                    <ImageIcon size={38} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                    Gallery Coming Soon
                </h3>

                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-green-700" />

                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                    Photos and videos from Krushisetu&apos;s activities,
                    projects, training programs and events will be added here
                    after verification.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-8">
                    <div className="flex items-center gap-2.5 text-sm font-medium text-gray-600">
                        <span className="kr-hover-icon flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-700 shadow-sm">
                            <Camera size={17} />
                        </span>
                        Photos
                    </div>

                    <div className="flex items-center gap-2.5 text-sm font-medium text-gray-600">
                        <span className="kr-hover-icon flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-700 shadow-sm">
                            <Play size={17} />
                        </span>
                        Videos
                    </div>

                    <div className="flex items-center gap-2.5 text-sm font-medium text-gray-600">
                        <span className="kr-hover-icon flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-700 shadow-sm">
                            <CalendarDays size={17} />
                        </span>
                        Date-wise Albums
                    </div>

                    <div className="flex items-center gap-2.5 text-sm font-medium text-gray-600">
                        <span className="kr-hover-icon flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-700 shadow-sm">
                            <MapPin size={17} />
                        </span>
                        Location-wise Albums
                    </div>
                </div>

                <p className="mt-8 text-xs font-medium text-gray-400 sm:text-sm">
                    All media will be published with appropriate permissions
                    and verification.
                </p>
            </div>
        </div>
    )
}

export default GalleryFallback