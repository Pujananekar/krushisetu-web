import LegalPage from "../../components/legal/LegalPage"

const sections = [
    {
        title: "Information We Collect",
        content:
            "Final approved information-collection details will be published here. This section will describe the information collected through registration forms, enquiry forms, applications and other approved website interactions.",
    },
    {
        title: "How We Use Information",
        content:
            "Final approved information-use purposes will be published here, including how submitted information may be used to respond to enquiries, applications and requests.",
    },
    {
        title: "Information Sharing",
        content:
            "The approved policy regarding sharing information with service providers, institutions, partners or other parties will be published here.",
    },
    {
        title: "Data Security",
        content:
            "Approved information about the safeguards used to protect submitted information will be published here.",
    },
    {
        title: "Cookies and Similar Technologies",
        content:
            "The approved policy regarding cookies, analytics and similar technologies will be published here if applicable.",
    },
    {
        title: "Your Rights and Choices",
        content:
            "Information about applicable user rights, requests and available choices regarding personal information will be published here.",
    },
    {
        title: "Contact Regarding Privacy",
        content:
            "The approved privacy contact information will be published here after the official contact details are confirmed.",
    },
]

const PrivacyPolicy = () => {
    return (
        <LegalPage
            eyebrow="LEGAL"
            title="Privacy Policy"
            description="Information about how Krushisetu handles information submitted through this website."
            sections={sections}
        />
    )
}

export default PrivacyPolicy