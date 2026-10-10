import {
    BriefcaseBusiness,
    Building2,
    GraduationCap,
    HandHeart,
    Handshake,
    Tractor,
    Wrench,
} from "lucide-react"
import ApplyCard from "./ApplyCard"

const options = [
    {
        icon: Tractor,
        title: "Farmer Registration",
        description:
            "Register as a farmer and share the areas where you would like agricultural guidance or support.",
        path: "/apply/farmer",
    },
    {
        icon: GraduationCap,
        title: "Training Registration",
        description:
            "Register your interest in Krushisetu training programs and learning opportunities.",
        path: "/apply/training",
    },
    {
        icon: Wrench,
        title: "Service Request",
        description:
            "Submit a request for advisory, facilitation or another Krushisetu service.",
        path: "/apply/service",
    },
    {
        icon: BriefcaseBusiness,
        title: "Internship Application",
        description:
            "Students can share their academic background, interests and internship requirements.",
        path: "/apply/internship",
    },
    {
        icon: Building2,
        title: "FPO / Institution Enquiry",
        description:
            "For FPOs, producer companies and institutions looking to explore support or collaboration.",
        path: "/apply/fpo",
    },
    {
        icon: Handshake,
        title: "CSR / Partnership Enquiry",
        description:
            "Organisations can share their partnership, CSR or development collaboration requirements.",
        path: "/apply/partnership",
    },
    {
        icon: HandHeart,
        title: "Volunteer / Expert Interest",
        description:
            "Share your interest in contributing expertise, knowledge or volunteer support.",
        path: "/apply/volunteer",
    },
]

const ApplyOptions = () => {
    return (
        <section className="px-5 pb-20 md:px-8 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                        Choose Your Path
                    </p>

                    <h2 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">
                        How would you like to{" "}
                        <span className="text-green-700">connect?</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Select the option that best matches your requirement.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {options.map((option) => (
                        <ApplyCard
                            key={option.path}
                            {...option}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ApplyOptions