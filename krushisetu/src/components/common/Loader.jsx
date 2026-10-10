import { LoaderCircle } from "lucide-react"

const Loader = ({ variant = "page", text = "Loading..." }) => {
    if (variant === "inline") {
        return (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                <LoaderCircle size={18} className="animate-spin" />
                {text}
            </span>
        )
    }

    if (variant === "button") {
        return (
            <span className="inline-flex items-center justify-center gap-2">
                <LoaderCircle size={18} className="animate-spin" />
                <span>{text}</span>
            </span>
        )
    }

    if (variant === "section") {
        return (
            <div className="flex min-h-40 items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-green-700">
                    <LoaderCircle size={32} className="animate-spin" />
                    <span className="text-sm font-medium">{text}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                    <LoaderCircle size={32} className="animate-spin" />
                </div>
                <p className="text-sm font-medium text-gray-600">{text}</p>
            </div>
        </div>
    )
}

export default Loader