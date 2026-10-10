import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { submitTrainingApplication } from "../../../api/applicationApi"
import { validateTrainingField, validateTrainingForm } from "../../../utils/trainingValidation"

import ApplicationSuccess from "../../shared/ApplicationSuccess"
import Loader from "../../common/Loader"

const initialFormData = {
    program: "",
    name: "",
    mobile: "",
    village: "",
    district: "",
    participant: "",
    organisation: "",
    accessibilityNeeds: "",
    consent: false,
}

const initialErrors = {
    program: "",
    name: "",
    mobile: "",
    village: "",
    district: "",
    participant: "",
    organisation: "",
    accessibilityNeeds: "",
    consent: "",
}

const TrainingForm = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [success, setSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")

    const trainingMutation = useMutation({
        mutationFn: submitTrainingApplication,
        onSuccess: (data) => {
            setReferenceNumber(data.referenceNumber)
            setSuccess(true)
            setSubmitError("")
        },
        onError: (error) => {
            console.error("Training form submission failed:", error)
            setSubmitError(error?.response?.data?.message || "Something went wrong while submitting your application. Please try again.")
        },
    })

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        const newValue = type === "checkbox" ? checked : value

        setFormData((previous) => ({ ...previous, [name]: newValue }))
        setSubmitError("")

        if (touched[name]) {
            setErrors((previous) => ({ ...previous, [name]: validateTrainingField(name, newValue) }))
        }
    }

    const handleBlur = (event) => {
        const { name, value, type, checked } = event.target
        const fieldValue = type === "checkbox" ? checked : value

        setTouched((previous) => ({ ...previous, [name]: true }))
        setErrors((previous) => ({ ...previous, [name]: validateTrainingField(name, fieldValue) }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitError("")

        const validationErrors = validateTrainingForm(formData)
        setErrors(validationErrors)

        const isValid = !Object.values(validationErrors).some(Boolean)

        if (!isValid) {
            setTouched({
                program: true,
                name: true,
                mobile: true,
                village: true,
                district: true,
                participant: true,
                organisation: true,
                accessibilityNeeds: true,
                consent: true,
            })
            return
        }

        if (trainingMutation.isPending) return

        const payload = {
            program: formData.program.trim(),
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            village: formData.village.trim(),
            district: formData.district.trim(),
            participant: formData.participant.trim(),
            organisation: formData.organisation.trim(),
            accessibilityNeeds: formData.accessibilityNeeds.trim(),
            consent: formData.consent,
        }

        trainingMutation.mutate(payload)
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setTouched({})
        setSubmitError("")
        setReferenceNumber("")
        setSuccess(false)
        trainingMutation.reset()
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
                title="Training registration submitted"
                message="Your training registration has been submitted successfully. Our team will review your information and contact you regarding the training programme."
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
                        <p className="text-sm font-bold uppercase tracking-widest text-green-700">TRAINING REGISTRATION</p>
                        <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">Register for Training</h1>
                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">Register your interest in one of our training programmes and share the information we need to support your participation.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="training-program" className="mb-2 block text-sm font-semibold text-gray-700">Training Programme *</label>
                                <input id="training-program" name="program" type="text" value={formData.program} onChange={handleChange} onBlur={handleBlur} placeholder="Training programme" aria-invalid={touched.program && !!errors.program} className={inputClass("program")} />
                                {renderError("program")}
                            </div>

                            <div>
                                <label htmlFor="training-name" className="mb-2 block text-sm font-semibold text-gray-700">Name *</label>
                                <input id="training-name" name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Your name" autoComplete="name" aria-invalid={touched.name && !!errors.name} className={inputClass("name")} />
                                {renderError("name")}
                            </div>

                            <div>
                                <label htmlFor="training-mobile" className="mb-2 block text-sm font-semibold text-gray-700">Mobile / Email *</label>
                                <input id="training-mobile" name="mobile" type="text" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Mobile number or email" autoComplete="email" aria-invalid={touched.mobile && !!errors.mobile} className={inputClass("mobile")} />
                                {renderError("mobile")}
                            </div>

                            <div>
                                <label htmlFor="training-village" className="mb-2 block text-sm font-semibold text-gray-700">Village *</label>
                                <input id="training-village" name="village" type="text" value={formData.village} onChange={handleChange} onBlur={handleBlur} placeholder="Village" autoComplete="address-level4" aria-invalid={touched.village && !!errors.village} className={inputClass("village")} />
                                {renderError("village")}
                            </div>

                            <div>
                                <label htmlFor="training-district" className="mb-2 block text-sm font-semibold text-gray-700">District *</label>
                                <input id="training-district" name="district" type="text" value={formData.district} onChange={handleChange} onBlur={handleBlur} placeholder="District" autoComplete="address-level2" aria-invalid={touched.district && !!errors.district} className={inputClass("district")} />
                                {renderError("district")}
                            </div>

                            <div>
                                <label htmlFor="training-participant" className="mb-2 block text-sm font-semibold text-gray-700">Participant Type *</label>
                                <select id="training-participant" name="participant" value={formData.participant} onChange={handleChange} onBlur={handleBlur} aria-invalid={touched.participant && !!errors.participant} className={inputClass("participant")}>
                                    <option value="">Select participant type</option>
                                    <option value="Farmer">Farmer</option>
                                    <option value="Student">Student</option>
                                    <option value="Youth">Youth</option>
                                    <option value="Women">Women</option>
                                    <option value="FPO Member">FPO Member</option>
                                    <option value="NGO / Organisation">NGO / Organisation</option>
                                    <option value="Other">Other</option>
                                </select>
                                {renderError("participant")}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="training-organisation" className="mb-2 block text-sm font-semibold text-gray-700">Organisation</label>
                            <input id="training-organisation" name="organisation" type="text" value={formData.organisation} onChange={handleChange} onBlur={handleBlur} placeholder="Organisation name, if applicable" aria-invalid={touched.organisation && !!errors.organisation} className={inputClass("organisation")} />
                            {renderError("organisation")}
                        </div>

                        <div className="mt-5">
                            <label htmlFor="training-accessibility" className="mb-2 block text-sm font-semibold text-gray-700">Accessibility Needs</label>
                            <textarea id="training-accessibility" name="accessibilityNeeds" value={formData.accessibilityNeeds} onChange={handleChange} onBlur={handleBlur} rows="5" maxLength={1000} placeholder="Tell us about any accessibility or participation support you may need..." aria-invalid={touched.accessibilityNeeds && !!errors.accessibilityNeeds} className={textareaClass("accessibilityNeeds")} />

                            <div className="mt-2 flex justify-between">
                                {renderError("accessibilityNeeds")}
                                <span className="ml-auto text-xs text-gray-400">{formData.accessibilityNeeds.length}/1000</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} onBlur={handleBlur} className="mt-1 h-4 w-4 accent-green-700" aria-invalid={touched.consent && !!errors.consent} />
                                <span>
                                    I consent to Krushisetu using the information provided for training registration and communication and have read the{" "}
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

                        <button type="submit" disabled={trainingMutation.isPending} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                            {trainingMutation.isPending ? (
                                <Loader variant="button" text="Submitting..." />
                            ) : (
                                <>
                                    Submit Registration
                                    <Send size={19} />
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-gray-500">Please provide accurate information. Our team will review your registration and contact you regarding the training programme.</p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default TrainingForm