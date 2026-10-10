import { useQuery } from "@tanstack/react-query"
import DepartmentCard from "../../components/DepartmentCard"
import DepartmentHeader from "./DepartmentHeader"
import { getDepartments } from "../../api/departmentApi"
import Loader from "../../components/common/Loader"

const Department = () => {

    
    const {data, isLoading, isError} = useQuery({
        queryKey:["departments"],
        queryFn : getDepartments,
    })

    if(isLoading){
        return <Loader variant="page" text="Loading departments...." />
    }

    if(isError){
        return (
            <section className="flex  min-h-screen items-center justify-center">
                <p className="text-red-600 animate-pulse">Unable to load departments.</p>
            </section>
        )
    }

    const departments = data?.data ?? []

    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            <img
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                src={`${import.meta.env.BASE_URL}images/services_bg.png`}
                alt="Services background image"
            />

            <div className="absolute inset-0 -z-10 bg-white/60" />

            <div className="relative z-10 mx-auto mt-10 w-full max-w-350 px-6 py-20 sm:px-8 lg:px-12 xl:px-16">
                <DepartmentHeader />

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {departments.map((department, index) => {
                        const Icon = department.icon

                        return (
                            <DepartmentCard
                                key={index}
                                Icon={Icon}
                                department={department}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Department