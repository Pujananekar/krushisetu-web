export const validatePartnershipField = (name, value) => {
    const errors = {}

    const trimmedValue =
        typeof value === "string"
            ? value.trim()
            : value

    if (name === "organisation") {
        if (!trimmedValue) {
            errors.organisation = "Organisation is required."
        } else if (trimmedValue.length > 255) {
            errors.organisation =
                "Organisation must not exceed 255 characters."
        }
    }

    if (name === "contact") {
        if (!trimmedValue) {
            errors.contact = "Authorised contact is required."
        } else if (
            trimmedValue.length < 2 ||
            trimmedValue.length > 255
        ) {
            errors.contact =
                "Authorised contact must be between 2 and 255 characters."
        }
    }

    if (name === "email") {
        if (!trimmedValue) {
            errors.email = "Email address is required."
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
        ) {
            errors.email =
                "Please enter a valid email address."
        } else if (trimmedValue.length > 255) {
            errors.email =
                "Email address must not exceed 255 characters."
        }
    }

    if (name === "mobile") {
        if (!trimmedValue) {
            errors.mobile = "Mobile number is required."
        } else if (!/^[6-9]\d{9}$/.test(trimmedValue)) {
            errors.mobile =
                "Please enter a valid 10-digit mobile number."
        }
    }

    if (name === "theme") {
        if (!trimmedValue) {
            errors.theme = "Project theme is required."
        } else if (trimmedValue.length > 255) {
            errors.theme =
                "Project theme must not exceed 255 characters."
        }
    }

    if (name === "geography") {
        if (!trimmedValue) {
            errors.geography = "Geography is required."
        } else if (trimmedValue.length > 255) {
            errors.geography =
                "Geography must not exceed 255 characters."
        }
    }

    if (name === "target") {
        if (!trimmedValue) {
            errors.target = "Target group is required."
        } else if (trimmedValue.length > 255) {
            errors.target =
                "Target group must not exceed 255 characters."
        }
    }

    if (name === "timeline" && trimmedValue.length > 255) {
        errors.timeline =
            "Expected timeline must not exceed 255 characters."
    }

    if (name === "message" && trimmedValue.length > 2000) {
        errors.message =
            "Message must not exceed 2000 characters."
    }

    return errors[name] || ""
}

export const validatePartnershipForm = (formData) => {
    const errors = {}

    const fields = [
        "organisation",
        "contact",
        "email",
        "mobile",
        "theme",
        "geography",
        "target",
        "timeline",
        "message",
    ]

    fields.forEach((field) => {
        const error = validatePartnershipField(
            field,
            formData[field]
        )

        if (error) {
            errors[field] = error
        }
    })

    if (!formData.consent) {
        errors.consent = "Consent is required."
    }

    return errors
}