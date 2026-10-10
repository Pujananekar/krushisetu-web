import LegalPage from "../../components/legal/LegalPage"

const sections = [
    {
        title: "General Information",
        content:
            "Krushisetu website content is intended to provide information and facilitate access to agricultural resources, support services and relevant opportunities. The final approved disclaimer text will be published here.",
    },
    {
        title: "Agricultural Information",
        content:
            "The approved disclaimer concerning crop advisory, farming practices, agricultural information and other educational resources will be published here.",
    },
    {
        title: "Government Schemes",
        content:
            "Government-scheme information will be presented for awareness and facilitation purposes. The final approved disclaimer will clarify that eligibility, approval, subsidy, benefit or sanction is determined by the relevant authority and is not guaranteed by Krushisetu.",
    },
    {
        title: "External Websites",
        content:
            "The final approved disclaimer concerning government portals, external resources and third-party websites linked from Krushisetu will be published here.",
    },
    {
        title: "Information Accuracy",
        content:
            "The approved policy concerning publication dates, verification, updates and possible changes to information will be published here.",
    },
    {
        title: "Limitation of Responsibility",
        content:
            "Any final approved limitations concerning reliance on website information and use of services will be published here.",
    },
]

const Disclaimer = () => {
    return (
        <LegalPage
            eyebrow="LEGAL"
            title="Disclaimer"
            description="Important information about the use of Krushisetu resources, agricultural information and government-scheme content."
            sections={sections}
        />
    )
}

export default Disclaimer