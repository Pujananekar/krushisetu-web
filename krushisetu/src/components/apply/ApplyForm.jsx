
import ApplyFallback from "./applicationform/ApplyFallback"
import FarmerForm from "./applicationform/FarmerForm"
import FPOForm from "./applicationform/FpoForm"
import InternshipForm from "./applicationform/InternshipForm"
import PartnershipForm from "./applicationform/PartnershipForm"
import ServiceForm from "./applicationform/ServiceForm"
import TrainingForm from "./applicationform/TrainingForm"
import VolunteerForm from "./applicationform/VolunteerForm"


const ApplyForm = ({ type }) => {
    switch (type) {
        case "farmer":
            return <FarmerForm />
        case "training":
            return <TrainingForm />
        case "service":
            return <ServiceForm />
        case "internship":
            return <InternshipForm />
        case "fpo":
            return <FPOForm />
        case "partnership":
            return <PartnershipForm />
        case "volunteer":
            return <VolunteerForm />

        default:
            return (
                <div className="h-screen w-full flex items-center justify-center">
                    <ApplyFallback
                        title="Training registration unavailable"
                        message="Training registration is currently closed. Please check the Training & Events section for upcoming programs."
                    />
                </div>
            )
    }
}

export default ApplyForm