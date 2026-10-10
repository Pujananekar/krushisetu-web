const validateFarmerField = (field, value) => {
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

            if (
                !/^[A-Za-zÀ-ÿ\u0900-\u097F\s.'-]+$/.test(
                    value.trim()
                )
            ) {
                return "Please enter a valid name"
            }

            return ""

        case "mobile":
            if (!value.trim()) {
                return "Mobile number is required"
            }

            if (!/^[6-9]\d{9}$/.test(value.trim())) {
                return "Please enter a valid 10-digit mobile number"
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

        case "taluka":
            if (!value.trim()) {
                return "Taluka is required"
            }

            if (value.trim().length < 2) {
                return "Taluka must be at least 2 characters"
            }

            if (value.trim().length > 100) {
                return "Taluka must not exceed 100 characters"
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

        case "pin":
            if (!value.trim()) {
                return "PIN code is required"
            }

            if (!/^\d{6}$/.test(value.trim())) {
                return "PIN code must be exactly 6 digits"
            }

            return ""

        case "supportInterests":
            if (!value.trim()) {
                return "Please describe the support you need"
            }

            if (value.trim().length < 10) {
                return "Please provide at least 10 characters"
            }

            if (value.trim().length > 1000) {
                return "Support details must not exceed 1000 characters"
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

const validateFarmerForm = (formData) => {
    const errors = {}

    Object.keys(formData).forEach((field) => {
        errors[field] = validateFarmerField(
            field,
            formData[field]
        )
    })

    return errors
}

export {
    validateFarmerField,
    validateFarmerForm,
}