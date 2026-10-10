import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const AboutHome = () => {
    return (
        <section
            id="about"
            className="flex min-h-screen w-full flex-col items-center justify-between gap-10 px-6 py-20 sm:px-8 md:flex-row lg:px-12 xl:px-16"
        >
            <div className="flex w-full max-w-4xl flex-col md:w-2/3">
                <div>
                    <h3 className="text-sm font-bold tracking-widest text-green-700">
                        ABOUT US
                    </h3>

                    <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-wide text-gray-950 sm:text-6xl lg:text-6xl xl:text-7xl">
                        ABOUT{" "}
                        <span className="text-green-800">
                            Krushisetu
                        </span>
                    </h1>

                    <div className="mt-5 h-0.5 w-[35%] rounded-2xl bg-green-600" />

                    <p className="mt-7 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        Krushisetu is an agriculture development initiative
                        of Be The Change Foundation. We work hand-in-hand
                        with farmers to bring knowledge, technology,
                        resources and opportunities to every farm and
                        farming community.
                    </p>
                </div>

                {/* Values */}
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="kr-hover-card flex flex-col items-center rounded-3xl border border-gray-200 bg-white/80 px-8 py-3 text-center shadow-xl shadow-gray-900/10 sm:items-start sm:text-left">
                        <h3 className="kr-hover-title text-lg font-bold text-green-900">
                            Farmer First
                        </h3>

                        <div className="kr-hover-line mt-3 h-px w-12 rounded-2xl bg-green-600" />

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Every initiative is designed for farmers.
                        </p>
                    </div>

                    <div className="kr-hover-card flex flex-col items-center rounded-3xl border border-gray-200 bg-white/80 px-8 py-3 text-center shadow-xl shadow-gray-900/10 sm:items-start sm:text-left">
                        <h3 className="kr-hover-title text-lg font-bold text-green-900">
                            Sustainable Impact
                        </h3>

                        <div className="kr-hover-line mt-3 h-px w-12 rounded-2xl bg-green-600" />

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Building long-term value for rural communities.
                        </p>
                    </div>

                    <div className="kr-hover-card flex flex-col items-center rounded-3xl border border-gray-200 bg-white/80 px-8 py-3 text-center shadow-xl shadow-gray-900/10 sm:items-start sm:text-left">
                        <h3 className="kr-hover-title text-lg font-bold text-green-900">
                            Trust and Transparency
                        </h3>

                        <div className="kr-hover-line mt-3 h-px w-12 rounded-2xl bg-green-600" />

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Ethical practices and strong partnerships.
                        </p>
                    </div>
                </div>

                {/* About Page CTA */}
                <Link
                    to="/about"
                    className="kr-hover-button mt-8 inline-flex w-fit items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-900 hover:shadow-xl hover:shadow-green-900/25"
                >
                    Explore About Us

                    <ArrowRight
                        size={18}
                        strokeWidth={2}
                        className="kr-hover-arrow"
                    />
                </Link>
            </div>

            {/* Founder Card */}
            <Link
                to="/about/founder"
                className="kr-hover-card group w-full max-w-md rounded-[28px] border border-gray-200 bg-white/85 p-7 shadow-xl shadow-gray-900/10 sm:p-9 md:mt-0 md:w-1/3"
            >
                <div className="flex flex-col items-center justify-center gap-5">
                    <img
                        className="h-40 w-40 rounded-full border-4 border-white object-cover object-center shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-44 sm:w-44"
                        src={`${import.meta.env.BASE_URL}images/about_women_pic.png`}
                        alt="Rachana Pandit Salunke, Founder and Managing Director of Krushisetu"
                    />

                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h3 className="kr-hover-title text-2xl font-bold text-green-800">
                            Rachana Pandit Salunke
                        </h3>

                        <p className="text-sm text-gray-600">
                            Founder & Managing Director, Krushisetu
                        </p>

                        <div className="kr-hover-line mt-3 h-px w-20 rounded-full bg-green-600" />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h4 className="text-lg font-bold text-green-900">
                            Qualifications
                        </h4>

                        <p className="text-sm text-gray-700">
                            B.Sc. in Agriculture
                        </p>

                        <span className="text-sm text-gray-700">
                            Post Graduation in Agribusiness Management
                        </span>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
                        <div className="h-px w-full rounded-full bg-gray-300 transition-colors duration-300 group-hover:bg-green-200" />

                        <h4 className="text-lg font-bold text-green-900">
                            Role in the Foundation
                        </h4>

                        <p className="text-sm text-gray-700">
                            Secretary, Be The Change Foundation
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-green-800">
                        View Founder Profile
                        <ArrowRight
                            size={16}
                            strokeWidth={2}
                        />
                    </div>
                </div>
            </Link>
        </section>
    )
}

export default AboutHome