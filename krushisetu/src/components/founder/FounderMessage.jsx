const FounderMessage = () => {
    return (
        <section className="relative w-full overflow-hidden bg-[#F6FAF7] px-6 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-16">

            {/* Decorative Background */}
            <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-green-100/40" />

            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-100/30" />


            <div className="relative z-10 mx-auto max-w-350">

                <div className="kr-hover-card group relative overflow-hidden rounded-4xl border border-gray-200 bg-white/90 p-7 shadow-xl shadow-gray-900/10 sm:p-10 lg:p-12">

                    {/* Quote Decoration */}
                    <div className="pointer-events-none absolute right-8 top-2 font-serif text-[8rem] leading-none text-green-50 sm:right-12">
                        “
                    </div>


                    <div className="relative max-w-4xl">

                        {/* Label */}
                        <p className="text-sm font-bold tracking-[0.2em] text-green-700">
                            FOUNDER'S MESSAGE
                        </p>


                        {/* Heading */}
                        <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
                            A Message from the{" "}
                            <span className="text-green-800">
                                Founder
                            </span>
                        </h2>


                        {/* Accent */}
                        <div className="kr-hover-line mt-4 h-1 w-16 rounded-full bg-green-600" />


                        {/* Message */}
                        <div className="mt-7 rounded-3xl border border-green-100 bg-green-50/70 px-6 py-6 sm:px-8 sm:py-7">

                            <p className="text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
                                Agriculture is the foundation of our communities,
                                yet farmers and rural communities often face
                                challenges in accessing the right information,
                                resources, and opportunities.
                            </p>


                            <p className="mt-5 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
                                Krushisetu was created to bridge this gap by
                                connecting farmers and rural communities with
                                knowledge, support, training, and opportunities
                                that can help them grow.
                            </p>


                            <p className="mt-5 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
                                Through collaboration, innovation, and practical
                                support, our aim is to contribute towards stronger,
                                more resilient, and sustainable rural livelihoods.
                            </p>

                        </div>


                        {/* Founder */}
                        <div className="mt-6 border-t border-gray-100 pt-5">

                            <p className="text-base font-bold text-green-900">
                                Rachana Pandit Salunke
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Founder &amp; Managing Director, Krushisetu
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}


export default FounderMessage