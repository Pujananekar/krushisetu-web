import { ArrowLeft, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

const ApplicationSuccess = ({
    referenceNumber,
    title = "Thank you for registering",
    message = "Your application has been submitted successfully. Our team will review your information and contact you if required.",
    label = "APPLICATION SUBMITTED",
    buttonText = "Submit Another Application",
    onReset,
}) => {
    return (
        <section className="px-5 pb-20 pt-40 md:px-8 md:pt-44 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <Link
                    to="/apply"
                    className="inline-flex items-center gap-2 font-semibold text-green-700 transition-all duration-300 hover:gap-3"
                >
                    <ArrowLeft size={18} />
                    Back to Join / Apply
                </Link>

                <div className="mx-auto mt-8 max-w-4xl rounded-4xl border border-gray-200 bg-white p-8 text-center shadow-xl shadow-gray-900/5 md:p-14">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                        <CheckCircle size={34} />
                    </div>

                    <p className="mt-6 text-sm font-bold uppercase tracking-widest text-green-700">
                        {label}
                    </p>

                    <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">
                        {title}
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
                        {message}
                    </p>

                    {referenceNumber && (
                        <div className="mx-auto mt-7 max-w-sm rounded-2xl bg-green-50 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Reference Number
                            </p>

                            <p className="mt-1 text-xl font-black text-green-800">
                                {referenceNumber}
                            </p>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={onReset}
                        className="mt-8 rounded-2xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ApplicationSuccess