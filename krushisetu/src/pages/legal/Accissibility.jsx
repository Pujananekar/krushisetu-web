import LegalPage from "../../components/legal/LegalPage"

const sections = [
    {
        title: "Our Commitment",
        content:
            "Krushisetu aims to make its website accessible and usable by people with different abilities. The final approved accessibility commitment will be published here.",
    },
    {
        title: "Accessible Content",
        content:
            "Information about accessibility practices for text, images, navigation, forms, documents and multimedia will be published here.",
    },
    {
        title: "Images and Alternative Text",
        content:
            "Published images should include appropriate alternative text where required. The final approved accessibility standards and content practices will be documented here.",
    },
    {
        title: "Keyboard and Navigation Support",
        content:
            "Information about keyboard navigation, focus states and other applicable accessibility practices will be published here.",
    },
    {
        title: "Forms",
        content:
            "The approved accessibility approach for registration, enquiry and application forms will be published here.",
    },
    {
        title: "Accessibility Feedback",
        content:
            "Official contact information for reporting accessibility difficulties or requesting assistance will be published here after approval.",
    },
]

const Accessibility = () => {
    return (
        <LegalPage
            eyebrow="ACCESSIBILITY"
            title="Accessibility"
            description="Our commitment to making the Krushisetu website accessible and usable for everyone."
            sections={sections}
        />
    )
}

export default Accessibility