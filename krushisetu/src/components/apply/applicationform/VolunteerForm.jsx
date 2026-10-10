import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import {
    validateVolunteerField,
    validateVolunteerForm,
} from "../../../utils/volunteerValidation"
import ApplicationSuccess from "../../shared/ApplicationSuccess"
import Loader from "../../common/Loader"
import { submitVolunteerApplication } from "../../../api/applicationApi"

const initialFormData = {
    name: "",
    mobile: "",
    location: "",
    expertise: "",
    experience: "",
    availability: "",
    contribution: "",
    consent: false,
}

const initialErrors = {
    name: "",
    mobile: "",
    location: "",
    expertise: "",
    experience: "",
    availability: "",
    contribution: "",
    consent: "",
}

const VolunteerForm = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [touched, setTouched] = useState({})
    const [submitError, setSubmitError] = useState("")
    const [success, setSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState("")

    const volunteerMutation = useMutation({
        mutationFn: submitVolunteerApplication,
        onSuccess: (data) => {
            setReferenceNumber(data.referenceNumber)
            setSuccess(true)
            setSubmitError("")
        },
        onError: (error) => {
            console.error(
                "Volunteer form submission failed:",
                error
            )

            setSubmitError(
                error?.response?.data?.message ||
                    "Something went wrong while submitting your application. Please try again."
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
                        : validateVolunteerField(
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
                    : validateVolunteerField(
                          name,
                          fieldValue
                      ),
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setSubmitError("")

        const validationErrors =
            validateVolunteerForm(formData)

        setErrors(validationErrors)

        const isValid =
            !Object.values(validationErrors).some(
                Boolean
            )

        if (!isValid) {
            setTouched({
                name: true,
                mobile: true,
                location: true,
                expertise: true,
                experience: true,
                availability: true,
                contribution: true,
                consent: true,
            })

            return
        }

        if (volunteerMutation.isPending) return

        const payload = {
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            location: formData.location.trim(),
            expertise: formData.expertise.trim(),
            experience: formData.experience.trim(),
            availability: formData.availability.trim(),
            contribution: formData.contribution.trim(),
            consent: formData.consent,
        }

        volunteerMutation.mutate(payload)
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setTouched({})
        setSubmitError("")
        setReferenceNumber("")
        setSuccess(false)
        volunteerMutation.reset()
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
                title="Volunteer application submitted"
                message="Your interest in contributing to Krushisetu has been submitted successfully. Our team will review your information and contact you if there is a suitable opportunity."
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
                        <p className="text-sm font-bold uppercase tracking-widest text-green-700">
                            VOLUNTEER / EXPERT INTEREST
                        </p>

                        <h1 className="mt-3 text-3xl font-black text-green-950 md:text-4xl">
                            Contribute Your Expertise
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                            Tell us how you would like to contribute to Krushisetu's work.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-10">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="volunteer-name" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Name *
                                </label>

                                <input id="volunteer-name" name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="Your name" autoComplete="name" aria-invalid={touched.name && !!errors.name} className={inputClass("name")} />

                                {renderError("name")}
                            </div>

                            <div>
                                <label htmlFor="volunteer-mobile" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Mobile / Email *
                                </label>

                                <input id="volunteer-mobile" name="mobile" type="text" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Mobile or email" autoComplete="email" aria-invalid={touched.mobile && !!errors.mobile} className={inputClass("mobile")} />

                                {renderError("mobile")}
                            </div>

                            <div>
                                <label htmlFor="volunteer-location" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Location *
                                </label>

                                <input id="volunteer-location" name="location" type="text" value={formData.location} onChange={handleChange} onBlur={handleBlur} placeholder="City / District" aria-invalid={touched.location && !!errors.location} className={inputClass("location")} />

                                {renderError("location")}
                            </div>

                            <div>
                                <label htmlFor="volunteer-expertise" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Expertise *
                                </label>

                                <input id="volunteer-expertise" name="expertise" type="text" value={formData.expertise} onChange={handleChange} onBlur={handleBlur} placeholder="Your area of expertise" aria-invalid={touched.expertise && !!errors.expertise} className={inputClass("expertise")} />

                                {renderError("expertise")}
                            </div>

                            <div>
                                <label htmlFor="volunteer-experience" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Experience
                                </label>

                                <input id="volunteer-experience" name="experience" type="text" value={formData.experience} onChange={handleChange} onBlur={handleBlur} placeholder="Relevant experience" aria-invalid={touched.experience && !!errors.experience} className={inputClass("experience")} />

                                {renderError("experience")}
                            </div>

                            <div>
                                <label htmlFor="volunteer-availability" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Availability
                                </label>

                                <input id="volunteer-availability" name="availability" type="text" value={formData.availability} onChange={handleChange} onBlur={handleBlur} placeholder="Your availability" aria-invalid={touched.availability && !!errors.availability} className={inputClass("availability")} />

                                {renderError("availability")}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="volunteer-contribution" className="mb-2 block text-sm font-semibold text-gray-700">
                                How Would You Like to Contribute?
                            </label>

                            <textarea id="volunteer-contribution" name="contribution" value={formData.contribution} onChange={handleChange} onBlur={handleBlur} rows="6" maxLength={2000} placeholder="Tell us how you would like to contribute..." aria-invalid={touched.contribution && !!errors.contribution} className={textareaClass("contribution")} />

                            <div className="mt-2 flex justify-between">
                                {renderError("contribution")}

                                <span className="ml-auto text-xs text-gray-400">
                                    {formData.contribution.length}/2000
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
                                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} onBlur={handleBlur} className="mt-1 h-4 w-4 accent-green-700" aria-invalid={touched.consent && !!errors.consent} />

                                <span>
                                    I consent to Krushisetu using the information provided for volunteer-related communication and have read the{" "}
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

                        <button type="submit" disabled={volunteerMutation.isPending} className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                            {volunteerMutation.isPending ? (
                                <Loader variant="button" text="Submitting..." />
                            ) : (
                                <>
                                    Submit Application
                                    <Send size={19} />
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                            Please provide accurate information. Our team will review your application and contact you if there is a suitable opportunity.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default VolunteerForm