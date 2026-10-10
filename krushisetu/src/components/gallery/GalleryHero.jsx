import {Images } from "lucide-react"

const GalleryHero = () => {
    return (
        <section className="relative overflow-hidden bg-[#F6FAF7] pt-32 pb-16 lg:pt-36 lg:pb-20">
            <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-green-100/40" />

            <div className="mx-auto grid max-w-350 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 xl:gap-16">
                <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                            <Images size={23} strokeWidth={2} />
                        </div>

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-800">
                            Moments of Impact
                        </span>
                    </div>

                    <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
                        Our
                        <span className="block text-green-700">
                            Gallery
                        </span>
                    </h1>

                    <div className="kr-hover-line mt-6 h-1 w-24 rounded-full bg-green-700" />

                    <p className="mt-7 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                        A visual journey through Krushisetu&apos;s initiatives,
                        activities, training programs, community engagement,
                        and events across rural and agricultural development.
                    </p>

                </div>

                <div className="relative mx-auto h-105 w-full max-w-175 lg:h-120">
                    <div className="absolute right-8 top-4 h-48 w-72 -rotate-3 overflow-hidden rounded-[28px] border-8 border-white shadow-2xl shadow-green-900/15 sm:right-16 sm:h-55 sm:w-85">
                        <img
                            src={`${import.meta.env.BASE_URL}images/gallery_pic.avif`}
                            alt="Agricultural plant"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="absolute left-0 top-35 z-20 h-52 w-70 rotate-1 overflow-hidden rounded-[28px] border-8 border-white shadow-2xl shadow-green-900/15 sm:left-4 sm:h-58 sm:w-85">
                        <img
                            src={`${import.meta.env.BASE_URL}images/gallery_pic2.avif`}
                            alt="Agricultural field activity"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="absolute right-0 top-22 h-48 w-52 rotate-3 overflow-hidden rounded-[28px] border-8 border-white shadow-2xl shadow-green-900/15 sm:h-55 sm:w-60">
                        <img
                            src={`${import.meta.env.BASE_URL}images/gallery_pic3.avif`}
                            alt="Green agricultural field"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="absolute bottom-0 right-28 z-20 h-48 w-44 -rotate-2 overflow-hidden rounded-[28px] border-8 border-white shadow-2xl shadow-green-900/15 sm:right-32 sm:h-55 sm:w-52">
                        <img
                            src={`${import.meta.env.BASE_URL}images/gallery_pic4.avif`}
                            alt="Young agricultural plant"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-white bg-green-100 text-green-700 shadow-xl">
                        <Images size={30} strokeWidth={2} />
                    </div>

                    <div className="absolute right-3 top-2 h-20 w-20 opacity-40">
                        <div className="grid grid-cols-4 gap-3">
                            {Array.from({ length: 16 }).map((_, index) => (
                                <span
                                    key={index}
                                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GalleryHero