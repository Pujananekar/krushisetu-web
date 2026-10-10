const DepartmentOverview = ({ department }) => {
    return (
        <section className="relative w-full px-6 py-20 sm:px-8 lg:px-12 lg:py-24 xl:px-16">
            <div className="mx-auto max-w-350">
                <div className="max-w-4xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                        Overview
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                        About this department
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {department.description}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default DepartmentOverview