const ContactHeader = () => {
    return (
        <div className="flex flex-col items-center text-center">

            <p className="text-xl font-bold tracking-wide text-green-700">
                GET IN TOUCH
            </p>

            <h1 className="mt-2 text-4xl font-bold text-green-950 md:text-5xl lg:text-6xl">
                We'd Love to Hear from You
            </h1>

            <div className="mt-4 h-1 w-10 rounded-full bg-green-700" />

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
                Have a question, suggestion or partnership idea?
                <br />
                Reach out to us and our team will get back to you soon.
            </p>

        </div>
    )
}

export default ContactHeader