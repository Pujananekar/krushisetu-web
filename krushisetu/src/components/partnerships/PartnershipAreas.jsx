import {
    Building2,
    GraduationCap,
    Landmark,
    Leaf,
    Landmark as Bank,
    Users,
} from "lucide-react"

const partnershipAreas = [
    {
        icon: Landmark,
        title: "Government & Agriculture Bodies",
        description:
            "Collaboration with government departments and agriculture-focused institutions for farmer awareness, facilitation, training, and rural development.",
        examples:
            "Government departments, ATMA, Krishi Vigyan Kendras",
    },
    {
        icon: Leaf,
        title: "Agriculture & Research Institutions",
        description:
            "Knowledge exchange, technical support, research linkages, demonstrations, and practical agricultural learning.",
        examples:
            "Agriculture universities, ICAR institutes, National Horticulture Board",
    },
    {
        icon: Bank,
        title: "Financial & Development Institutions",
        description:
            "Opportunities for financial awareness, enterprise support, rural development programs, and institutional linkages.",
        examples: "NABARD, banks, development organisations",
    },
    {
        icon: Building2,
        title: "Companies & CSR Foundations",
        description:
            "Collaborative initiatives supporting sustainable agriculture, rural livelihoods, skills, technology, and community development.",
        examples: "Companies, CSR foundations, development partners",
    },
    {
        icon: GraduationCap,
        title: "Colleges & Educational Institutions",
        description:
            "Training, internships, knowledge exchange, research, field learning, and student engagement opportunities.",
        examples: "Colleges, universities, academic institutions",
    },
    {
        icon: Users,
        title: "Rural & Enterprise Networks",
        description:
            "Partnership opportunities supporting producer groups, rural enterprises, livelihoods, value addition, and market linkages.",
        examples: "NRLM, MSME, PMFME, FPOs and related networks",
    },
]

const PartnershipAreas = () => {
    return (
        <section
            id="partnerships"
            className="px-6 py-16 sm:px-8 lg:px-12 xl:px-16"
        >
            <div className="mx-auto max-w-350">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Collaboration Network
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
                        Institutions we seek to
                        <span className="text-green-800">
                            {" "}
                            collaborate with.
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Krushisetu aims to build meaningful institutional
                        linkages that can strengthen agricultural knowledge,
                        farmer support, rural enterprise, and sustainable
                        development.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {partnershipAreas.map((area) => {
                        const Icon = area.icon

                        return (
                            <div
                                key={area.title}
                                className="kr-hover-card relative overflow-hidden rounded-3xl border border-gray-200 bg-white/85 p-6 shadow-lg shadow-gray-900/10"
                            >

                                <div className="kr-hover-icon relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Icon size={27} strokeWidth={2} />
                                </div>

                                <h3 className="kr-hover-title relative mt-6 text-xl font-bold text-gray-950">
                                    {area.title}
                                </h3>

                                <div className="kr-hover-line mt-4 h-1 w-10 rounded-full bg-green-600" />

                                <p className="mt-5 text-sm leading-7 text-gray-600">
                                    {area.description}
                                </p>

                                <div className="kr-hover-card-soft mt-5 rounded-2xl bg-green-50 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                                        Examples
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-gray-700">
                                        {area.examples}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default PartnershipAreas