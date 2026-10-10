import DepartmentFallback from "./DepartmentFallback";

const DepartmentProcess = ({ department }) => {
    const process = department?.process ?? [];

    return (
        <section className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-16">
            <div className="mx-auto max-w-[1400px]">
                {/* Section Heading */}
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        How It Works
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                        Our Process
                    </h2>

                    <div className="mt-5 h-1 w-16 rounded-full bg-green-600" />

                    <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                        Understand the general steps involved in getting
                        support through this department.
                    </p>
                </div>

                {/* Process Steps */}
                {process.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {process.map((step, index) => (
                            <article
                                key={`${index}-${step}`}
                                className="kr-hover-card group flex min-h-[190px] flex-col items-start rounded-3xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/10 sm:p-7"
                            >
                                <div className="kr-hover-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-sm font-bold text-green-700 transition-colors duration-300 group-hover:bg-green-700 group-hover:text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <h3 className="kr-hover-title mt-6 text-base font-bold leading-7 text-gray-900 transition-colors duration-200 group-hover:text-green-800 sm:text-lg">
                                    {step}
                                </h3>

                                <div className="kr-hover-line mt-auto w-full pt-5">
                                    <div className="h-1 w-12 rounded-full bg-green-600 transition-all duration-300 group-hover:w-20" />
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="mt-8">
                        <DepartmentFallback
                            title="Process information unavailable"
                            message="The process details for this department have not been added yet."
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default DepartmentProcess;