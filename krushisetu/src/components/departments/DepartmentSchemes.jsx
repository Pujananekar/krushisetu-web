import DepartmentFallback from "./DepartmentFallback"

const DepartmentSchemes = ({ department }) => {
    const relatedSchemes = department.relatedSchemes ?? []

    return (
        <section className="relative w-full px-6 py-20 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
            <div className="mx-auto max-w-350">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                    Related Information
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                    Related Schemes
                </h2>

                {relatedSchemes.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedSchemes.map((scheme, index) => (
                            <div
                                key={index}
                                className="kr-hover-card flex min-h-36 flex-col justify-between rounded-3xl border border-gray-200 bg-white/95 px-6 py-7 shadow-lg shadow-gray-900/5"
                            >
                                <h3 className="kr-hover-title text-lg font-bold text-gray-900">
                                    {scheme}
                                </h3>

                                <div className="kr-hover-line mt-5 h-0.5 w-10 rounded-full bg-green-600" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <DepartmentFallback
                        title="Related schemes unavailable"
                        message="Related scheme information for this department has not been added yet."
                    />
                )}
            </div>
        </section>
    )
}

export default DepartmentSchemes