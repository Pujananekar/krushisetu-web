import { Handshake } from "lucide-react"

const PartnershipsFallback = ({ title = "Partnership Information" }) => {
    return (
        <div className="flex min-h-80 items-center justify-center rounded-4xl border border-gray-200 bg-white/85 p-8 text-center shadow-xl shadow-gray-900/10">
            <div className="max-w-xl">
                <div className="kr-hover-icon mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Handshake size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-950">
                    {title}
                </h3>

                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-green-600" />

                <p className="mt-5 text-base leading-7 text-gray-600">
                    Partnership information and confirmed collaboration
                    details are currently being prepared and reviewed.
                    Opportunities will be published as they are approved.
                </p>

                <p className="mt-4 text-sm font-medium text-gray-500">
                    No organisation is presented as a formal partner until
                    the partnership is officially confirmed.
                </p>
            </div>
        </div>
    )
}

export default PartnershipsFallback