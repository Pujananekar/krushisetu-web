import { ArrowLeft, FileText } from "lucide-react"
import { Link } from "react-router-dom"

const LegalPage = ({ eyebrow, title, description, sections = [] }) => {
    return (
        <main className="min-h-screen overflow-hidden bg-[#F6FAF7]">
            <section className="relative overflow-hidden px-5 pb-16 pt-40 md:px-8 md:pb-20 md:pt-44 lg:px-12 xl:px-16">
                <div className="absolute inset-0 bg-[url('/images/services_bg.png')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0 bg-linear-to-b from-white/70 via-[#F6FAF7]/90 to-[#F6FAF7]" />

                <div className="relative z-10 mx-auto max-w-350">
                    <Link to="/" className="inline-flex items-center gap-2 font-semibold text-green-700 transition-all duration-300 hover:gap-3">
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>

                    <div className="mx-auto mt-10 max-w-4xl text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                            <FileText size={26} />
                        </div>

                        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-green-700">
                            {eyebrow}
                        </p>

                        <h1 className="mt-3 text-4xl font-black tracking-tight text-green-950 md:text-5xl lg:text-6xl">
                            {title}
                        </h1>

                        <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-green-700" />

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 md:px-8 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-4xl rounded-4xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/5 md:p-10 lg:p-12">
                    <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <p className="text-sm leading-6 text-amber-800">
                            This page is currently a publication-ready structure. The final approved legal text will be added before production publication.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {sections.map((section, index) => (
                            <section key={section.title}>
                                <div className="flex items-start gap-4">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-sm font-bold text-green-700">
                                        {index + 1}
                                    </span>

                                    <div className="min-w-0">
                                        <h2 className="text-xl font-bold text-green-950 md:text-2xl">
                                            {section.title}
                                        </h2>

                                        <p className="mt-3 leading-7 text-gray-600">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mt-12 border-t border-gray-200 pt-6">
                        <p className="text-sm text-gray-500">
                            Last Updated: To be confirmed
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default LegalPage