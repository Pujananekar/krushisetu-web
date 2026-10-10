import { useState } from "react";
import {
    Sprout,
    ChevronDown,
    Send,
} from "lucide-react";
import useSiteSettings from "../../hooks/useSiteSettings.js";

const FAQHome = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const { data: settings } = useSiteSettings();
    const whatsappNumber = settings?.whatsapp || "";

    const faqs = [
        {
            question: "Who can join Krushisetu?",
            answer:
                "Krushisetu is a farmer-focused initiative. The exact eligibility criteria will be finalized during implementation.",
        },
        {
            question: "Is there a membership fee?",
            answer:
                "The membership fee has not been specified yet and can be configured based on the final Krushisetu membership structure.",
        },
        {
            question: "Which government schemes do you help with?",
            answer:
                "We help farmers access schemes including PM Kisan, PM Fasal Bima Yojana, Soil Health Card, PM Kusum Solar Pump, National Horticulture Mission, irrigation and livestock subsidies, and NABARD schemes.",
        },
        {
            question: "How can companies partner via CSR?",
            answer:
                "Companies can connect with Krushisetu for agriculture-focused CSR projects. The contact and partnership process can be used to understand your requirements.",
        },
        {
            question: "What training is offered?",
            answer:
                "Training includes organic farming, mushroom cultivation, beekeeping, agribusiness, digital marketing, and other agriculture-focused programs.",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleWhatsApp = () => {
        const number = String(whatsappNumber).replace(/\D/g, "");

        if (!number) {
            console.error(
                "WhatsApp number is not configured in site settings."
            );
            return;
        }

        const message = encodeURIComponent(
            "Hello Krushisetu, I have a question about your services."
        );

        const whatsappUrl = `https://wa.me/${number}?text=${message}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <section
            id="faq"
            className="relative min-h-screen w-full overflow-hidden"
        >
            {/* Background */}
            <img
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-12 md:py-16">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <p className="text-xl font-bold tracking-wide text-green-700">
                        FAQ
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-green-950 md:text-5xl lg:text-6xl">
                        Frequently Asked Questions
                    </h1>

                    <div className="mt-4 h-1 w-10 rounded-full bg-green-700" />

                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
                        Get quick answers to common questions about Krushisetu,
                        our services, schemes and how we support farmers.
                    </p>
                </div>

                {/* FAQ Content */}
                <div className="mt-10 grid w-full gap-6 lg:grid-cols-[0.7fr_1.5fr]">
                    {/* Left Information Card */}
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-green-100 bg-green-50/90 p-8 text-center shadow-lg lg:p-10">
                        {/* Icon */}
                        <div className="kr-hover-icon flex h-32 w-32 items-center justify-center rounded-full bg-green-100 text-green-800">
                            <Sprout size={65} strokeWidth={1.5} />
                        </div>

                        <h2 className="mt-8 text-2xl font-bold leading-tight text-green-900 md:text-3xl">
                            We are here to
                            <br />
                            help you grow
                        </h2>

                        <div className="mt-5 h-1 w-10 rounded-full bg-green-600" />

                        <p className="mt-6 max-w-xs text-base leading-relaxed text-gray-600 md:text-lg">
                            Still have questions?
                            <br />
                            Our team is always happy
                            <br />
                            to assist you.
                        </p>

                        {/* WhatsApp */}
                        <button
                            type="button"
                            onClick={handleWhatsApp}
                            disabled={!whatsappNumber}
                            className="kr-hover-button mt-8 flex items-center gap-3 rounded-2xl bg-green-800 px-6 py-4 font-semibold text-white shadow-lg hover:bg-green-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send size={28} />

                            <span className="text-left">
                                Chat with us on
                                <br />
                                WhatsApp
                            </span>
                        </button>
                    </div>

                    {/* Questions */}
                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={faq.question}
                                    className={`overflow-hidden rounded-2xl border bg-white/95 shadow-md ${
                                        isOpen
                                            ? "border-green-200 shadow-lg"
                                            : "border-gray-200"
                                    }`}
                                >
                                    {/* Question */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFAQ(index)}
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Number */}
                                            <span
                                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
                                                    isOpen
                                                        ? "bg-green-900"
                                                        : "bg-green-800"
                                                }`}
                                            >
                                                {index + 1}
                                            </span>

                                            {/* Question */}
                                            <span className="text-base font-bold text-green-950 md:text-xl">
                                                {faq.question}
                                            </span>
                                        </div>

                                        {/* Arrow */}
                                        <ChevronDown
                                            size={25}
                                            className={`shrink-0 text-green-800 transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Answer */}
                                    <div
                                        className={`grid transition-all duration-300 ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-5 pb-6 pl-19 text-sm leading-relaxed text-gray-600 md:px-7 md:pb-7 md:pl-23 md:text-base">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQHome;