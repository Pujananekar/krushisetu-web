const validateServiceField = (field, value) => {
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

        case "mobile":
            if (!value.trim()) {
                return "Mobile number or email is required"
            }

            const isMobile = /^[6-9]\d{9}$/.test(value.trim())
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

            if (!isMobile && !isEmail) {
                return "Please enter a valid mobile number or email"
            }

            return ""

        case "crop":
            if (!value.trim()) {
                return "Crop or activity is required"
            }

            if (value.trim().length > 255) {
                return "Crop or activity must not exceed 255 characters"
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

        case "category":
            if (!value.trim()) {
                return "Support category is required"
            }

            if (value.trim().length > 255) {
                return "Support category must not exceed 255 characters"
            }

            return ""

        case "urgency":
            if (value.trim().length > 100) {
                return "Urgency must not exceed 100 characters"
            }

            return ""

        case "problem":
            if (value.trim().length > 2000) {
                return "Problem or requirement must not exceed 2000 characters"
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

const validateServiceForm = (formData) => {
    const errors = {}

    Object.keys(formData).forEach((field) => {
        errors[field] = validateServiceField(field, formData[field])
    })

    return errors
}

export {
    validateServiceField,
    validateServiceForm,
}