import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import {
    validateFPOField,
    validateFPOForm,
} from "../../../utils/fpoValidation"
import ApplicationSuccess from "../../shared/ApplicationSuccess"
import Loader from "../../common/Loader"
import { submitFpoApplication } from "../../../api/applicationApi"

const initialFormData = {
    organisation: "",
    contact: "",
    district: "",
    members: "",
    commodity: "",
    status: "",
    supportRequired: "",
    consent: false,
}

const initialErrors = {
    organisation: "",
    contact: "",
    district: "",
    members: "",
    commodity: "",
    status: "",
    supportRequired: "",
    consent: "",
}

const FPOForm = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [success, setSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")

    const fpoMutation = useMutation({
        mutationFn: submitFpoApplication,
        onSuccess: (data) => {
            setReferenceNumber(data.referenceNumber)
            setSuccess(true)
            setSubmitError("")
        },
        onError: (error) => {
            console.error("FPO form submission failed:", error)

            setSubmitError(
                error?.response?.data?.message ||
                    "Something went wrong while submitting your enquiry. Please try again."
            )
        },
    })

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target

        const newValue = type === "checkbox" ? checked : value

        setFormData((previous) => ({
            ...previous,
            [name]: newValue,
        }))

        setSubmitError("")

        if (touched[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]:
                    name === "consent"
                        ? newValue
                            ? ""
                            : "Consent is required."
                        : validateFPOField(name, newValue),
            }))
        }
    }

    const handleBlur = (event) => {
        const { name, value, type, checked } = event.target

        const fieldValue = type === "checkbox" ? checked : value

        setTouched((previous) => ({
            ...previous,
            [name]: true,
        }))

        setErrors((previous) => ({
            ...previous,
            [name]:
                name === "consent"
                    ? checked
                        ? ""
                        : "Consent is required."
                    : validateFPOField(name, fieldValue),
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setSubmitError("")

        const validationErrors = validateFPOForm(formData)

        setErrors(validationErrors)

        const isValid =
            !Object.values(validationErrors).some(Boolean)

        if (!isValid) {
            setTouched({
                organisation: true,
                contact: true,
                district: true,
                members: true,
                commodity: true,
                status: true,
                supportRequired: true,
                consent: true,
            })

            return
        }

        if (fpoMutation.isPending) return

        const payload = {
            organisation: formData.organisation.trim(),
            contact: formData.contact.trim(),
            district: formData.district.trim(),
            members: formData.members.trim(),
            commodity: formData.commodity.trim(),
            status: formData.status.trim(),
            supportRequired: formData.supportRequired.trim(),
            consent: formData.consent,
        }

        fpoMutation.mutate(payload)
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setTouched({})
        setSubmitError("")
        setReferenceNumber("")
        setSuccess(false)
        fpoMutation.reset()
    }

    const inputClass = (fieldName) => {
        const hasError = touched[fieldName] && errors[fieldName]

        return `h-14 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
            hasError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200 focus:border-green-600 focus:ring-green-100"
        }`
    }

    const textareaClass = (fieldName) => {
        const hasError = touched[fieldName] && errors[fieldName]

        return `w-full resize-none rounded-2xl border bg-gray-50 px-4 py-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
            hasError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200 focus:border-green-600 focus:ring-green-100"
        }`
    }

    const renderError = (fieldName) => {
        if (!touched[fieldName] || !errors[fieldName]) return null

        return (
            <p className="mt-2 text-sm text-red-600">
                {errors[fieldName]}
            </p>
        )
    }

    if (success) {
        return (
            <ApplicationSuccess
                referenceNumber={referenceNumber}
                title="FPO enquiry submitted"
                message="Your institutional enquiry has been submitted successfully. Our team will review your information and contact you if further information is required."
                buttonText="Submit Another Enquiry"
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
                        <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                            FPO / INSTITUTION ENQUIRY
                        </p>

                        <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">
                            Start an Institutional Enquiry
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                            Tell us about your organisation and the support or collaboration you are looking for.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label htmlFor="fpo-organisation" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Organisation / Group *
                                </label>

                                <input id="fpo-organisation" name="organisation" type="text" value={formData.organisation} onChange={handleChange} onBlur={handleBlur} placeholder="Organisation name" autoComplete="organization" aria-invalid={touched.organisation && !!errors.organisation} className={inputClass("organisation")} />

                                {renderError("organisation")}
                            </div>

                            <div>
                                <label htmlFor="fpo-contact" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Contact Person *
                                </label>

                                <input id="fpo-contact" name="contact" type="text" value={formData.contact} onChange={handleChange} onBlur={handleBlur} placeholder="Authorised contact person" autoComplete="name" aria-invalid={touched.contact && !!errors.contact} className={inputClass("contact")} />

                                {renderError("contact")}
                            </div>

                            <div>
                                <label htmlFor="fpo-district" className="mb-2 block text-sm font-semibold text-gray-700">
                                    District *
                                </label>

                                <input id="fpo-district" name="district" type="text" value={formData.district} onChange={handleChange} onBlur={handleBlur} placeholder="District" aria-invalid={touched.district && !!errors.district} className={inputClass("district")} />

                                {renderError("district")}
                            </div>

                            <div>
                                <label htmlFor="fpo-members" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Member Count
                                </label>

                                <input id="fpo-members" name="members" type="number" min="0" step="1" inputMode="numeric" value={formData.members} onChange={handleChange} onBlur={handleBlur} placeholder="Approximate member count" aria-invalid={touched.members && !!errors.members} className={inputClass("members")} />

                                {renderError("members")}
                            </div>

                            <div>
                                <label htmlFor="fpo-commodity" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Commodity
                                </label>

                                <input id="fpo-commodity" name="commodity" type="text" value={formData.commodity} onChange={handleChange} onBlur={handleBlur} placeholder="Main commodity / activity" aria-invalid={touched.commodity && !!errors.commodity} className={inputClass("commodity")} />

                                {renderError("commodity")}
                            </div>

                            <div>
                                <label htmlFor="fpo-status" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Current Status
                                </label>

                                <input id="fpo-status" name="status" type="text" value={formData.status} onChange={handleChange} onBlur={handleBlur} placeholder="Current organisation status" aria-invalid={touched.status && !!errors.status} className={inputClass("status")} />

                                {renderError("status")}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="fpo-support-required" className="mb-2 block text-sm font-semibold text-gray-700">
                                Support Required
                            </label>

                            <textarea id="fpo-support-required" name="supportRequired" value={formData.supportRequired} onChange={handleChange} onBlur={handleBlur} rows="6" maxLength={2000} placeholder="Describe the support you are looking for..." aria-invalid={touched.supportRequired && !!errors.supportRequired} className={textareaClass("supportRequired")} />

                            <div className="mt-2 flex justify-between">
                                {renderError("supportRequired")}

                                <span className="ml-auto text-xs text-gray-400">
                                    {formData.supportRequired.length}/2000
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} onBlur={handleBlur} className="mt-1 h-4 w-4 accent-green-700" aria-invalid={touched.consent && !!errors.consent} />

                                <span>
                                    I consent to Krushisetu using the information provided for enquiry-related communication and have read the{" "}
                                    <Link to="/privacy-policy" className="font-semibold text-green-700 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </span>
                            </label>

                            {renderError("consent")}
                        </div>

                        {submitError && (
                            <div role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {submitError}
                            </div>
                        )}

                        <button type="submit" disabled={fpoMutation.isPending} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                            {fpoMutation.isPending ? (
                                <Loader variant="button" text="Submitting..." />
                            ) : (
                                <>
                                    Submit Enquiry
                                    <Send size={19} />
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                            Please provide accurate information. Our team will review your enquiry and contact you if further information is required.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default FPOForm