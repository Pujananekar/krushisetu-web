const ApplyFallback = ({
    title = "Application unavailable",
    message = "This application form is currently not available.",
}) => {
    return (
        <div className="mt-10 flex flex-col items-center overflow-hidden rounded-4xl border border-gray-200 bg-white px-7 py-14 text-center shadow-xl shadow-green-900/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-lg font-bold text-green-700">
                i
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
                {title}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                {message}
            </p>
        </div>
    )
}

export default ApplyFallback