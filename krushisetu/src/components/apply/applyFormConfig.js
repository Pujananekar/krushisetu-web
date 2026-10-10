export const formConfig = {
    farmer: {
        eyebrow: "FARMER REGISTRATION",
        title: "Register as a Farmer",
        description:
            "Share your details and tell us what kind of agricultural support you are interested in.",

        fields: [
            {
                name: "name",
                label: "Name",
                placeholder: "Your name",
                type: "text",
                required: true,
            },
            {
                name: "mobile",
                label: "Mobile",
                placeholder: "Mobile number",
                type: "tel",
                required: true,
            },
            {
                name: "village",
                label: "Village",
                placeholder: "Village",
                type: "text",
                required: true,
            },
            {
                name: "taluka",
                label: "Taluka",
                placeholder: "Taluka",
                type: "text",
                required: true,
            },
            {
                name: "district",
                label: "District",
                placeholder: "District",
                type: "text",
                required: true,
            },
            {
                name: "pin",
                label: "PIN",
                placeholder: "PIN code",
                type: "text",
                required: true,
            },
        ],

        textarea: {
            name: "supportInterests",
            label: "Support interests",
            placeholder:
                "Tell us what kind of support you are looking for...",
        },

        file: false,
    },

    training: {
        eyebrow: "TRAINING REGISTRATION",
        title: "Register for Training",
        description:
            "Share your details and interest in Krushisetu training opportunities.",

        fields: [
            {
                name: "program",
                label: "Program",
                placeholder: "Training program",
                type: "text",
                required: true,
            },
            {
                name: "name",
                label: "Name",
                placeholder: "Your name",
                type: "text",
                required: true,
            },
            {
                name: "mobile",
                label: "Mobile / Email",
                placeholder: "Mobile or email",
                type: "text",
                required: true,
            },
            {
                name: "village",
                label: "Village / District",
                placeholder: "Village or district",
                type: "text",
                required: true,
            },
            {
                name: "participant",
                label: "Participant Type",
                placeholder: "Farmer / Student / Youth / etc.",
                type: "text",
                required: true,
            },
            {
                name: "organisation",
                label: "Organisation",
                placeholder: "Organisation, college or group",
                type: "text",
            },
        ],

        textarea: {
            name: "accessibilityNeeds",
            label: "Accessibility Needs",
            placeholder:
                "Mention any accessibility requirements, if applicable...",
        },

        file: false,
    },

    service: {
        eyebrow: "SERVICE REQUEST",
        title: "Request Support",
        description:
            "Tell us about the service or agricultural support you require.",

        fields: [
            {
                name: "name",
                label: "Name",
                placeholder: "Your name",
                type: "text",
                required: true,
            },
            {
                name: "mobile",
                label: "Mobile / Email",
                placeholder: "Mobile or email",
                type: "text",
                required: true,
            },
            {
                name: "crop",
                label: "Crop / Activity",
                placeholder: "Crop or activity",
                type: "text",
                required: true,
            },
            {
                name: "location",
                label: "Location",
                placeholder: "Village / District",
                type: "text",
                required: true,
            },
            {
                name: "category",
                label: "Support Category",
                placeholder:
                    "Advisory / Scheme / Training / Other",
                type: "text",
                required: true,
            },
            {
                name: "urgency",
                label: "Urgency",
                placeholder: "Normal / Urgent",
                type: "text",
            },
        ],

        textarea: {
            name: "problem",
            label: "Problem / Requirement",
            placeholder: "Describe your requirement...",
        },

        file: false,
    },

    internship: {
        eyebrow: "INTERNSHIP APPLICATION",
        title: "Apply for Internship",
        description:
            "Students can share their academic background and areas of interest.",

        fields: [
            {
                name: "name",
                label: "Name",
                placeholder: "Your name",
                type: "text",
                required: true,
            },
            {
                name: "college",
                label: "College",
                placeholder: "College / University",
                type: "text",
                required: true,
            },
            {
                name: "course",
                label: "Course / Year",
                placeholder: "Course and year",
                type: "text",
                required: true,
            },
            {
                name: "location",
                label: "Location",
                placeholder: "City / District",
                type: "text",
                required: true,
            },
            {
                name: "duration",
                label: "Duration",
                placeholder: "Expected internship duration",
                type: "text",
                required: true,
            },
            {
                name: "interest",
                label: "Area of Interest",
                placeholder: "Area you are interested in",
                type: "text",
                required: true,
            },
        ],

        textarea: {
            name: "additionalInformation",
            label: "Additional Information",
            placeholder:
                "Tell us about your internship requirements...",
        },

        file: true,
    },

    fpo: {
        eyebrow: "FPO / INSTITUTION ENQUIRY",
        title: "Start an Institutional Enquiry",
        description:
            "Tell us about your organisation and the support or collaboration you are looking for.",

        fields: [
            {
                name: "organisation",
                label: "Organisation / Group",
                placeholder: "Organisation name",
                type: "text",
                required: true,
            },
            {
                name: "contact",
                label: "Contact Person",
                placeholder: "Authorised contact person",
                type: "text",
                required: true,
            },
            {
                name: "district",
                label: "District",
                placeholder: "District",
                type: "text",
                required: true,
            },
            {
                name: "members",
                label: "Member Count",
                placeholder: "Approximate member count",
                type: "number",
            },
            {
                name: "commodity",
                label: "Commodity",
                placeholder: "Main commodity / activity",
                type: "text",
            },
            {
                name: "status",
                label: "Current Status",
                placeholder: "Current organisation status",
                type: "text",
            },
        ],

        textarea: {
            name: "supportRequired",
            label: "Support Required",
            placeholder:
                "Describe the support you are looking for...",
        },

        file: false,
    },

    partnership: {
        eyebrow: "CSR / PARTNERSHIP ENQUIRY",
        title: "Partner With Krushisetu",
        description:
            "Share your organisation's collaboration or CSR requirements.",

        fields: [
            {
                name: "organisation",
                label: "Organisation",
                placeholder: "Organisation name",
                type: "text",
                required: true,
            },
            {
                name: "contact",
                label: "Authorised Contact",
                placeholder: "Contact person",
                type: "text",
                required: true,
            },
            {
                name: "email",
                label: "Email",
                placeholder: "Email address",
                type: "email",
                required: true,
            },
            {
                name: "mobile",
                label: "Mobile",
                placeholder: "Mobile number",
                type: "tel",
                required: true,
            },
            {
                name: "theme",
                label: "Project Theme",
                placeholder:
                    "Agriculture / Livelihood / Water / Climate / etc.",
                type: "text",
                required: true,
            },
            {
                name: "geography",
                label: "Geography",
                placeholder: "Target geography",
                type: "text",
                required: true,
            },
            {
                name: "target",
                label: "Target Group",
                placeholder:
                    "Farmers / Women / Youth / FPOs / etc.",
                type: "text",
                required: true,
            },
            {
                name: "timeline",
                label: "Expected Timeline",
                placeholder: "Expected project timeline",
                type: "text",
            },
        ],

        textarea: {
            name: "message",
            label: "Message",
            placeholder:
                "Tell us about your proposed collaboration...",
        },

        file: false,
    },

    volunteer: {
        eyebrow: "VOLUNTEER / EXPERT INTEREST",
        title: "Contribute Your Expertise",
        description:
            "Tell us how you would like to contribute to Krushisetu's work.",

        fields: [
            {
                name: "name",
                label: "Name",
                placeholder: "Your name",
                type: "text",
                required: true,
            },
            {
                name: "mobile",
                label: "Mobile / Email",
                placeholder: "Mobile or email",
                type: "text",
                required: true,
            },
            {
                name: "location",
                label: "Location",
                placeholder: "City / District",
                type: "text",
                required: true,
            },
            {
                name: "expertise",
                label: "Expertise",
                placeholder: "Your area of expertise",
                type: "text",
                required: true,
            },
            {
                name: "experience",
                label: "Experience",
                placeholder: "Relevant experience",
                type: "text",
            },
            {
                name: "availability",
                label: "Availability",
                placeholder: "Your availability",
                type: "text",
            },
        ],

        textarea: {
            name: "contribution",
            label: "How Would You Like to Contribute?",
            placeholder:
                "Tell us how you would like to contribute...",
        },

        file: false,
    },
}