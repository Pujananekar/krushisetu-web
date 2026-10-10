const validateTrainingField = (field, value) => {
    switch (field) {
        case "program":
            if (!value.trim()) {
                return "Program is required"
            }

            if (value.trim().length < 2) {
                return "Program must be at least 2 characters"
            }

            if (value.trim().length > 255) {
                return "Program must not exceed 255 characters"
            }

            return ""

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

        case "mobile":
            if (!value.trim()) {
                return "Mobile or email is required"
            }

            const isMobile = /^[6-9]\d{9}$/.test(value.trim())
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

            if (!isMobile && !isEmail) {
                return "Please enter a valid mobile number or email"
            }

            return ""

        case "village":
            if (!value.trim()) {
                return "Village is required"
            }

            if (value.trim().length < 2) {
                return "Village must be at least 2 characters"
            }

            if (value.trim().length > 100) {
                return "Village must not exceed 100 characters"
            }

            return ""

        case "district":
            if (!value.trim()) {
                return "District is required"
            }

            if (value.trim().length < 2) {
                return "District must be at least 2 characters"
            }

            if (value.trim().length > 100) {
                return "District must not exceed 100 characters"
            }

            return ""

        case "participant":
            if (!value.trim()) {
                return "Participant type is required"
            }

            return ""

        case "organisation":
            if (value.trim().length > 255) {
                return "Organisation must not exceed 255 characters"
            }

            return ""

        case "accessibilityNeeds":
            if (value.trim().length > 1000) {
                return "Accessibility needs must not exceed 1000 characters"
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

const validateTrainingForm = (formData) => {
    const errors = {}

    Object.keys(formData).forEach((field) => {
        errors[field] = validateTrainingField(field, formData[field])
    })

    return errors
}

export {
    validateTrainingField,
    validateTrainingForm,
}