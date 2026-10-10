import {
    CheckCircle2,
    ClipboardList,
    MessageCircle,
    Send,
} from "lucide-react"

const steps = [
    {
        icon: ClipboardList,
        title: "Choose a Path",
        description:
            "Select the application or enquiry pathway that matches your requirement.",
    },
    {
        icon: Send,
        title: "Submit Details",
        description:
            "Provide the requested information and give the required consent.",
    },
    {
        icon: MessageCircle,
        title: "Receive Confirmation",
        description:
            "Your submission can later be connected to an acknowledgement and reference workflow.",
    },
    {
        icon: CheckCircle2,
        title: "Follow Up",
        description:
            "The relevant Krushisetu team can review the enquiry and follow up as required.",
    },
]

const ApplyProcess = () => {
    return (
        <section className="px-5 pb-20 md:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350 rounded-4xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-900/5 md:p-10 lg:p-12">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                        Simple Process
                    </p>

                    <h2 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">
                        From enquiry to{" "}
                        <span className="text-green-700">action</span>
                    </h2>
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map(
                        ({ icon: Icon, title, description }, index) => (
                            <div
                                key={title}
                                className="relative text-center"
                            >
                                <div className="kr-hover-icon mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                                    <Icon size={25} />
                                </div>

                                <div className="mt-4 text-sm font-bold text-green-700">
                                    0{index + 1}
                                </div>

                                <h3 className="kr-hover-title mt-2 font-bold text-green-950">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    {description}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default ApplyProcess