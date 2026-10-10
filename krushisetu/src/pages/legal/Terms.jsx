import LegalPage from "../../components/legal/LegalPage"

const sections = [
    {
        title: "Acceptance of Terms",
        content:
            "The final approved terms governing the use of the Krushisetu website will be published here.",
    },
    {
        title: "Website Use",
        content:
            "Approved rules concerning acceptable use of the website, its content and available services will be published here.",
    },
    {
        title: "Website Content",
        content:
            "The approved terms concerning website information, resources, documents, external links and other published content will be provided here.",
    },
    {
        title: "Forms and Submissions",
        content:
            "The final terms applicable to registrations, enquiries, applications and other submissions made through the website will be published here.",
    },
    {
        title: "External Links",
        content:
            "The approved terms concerning links to government portals, institutions, organisations and other external websites will be published here.",
    },
    {
        title: "Changes to These Terms",
        content:
            "The approved process for updating these terms and communicating applicable changes will be published here.",
    },
    {
        title: "Contact",
        content:
            "Official contact information for questions concerning these terms will be published here after approval.",
    },
]

const Terms = () => {
    return (
        <LegalPage
            eyebrow="LEGAL"
            title="Terms & Conditions"
            description="The terms governing access to and use of the Krushisetu website."
            sections={sections}
        />
    )
}

export default Terms