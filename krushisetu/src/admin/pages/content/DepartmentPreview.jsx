import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    ArrowUpRight,
    Building2,
    CheckCircle2,
    Edit3,
    Globe2,
    Image as ImageIcon,
    Layers3,
    MapPin,
    Pencil,
    Share2,
} from "lucide-react"

const departments = {
    "1": {
        name: "Agriculture & Farming",
        slug: "agriculture-farming",
        type: "Core Department",
        icon: "🌾",
        status: "Published",
        shortDescription:
            "Farmer support, agricultural guidance, crop planning and sustainable farming initiatives.",
        description:
            "Krushisetu supports farmers through agricultural guidance, crop planning, sustainable farming practices and access to relevant programs and services.",
        updated: "28 Sep 2026",
        updatedBy: "Admin",
        programs: [
            {
                title: "Crop Planning Support",
                description:
                    "Guidance for farmers on crop planning, seasonal activities and better farming practices.",
            },
            {
                title: "Sustainable Farming",
                description:
                    "Information and support around sustainable and resource-efficient agricultural practices.",
            },
            {
                title: "Farmer Support Services",
                description:
                    "Access to relevant information, services and support opportunities for farmers.",
            },
        ],
    },

    "2": {
        name: "Animal Husbandry",
        slug: "animal-husbandry",
        type: "Core Department",
        icon: "🐄",
        status: "Published",
        shortDescription:
            "Livestock development, animal health awareness and farmer support services.",
        description:
            "Programs and services focused on livestock development, animal health awareness and support for farmers involved in animal husbandry.",
        updated: "26 Sep 2026",
        updatedBy: "Admin",
        programs: [
            {
                title: "Livestock Development",
                description:
                    "Support and information related to livestock development and management.",
            },
            {
                title: "Animal Health Awareness",
                description:
                    "Resources and awareness initiatives focused on animal health and wellbeing.",
            },
            {
                title: "Farmer Support",
                description:
                    "Information and assistance for farmers involved in animal husbandry.",
            },
        ],
    },

    "3": {
        name: "Women Empowerment",
        slug: "women-empowerment",
        type: "Social Development",
        icon: "👩",
        status: "Published",
        shortDescription:
            "Programs supporting women-led livelihoods, entrepreneurship and community development.",
        description:
            "Initiatives focused on women's livelihoods, entrepreneurship, skill development and participation in community development.",
        updated: "25 Sep 2026",
        updatedBy: "Content Admin",
        programs: [
            {
                title: "Women Entrepreneurship",
                description:
                    "Support and information for women interested in entrepreneurship and livelihood opportunities.",
            },
            {
                title: "Skill Development",
                description:
                    "Skill-focused opportunities designed to strengthen women's economic participation.",
            },
            {
                title: "Community Initiatives",
                description:
                    "Programs encouraging women-led participation in community development.",
            },
        ],
    },
}

const fallbackDepartment = {
    name: "Department Preview",
    slug: "department-preview",
    type: "Department",
    icon: "🌱",
    status: "Draft",
    shortDescription:
        "Preview information for this Krushisetu department.",
    description:
        "Department content will appear here once the department has been configured.",
    updated: "Not available",
    updatedBy: "Not available",
    programs: [],
}

const DepartmentPreview = () => {
    const { id } = useParams()

    const department = departments[id] || fallbackDepartment

    return (
        <section className="min-h-full bg-[#F6FAF7]">
            {/* Admin Preview Bar */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-375 flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/content/departments"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>Content</span>
                                <span>/</span>
                                <span>Departments</span>
                                <span>/</span>
                                <span className="font-medium text-green-700">
                                    Preview
                                </span>
                            </div>

                            <h1 className="mt-0.5 text-lg font-bold text-gray-900">
                                {department.name}
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            to={`/admin/content/departments/${id}/edit`}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Edit3 size={16} />
                            Edit Department
                        </Link>

                        <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <Share2 size={16} />
                            Share Preview
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Notice */}
            <div className="mx-auto max-w-375 px-4 pt-5 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                            <Globe2 size={17} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-green-900">
                                Website Preview
                            </p>

                            <p className="text-xs text-green-800/70">
                                This is how the department content can appear
                                on the public Krushisetu website.
                            </p>
                        </div>
                    </div>

                    <span
                        className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            department.status === "Published"
                                ? "border-green-200 bg-white text-green-700"
                                : "border-amber-200 bg-white text-amber-700"
                        }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${
                                department.status === "Published"
                                    ? "bg-green-500"
                                    : "bg-amber-500"
                            }`}
                        />
                        {department.status}
                    </span>
                </div>
            </div>

            {/* Simulated Public Website */}
            <div className="mx-auto max-w-375 px-4 py-5 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10">
                    {/* Public Navbar */}
                    <header className="border-b border-gray-100 bg-white/95">
                        <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-lg">
                                    🌱
                                </div>

                                <div>
                                    <p className="text-base font-bold text-green-900">
                                        Krushisetu
                                    </p>

                                    <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                                        Empowering Communities
                                    </p>
                                </div>
                            </div>

                            <nav className="hidden items-center gap-6 lg:flex">
                                <span className="text-sm font-medium text-gray-600">
                                    About
                                </span>
                                <span className="text-sm font-medium text-green-700">
                                    Departments
                                </span>
                                <span className="text-sm font-medium text-gray-600">
                                    Schemes
                                </span>
                                <span className="text-sm font-medium text-gray-600">
                                    Training
                                </span>
                                <span className="text-sm font-medium text-gray-600">
                                    Contact
                                </span>
                            </nav>

                            <button
                                type="button"
                                className="hidden rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white sm:block"
                            >
                                Get Support
                            </button>
                        </div>
                    </header>

                    {/* Breadcrumb */}
                    <div className="border-b border-gray-100 bg-[#FAFCFB] px-5 py-4 sm:px-8 lg:px-10">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span>Home</span>
                            <span>/</span>
                            <span>Departments</span>
                            <span>/</span>
                            <span className="font-medium text-green-700">
                                {department.name}
                            </span>
                        </div>
                    </div>

                    {/* Hero */}
                    <section className="relative overflow-hidden bg-linear-to-br from-green-950 via-green-900 to-green-800 px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/10" />
                        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

                        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_420px]">
                            <div>
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-green-100">
                                    <Building2 size={14} />
                                    {department.type}
                                </div>

                                <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                    {department.name}
                                </h2>

                                <p className="mt-5 max-w-2xl text-base leading-7 text-green-50/80 sm:text-lg">
                                    {department.shortDescription}
                                </p>

                                <div className="mt-7 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-green-900 shadow-lg transition hover:-translate-y-0.5"
                                    >
                                        Explore Programs
                                        <ArrowUpRight size={17} />
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                                    >
                                        Get Support
                                    </button>
                                </div>
                            </div>

                            {/* Hero Card */}
                            <div className="relative">
                                <div className="rounded-4xl border border-white/10 bg-white/10 p-3 shadow-2xl shadow-black/10">
                                    <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl bg-linear-to-br from-green-100 to-emerald-50 p-8 text-center">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-4xl bg-white text-5xl shadow-xl">
                                            {department.icon}
                                        </div>

                                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
                                            Krushisetu Department
                                        </p>

                                        <p className="mt-2 max-w-xs text-sm leading-6 text-green-950/70">
                                            Supporting communities through
                                            accessible programs and services.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                    About the department
                                </p>

                                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Supporting meaningful development
                                </h3>

                                <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600">
                                    {department.description}
                                </p>

                                <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
                                    Through focused programs, information and
                                    community support, this department connects
                                    beneficiaries with relevant opportunities
                                    and services.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-green-100 bg-green-50 p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                    <Layers3 size={21} />
                                </div>

                                <p className="mt-5 text-3xl font-bold text-green-950">
                                    {department.programs.length || 0}
                                </p>

                                <p className="mt-1 text-sm font-medium text-green-800">
                                    Featured programs
                                </p>

                                <div className="mt-5 h-px bg-green-200" />

                                <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-green-800/70">
                                    <MapPin
                                        size={14}
                                        className="mt-0.5 shrink-0"
                                    />
                                    <span>
                                        Programs and services may vary by
                                        location and eligibility.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Programs */}
                    <section className="bg-[#F6FAF7] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                    Programs & Services
                                </p>

                                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                    Explore what we offer
                                </h3>
                            </div>

                            <span className="text-sm text-gray-500">
                                {department.programs.length} programs
                            </span>
                        </div>

                        {department.programs.length > 0 ? (
                            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {department.programs.map(
                                    (program, index) => (
                                        <article
                                            key={program.title}
                                            className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                                        >
                                            <div className="kr-hover-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-sm font-bold text-green-700">
                                                0{index + 1}
                                            </div>

                                            <h4 className="kr-hover-title mt-5 text-lg font-bold text-gray-900">
                                                {program.title}
                                            </h4>

                                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                                {program.description}
                                            </p>

                                            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-green-700">
                                                Learn more
                                                <ArrowUpRight size={14} />
                                            </div>
                                        </article>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                                <Layers3
                                    size={28}
                                    className="mx-auto text-gray-300"
                                />

                                <p className="mt-3 text-sm font-semibold text-gray-700">
                                    No programs added yet
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Programs will appear here once they are
                                    configured.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* CTA */}
                    <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                        <div className="overflow-hidden rounded-4xl bg-green-900 px-6 py-10 sm:px-10">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-300">
                                        Need assistance?
                                    </p>

                                    <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                                        Connect with Krushisetu
                                    </h3>

                                    <p className="mt-2 max-w-xl text-sm leading-6 text-green-100/70">
                                        Explore available services or get
                                        support related to this department.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-green-900 transition hover:-translate-y-0.5"
                                    >
                                        View Services
                                        <ArrowUpRight size={16} />
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                    >
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Public Footer */}
                    <footer className="border-t border-gray-100 bg-[#FAFCFB] px-5 py-6 sm:px-8 lg:px-10">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-gray-500">
                                © 2026 Krushisetu. All rights reserved.
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>Privacy Policy</span>
                                <span>Terms</span>
                                <span>Contact</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Admin Metadata */}
            <div className="mx-auto max-w-375 px-4 pb-8 sm:px-6 lg:px-8">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Department URL
                        </p>

                        <p className="mt-2 break-all text-sm font-medium text-gray-700">
                            /departments/{department.slug}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Last Updated
                        </p>

                        <p className="mt-2 text-sm font-medium text-gray-700">
                            {department.updated}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            by {department.updatedBy}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Publishing Status
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <CheckCircle2
                                size={16}
                                className={
                                    department.status === "Published"
                                        ? "text-green-600"
                                        : "text-amber-600"
                                }
                            />

                            <span className="text-sm font-semibold text-gray-700">
                                {department.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            Manage this department
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Update content, SEO settings and publishing
                            information.
                        </p>
                    </div>

                    <Link
                        to={`/admin/content/departments/${id}/edit`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-green-700 px-4 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        <Pencil size={16} />
                        Edit Department
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default DepartmentPreview