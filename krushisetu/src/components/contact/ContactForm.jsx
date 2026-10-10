import { useState } from "react"
import {
    Mail,
    MessageSquare,
    Phone,
    Send,
    UserRound,
} from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { submitContactForm } from "../../api/contactApi"

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    })

    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState("")
    const [referenceNumber, setReferenceNumber] = useState("")

    const contactMutation = useMutation({
        mutationFn: submitContactForm,
        onSuccess: (data) => {
            setSuccessMessage(data.message)
            setReferenceNumber(data.referenceNumber)

            setFormData({
                name: "",
                phone: "",
                email: "",
                message: "",
            })

            setErrors({})
        },
        onError: () => {
            setSuccessMessage("")
            setReferenceNumber("")
        },
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Please enter your name."
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Please enter your phone number."
        }

        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email address."
        }

        if (!formData.message.trim()) {
            newErrors.message = "Please enter your message."
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setSuccessMessage("")
        setReferenceNumber("")

        if (!validateForm()) {
            return
        }

        contactMutation.mutate({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
        })
    }

    return (
        <div className="h-fit rounded-3xl border border-gray-200 bg-white/95 p-6 shadow-lg md:p-8">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-800 text-white">
                    <Send size={30} strokeWidth={1.8} />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-green-900 md:text-3xl">
                        Send Us a Message
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 md:text-base">
                        Fill out the form and we'll get back to you.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <div className="grid gap-5">
                    <div>
                        <div className="relative">
                            <UserRound
                                size={21}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-800"
                            />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className={`h-16 w-full rounded-xl border bg-white pl-12 pr-4 text-gray-700 outline-none transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 ${
                                    errors.name
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                        : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                                }`}
                            />
                        </div>

                        {errors.name && (
                            <p className="mt-2 text-sm font-medium text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <Phone
                                size={21}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-800"
                            />

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className={`h-16 w-full rounded-xl border bg-white pl-12 pr-4 text-gray-700 outline-none transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 ${
                                    errors.phone
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                        : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                                }`}
                            />
                        </div>

                        {errors.phone && (
                            <p className="mt-2 text-sm font-medium text-red-600">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="relative">
                        <Mail
                            size={21}
                            className="absolute left-4 top-5 text-green-800"
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className={`h-16 w-full rounded-xl border bg-white pl-12 pr-4 text-gray-700 outline-none transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 ${
                                errors.email
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                    : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                            }`}
                        />
                    </div>

                    {errors.email && (
                        <p className="mt-2 text-sm font-medium text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <div className="relative">
                        <MessageSquare
                            size={21}
                            className="absolute left-4 top-5 text-green-800"
                        />

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Your Message"
                            className={`w-full resize-none rounded-xl border bg-white py-4 pl-12 pr-4 text-gray-700 outline-none transition-colors duration-300 placeholder:text-gray-400 focus:ring-2 ${
                                errors.message
                                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                    : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                            }`}
                        />
                    </div>

                    {errors.message && (
                        <p className="mt-2 text-sm font-medium text-red-600">
                            {errors.message}
                        </p>
                    )}
                </div>

                {contactMutation.isError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        Unable to send your message right now. Please try
                        again.
                    </div>
                )}

                {contactMutation.isSuccess && (
                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800">
                        <p className="font-semibold">{successMessage}</p>

                        {referenceNumber && (
                            <p className="mt-1">
                                Reference Number:{" "}
                                <span className="font-bold">
                                    {referenceNumber}
                                </span>
                            </p>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="kr-hover-button flex h-16 items-center justify-center gap-3 rounded-xl bg-green-800 px-6 font-semibold text-white shadow-md hover:bg-green-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <Send size={22} />

                    <span>
                        {contactMutation.isPending
                            ? "Sending..."
                            : "Send Message"}
                    </span>
                </button>
            </form>
        </div>
    )
}

export default ContactForm