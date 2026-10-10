import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { submitInternshipApplication } from "../../../api/applicationApi"
import { validateInternshipField, validateInternshipForm } from "../../../utils/internshipValidation"

import ApplicationSuccess from "../../shared/ApplicationSuccess"
import Loader from "../../common/Loader"

const initialFormData = {
    name: "",
    college: "",
    course: "",
    location: "",
    duration: "",
    interest: "",
    additionalInformation: "",
    consent: false,
}

const initialErrors = {
    name: "",
    college: "",
    course: "",
    location: "",
    duration: "",
    interest: "",
    additionalInformation: "",
    consent: "",
}

const InternshipForm = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [success, setSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")

    const internshipMutation = useMutation({
        mutationFn: submitInternshipApplication,
        onSuccess: (data) => {
            setReferenceNumber(data.referenceNumber)
            setSuccess(true)
            setSubmitError("")
        },
        onError: (error) => {
            console.error("Internship form submission failed:", error)
            setSubmitError(error?.response?.data?.message || "Something went wrong while submitting your internship application. Please try again.")
        },
    })

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        const newValue = type === "checkbox" ? checked : value

        setFormData((previous) => ({ ...previous, [name]: newValue }))
        setSubmitError("")

        if (touched[name]) {
            setErrors((previous) => ({ ...previous, [name]: validateInternshipField(name, newValue) }))
        }
    }

    const handleBlur = (event) => {
        const { name, value, type, checked } = event.target
        const fieldValue = type === "checkbox" ? checked : value

        setTouched((previous) => ({ ...previous, [name]: true }))
        setErrors((previous) => ({ ...previous, [name]: validateInternshipField(name, fieldValue) }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitError("")

        const validationErrors = validateInternshipForm(formData)
        setErrors(validationErrors)

        const isValid = !Object.values(validationErrors).some(Boolean)

        if (!isValid) {
            setTouched({
                name: true,
                college: true,
                course: true,
                location: true,
                duration: true,
                interest: true,
                additionalInformation: true,
                consent: true,
            })
            return
        }

        if (internshipMutation.isPending) return

        const payload = {
            name: formData.name.trim(),
            college: formData.college.trim(),
            course: formData.course.trim(),
            location: formData.location.trim(),
            duration: formData.duration.trim(),
            interest: formData.interest.trim(),
            additionalInformation: formData.additionalInformation.trim(),
            consent: formData.consent,
        }

        internshipMutation.mutate(payload)
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setTouched({})
        setSubmitError("")
        setReferenceNumber("")
        setSuccess(false)
        internshipMutation.reset()
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
                title="Internship application submitted"
                message="Your internship application has been submitted successfully. Our team will review your information and contact you if there is a suitable opportunity."
                buttonText="Submit Another Application"
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
                        <p className="text-sm font-bold uppercase tracking-widest text-green-700">INTERNSHIP APPLICATION</p>
                        <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">Apply for Internship</h1>
                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">Students can share their academic background and areas of interest.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="internship-name" className="mb-2 block text-sm font-semibold text-gray-700">Name *</label>
                                <input id="internship-name" name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Your name" autoComplete="name" aria-invalid={touched.name && !!errors.name} className={inputClass("name")} />
                                {renderError("name")}
                            </div>

                            <div>
                                <label htmlFor="internship-college" className="mb-2 block text-sm font-semibold text-gray-700">College *</label>
                                <input id="internship-college" name="college" type="text" value={formData.college} onChange={handleChange} onBlur={handleBlur} placeholder="College / University" aria-invalid={touched.college && !!errors.college} className={inputClass("college")} />
                                {renderError("college")}
                            </div>

                            <div>
                                <label htmlFor="internship-course" className="mb-2 block text-sm font-semibold text-gray-700">Course / Year *</label>
                                <input id="internship-course" name="course" type="text" value={formData.course} onChange={handleChange} onBlur={handleBlur} placeholder="Course and year" aria-invalid={touched.course && !!errors.course} className={inputClass("course")} />
                                {renderError("course")}
                            </div>

                            <div>
                                <label htmlFor="internship-location" className="mb-2 block text-sm font-semibold text-gray-700">Location *</label>
                                <input id="internship-location" name="location" type="text" value={formData.location} onChange={handleChange} onBlur={handleBlur} placeholder="City / District" aria-invalid={touched.location && !!errors.location} className={inputClass("location")} />
                                {renderError("location")}
                            </div>

                            <div>
                                <label htmlFor="internship-duration" className="mb-2 block text-sm font-semibold text-gray-700">Duration *</label>
                                <input id="internship-duration" name="duration" type="text" value={formData.duration} onChange={handleChange} onBlur={handleBlur} placeholder="Expected internship duration" aria-invalid={touched.duration && !!errors.duration} className={inputClass("duration")} />
                                {renderError("duration")}
                            </div>

                            <div>
                                <label htmlFor="internship-interest" className="mb-2 block text-sm font-semibold text-gray-700">Area of Interest *</label>
                                <input id="internship-interest" name="interest" type="text" value={formData.interest} onChange={handleChange} onBlur={handleBlur} placeholder="Area you are interested in" aria-invalid={touched.interest && !!errors.interest} className={inputClass("interest")} />
                                {renderError("interest")}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="internship-additional-information" className="mb-2 block text-sm font-semibold text-gray-700">Additional Information</label>
                            <textarea id="internship-additional-information" name="additionalInformation" value={formData.additionalInformation} onChange={handleChange} onBlur={handleBlur} rows="6" maxLength={2000} placeholder="Tell us about your internship requirements..." aria-invalid={touched.additionalInformation && !!errors.additionalInformation} className={textareaClass("additionalInformation")} />

                            <div className="mt-2 flex justify-between">
                                {renderError("additionalInformation")}
                                <span className="ml-auto text-xs text-gray-400">{formData.additionalInformation.length}/2000</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} onBlur={handleBlur} className="mt-1 h-4 w-4 accent-green-700" aria-invalid={touched.consent && !!errors.consent} />
                                <span>
                                    I consent to Krushisetu using the information provided for internship-related communication and have read the{" "}
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

                        <button type="submit" disabled={internshipMutation.isPending} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                            {internshipMutation.isPending ? (
                                <Loader variant="button" text="Submitting..." />
                            ) : (
                                <>
                                    Submit Application
                                    <Send size={19} />
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-gray-500">Please provide accurate information. Our team will review your application and contact you if a suitable opportunity is available.</p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default InternshipForm