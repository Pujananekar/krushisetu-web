import { programs } from "../../data/partners.js"
import ProgramsCard from "../../components/ProgramsCard"

const ProgramsHome = () => {
    return (
        <section id="programs" className="relative min-h-screen w-full overflow-hidden">

            {/* Background */}
            <img
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt="Programs background"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto mt-10 w-full max-w-350 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">

                    <h3 className="text-sm font-bold tracking-widest text-green-700">
                        OUR PROGRAMS
                    </h3>

                    <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-gray-950 sm:text-5xl lg:text-6xl">
                        Empowering <span className="text-green-800">Farmers,</span>
                        <br />
                        Enriching <span className="text-green-800">Communities</span>
                    </h1>

                    <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-green-600" />

                    <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
                        Our programs are designed to support farmers at every step —
                        from knowledge and resources to market and growth.
                    </p>

                </div>

                {/* Program Cards */}
                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {programs.map((program, index) => {
                        const Icon = program.icon

                        return (
                            <ProgramsCard
                                key={index}
                                Icon={Icon}
                                program={program}
                            />
                        )
                    })}

                </div>

                {/* CTA */}
                <div className="mt-10 flex justify-center">

                    <button className="kr-hover-button flex cursor-pointer items-center gap-3 rounded-[17px] bg-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-800">
                        Explore All Programs
                        <span>→</span>
                    </button>

                </div>

            </div>

        </section>
    )
}

export default ProgramsHome