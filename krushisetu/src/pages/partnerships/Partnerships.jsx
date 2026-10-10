import PartnershipAreas from "../../components/partnerships/PartnershipAreas"
import PartnershipGrid from "../../components/partnerships/PartnershipGrid"
import PartnershipsCTA from "../../components/partnerships/PartnershipsCTA"
import PartnershipsHero from "../../components/partnerships/PartnershipsHero"

const Partnerships = () => {
    return (
        <main className="min-h-screen bg-[#F6FAF7]">
            <PartnershipsHero />
            <PartnershipAreas />
            <PartnershipGrid />
            <PartnershipsCTA />
        </main>
    )
}

export default Partnerships