import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Edit3,
    ExternalLink,
    Globe2,
    Handshake,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
} from "lucide-react"

const partnerData = {
    1: {
        name: "Maharashtra Rural Development Network",
        shortName: "MRDN",
        type: "Government",
        category: "Institutional",
        location: "Maharashtra",
        website: "https://example.com",
        email: "partnerships@example.com",
        phone: "+91 00000 00000",
        status: "Published",
        featured: true,
        language: "English",
        displayOrder: 1,
        shortDescription:
            "Institutional collaboration supporting rural development programmes.",
        description:
            "Maharashtra Rural Development Network supports rural development initiatives through institutional collaboration, programme coordination and community-focused development activities.",
        partnershipScope:
            "Programme implementation, institutional coordination and community development.",
        focusAreas: [
            "Rural Development",
            "Community Programmes",
            "Institutional Collaboration",
        ],
        benefits: [
            "Programme coordination",
            "Knowledge sharing",
            "Community outreach",
        ],
        logoAlt:
            "Maharashtra Rural Development Network logo",
        showOnPartners: true,
        showOnHome: true,
    },
}

const fallbackPartner = {
    name: "Partner Organisation",
    shortName: "PARTNER",
    type: "Development Partner",
    category: "Institutional",
    location: "Maharashtra",
    website: "https://example.com",
    email: "partnerships@example.com",
    phone: "+91 00000 00000",
    status: "Draft",
    featured: false,
    language: "English",
    displayOrder: 1,
    shortDescription:
        "Partner organisation supporting Krushisetu programmes.",
    description:
        "This is a UI preview of a partner organisation profile. Detailed partner information will be connected to the backend during the integration phase.",
    partnershipScope:
        "Programme collaboration and community development.",
    focusAreas: [
        "Rural Development",
        "Community Development",
        "Institutional Collaboration",
    ],
    benefits: [
        "Knowledge sharing",
        "Programme coordination",
        "Community outreach",
    ],
    logoAlt: "Partner organisation logo",
    showOnPartners: true,
    showOnHome: false,
}

const PartnerPreview = () => {
    const { id } = useParams()

    const partner =
        partnerData[id] || fallbackPartner

    return (
        <section className="min-h-screen bg-[#F6FAF7]">

            {/* Admin Preview Header */}
            <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 shadow-sm">
                <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/admin/content/partners"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
                                Admin Preview
                            </p>

                            <p className="text-sm font-bold text-gray-900">
                                Partner Profile
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={`/admin/content/partners/${id}/edit`}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                        </Link>

                        <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Preview Mode
                        </span>
                    </div>
                </div>
            </div>

            {/* Simulated Public Navbar */}
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white">
                            <span className="text-sm font-black">
                                K
                            </span>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-gray-900">
                                Krushisetu
                            </p>

                            <p className="text-[10px] text-gray-500">
                                Rural Development Initiative
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-7 text-xs font-semibold text-gray-500 md:flex">
                        <span>About</span>
                        <span>Departments</span>
                        <span>Schemes</span>
                        <span>Resources</span>
                        <span>Projects</span>
                        <span className="text-green-700">
                            Partners
                        </span>
                        <span>Contact</span>
                    </div>

                    <div className="rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white">
                        Get Support
                    </div>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500">
                        <span>Home</span>
                        <span className="text-gray-300">
                            /
                        </span>
                        <span>Partners</span>
                        <span className="text-gray-300">
                            /
                        </span>
                        <span className="text-green-700">
                            {partner.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden bg-green-950">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-800/30" />
                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-green-700/20" />

                <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">

                        {/* Logo */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="flex h-48 w-48 items-center justify-center rounded-[2.5rem] border border-white/10 bg-white p-6 shadow-2xl">
                                <div className="flex h-full w-full items-center justify-center rounded-3xl bg-green-50 text-green-700">
                                    <Building2 className="h-20 w-20" />
                                </div>
                            </div>
                        </div>

                        {/* Hero content */}
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-green-100">
                                    {partner.type}
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-green-100">
                                    {partner.category}
                                </span>

                                {partner.featured && (
                                    <span className="rounded-full bg-amber-400/15 px-3 py-1.5 text-[11px] font-bold text-amber-200">
                                        Featured Partner
                                    </span>
                                )}

                                {partner.status ===
                                    "Published" && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-400/15 px-3 py-1.5 text-[11px] font-bold text-green-200">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Published
                                    </span>
                                )}
                            </div>

                            <p className="mt-5 text-sm font-semibold text-green-300">
                                {partner.shortName}
                            </p>

                            <h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                {partner.name}
                            </h1>

                            <p className="mt-5 max-w-3xl text-base leading-7 text-green-100/80">
                                {partner.shortDescription}
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-medium text-green-50">
                                    <MapPin className="h-4 w-4" />
                                    {partner.location}
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-medium text-green-50">
                                    <Globe2 className="h-4 w-4" />
                                    {partner.language}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

                    {/* Content */}
                    <div className="space-y-8">

                        {/* About */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Building2 className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                        About the Partner
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                                        Organisation Overview
                                    </h2>
                                </div>
                            </div>

                            <p className="mt-6 text-sm leading-7 text-gray-600">
                                {partner.description}
                            </p>
                        </section>

                        {/* Partnership Scope */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Handshake className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                        Collaboration
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                                        Partnership Scope
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-6 rounded-3xl bg-[#F6FAF7] p-5">
                                <p className="text-sm leading-7 text-gray-600">
                                    {partner.partnershipScope}
                                </p>
                            </div>
                        </section>

                        {/* Focus Areas */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                    Areas of Collaboration
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-gray-900">
                                    Focus Areas
                                </h2>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {partner.focusAreas.map(
                                    (
                                        area,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="kr-hover-card rounded-3xl border border-gray-200 bg-white p-5"
                                        >
                                            <div className="kr-hover-icon flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>

                                            <h3 className="kr-hover-title mt-4 text-sm font-bold text-gray-900">
                                                {area}
                                            </h3>

                                            <div className="kr-hover-line mt-3 h-1 w-8 rounded-full bg-green-600" />
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* Contributions */}
                        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                                    Partnership Value
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-gray-900">
                                    Key Contributions
                                </h2>
                            </div>

                            <div className="mt-6 space-y-3">
                                {partner.benefits.map(
                                    (
                                        benefit,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-2xl bg-[#F6FAF7] p-4"
                                        >
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>

                                            <p className="text-sm leading-6 text-gray-700">
                                                {benefit}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="overflow-hidden rounded-4xl bg-green-800 p-7 shadow-xl shadow-green-900/10 sm:p-9">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-green-200">
                                        Partner Information
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-white">
                                        Learn more about this organisation
                                    </h2>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100/80">
                                        Visit the partner's official website
                                        for additional information.
                                    </p>
                                </div>

                                <a
                                    href={
                                        partner.website
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-green-800 transition hover:-translate-y-0.5 hover:bg-green-50"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Visit Website
                                </a>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">

                        {/* Partner Details */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                Partner Details
                            </h2>

                            <div className="mt-5 space-y-4">
                                <DetailRow
                                    icon={Building2}
                                    label="Organisation Type"
                                    value={
                                        partner.type
                                    }
                                />

                                <DetailRow
                                    icon={Handshake}
                                    label="Category"
                                    value={
                                        partner.category
                                    }
                                />

                                <DetailRow
                                    icon={MapPin}
                                    label="Location"
                                    value={
                                        partner.location
                                    }
                                />

                                <DetailRow
                                    icon={Globe2}
                                    label="Language"
                                    value={
                                        partner.language
                                    }
                                />

                                <DetailRow
                                    icon={ShieldCheck}
                                    label="Status"
                                    value={
                                        partner.status
                                    }
                                />
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900">
                                Contact
                            </h2>

                            <div className="mt-5 space-y-3">
                                <a
                                    href={`mailto:${partner.email}`}
                                    className="flex items-center gap-3 rounded-2xl bg-[#F6FAF7] p-4 transition hover:bg-green-50"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                        <Mail className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                            Email
                                        </p>

                                        <p className="mt-0.5 truncate text-xs font-semibold text-gray-700">
                                            {partner.email}
                                        </p>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${partner.phone}`}
                                    className="flex items-center gap-3 rounded-2xl bg-[#F6FAF7] p-4 transition hover:bg-green-50"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                                        <Phone className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                            Phone
                                        </p>

                                        <p className="mt-0.5 text-xs font-semibold text-gray-700">
                                            {partner.phone}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Website */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Globe2 className="h-5 w-5" />
                            </div>

                            <h2 className="mt-4 text-base font-bold text-gray-900">
                                Official Website
                            </h2>

                            <p className="mt-1 break-all text-xs leading-5 text-gray-500">
                                {partner.website}
                            </p>

                            <a
                                href={
                                    partner.website
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Visit Website
                            </a>
                        </div>

                        {/* Admin metadata */}
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-green-700" />

                                <h2 className="text-sm font-bold text-gray-900">
                                    Admin Metadata
                                </h2>
                            </div>

                            <div className="mt-5 space-y-3">
                                <MetaRow
                                    label="Display Order"
                                    value={
                                        partner.displayOrder
                                    }
                                />

                                <MetaRow
                                    label="Featured"
                                    value={
                                        partner.featured
                                            ? "Yes"
                                            : "No"
                                    }
                                />

                                <MetaRow
                                    label="Partners Page"
                                    value={
                                        partner.showOnPartners
                                            ? "Visible"
                                            : "Hidden"
                                    }
                                />

                                <MetaRow
                                    label="Home Page"
                                    value={
                                        partner.showOnHome
                                            ? "Visible"
                                            : "Hidden"
                                    }
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Simulated Public Footer */}
            <footer className="bg-green-950">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white">
                                    <span className="text-sm font-black">
                                        K
                                    </span>
                                </div>

                                <span className="font-bold text-white">
                                    Krushisetu
                                </span>
                            </div>

                            <p className="mt-4 max-w-sm text-sm leading-6 text-green-100/60">
                                Connecting communities, programmes and
                                opportunities for sustainable rural
                                development.
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">
                                Quick Links
                            </p>

                            <div className="mt-4 space-y-2 text-sm text-green-100/60">
                                <p>About</p>
                                <p>Departments</p>
                                <p>Schemes</p>
                                <p>Resources</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-white">
                                Support
                            </p>

                            <div className="mt-4 space-y-2 text-sm text-green-100/60">
                                <p>Contact</p>
                                <p>Partnerships</p>
                                <p>Privacy Policy</p>
                                <p>Terms & Conditions</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6 text-xs text-green-100/50">
                        © {new Date().getFullYear()} Krushisetu. All
                        rights reserved.
                    </div>
                </div>
            </footer>

            {/* Admin Metadata */}
            <div className="border-t border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <span>
                        Admin preview • Partner ID:{" "}
                        {id || "new"}
                    </span>

                    <Link
                        to={`/admin/content/partners/${id}/edit`}
                        className="font-semibold text-green-700 hover:text-green-800"
                    >
                        Edit partner profile
                    </Link>
                </div>
            </div>
        </section>
    )
}

const DetailRow = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {label}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-700">
                    {value}
                </p>
            </div>
        </div>
    )
}

const MetaRow = ({
    label,
    value,
}) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <span className="text-xs text-gray-500">
                {label}
            </span>

            <span className="text-xs font-semibold text-gray-700">
                {value}
            </span>
        </div>
    )
}

export default PartnerPreview