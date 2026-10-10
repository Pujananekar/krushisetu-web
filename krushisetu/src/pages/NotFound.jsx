import { Link } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

const NotFound = () => {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden">
            <img
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                src={`${import.meta.env.BASE_URL}images/page-not-found.png`}
                alt=""
            />

            <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
                <div className="max-w-xl text-center">
                    <h1 className="text-4xl font-bold text-green-800 sm:text-5xl lg:text-6xl">
                        Page Not Found
                    </h1>

                    <p className="mt-4 text-xl leading-relaxed text-gray-700 text-shadow-2xs">
                        The page you are looking for doesn't exist or may have
                        been moved to another location.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            to="/"
                            className="kr-hover-button inline-flex items-center gap-2 rounded-[17px] bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
                        >
                            <Home size={18} />
                            Back to Home
                        </Link>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="kr-hover-button inline-flex cursor-pointer items-center gap-2 rounded-[17px] border border-gray-300 bg-white/80 px-6 py-3 font-semibold text-gray-700 hover:bg-white"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound