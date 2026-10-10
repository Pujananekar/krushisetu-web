import { Check } from "lucide-react";

const DepartmentBeneficiaries = ({ department }) => {
    const beneficiaries = department?.beneficiaries ?? [];

    return (
        <section className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-16">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
                {/* Section Introduction */}
                <div className="rounded-4xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-900/5 sm:p-9 lg:p-10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                        <Check size={22} strokeWidth={2.5} />
                    </div>

                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-green-700">
                        Who We Support
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                        Who can benefit?
                    </h2>

                    <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                        This department is designed to support the communities
                        and groups identified for its agricultural development
                        activities.
                    </p>
                </div>

                {/* Beneficiary Cards */}
                {beneficiaries.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {beneficiaries.map((beneficiary, index) => (
                            <article
                                key={`${index}-${beneficiary}`}
                                className="kr-hover-card-soft group flex min-h-[110px] items-start gap-4 rounded-3xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50/70 hover:shadow-lg hover:shadow-green-900/5 sm:p-6"
                            >
                                <div className="kr-hover-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-green-700 transition-colors duration-200 group-hover:bg-green-700 group-hover:text-white">
                                    <Check size={19} strokeWidth={2.5} />
                                </div>

                                <span className="kr-hover-title pt-1 text-sm font-semibold leading-6 text-gray-800 transition-colors duration-200 group-hover:text-green-900 sm:text-base">
                                    {beneficiary}
                                </span>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-lg shadow-gray-900/5 sm:p-10">
                        <p className="text-base leading-7 text-gray-600">
                            Beneficiary information is currently unavailable.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DepartmentBeneficiaries;