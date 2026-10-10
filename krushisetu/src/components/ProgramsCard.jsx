const ProgramsCard = ({ Icon, program }) => {
    return (
        <div className="kr-hover-card flex flex-col items-center rounded-3xl border border-gray-200 bg-white/85 px-6 py-7 text-center shadow-lg shadow-gray-900/10">

            {/* Icon */}
            <div className="kr-hover-icon flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-800">
                <Icon size={30} strokeWidth={1.8} />
            </div>

            {/* Title */}
            <h3 className="kr-hover-title mt-5 text-base font-bold leading-6 text-gray-900 sm:text-lg">
                {program.title}
            </h3>

            {/* Divider */}
            <div className="kr-hover-line mt-4 h-0.5 w-10 rounded-full bg-green-600" />

            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-gray-600">
                {program.description}
            </p>

        </div>
    )
}

export default ProgramsCard