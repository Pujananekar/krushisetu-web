import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import departmentIcons from "../../constants/departmentIcons";

const DepartmentHero = ({ department }) => {
    const Icon = departmentIcons?.[department?.icon];

    return (
        <section className="bg-[#ECFBF1] px-5 pb-8 pt-8 sm:px-8 lg:px-12">
            <div className="mx-auto mt-20 max-w-[1400px]">
                <Link
                    to="/departments"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-green-700"
                >
                    <ArrowLeft size={17} />
                    Back to Departments
                </Link>

                <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-100/70" />
                        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-100/50" />
                        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-50/80 to-transparent" />
                    </div>

                    <div className="relative p-7 sm:p-10 lg:p-12">
                        {/* Department Label */}
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/10">
                                    {Icon ? (
                                        <Icon size={24} strokeWidth={2} />
                                    ) : (
                                        <span className="text-lg font-bold">
                                            K
                                        </span>
                                    )}
                                </div>

                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                    Krushisetu Department
                                </span>
                            </div>

                            {department?.cta && (
                                <span className="rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-bold text-green-800">
                                    Department Support
                                </span>
                            )}
                        </div>

                        {/* Department Title */}
                        <div className="mt-8 max-w-5xl">
                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                                {department?.title}
                            </h1>

                            <div className="mt-6 h-1 w-20 rounded-full bg-green-600" />

                            {department?.description && (
                                <p className="mt-6 max-w-4xl whitespace-pre-line text-base leading-8 text-gray-600 sm:text-lg">
                                    {department.description}
                                </p>
                            )}
                        </div>

                        {/* Department Action */}
                        {department?.cta && (
                            <div className="mt-8 border-t border-gray-100 pt-7">
                                <Link
                                    to={department.cta_path || "/apply"}
                                    className="group inline-flex items-center gap-3 rounded-2xl bg-green-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl"
                                >
                                    <span>{department.cta}</span>
                                    <ArrowRight
                                        size={19}
                                        strokeWidth={2}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DepartmentHero;