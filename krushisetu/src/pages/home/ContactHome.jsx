import ContactHeader from "../../components/contact/ContactHeader"
import ContactForm from "../../components/contact/ContactForm"
import ContactInformation from "../../components/contact/ContactInformation"

const ContactHome = () => {
    return (
        <section id="contact" className="relative min-h-screen w-full overflow-hidden">

            <img
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="relative z-10 mx-auto mt-20 flex w-full max-w-7xl flex-col px-6 py-12 md:py-16">

                <ContactHeader />

                <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
                    <ContactForm />
                    <ContactInformation />
                </div>

            </div>
        </section>
    )
}

export default ContactHome