const ApplyHero = () => {
    return (
        <section className="relative overflow-hidden px-5 pb-16 pt-40 md:px-8 md:pb-20 md:pt-44 lg:px-12 xl:px-16">
            <div className="absolute inset-0 bg-[url('/images/services_bg.png')] bg-cover bg-center opacity-10" />
            <div className="absolute inset-0 bg-linear-to-b from-white/70 via-[#F6FAF7]/90 to-[#F6FAF7]" />

            <div className="relative z-10 mx-auto max-w-350 text-center">
                <p className="text-lg font-bold tracking-wide text-green-700 md:text-xl">
                    JOIN / APPLY
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight text-green-950 md:text-5xl lg:text-6xl">
                    Take the{" "}
                    <span className="text-green-700">Next Step</span>
                </h1>

                <div className="kr-hover-line mx-auto mt-5 h-1 w-10 rounded-full bg-green-700" />

                <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
                    Whether you are a farmer, student, organisation,
                    institution, volunteer or development partner, choose the
                    pathway that matches your requirement.
                </p>
            </div>
        </section>
    )
}

export default ApplyHero