import { useState } from "react"
import { ChevronDown } from "lucide-react"
import DepartmentFallback from "./DepartmentFallback"

const DepartmentFAQ = ({ department }) => {
    const faqs = department.faq ?? []

    const [openIndex, setOpenIndex] = useState(
        faqs.length > 0 ? 0 : null
    )

    const toggleFAQ = (index) => {
        setOpenIndex((currentIndex) =>
            currentIndex === index ? null : index
        )
    }

    return (
        <section className="relative w-full px-6 py-20 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        FAQ
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
                        Frequently Asked Questions
                    </h2>

                    <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-green-700" />

                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
                        Find answers to common questions about this
                        department, its services and support.
                    </p>
                </div>

                {faqs.length > 0 ? (
                    <div className="mt-10 flex flex-col gap-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index

                            return (
                                <div
                                    key={faq.id ?? index}
                                    className={`overflow-hidden rounded-2xl border bg-white/95 shadow-md transition-all duration-300 ${
                                        isOpen
                                            ? "border-green-200 shadow-lg shadow-green-900/5"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFAQ(index)}
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            <span
                                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white transition-colors duration-300 ${
                                                    isOpen
                                                        ? "bg-green-900"
                                                        : "bg-green-800"
                                                }`}
                                            >
                                                {index + 1}
                                            </span>

                                            <span
                                                className={`text-base font-bold transition-colors duration-300 md:text-xl ${
                                                    isOpen
                                                        ? "text-green-900"
                                                        : "text-green-950"
                                                }`}
                                            >
                                                {faq.question}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            size={25}
                                            className={`shrink-0 text-green-800 transition-transform duration-300 ${
                                                isOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-5 pb-6 pl-20 text-sm leading-relaxed text-gray-600 md:px-7 md:pb-7 md:pl-24 md:text-base">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="mt-10">
                        <DepartmentFallback
                            title="FAQ information unavailable"
                            message="Frequently asked questions for this department have not been added yet."
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

export default DepartmentFAQ