const DepartmentHeader = () => {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-sm font-bold tracking-widest text-green-700">
                OUR SERVICES
            </h3>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-gray-950 sm:text-5xl lg:text-6xl">
                What <span className="text-green-800">We Offer</span>
            </h1>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-green-600" />

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                From advisory to training, certification to market linkages,
                we provide end-to-end support for farmers and rural
                communities.
            </p>
        </div>
    )
}

export default DepartmentHeader