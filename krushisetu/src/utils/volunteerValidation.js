export const validateVolunteerField = (name, value) => {
    const errors = {}

    const trimmedValue =
        typeof value === "string"
            ? value.trim()
            : value

    if (name === "name") {
        if (!trimmedValue) {
            errors.name = "Name is required."
        } else if (
            trimmedValue.length < 2 ||
            trimmedValue.length > 100
        ) {
            errors.name =
                "Name must be between 2 and 100 characters."
        }
    }

    if (name === "mobile") {
        if (!trimmedValue) {
            errors.mobile =
                "Mobile number or email is required."
        } else {
            const isMobile =
                /^[6-9]\d{9}$/.test(trimmedValue)

            const isEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    trimmedValue
                )

            if (!isMobile && !isEmail) {
                errors.mobile =
                    "Please enter a valid 10-digit mobile number or email."
            }
        }
    }

    if (name === "location") {
        if (!trimmedValue) {
            errors.location = "Location is required."
        } else if (trimmedValue.length > 255) {
            errors.location =
                "Location must not exceed 255 characters."
        }
    }

    if (name === "expertise") {
        if (!trimmedValue) {
            errors.expertise = "Expertise is required."
        } else if (trimmedValue.length > 255) {
            errors.expertise =
                "Expertise must not exceed 255 characters."
        }
    }

    if (
        name === "experience" &&
        trimmedValue.length > 255
    ) {
        errors.experience =
            "Experience must not exceed 255 characters."
    }

    if (
        name === "availability" &&
        trimmedValue.length > 255
    ) {
        errors.availability =
            "Availability must not exceed 255 characters."
    }

    if (
        name === "contribution" &&
        trimmedValue.length > 2000
    ) {
        errors.contribution =
            "Contribution must not exceed 2000 characters."
    }

    return errors[name] || ""
}

export const validateVolunteerForm = (formData) => {
    const errors = {}

    const fields = [
        "name",
        "mobile",
        "location",
        "expertise",
        "experience",
        "availability",
        "contribution",
    ]

    fields.forEach((field) => {
        const error = validateVolunteerField(
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