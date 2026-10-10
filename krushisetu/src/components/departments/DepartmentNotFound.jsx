import { Link } from "react-router-dom"

const DepartmentNotFound = () => {
    return (
        <section className=" relative min-h-screen flex items-center justify-center px-6 bg-[#F4FBF5]">

            <img
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="text-center max-w-lg z-10">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-green-100 text-green-700 text-2xl font-bold">
                    !
                </div>

                <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
                    Department Not Found
                </h1>

                <p className="mt-4 text-gray-600 leading-7">
                    The department you are looking for does not exist or
                    the link may be incorrect.
                </p>

                <Link
                    to="/departments"
                    className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-2xl bg-green-700 text-white font-semibold shadow-lg shadow-green-900/15 hover:bg-green-800 hover:-translate-y-px transition-all duration-200"
                >
                    <span>←</span>
                    Back to Departments
                </Link>
            </div>
        </section>
    )
}

export default DepartmentNotFound