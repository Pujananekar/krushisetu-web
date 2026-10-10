export const validateFPOField = (name, value) => {
    const errors = {}

    const trimmedValue =
        typeof value === "string" ? value.trim() : value

    if (name === "organisation") {
        if (!trimmedValue) {
            errors.organisation = "Organisation or group is required."
        } else if (trimmedValue.length > 255) {
            errors.organisation =
                "Organisation or group must not exceed 255 characters."
        }
    }

    if (name === "contact") {
        if (!trimmedValue) {
            errors.contact = "Contact person is required."
        } else if (
            trimmedValue.length < 2 ||
            trimmedValue.length > 255
        ) {
            errors.contact =
                "Contact person must be between 2 and 255 characters."
        }
    }

    if (name === "district") {
        if (!trimmedValue) {
            errors.district = "District is required."
        } else if (trimmedValue.length > 150) {
            errors.district =
                "District must not exceed 150 characters."
        }
    }

    if (name === "members" && trimmedValue) {
        if (!/^\d+$/.test(trimmedValue)) {
            errors.members =
                "Member count must contain only numbers."
        }
    }

    if (name === "commodity" && trimmedValue.length > 255) {
        errors.commodity =
            "Commodity or activity must not exceed 255 characters."
    }

    if (name === "status" && trimmedValue.length > 255) {
        errors.status =
            "Current status must not exceed 255 characters."
    }

    if (
        name === "supportRequired" &&
        trimmedValue.length > 2000
    ) {
        errors.supportRequired =
            "Support required must not exceed 2000 characters."
    }

    return errors[name] || ""
}

export const validateFPOForm = (formData) => {
    const errors = {}

    const fields = [
        "organisation",
        "contact",
        "district",
        "members",
        "commodity",
        "status",
        "supportRequired",
    ]

    fields.forEach((field) => {
        const error = validateFPOField(field, formData[field])

        if (error) {
            errors[field] = error
        }
    })

    if (!formData.consent) {
        errors.consent = "Consent is required."
    }

    return errors
}