const validateInternshipField = (field, value) => {
    switch (field) {
        case "name":
            if (!value.trim()) {
                return "Name is required"
            }

            if (value.trim().length < 2) {
                return "Name must be at least 2 characters"
            }

            if (value.trim().length > 100) {
                return "Name must not exceed 100 characters"
            }

            if (!/^[A-Za-zÀ-ÿ\u0900-\u097F\s.'-]+$/.test(value.trim())) {
                return "Please enter a valid name"
            }

            return ""

        case "college":
            if (!value.trim()) {
                return "College or university is required"
            }

            if (value.trim().length > 255) {
                return "College or university must not exceed 255 characters"
            }

            return ""

        case "course":
            if (!value.trim()) {
                return "Course or year is required"
            }

            if (value.trim().length > 255) {
                return "Course or year must not exceed 255 characters"
            }

            return ""

        case "location":
            if (!value.trim()) {
                return "Location is required"
            }

            if (value.trim().length > 255) {
                return "Location must not exceed 255 characters"
            }

            return ""

        case "duration":
            if (!value.trim()) {
                return "Internship duration is required"
            }

            if (value.trim().length > 150) {
                return "Internship duration must not exceed 150 characters"
            }

            return ""

        case "interest":
            if (!value.trim()) {
                return "Area of interest is required"
            }

            if (value.trim().length > 255) {
                return "Area of interest must not exceed 255 characters"
            }

            return ""

        case "additionalInformation":
            if (value.trim().length > 2000) {
                return "Additional information must not exceed 2000 characters"
            }

            return ""

        case "consent":
            if (!value) {
                return "Please provide your consent to continue"
            }

            return ""

        default:
            return ""
    }
}

const validateInternshipForm = (formData) => {
    const errors = {}

    Object.keys(formData).forEach((field) => {
        errors[field] = validateInternshipField(
            field,
            formData[field]
        )
    })

    return errors
}

export {
    validateInternshipField,
    validateInternshipForm,
}