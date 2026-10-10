import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    BriefcaseBusiness,
    CheckCircle2,
    Edit3,
    ExternalLink,
    Globe2,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react"

const TeamPreview = () => {
    const { id } = useParams()

    const member = {
        id,
        name: "Founder & Director",
        displayName: "Founder & Director",
        role: "Founder",
        type: "Founder",
        department: "Leadership",
        location: "Maharashtra",
        shortBio:
            "Leading Krushisetu's vision and long-term development initiatives.",
        biography:
            "The founder provides strategic direction to the organisation and works closely with communities, programmes and partners to support sustainable rural development.",
        responsibilities: [
            "Provide strategic direction",
            "Support programme development",
            "Build institutional partnerships",
        ],
        expertise: [
            "Rural Development",
            "Community Development",
            "Programme Strategy",
        ],
        email: "contact@krushisetu.org",
        phone: "+91 00000 00000",
        linkedin: "https://linkedin.com/",
        photoAlt: "Krushisetu Founder and Director",
        status: "Published",
        language: "English",
        featured: true,
        showOnAbout: true,
        showOnContact: false,
        displayOrder: "1",
        updatedAt: "24 Sep 2026",
    }

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Admin preview header */}
                <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/team"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-500 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500">
                                <span>Team & Founder</span>
                                <span className="text-gray-300">
                                    /
                                </span>
                                <span>Preview</span>
                            </div>

                            <h1 className="mt-1 text-xl font-bold text-gray-900">
                                Team Profile Preview
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Preview how this profile can appear on
                                the public Krushisetu website.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            to={`/admin/content/team/${id}/edit`}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Edit3 className="h-4 w-4" />
                            Edit Profile
                        </Link>

                        <Link
                            to="/about/founder"
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                        >
                            <ExternalLink className="h-4 w-4" />
                            View Public Page
                        </Link>
                    </div>
                </div>

                {/* Public website preview */}
                <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-900/10">

                    {/* Simulated navbar */}
                    <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-sm font-bold text-white">
                                    K
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        Krushisetu
                                    </p>

                                    <p className="text-[10px] font-medium text-gray-400">
                                        Empowering Rural Communities
                                    </p>
                                </div>
                            </div>

                            <div className="hidden items-center gap-6 md:flex">
                                <span className="text-xs font-medium text-gray-500">
                                    About
                                </span>

                                <span className="text-xs font-medium text-gray-500">
                                    Departments
                                </span>

                                <span className="text-xs font-medium text-gray-500">
                                    Resources
                                </span>

                                <span className="text-xs font-medium text-green-700">
                                    Our Team
                                </span>

                                <span className="text-xs font-medium text-gray-500">
                                    Contact
                                </span>
                            </div>

                            <div className="hidden rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white sm:block">
                                Get Involved
                            </div>
                        </div>
                    </div>

                    {/* Breadcrumb */}
                    <div className="border-b border-gray-100 bg-[#F6FAF7] px-5 py-4 sm:px-8">
                        <div className="mx-auto max-w-6xl text-xs font-medium text-gray-500">
                            Home
                            <span className="mx-2 text-gray-300">
                                /
                            </span>
                            About
                            <span className="mx-2 text-gray-300">
                                /
                            </span>
                            Founder
                        </div>
                    </div>

                    {/* Profile hero */}
                    <div className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
                        <div className="mx-auto max-w-6xl">

                            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">

                                {/* Profile image */}
                                <div className="relative">
                                    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-green-50 via-white to-emerald-50 shadow-xl shadow-green-900/10">
                                        <div className="flex min-h-[380px] items-center justify-center sm:min-h-[440px]">
                                            <div className="text-center">
                                                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white text-green-700 shadow-xl shadow-green-900/10">
                                                    <UserRound className="h-14 w-14" />
                                                </div>

                                                <p className="mt-5 text-sm font-bold text-gray-800">
                                                    Profile Photo
                                                </p>

                                                <p className="mt-1 px-8 text-xs leading-5 text-gray-500">
                                                    Actual profile image will
                                                    be displayed after media
                                                    storage integration.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {member.featured && (
                                        <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-green-700 shadow-lg shadow-gray-900/10">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Featured Profile
                                        </div>
                                    )}
                                </div>

                                {/* Hero content */}
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                            {member.type}
                                        </span>

                                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                                            {member.department}
                                        </span>

                                        <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-800">
                                            {member.status}
                                        </span>
                                    </div>

                                    <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-green-700">
                                        {member.role}
                                    </p>

                                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                        {member.displayName}
                                    </h2>

                                    <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
                                        {member.shortBio}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-gray-500">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4 text-green-700" />
                                            {member.location}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <BriefcaseBusiness className="h-4 w-4 text-green-700" />
                                            {member.department}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <Globe2 className="h-4 w-4 text-green-700" />
                                            {member.language}
                                        </span>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                                        >
                                            <Mail className="h-4 w-4" />
                                            Contact
                                        </a>

                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                        >
                                            <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-700 text-[10px] font-bold leading-none text-white">
                                                in
                                            </span>
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* About profile */}
                            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

                                {/* Main biography */}
                                <div className="space-y-10">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-1 rounded-full bg-green-700" />

                                            <h3 className="text-2xl font-bold text-gray-900">
                                                About the Profile
                                            </h3>
                                        </div>

                                        <p className="mt-5 text-sm leading-7 text-gray-600">
                                            {member.biography}
                                        </p>
                                    </div>

                                    {/* Responsibilities */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Responsibilities
                                        </h3>

                                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {member.responsibilities.map(
                                                (
                                                    responsibility,
                                                    index
                                                ) => (
                                                    <div
                                                        key={
                                                            index
                                                        }
                                                        className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4"
                                                    >
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                            <CheckCircle2 className="h-4 w-4" />
                                                        </div>

                                                        <p className="pt-1 text-sm font-medium leading-6 text-gray-700">
                                                            {
                                                                responsibility
                                                            }
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Expertise */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Areas of Expertise
                                        </h3>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {member.expertise.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <span
                                                        key={
                                                            index
                                                        }
                                                        className="rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700"
                                                    >
                                                        {
                                                            item
                                                        }
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <aside className="space-y-5">

                                    {/* Contact */}
                                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-900">
                                            Contact Information
                                        </h3>

                                        <div className="mt-5 space-y-4">
                                            <ContactRow
                                                icon={Mail}
                                                label="Email"
                                                value={member.email}
                                            />

                                            <ContactRow
                                                icon={Phone}
                                                label="Phone"
                                                value={member.phone}
                                            />

                                            <ContactRow
                                                icon={MapPin}
                                                label="Location"
                                                value={member.location}
                                            />
                                        </div>
                                    </div>

                                    {/* Profile details */}
                                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-900">
                                            Profile Details
                                        </h3>

                                        <div className="mt-5 space-y-4">
                                            <DetailRow
                                                label="Profile Type"
                                                value={member.type}
                                            />

                                            <DetailRow
                                                label="Department"
                                                value={
                                                    member.department
                                                }
                                            />

                                            <DetailRow
                                                label="Language"
                                                value={
                                                    member.language
                                                }
                                            />

                                            <DetailRow
                                                label="Display Order"
                                                value={
                                                    member.displayOrder
                                                }
                                            />

                                            <DetailRow
                                                label="Last Updated"
                                                value={
                                                    member.updatedAt
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Website placement */}
                                    <div className="rounded-3xl border border-green-100 bg-green-50/60 p-5">
                                        <div className="flex items-center gap-2">
                                            <Globe2 className="h-5 w-5 text-green-700" />

                                            <h3 className="text-sm font-bold text-green-950">
                                                Website Placement
                                            </h3>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            <PlacementRow
                                                label="About Page"
                                                enabled={
                                                    member.showOnAbout
                                                }
                                            />

                                            <PlacementRow
                                                label="Contact Page"
                                                enabled={
                                                    member.showOnContact
                                                }
                                            />
                                        </div>
                                    </div>
                                </aside>
                            </div>

                            {/* Leadership CTA */}
                            <div className="mt-14 overflow-hidden rounded-[2rem] bg-green-900 px-6 py-8 text-white sm:px-8 lg:px-10">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-300">
                                            Krushisetu
                                        </p>

                                        <h3 className="mt-2 text-2xl font-bold">
                                            Working together for rural
                                            communities
                                        </h3>

                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-green-100/80">
                                            Learn more about Krushisetu's
                                            programmes, departments and
                                            community-focused initiatives.
                                        </p>
                                    </div>

                                    <Link
                                        to="/about"
                                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-green-900 transition hover:bg-green-50"
                                    >
                                        About Krushisetu
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simulated footer */}
                    <div className="border-t border-gray-100 bg-gray-950 px-5 py-8 text-white sm:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-bold">
                                    Krushisetu
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Empowering rural communities through
                                    sustainable development.
                                </p>
                            </div>

                            <p className="text-xs text-gray-500">
                                © 2026 Krushisetu. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Admin metadata */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <ShieldCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900">
                                Admin Metadata
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                Internal information for this team
                                profile.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <MetaItem
                            label="Profile ID"
                            value={`TEAM-${id}`}
                        />

                        <MetaItem
                            label="Status"
                            value={member.status}
                        />

                        <MetaItem
                            label="Language"
                            value={member.language}
                        />

                        <MetaItem
                            label="Featured"
                            value={
                                member.featured
                                    ? "Yes"
                                    : "No"
                            }
                        />

                        <MetaItem
                            label="Order"
                            value={member.displayOrder}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const ContactRow = ({
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
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-gray-700">
                    {value}
                </p>
            </div>
        </div>
    )
}

const DetailRow = ({
    label,
    value,
}) => {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <span className="text-xs font-medium text-gray-500">
                {label}
            </span>

            <span className="text-right text-xs font-bold text-gray-700">
                {value}
            </span>
        </div>
    )
}

const PlacementRow = ({
    label,
    enabled,
}) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-green-950/70">
                {label}
            </span>

            <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
            >
                <CheckCircle2 className="h-3 w-3" />
                {enabled ? "Enabled" : "Hidden"}
            </span>
        </div>
    )
}

const MetaItem = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-bold text-gray-800">
                {value}
            </p>
        </div>
    )
}

export default TeamPreview