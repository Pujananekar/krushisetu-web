import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import {
    validatePartnershipField,
    validatePartnershipForm,
} from "../../../utils/partnershipValidation"
import ApplicationSuccess from "../../shared/ApplicationSuccess"
import Loader from "../../common/Loader"
import { submitPartnershipApplication } from "../../../api/applicationApi.js"

const initialFormData = {
    organisation: "",
    contact: "",
    email: "",
    mobile: "",
    theme: "",
    geography: "",
    target: "",
    timeline: "",
    message: "",
    consent: false,
}

const initialErrors = {
    organisation: "",
    contact: "",
    email: "",
    mobile: "",
    theme: "",
    geography: "",
    target: "",
    timeline: "",
    message: "",
    consent: "",
}

const PartnershipForm = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [success, setSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")

    const partnershipMutation = useMutation({
        mutationFn: submitPartnershipApplication,
        onSuccess: (data) => {
            setReferenceNumber(data.referenceNumber)
            setSuccess(true)
            setSubmitError("")
        },
        onError: (error) => {
            console.error(
                "Partnership form submission failed:",
                error
            )

            setSubmitError(
                error?.response?.data?.message ||
                    "Something went wrong while submitting your enquiry. Please try again."
            )
        },
    })

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target

        const newValue =
            type === "checkbox"
                ? checked
                : value

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
                        : validatePartnershipField(
                              name,
                              newValue
                          ),
            }))
        }
    }

    const handleBlur = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target

        const fieldValue =
            type === "checkbox"
                ? checked
                : value

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
                    : validatePartnershipField(
                          name,
                          fieldValue
                      ),
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setSubmitError("")

        const validationErrors =
            validatePartnershipForm(formData)

        setErrors(validationErrors)

        const isValid =
            !Object.values(validationErrors).some(
                Boolean
            )

        if (!isValid) {
            setTouched({
                organisation: true,
                contact: true,
                email: true,
                mobile: true,
                theme: true,
                geography: true,
                target: true,
                timeline: true,
                message: true,
                consent: true,
            })

            return
        }

        if (partnershipMutation.isPending) return

        const payload = {
            organisation: formData.organisation.trim(),
            contact: formData.contact.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            theme: formData.theme.trim(),
            geography: formData.geography.trim(),
            target: formData.target.trim(),
            timeline: formData.timeline.trim(),
            message: formData.message.trim(),
            consent: formData.consent,
        }

        partnershipMutation.mutate(payload)
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setTouched({})
        setSubmitError("")
        setReferenceNumber("")
        setSuccess(false)
        partnershipMutation.reset()
    }

    const inputClass = (fieldName) => {
        const hasError =
            touched[fieldName] &&
            errors[fieldName]

        return `h-14 w-full rounded-2xl border bg-gray-50 px-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
            hasError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200 focus:border-green-600 focus:ring-green-100"
        }`
    }

    const textareaClass = (fieldName) => {
        const hasError =
            touched[fieldName] &&
            errors[fieldName]

        return `w-full resize-none rounded-2xl border bg-gray-50 px-4 py-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
            hasError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200 focus:border-green-600 focus:ring-green-100"
        }`
    }

    const renderError = (fieldName) => {
        if (
            !touched[fieldName] ||
            !errors[fieldName]
        ) {
            return null
        }

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
                title="CSR / partnership enquiry submitted"
                message="Your enquiry has been submitted successfully. Our team will review your collaboration requirements and contact you if further information is required."
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
                            CSR / PARTNERSHIP ENQUIRY
                        </p>

                        <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">
                            Partner With Krushisetu
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                            Share your organisation's collaboration or CSR requirements.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="partnership-organisation" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Organisation *
                                </label>

                                <input id="partnership-organisation" name="organisation" type="text" value={formData.organisation} onChange={handleChange} onBlur={handleBlur} placeholder="Organisation name" autoComplete="organization" aria-invalid={touched.organisation && !!errors.organisation} className={inputClass("organisation")} />

                                {renderError("organisation")}
                            </div>

                            <div>
                                <label htmlFor="partnership-contact" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Authorised Contact *
                                </label>

                                <input id="partnership-contact" name="contact" type="text" value={formData.contact} onChange={handleChange} onBlur={handleBlur} placeholder="Contact person" autoComplete="name" aria-invalid={touched.contact && !!errors.contact} className={inputClass("contact")} />

                                {renderError("contact")}
                            </div>

                            <div>
                                <label htmlFor="partnership-email" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email *
                                </label>

                                <input id="partnership-email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email address" autoComplete="email" aria-invalid={touched.email && !!errors.email} className={inputClass("email")} />

                                {renderError("email")}
                            </div>

                            <div>
                                <label htmlFor="partnership-mobile" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Mobile *
                                </label>

                                <input id="partnership-mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Mobile number" autoComplete="tel" inputMode="numeric" maxLength={10} aria-invalid={touched.mobile && !!errors.mobile} className={inputClass("mobile")} />

                                {renderError("mobile")}
                            </div>

                            <div>
                                <label htmlFor="partnership-theme" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Project Theme *
                                </label>

                                <input id="partnership-theme" name="theme" type="text" value={formData.theme} onChange={handleChange} onBlur={handleBlur} placeholder="Agriculture / Livelihood / Water / Climate / etc." aria-invalid={touched.theme && !!errors.theme} className={inputClass("theme")} />

                                {renderError("theme")}
                            </div>

                            <div>
                                <label htmlFor="partnership-geography" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Geography *
                                </label>

                                <input id="partnership-geography" name="geography" type="text" value={formData.geography} onChange={handleChange} onBlur={handleBlur} placeholder="Target geography" aria-invalid={touched.geography && !!errors.geography} className={inputClass("geography")} />

                                {renderError("geography")}
                            </div>

                            <div>
                                <label htmlFor="partnership-target" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Target Group *
                                </label>

                                <input id="partnership-target" name="target" type="text" value={formData.target} onChange={handleChange} onBlur={handleBlur} placeholder="Farmers / Women / Youth / FPOs / etc." aria-invalid={touched.target && !!errors.target} className={inputClass("target")} />

                                {renderError("target")}
                            </div>

                            <div>
                                <label htmlFor="partnership-timeline" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Expected Timeline
                                </label>

                                <input id="partnership-timeline" name="timeline" type="text" value={formData.timeline} onChange={handleChange} onBlur={handleBlur} placeholder="Expected project timeline" aria-invalid={touched.timeline && !!errors.timeline} className={inputClass("timeline")} />

                                {renderError("timeline")}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="partnership-message" className="mb-2 block text-sm font-semibold text-gray-700">
                                Message
                            </label>

                            <textarea id="partnership-message" name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} rows="6" maxLength={2000} placeholder="Tell us about your proposed collaboration..." aria-invalid={touched.message && !!errors.message} className={textareaClass("message")} />

                            <div className="mt-2 flex justify-between">
                                {renderError("message")}

                                <span className="ml-auto text-xs text-gray-400">
                                    {formData.message.length}/2000
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} onBlur={handleBlur} className="mt-1 h-4 w-4 accent-green-700" aria-invalid={touched.consent && !!errors.consent} />

                                <span>
                                    I consent to Krushisetu using the information provided for CSR / partnership-related communication and have read the{" "}
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

                        <button type="submit" disabled={partnershipMutation.isPending} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                            {partnershipMutation.isPending ? (
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

export default PartnershipForm