import { Link } from "react-router-dom"

const Home = () => {
    return (
        <section id="home" className="relative min-h-screen w-full overflow-hidden">
            <picture className="absolute inset-0 -z-20">
                <source media="(max-width: 767px)" srcSet={`${import.meta.env.BASE_URL}images/home-page-mobile.png`} />
                <img src={`${import.meta.env.BASE_URL}images/home-page-image.png`} alt="Krushisetu agriculture" className="h-full w-full object-cover object-center" />
            </picture>

            <div className="absolute inset-0 z-0 w-[90%] bg-linear-to-r from-white to-transparent md:w-[70%]" />

            <div className="relative z-10 w-full max-w-350 p-10 pt-20 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-6xl lg:text-6xl xl:text-7xl">
                        Empowering Farmers
                        <br />
                        <span className="text-green-800">Transforming Agriculture</span>
                    </h1>

                    <h3 className="text-[23px] font-semibold">
                        An Initiative of Be The Change Foundation
                    </h3>

                    <p className="text-[17px] md:w-[70%] lg:w-[50%] xl:w-[40%]">
                        Empowering farmers through knowledge, technology, market access, and goverment schemes while creating sustainable income for the Foundation
                    </p>

                    <div className="flex gap-5 pt-6">
                        <Link to="/apply/farmer" className="kr-hover-button cursor-pointer rounded-2xl bg-green-700 px-4 py-3 font-semibold text-white shadow-2xl shadow-gray-700 hover:bg-green-800">
                            Join as a Farmer
                        </Link>

                        <Link to="/apply/partnership" className="kr-hover-button cursor-pointer rounded-2xl border border-gray-300 bg-white/70 px-4 py-3 font-semibold text-gray-800 shadow-2xl shadow-gray-700 backdrop-blur-xs hover:bg-white">
                            Partner with Us
                        </Link>

                        <Link to="/apply/service" className="kr-hover-button cursor-pointer rounded-2xl bg-yellow-400 px-4 py-3 font-semibold text-green-950 shadow-2xl shadow-gray-700 hover:bg-yellow-300">
                            Apply for Scheme Help
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex w-full max-w-4xl flex-wrap items-center justify-around gap-10 rounded-3xl border border-gray-200 bg-white/70 p-5 shadow-2xl shadow-gray-600 backdrop-blur-xs">
                    <div className="flex-1 items-center">
                        <h4 className="text-2xl font-bold text-green-900">1000+</h4>
                        <h5 className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">Farmer Members</h5>
                    </div>

                    <div className="flex-1 items-center">
                        <h4 className="text-2xl font-bold text-green-900">10000+</h4>
                        <h5 className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">Long-term Reach</h5>
                    </div>

                    <div className="flex-1 items-center">
                        <h4 className="text-2xl font-bold text-green-900">15+</h4>
                        <h5 className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">Programs</h5>
                    </div>

                    <div className="flex-1 items-center">
                        <h4 className="text-2xl font-bold text-green-900">40L+</h4>
                        <h5 className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">Potential Amount Impact</h5>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home