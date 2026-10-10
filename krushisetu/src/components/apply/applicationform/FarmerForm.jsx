import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { submitFarmerApplication } from "../../../api/applicationApi"
import { validateFarmerField, validateFarmerForm } from "../../../utils/farmerValidation"

import ApplicationSuccess from "../../shared/ApplicationSuccess"
import Loader from "../../common/Loader"


const initialFormData = {
    name: "",
    mobile: "",
    village: "",
    taluka: "",
    district: "",
    pin: "",
    supportInterests: "",
    consent: false,
}

const initialErrors = {
    name: "",
    mobile: "",
    village: "",
    taluka: "",
    district: "",
    pin: "",
    supportInterests: "",
    consent: "",
}

const FarmerForm = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [success, setSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")

    const farmerMutation = useMutation({
        mutationFn: submitFarmerApplication,
        onSuccess: (data) => {
            setReferenceNumber(data.referenceNumber)
            setSuccess(true)
            setSubmitError("")
        },
        onError: (error) => {
            console.error("Farmer form submission failed:", error)
            setSubmitError(error?.response?.data?.message || "Something went wrong while submitting your application. Please try again.")
        },
    })

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        const newValue = type === "checkbox" ? checked : value

        setFormData((previous) => ({ ...previous, [name]: newValue }))
        setSubmitError("")

        if (touched[name]) {
            setErrors((previous) => ({ ...previous, [name]: validateFarmerField(name, newValue) }))
        }
    }

    const handleBlur = (event) => {
        const { name, value, type, checked } = event.target
        const fieldValue = type === "checkbox" ? checked : value

        setTouched((previous) => ({ ...previous, [name]: true }))
        setErrors((previous) => ({ ...previous, [name]: validateFarmerField(name, fieldValue) }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitError("")

        const validationErrors = validateFarmerForm(formData)
        setErrors(validationErrors)

        const isValid = !Object.values(validationErrors).some(Boolean)

        if (!isValid) {
            setTouched({
                name: true,
                mobile: true,
                village: true,
                taluka: true,
                district: true,
                pin: true,
                supportInterests: true,
                consent: true,
            })
            return
        }

        if (farmerMutation.isPending) return

        const payload = {
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            village: formData.village.trim(),
            taluka: formData.taluka.trim(),
            district: formData.district.trim(),
            pin: formData.pin.trim(),
            supportInterests: formData.supportInterests.trim(),
            consent: formData.consent,
        }

        farmerMutation.mutate(payload)
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setTouched({})
        setSubmitError("")
        setReferenceNumber("")
        setSuccess(false)
        farmerMutation.reset()
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
                title="Thank you for registering"
                message="Your farmer registration has been submitted successfully. Our team will review your information and contact you if required."
                buttonText="Submit Another Registration"
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
                        <p className="text-sm font-bold uppercase tracking-widest text-green-700">FARMER REGISTRATION</p>
                        <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">Register as a Farmer</h1>
                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">Share your details and tell us what kind of agricultural support you are interested in.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="farmer-name" className="mb-2 block text-sm font-semibold text-gray-700">Name *</label>
                                <input id="farmer-name" name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Your name" autoComplete="name" aria-invalid={touched.name && !!errors.name} className={inputClass("name")} />
                                {renderError("name")}
                            </div>

                            <div>
                                <label htmlFor="farmer-mobile" className="mb-2 block text-sm font-semibold text-gray-700">Mobile *</label>
                                <input id="farmer-mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} placeholder="10-digit mobile number" autoComplete="tel" inputMode="numeric" maxLength={10} aria-invalid={touched.mobile && !!errors.mobile} className={inputClass("mobile")} />
                                {renderError("mobile")}
                            </div>

                            <div>
                                <label htmlFor="farmer-village" className="mb-2 block text-sm font-semibold text-gray-700">Village *</label>
                                <input id="farmer-village" name="village" type="text" value={formData.village} onChange={handleChange} onBlur={handleBlur} placeholder="Village" autoComplete="address-level4" aria-invalid={touched.village && !!errors.village} className={inputClass("village")} />
                                {renderError("village")}
                            </div>

                            <div>
                                <label htmlFor="farmer-taluka" className="mb-2 block text-sm font-semibold text-gray-700">Taluka *</label>
                                <input id="farmer-taluka" name="taluka" type="text" value={formData.taluka} onChange={handleChange} onBlur={handleBlur} placeholder="Taluka" aria-invalid={touched.taluka && !!errors.taluka} className={inputClass("taluka")} />
                                {renderError("taluka")}
                            </div>

                            <div>
                                <label htmlFor="farmer-district" className="mb-2 block text-sm font-semibold text-gray-700">District *</label>
                                <input id="farmer-district" name="district" type="text" value={formData.district} onChange={handleChange} onBlur={handleBlur} placeholder="District" autoComplete="address-level2" aria-invalid={touched.district && !!errors.district} className={inputClass("district")} />
                                {renderError("district")}
                            </div>

                            <div>
                                <label htmlFor="farmer-pin" className="mb-2 block text-sm font-semibold text-gray-700">PIN *</label>
                                <input id="farmer-pin" name="pin" type="text" value={formData.pin} onChange={handleChange} onBlur={handleBlur} placeholder="6-digit PIN code" inputMode="numeric" maxLength={6} autoComplete="postal-code" aria-invalid={touched.pin && !!errors.pin} className={inputClass("pin")} />
                                {renderError("pin")}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="farmer-support-interests" className="mb-2 block text-sm font-semibold text-gray-700">Support Interests *</label>
                            <textarea id="farmer-support-interests" name="supportInterests" value={formData.supportInterests} onChange={handleChange} onBlur={handleBlur} rows="6" maxLength={1000} placeholder="Tell us what kind of support you are looking for..." aria-invalid={touched.supportInterests && !!errors.supportInterests} className={textareaClass("supportInterests")} />

                            <div className="mt-2 flex justify-between">
                                {renderError("supportInterests")}
                                <span className="ml-auto text-xs text-gray-400">{formData.supportInterests.length}/1000</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} onBlur={handleBlur} className="mt-1 h-4 w-4 accent-green-700" aria-invalid={touched.consent && !!errors.consent} />
                                <span>
                                    I consent to Krushisetu using the information provided for responding to this enquiry and have read the{" "}
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

                        <button type="submit" disabled={farmerMutation.isPending} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                            {farmerMutation.isPending ? (
                                <Loader variant="button" text="Submitting..." />
                            ) : (
                                <>
                                    Submit Enquiry
                                    <Send size={19} />
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-gray-500">Please provide accurate information. Our team will review your submission and contact you if required.</p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default FarmerForm