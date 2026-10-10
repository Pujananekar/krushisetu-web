import { useParams } from "react-router-dom"
import ApplyForm from "../../components/apply/ApplyForm"

const ApplyFormPage = () => {
    const { type } = useParams()

    return (
        <main className="min-h-screen overflow-hidden bg-[#F6FAF7]">
            <ApplyForm type={type} />
        </main>
    )
}

export default ApplyFormPage