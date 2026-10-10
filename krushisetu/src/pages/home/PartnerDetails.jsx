import { Link, useParams } from "react-router-dom"
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CheckCircle2,
    Clock3,
    Handshake,
    MapPin,
    Target,
} from "lucide-react"

import { partners } from "../../../src/data/programData.js"

const PartnerDetails = () => {
    const { slug } = useParams()

    const partner = partners.find(
        (item) => item.slug === slug
    )

    if (!partner) {
        return (
            <section className="min-h-screen bg-[#F6FAF7] px-6 py-20">
                <div  className=" mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-700">
                        <Building2
                            size={40}
                            strokeWidth={1.7}
                        />
                    </div>

                    <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-green-700">
                        Partner Not Found
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-green-950 md:text-5xl">
                        Partner details unavailable
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                        The partner you are looking for does not exist or the
                        requested partner link is invalid.
                    </p>

                    <Link
                        to="/partners"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
                    >
                        <ArrowLeft size={18} />
                        Back to Partners
                    </Link>
                </div>
            </section>
        )
    }

    const Icon = partner.icon

    const currentIndex = partners.findIndex(
        (item) => item.slug === partner.slug
    )

    const previousPartner =
        currentIndex > 0
            ? partners[currentIndex - 1]
            : null

    const nextPartner =
        currentIndex < partners.length - 1
            ? partners[currentIndex + 1]
            : null

    return (
        <main className="w-full bg-[#F6FAF7] ">

            {/* =========================================================
                HERO
            ========================================================== */}
            <section className="relative overflow-hidden">
                {/* Background */}
                <img
                    src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-white/65" />

                {/* Content */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 md:py-16 lg:py-20">

                    {/* Breadcrumb */}
                    <div className="mb-8 mt-20 md:mt-15 ">
                        <Link
                            to="/partners"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900"
                        >
                            <ArrowLeft size={17} />
                            Back to Partners
                        </Link>
                    </div>

                    <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">

                        {/* Hero Content */}
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700 md:text-base">
                                Government & Institutional Partner
                            </p>

                            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-green-950 md:text-5xl lg:text-6xl">
                                {partner.name}
                            </h1>

                            <div className="mt-5 h-1 w-14 rounded-full bg-green-700" />

                            <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg">
                                {partner.shortDescription}
                            </p>

                            {/* Quick Information */}
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                {partner.established && (
                                    <div className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <Clock3
                                                    size={22}
                                                    strokeWidth={1.8}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                                    Established
                                                </p>

                                                <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-800">
                                                    {partner.established}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {partner.headquarters && (
                                    <div className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <MapPin
                                                    size={22}
                                                    strokeWidth={1.8}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                                    Headquarters
                                                </p>

                                                <p className="mt-1 text-sm font-semibold leading-relaxed text-gray-800">
                                                    {partner.headquarters}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Hero Card */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-md rounded-[2rem] border border-gray-200 bg-white/90 p-7 shadow-xl  md:p-9">

                                <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-green-50 text-green-800">
                                    <Icon
                                        size={50}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                                    Institution
                                </p>

                                <h2 className="mt-2 text-2xl font-bold leading-tight text-green-950 md:text-3xl">
                                    {partner.name}
                                </h2>

                                {partner.type && (
                                    <p className="mt-4 text-sm leading-relaxed text-gray-600">
                                        {partner.type}
                                    </p>
                                )}

                                <div className="mt-6 h-px w-full bg-gray-200" />

                                <div className="mt-6 flex items-start gap-3">
                                    <CheckCircle2
                                        className="mt-0.5 shrink-0 text-green-700"
                                        size={19}
                                    />

                                    <p className="text-sm leading-relaxed text-gray-600">
                                        An important institution within the
                                        agricultural and rural development
                                        ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                MAIN CONTENT
            ========================================================== */}
            <section className="px-6 py-12 md:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl">

                    {/* Overview */}
                    <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-9 lg:p-10">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <Building2
                                    size={24}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                    About the Institution
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                    Overview
                                </h2>
                            </div>
                        </div>

                        <div className="mt-7 max-w-none space-y-5">
                            {partner.overview
                                ?.trim()
                                .split(/\n\s*\n/)
                                .filter(Boolean)
                                .map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-base leading-8 text-gray-600 md:text-lg"
                                    >
                                        {paragraph.trim()}
                                    </p>
                                ))}
                        </div>
                    </section>

                    {/* =====================================================
                        HISTORY
                    ====================================================== */}
                    {partner.history?.length > 0 && (
                        <section className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-9 lg:p-10">

                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                    Institutional Journey
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                    History & Evolution
                                </h2>

                                <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
                                    A look at the major stages in the development
                                    of {partner.name} and its changing role over
                                    time.
                                </p>
                            </div>

                            <div className="relative mt-10">

                                {/* Timeline Line */}
                                <div className="absolute bottom-0 left-[15px] top-0 hidden w-px bg-green-100 md:block" />

                                <div className="space-y-8">
                                    {partner.history.map(
                                        (item, index) => (
                                            <div
                                                key={`${item.year}-${index}`}
                                                className="relative md:pl-12"
                                            >

                                                {/* Timeline Dot */}
                                                <div className="absolute left-0 top-1 hidden h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-green-700 shadow-sm md:flex" />

                                                <div className="rounded-2xl border border-gray-200 bg-[#F9FCFA] p-5 md:p-6">

                                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                        <h3 className="text-lg font-bold text-green-900 md:text-xl">
                                                            {item.title}
                                                        </h3>

                                                        <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                                                            {item.year}
                                                        </span>
                                                    </div>

                                                    <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* =====================================================
                        EVOLUTION
                    ====================================================== */}
                    {partner.evolution && (
                        <section className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-9 lg:p-10">

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <Handshake
                                        size={25}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                        Institutional Development
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                        How the Organisation Has Evolved
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-7 space-y-5">
                                {partner.evolution
                                    .trim()
                                    .split(/\n\s*\n/)
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="text-base leading-8 text-gray-600 md:text-lg"
                                        >
                                            {paragraph.trim()}
                                        </p>
                                    ))}
                            </div>
                        </section>
                    )}

                    {/* =====================================================
                        OBJECTIVES + FUNCTIONS
                    ====================================================== */}
                    <div className="mt-8 grid gap-8 lg:grid-cols-2">

                        {/* Objectives */}
                        {partner.objectives?.length > 0 && (
                            <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-8">

                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Target
                                            size={25}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                            Purpose
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-green-950">
                                            Key Objectives
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-7 space-y-4">
                                    {partner.objectives.map(
                                        (objective, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <CheckCircle2
                                                    className="mt-1 shrink-0 text-green-700"
                                                    size={19}
                                                />

                                                <p className="text-sm leading-7 text-gray-600 md:text-base">
                                                    {objective}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Functions */}
                        {partner.majorFunctions?.length > 0 && (
                            <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-8">

                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                        <Icon
                                            size={25}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                            Core Responsibilities
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-green-950">
                                            Major Functions
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-7 space-y-4">
                                    {partner.majorFunctions.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-700" />

                                                <p className="text-sm leading-7 text-gray-600 md:text-base">
                                                    {item}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* =====================================================
                        MAJOR INITIATIVES
                    ====================================================== */}
                    {partner.majorInitiatives?.length > 0 && (
                        <section className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-9 lg:p-10">

                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                    Areas of Work
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                    Major Initiatives & Activities
                                </h2>
                            </div>

                            <div className="mt-8 grid gap-5 md:grid-cols-2">
                                {partner.majorInitiatives.map(
                                    (initiative, index) => (
                                        <div
                                            key={index}
                                            className="kr-hover-card rounded-2xl border border-gray-200 bg-[#F9FCFA] p-6 shadow-sm"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                                                <span className="text-sm font-bold">
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>
                                            </div>

                                            <h3 className="mt-5 text-lg font-bold text-green-900">
                                                {initiative.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base">
                                                {initiative.description}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* =====================================================
                        ROLE IN AGRICULTURE
                    ====================================================== */}
                    {partner.roleInAgriculture && (
                        <section className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-9 lg:p-10">

                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                    Agricultural Ecosystem
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                    Role in Agriculture
                                </h2>
                            </div>

                            <div className="mt-7 space-y-5">
                                {partner.roleInAgriculture
                                    .trim()
                                    .split(/\n\s*\n/)
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="text-base leading-8 text-gray-600 md:text-lg"
                                        >
                                            {paragraph.trim()}
                                        </p>
                                    ))}
                            </div>
                        </section>
                    )}

                    {/* =====================================================
                        ROLE FOR FARMERS
                    ====================================================== */}
                    {partner.roleForFarmers?.length > 0 && (
                        <section className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-9 lg:p-10">

                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                    Farmer Benefits
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                    How Farmers Can Benefit
                                </h2>

                                <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
                                    Areas in which the institution can
                                    contribute to farmers and rural
                                    communities.
                                </p>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {partner.roleForFarmers.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#F9FCFA] p-5"
                                        >
                                            <CheckCircle2
                                                className="mt-0.5 shrink-0 text-green-700"
                                                size={20}
                                            />

                                            <p className="text-sm leading-7 text-gray-600 md:text-base">
                                                {item}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}

                    {/* =====================================================
                        PRESENT ROLE
                    ====================================================== */}
                    {partner.presentRole && (
                        <section className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm md:p-9 lg:p-10">

                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                    Today
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                    Present-Day Role
                                </h2>
                            </div>

                            <div className="mt-7 space-y-5">
                                {partner.presentRole
                                    .trim()
                                    .split(/\n\s*\n/)
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="text-base leading-8 text-gray-600 md:text-lg"
                                        >
                                            {paragraph.trim()}
                                        </p>
                                    ))}
                            </div>
                        </section>
                    )}

                    {/* =====================================================
                        KRUSHISETU RELEVANCE
                    ====================================================== */}
                    {partner.relevanceToKrushisetu && (
                        <section className="relative mt-8 overflow-hidden rounded-[2rem] bg-green-900 p-7 shadow-lg md:p-10 lg:p-12">

                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-800/60" />
                            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-green-950/50" />

                            <div className="relative z-10">

                                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                                    Krushisetu Connection
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                                    Relevance to Krushisetu
                                </h2>

                                <div className="mt-7 space-y-5">
                                    {partner.relevanceToKrushisetu
                                        .trim()
                                        .split(/\n\s*\n/)
                                        .filter(Boolean)
                                        .map(
                                            (
                                                paragraph,
                                                index
                                            ) => (
                                                <p
                                                    key={index}
                                                    className="text-sm leading-8 text-green-50 md:text-base lg:text-lg"
                                                >
                                                    {paragraph.trim()}
                                                </p>
                                            )
                                        )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* =====================================================
                        CONCLUSION
                    ====================================================== */}
                    {partner.conclusion && (
                        <section className="mt-8 rounded-[2rem] border border-green-100 bg-green-50/70 p-6 md:p-9 lg:p-10">

                            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                                In Summary
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                                Conclusion
                            </h2>

                            <p className="mt-6 text-base leading-8 text-gray-700 md:text-lg">
                                {partner.conclusion}
                            </p>
                        </section>
                    )}

                    {/* =====================================================
                        PARTNER NAVIGATION
                    ====================================================== */}
                    <section className="mt-10">
                        <div className="grid gap-4 md:grid-cols-2">

                            {previousPartner ? (
                                <Link
                                    to={`/partners/${previousPartner.slug}`}
                                    className="group rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                        Previous Partner
                                    </p>

                                    <div className="mt-3 flex items-center justify-between gap-4">
                                        <h3 className="text-lg font-bold text-green-900">
                                            {previousPartner.name}
                                        </h3>

                                        <ArrowLeft
                                            className="shrink-0 text-green-700 transition group-hover:-translate-x-1"
                                            size={21}
                                        />
                                    </div>
                                </Link>
                            ) : (
                                <div />
                            )}

                            {nextPartner ? (
                                <Link
                                    to={`/partners/${nextPartner.slug}`}
                                    className="group rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md md:text-right"
                                >
                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                                        Next Partner
                                    </p>

                                    <div className="mt-3 flex items-center justify-between gap-4 md:justify-end">
                                        <h3 className="text-lg font-bold text-green-900">
                                            {nextPartner.name}
                                        </h3>

                                        <ArrowRight
                                            className="shrink-0 text-green-700 transition group-hover:translate-x-1"
                                            size={21}
                                        />
                                    </div>
                                </Link>
                            ) : (
                                <div />
                            )}

                        </div>

                        <div className="mt-6 flex justify-center">
                            <Link
                                to="/#partners"
                                className="inline-flex items-center gap-2 rounded-full border border-green-700 px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
                            >
                                <Handshake size={18} />
                                View All Partners
                            </Link>
                        </div>
                    </section>

                </div>
            </section>
        </main>
    )
}

export default PartnerDetails