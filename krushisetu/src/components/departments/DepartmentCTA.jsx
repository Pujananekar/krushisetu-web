import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DepartmentCTA = ({ department }) => {
    return (
        <section className="px-5 pt-8 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20 xl:px-16">
            <div className="mx-auto max-w-[1400px]">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-green-800 bg-green-900 px-7 py-12 shadow-xl shadow-green-900/15 sm:px-10 lg:px-14 lg:py-14">
                    {/* Decorative Background */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-700/30" />
                    <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-green-800/40" />
                    <div className="absolute -bottom-0 -left-20 h-40 w-40 rounded-full bg-emerald-500/10" />

                    <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                        {/* CTA Content */}
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 text-green-200">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-800/70">
                                    <MessageCircle size={19} />
                                </div>

                                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                                    Need Support?
                                </span>
                            </div>

                            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                                Get connected with Krushisetu
                            </h2>

                            <p className="mt-4 text-base leading-7 text-green-100 sm:text-lg">
                                Connect with Krushisetu for support related to{" "}
                                {department?.title
                                    ? `the ${department.title}`
                                    : "this department"}{" "}
                                and its agricultural development activities.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <Link
                            to={department?.cta_path || "/apply"}
                            className="kr-hover-button group/department-contact flex shrink-0 items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-base font-bold text-green-900 shadow-lg transition-colors hover:bg-green-50 hover:shadow-xl"
                        >
                            <span>
                                {department?.cta || "Contact Us"}
                            </span>

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-200 group-hover/department-contact:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DepartmentCTA;