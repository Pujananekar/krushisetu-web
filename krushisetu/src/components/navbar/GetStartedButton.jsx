import useSiteSettings from "../../hooks/useSiteSettings";

const GetStartedButton = () => {
    const { data: settings } = useSiteSettings();
    const whatsappNumber = settings?.whatsapp || "";

    const handleGetStarted = () => {
        if (!whatsappNumber) return;

        const message = encodeURIComponent(
            "Hello Krushisetu, I would like to know more about your services."
        );

        window.open(
            `https://wa.me/${String(whatsappNumber).replace(/\D/g, "")}?text=${message}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <button
            onClick={handleGetStarted}
            disabled={!whatsappNumber}
            className="hidden xl:flex shrink-0 items-center gap-3 px-5 2xl:px-6 h-12 rounded-[18px] bg-[#277A2D] hover:bg-[#1F6625] text-white font-semibold text-sm shadow-[0_5px_16px_rgba(39,122,45,0.25)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
            Get Started
        </button>
    );
};

export default GetStartedButton;