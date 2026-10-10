import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import DepartmentCard from "../../components/DepartmentCard.jsx"
import DepartmentHeader from "../departments/DepartmentHeader.jsx"
import { getDepartments } from "../../api/departmentApi"
import Loader from "../../components/common/Loader"

const DepartmentsHome = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["departments"],
        queryFn: getDepartments,
    })

    if (isLoading) {
        return <Loader variant="section" text="Loading departments..." />
    }

    if (isError) {
        return (
            <section id="departments" className="flex min-h-screen items-center justify-center">
                <p className="text-red-600">Unable to load departments.</p>
            </section>
        )
    }

    const departments = data?.data ?? []

    return (
        <section id="departments" className="relative min-h-screen w-full overflow-hidden">
            <img
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt="services background image"
            />

            <div className="absolute inset-0 -z-10 bg-white/55" />

            <div className="relative z-10 mx-auto mt-10 w-full max-w-350 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
                <DepartmentHeader />

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {departments.slice(0, 4).map((department) => (
                        <DepartmentCard
                            key={department.id}
                            department={department}
                        />
                    ))}
                </div>

                <div className="z-20 mt-10 flex justify-center">
                    <Link
                        to="/departments"
                        className="kr-hover-button cursor-pointer rounded-[17px] bg-green-700 px-6 py-3 font-semibold text-white shadow-lg shadow-green-900/20 hover:bg-green-800"
                    >
                        Explore All Departments →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default DepartmentsHome