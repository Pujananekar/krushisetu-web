import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { submitServiceApplication } from "../../../api/applicationApi"
import { validateServiceField, validateServiceForm } from "../../../utils/serviceValidation"

import ApplicationSuccess from "../../shared/ApplicationSuccess"
import Loader from "../../common/Loader"

const initialFormData = {
    name: "",
    mobile: "",
    crop: "",
    location: "",
    category: "",
    urgency: "",
    problem: "",
    consent: false,
}

const initialErrors = {
    name: "",
    mobile: "",
    crop: "",
    location: "",
    category: "",
    urgency: "",
    problem: "",
    consent: "",
}

const ServiceForm = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [success, setSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")

    const serviceMutation = useMutation({
        mutationFn: submitServiceApplication,
        onSuccess: (data) => {
            setReferenceNumber(data.referenceNumber)
            setSuccess(true)
            setSubmitError("")
        },
        onError: (error) => {
            console.error("Service form submission failed:", error)
            setSubmitError(error?.response?.data?.message || "Something went wrong while submitting your service request. Please try again.")
        },
    })

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        const newValue = type === "checkbox" ? checked : value

        setFormData((previous) => ({ ...previous, [name]: newValue }))
        setSubmitError("")

        if (touched[name]) {
            setErrors((previous) => ({ ...previous, [name]: validateServiceField(name, newValue) }))
        }
    }

    const handleBlur = (event) => {
        const { name, value, type, checked } = event.target
        const fieldValue = type === "checkbox" ? checked : value

        setTouched((previous) => ({ ...previous, [name]: true }))
        setErrors((previous) => ({ ...previous, [name]: validateServiceField(name, fieldValue) }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitError("")

        const validationErrors = validateServiceForm(formData)
        setErrors(validationErrors)

        const isValid = !Object.values(validationErrors).some(Boolean)

        if (!isValid) {
            setTouched({
                name: true,
                mobile: true,
                crop: true,
                location: true,
                category: true,
                urgency: true,
                problem: true,
                consent: true,
            })
            return
        }

        if (serviceMutation.isPending) return

        const payload = {
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            crop: formData.crop.trim(),
            location: formData.location.trim(),
            category: formData.category.trim(),
            urgency: formData.urgency.trim(),
            problem: formData.problem.trim(),
            consent: formData.consent,
        }

        serviceMutation.mutate(payload)
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setTouched({})
        setSubmitError("")
        setReferenceNumber("")
        setSuccess(false)
        serviceMutation.reset()
    }

    const inputClass = (fieldName) => {
        const hasError = touched[fieldName] && errors[fieldName]

        return `h-14 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-green-600 focus:ring-green-100"}`
    }

    const textareaClass = (fieldName) => {
        const hasError = touched[fieldName] && errors[fieldName]

        return `w-full resize-none rounded-2xl border bg-gray-50 px-4 py-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-green-600 focus:ring-green-100"}`
    }

    const renderError = (fieldName) => {
        if (!touched[fieldName] || !errors[fieldName]) return null

        return <p className="mt-2 text-sm text-red-600">{errors[fieldName]}</p>
    }

    if (success) {
        return (
            <ApplicationSuccess
                referenceNumber={referenceNumber}
                title="Service request submitted"
                message="Your service request has been submitted successfully. Our team will review your requirement and contact you if required."
                buttonText="Submit Another Request"
                onReset={handleReset}
            />
        )
    }

    return (
        <section className="px-5 pb-20 pt-40 md:px-8 md:pt-44 lg:px-12 xl:px-16">
            <div className="mx-auto max-w-350">
                <Link to="/apply" className="inline-flex items-center gap-2 font-semibold text-green-700 transition-all duration-300 hover:gap-3">
                    <ArrowLeft size={18} />
                    Back to Join / Apply
                </Link>

                <div className="mx-auto mt-8 max-w-4xl rounded-4xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-900/5 md:p-10 lg:p-12">
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-green-700">SERVICE REQUEST</p>
                        <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">Request Support</h1>
                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">Tell us about the service or agricultural support you require.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="service-name" className="mb-2 block text-sm font-semibold text-gray-700">Name *</label>
                                <input id="service-name" name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Your name" autoComplete="name" aria-invalid={touched.name && !!errors.name} className={inputClass("name")} />
                                {renderError("name")}
                            </div>

                            <div>
                                <label htmlFor="service-mobile" className="mb-2 block text-sm font-semibold text-gray-700">Mobile / Email *</label>
                                <input id="service-mobile" name="mobile" type="text" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Mobile or email" autoComplete="email" aria-invalid={touched.mobile && !!errors.mobile} className={inputClass("mobile")} />
                                {renderError("mobile")}
                            </div>

                            <div>
                                <label htmlFor="service-crop" className="mb-2 block text-sm font-semibold text-gray-700">Crop / Activity *</label>
                                <input id="service-crop" name="crop" type="text" value={formData.crop} onChange={handleChange} onBlur={handleBlur} placeholder="Crop or activity" aria-invalid={touched.crop && !!errors.crop} className={inputClass("crop")} />
                                {renderError("crop")}
                            </div>

                            <div>
                                <label htmlFor="service-location" className="mb-2 block text-sm font-semibold text-gray-700">Location *</label>
                                <input id="service-location" name="location" type="text" value={formData.location} onChange={handleChange} onBlur={handleBlur} placeholder="Village / District" aria-invalid={touched.location && !!errors.location} className={inputClass("location")} />
                                {renderError("location")}
                            </div>

                            <div>
                                <label htmlFor="service-category" className="mb-2 block text-sm font-semibold text-gray-700">Support Category *</label>
                                <input id="service-category" name="category" type="text" value={formData.category} onChange={handleChange} onBlur={handleBlur} placeholder="Advisory / Scheme / Training / Other" aria-invalid={touched.category && !!errors.category} className={inputClass("category")} />
                                {renderError("category")}
                            </div>

                            <div>
                                <label htmlFor="service-urgency" className="mb-2 block text-sm font-semibold text-gray-700">Urgency</label>
                                <input id="service-urgency" name="urgency" type="text" value={formData.urgency} onChange={handleChange} onBlur={handleBlur} placeholder="Normal / Urgent" aria-invalid={touched.urgency && !!errors.urgency} className={inputClass("urgency")} />
                                {renderError("urgency")}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="service-problem" className="mb-2 block text-sm font-semibold text-gray-700">Problem / Requirement</label>
                            <textarea id="service-problem" name="problem" value={formData.problem} onChange={handleChange} onBlur={handleBlur} rows="6" maxLength={2000} placeholder="Describe your requirement..." aria-invalid={touched.problem && !!errors.problem} className={textareaClass("problem")} />

                            <div className="mt-2 flex justify-between">
                                {renderError("problem")}
                                <span className="ml-auto text-xs text-gray-400">{formData.problem.length}/2000</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} onBlur={handleBlur} className="mt-1 h-4 w-4 accent-green-700" aria-invalid={touched.consent && !!errors.consent} />
                                <span>
                                    I consent to Krushisetu using the information provided for responding to this service request and have read the{" "}
                                    <Link to="/privacy-policy" className="font-semibold text-green-700 hover:underline">Privacy Policy</Link>.
                                </span>
                            </label>

                            {renderError("consent")}
                        </div>

                        {submitError && (
                            <div role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {submitError}
                            </div>
                        )}

                        <button type="submit" disabled={serviceMutation.isPending} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                            {serviceMutation.isPending ? (
                                <Loader variant="button" text="Submitting..." />
                            ) : (
                                <>
                                    Submit Request
                                    <Send size={19} />
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-gray-500">Please provide accurate information. Our team will review your request and contact you if required.</p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ServiceForm