
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import DepartmentNotFound from "../../components/departments/DepartmentNotFound.jsx";
import DepartmentHero from "../../components/departments/DepartmentHero.jsx";
import DepartmentServices from "../../components/departments/DepartmentServices.jsx";
import DepartmentBeneficiaries from "../../components/departments/DepartmentBeneficiaries.jsx";
import DepartmentProcess from "../../components/departments/DepartmentProcess.jsx";
import DepartmentCTA from "../../components/departments/DepartmentCTA.jsx";

import { getDepartmentBySlug } from "../../api/departmentApi.js";
import Loader from "../../components/common/Loader.jsx";

const DepartmentDetails = () => {
    const { slug } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["department", slug],
        queryFn: () => getDepartmentBySlug(slug),
        enabled: Boolean(slug),
    });

    if (isLoading) {
        return (
            <Loader
                variant="page"
                text="Loading department..."
            />
        );
    }

    if (isError || !data?.data) {
        return <DepartmentNotFound />;
    }

    const department = data.data;

    return (
        <main className="min-h-screen w-full bg-[#F6FAF7]">
            <DepartmentHero department={department} />

            <DepartmentServices department={department} />

            <DepartmentBeneficiaries department={department} />

            <DepartmentProcess department={department} />

            <DepartmentCTA department={department} />
        </main>
    );
};

export default DepartmentDetails;
