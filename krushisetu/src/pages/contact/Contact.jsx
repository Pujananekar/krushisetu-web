import ContactHeader from "../../components/contact/ContactHeader"
import ContactForm from "../../components/contact/ContactForm"
import ContactInformation from "../../components/contact/ContactInformation"

const Contact = () => {
    return (
        <main className="min-h-screen overflow-hidden bg-[#F6FAF7]">
            <section className="px-5 pb-10 pt-36 md:px-8 md:pb-12 md:pt-40 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-350">
                    <ContactHeader />
                </div>
            </section>

            <section className="px-5 pb-16 md:px-8 md:pb-20 lg:px-12 xl:px-16">
                <div className="mx-auto max-w-350">
                    <div className="grid items-start gap-6 lg:grid-cols-2">
                        <ContactForm />
                        <ContactInformation />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact