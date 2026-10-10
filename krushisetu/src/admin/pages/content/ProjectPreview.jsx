import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    ArrowUpRight,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Edit3,
    ExternalLink,
    MapPin,
    Target,
    Users,
} from "lucide-react"

const project = {
    id: 1,
    title: "Sustainable Farming Initiative",
    slug: "sustainable-farming-initiative",
    department: "Sustainable Agriculture",
    projectType: "Agriculture Development",
    status: "Active",
    shortDescription:
        "A field-level initiative focused on sustainable farming practices and improved agricultural outcomes.",
    description:
        "This project supports farmers through sustainable agricultural practices, field demonstrations, capacity building and practical resource support. The initiative is designed to strengthen practical knowledge and encourage sustainable approaches at the field level.",
    startDate: "2026-04-01",
    endDate: "2027-03-31",
    location: "Ahmednagar, Maharashtra",
    beneficiaries: 1250,
    progress: 62,
    objectives: [
        "Promote sustainable agricultural practices",
        "Improve farmer access to practical knowledge",
        "Support better farm-level decision making",
    ],
    activities: [
        "Farmer training sessions",
        "Field demonstrations",
        "Community awareness activities",
    ],
    outcomes: [
        "Improved awareness of sustainable farming practices",
        "Increased participation in field-level programs",
    ],
    featured: true,
    published: true,
    language: "English",
    updatedAt: "30 Sep 2026",
}

const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const ProjectPreview = () => {
    const { id } = useParams()

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[#F6FAF7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] space-y-6">

                {/* Admin Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                        <Link
                            to="/admin/content/projects"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-green-700">
                                <BriefcaseBusiness className="h-4 w-4" />
                                <span>Projects & Impact</span>
                                <span className="text-gray-400">/</span>
                                <span className="text-gray-500">
                                    Preview
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Project Preview
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Public-facing preview of this project.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to={`/admin/content/projects/${id}/edit`}
                            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                        >
                            <Edit3 className="h-4 w-4" />
                            Edit Project
                        </Link>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Open Public Page
                        </button>
                    </div>
                </div>

                {/* Preview notice */}
                <div className="flex flex-col gap-3 rounded-3xl border border-green-100 bg-green-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-green-900">
                                Public preview
                            </p>

                            <p className="text-xs text-green-800/70">
                                This page represents how the project can
                                appear on the Krushisetu website.
                            </p>
                        </div>
                    </div>

                    <span className="w-fit rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-semibold text-green-700">
                        {project.status}
                    </span>
                </div>

                {/* Public-style preview */}
                <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-900/10">

                    {/* Simulated Navbar */}
                    <div className="border-b border-gray-100 bg-white px-5 py-4 sm:px-8">
                        <div className="mx-auto flex max-w-6xl items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700 text-white">
                                    <BriefcaseBusiness className="h-4 w-4" />
                                </div>

                                <span className="text-lg font-bold text-gray-900">
                                    Krushisetu
                                </span>
                            </div>

                            <div className="hidden items-center gap-6 md:flex">
                                <span className="text-xs font-medium text-gray-500">
                                    About
                                </span>

                                <span className="text-xs font-medium text-gray-500">
                                    Departments
                                </span>

                                <span className="text-xs font-medium text-green-700">
                                    Projects
                                </span>

                                <span className="text-xs font-medium text-gray-500">
                                    Resources
                                </span>

                                <span className="text-xs font-medium text-gray-500">
                                    Contact
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hero */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
                        <div className="absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-green-500/10" />
                        <div className="absolute bottom-[-140px] left-[-80px] h-80 w-80 rounded-full bg-emerald-400/10" />

                        <div className="relative mx-auto max-w-6xl">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-green-50">
                                    {project.department}
                                </span>

                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-green-50">
                                    {project.projectType}
                                </span>

                                <span className="rounded-full border border-green-300/30 bg-green-400/10 px-3 py-1.5 text-xs font-semibold text-green-100">
                                    {project.status}
                                </span>
                            </div>

                            <h2 className="mt-6 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                {project.title}
                            </h2>

                            <p className="mt-5 max-w-3xl text-sm leading-7 text-green-50/80 sm:text-base">
                                {project.shortDescription}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-medium text-white">
                                    <MapPin className="h-4 w-4 text-green-200" />
                                    {project.location}
                                </div>

                                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-medium text-white">
                                    <Users className="h-4 w-4 text-green-200" />
                                    {project.beneficiaries.toLocaleString(
                                        "en-IN"
                                    )}{" "}
                                    beneficiaries
                                </div>

                                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-medium text-white">
                                    <CalendarDays className="h-4 w-4 text-green-200" />
                                    {formatDate(project.startDate)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project stats */}
                    <div className="border-b border-gray-100 bg-white px-6 py-6 sm:px-10">
                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                icon={<MapPin className="h-5 w-5" />}
                                label="Location"
                                value={project.location}
                            />

                            <StatCard
                                icon={<Users className="h-5 w-5" />}
                                label="Beneficiaries"
                                value={project.beneficiaries.toLocaleString(
                                    "en-IN"
                                )}
                            />

                            <StatCard
                                icon={<CalendarDays className="h-5 w-5" />}
                                label="Project Period"
                                value={`${formatDate(
                                    project.startDate
                                )} - ${formatDate(project.endDate)}`}
                            />

                            <StatCard
                                icon={<Target className="h-5 w-5" />}
                                label="Progress"
                                value={`${project.progress}%`}
                            />
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="bg-[#F6FAF7] px-6 py-10 sm:px-10 lg:px-16">
                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

                            {/* Content */}
                            <div className="space-y-8">

                                {/* About */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                            <BriefcaseBusiness className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                                                Project Overview
                                            </p>

                                            <h3 className="mt-1 text-xl font-bold text-gray-900">
                                                About the project
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-sm leading-7 text-gray-600">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Objectives */}
                                <PreviewListSection
                                    icon={<Target className="h-5 w-5" />}
                                    eyebrow="Project Goals"
                                    title="Objectives"
                                    items={project.objectives}
                                />

                                {/* Activities */}
                                <PreviewListSection
                                    icon={
                                        <BriefcaseBusiness className="h-5 w-5" />
                                    }
                                    eyebrow="Implementation"
                                    title="Key Activities"
                                    items={project.activities}
                                />

                                {/* Outcomes */}
                                <PreviewListSection
                                    icon={
                                        <CheckCircle2 className="h-5 w-5" />
                                    }
                                    eyebrow="Results"
                                    title="Expected / Reported Outcomes"
                                    items={project.outcomes}
                                />

                                {/* Progress */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                                                Implementation
                                            </p>

                                            <h3 className="mt-1 text-xl font-bold text-gray-900">
                                                Project Progress
                                            </h3>
                                        </div>

                                        <span className="text-2xl font-bold text-green-700">
                                            {project.progress}%
                                        </span>
                                    </div>

                                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-green-600"
                                            style={{
                                                width: `${project.progress}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="mt-3 flex justify-between text-xs text-gray-400">
                                        <span>
                                            Started{" "}
                                            {formatDate(project.startDate)}
                                        </span>

                                        <span>
                                            Ends{" "}
                                            {formatDate(project.endDate)}
                                        </span>
                                    </div>
                                </div>

                                {/* Impact placeholder */}
                                <div className="rounded-3xl border border-green-100 bg-green-50/70 p-6 sm:p-8">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                                            <Target className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                                                Impact
                                            </p>

                                            <h3 className="mt-1 text-xl font-bold text-green-950">
                                                Measuring project outcomes
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-green-900/70">
                                                Project impact indicators can
                                                be displayed here once approved
                                                measurements and supporting
                                                evidence are available.
                                            </p>

                                            <button
                                                type="button"
                                                className="kr-hover-link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-700"
                                            >
                                                View impact indicators
                                                <ArrowUpRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-5">

                                {/* Project details */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Project Details
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        <DetailItem
                                            label="Department"
                                            value={project.department}
                                        />

                                        <DetailItem
                                            label="Project Type"
                                            value={project.projectType}
                                        />

                                        <DetailItem
                                            label="Location"
                                            value={project.location}
                                        />

                                        <DetailItem
                                            label="Start Date"
                                            value={formatDate(
                                                project.startDate
                                            )}
                                        />

                                        <DetailItem
                                            label="End Date"
                                            value={formatDate(
                                                project.endDate
                                            )}
                                        />

                                        <DetailItem
                                            label="Beneficiaries"
                                            value={project.beneficiaries.toLocaleString(
                                                "en-IN"
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Project status */}
                                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Publication
                                    </h3>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center justify-between rounded-2xl bg-green-50 p-3">
                                            <span className="text-xs text-gray-600">
                                                Status
                                            </span>

                                            <span className="rounded-full border border-green-200 bg-white px-2.5 py-1 text-xs font-semibold text-green-700">
                                                {project.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-3">
                                            <span className="text-xs text-gray-600">
                                                Featured
                                            </span>

                                            <span className="text-xs font-semibold text-gray-800">
                                                {project.featured
                                                    ? "Yes"
                                                    : "No"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-3">
                                            <span className="text-xs text-gray-600">
                                                Language
                                            </span>

                                            <span className="text-xs font-semibold text-gray-800">
                                                {project.language}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="overflow-hidden rounded-3xl bg-green-900 p-6 text-white shadow-lg shadow-green-900/10">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold">
                                        Interested in our work?
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-green-100/70">
                                        Learn more about Krushisetu's programs,
                                        initiatives and opportunities.
                                    </p>

                                    <button
                                        type="button"
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-green-900 transition hover:bg-green-50"
                                    >
                                        Explore More
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>

                    {/* Public Footer */}
                    <div className="border-t border-gray-100 bg-white px-6 py-8 sm:px-10">
                        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-900">
                                    Krushisetu
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Connecting communities with meaningful
                                    agricultural initiatives.
                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>Privacy</span>
                                <span>Terms</span>
                                <span>Contact</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin metadata */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Metadata
                            label="Project ID"
                            value={`#${project.id}`}
                        />

                        <Metadata
                            label="Slug"
                            value={`/${project.slug}`}
                        />

                        <Metadata
                            label="Last Updated"
                            value={project.updatedAt}
                        />

                        <Metadata
                            label="Published"
                            value={project.published ? "Yes" : "No"}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const StatCard = ({ icon, label, value }) => {
    return (
        <div className="kr-hover-card rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-start gap-3">
                <div className="kr-hover-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-400">
                        {label}
                    </p>

                    <p className="mt-1 text-sm font-bold leading-5 text-gray-900">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    )
}

const PreviewListSection = ({
    icon,
    eyebrow,
    title,
    items,
}) => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    {icon}
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                        {eyebrow}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                        {title}
                    </h3>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 rounded-2xl bg-[#F6FAF7] p-4"
                    >
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>

                        <p className="text-sm leading-6 text-gray-600">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const DetailItem = ({ label, value }) => {
    return (
        <div className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-medium leading-5 text-gray-800">
                {value}
            </p>
        </div>
    )
}

const Metadata = ({ label, value }) => {
    return (
        <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                {value}
            </p>
        </div>
    )
}

export default ProjectPreview