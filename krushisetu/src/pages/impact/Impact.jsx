import ImpactHero from "../../components/impact/ImpactHero"
import ImpactAreas from "../../components/impact/ImpactAreas"
import ImpactStats from "../../components/impact/ImpactStats"
import ImpactFallback from "../../components/impact/ImpactFallback"
import ImpactCTA from "../../components/impact/ImpactCTA"

const Impact = () => {
    return (
        <main className="min-h-screen bg-[#F6FAF7]">
            <ImpactHero />
            <ImpactAreas />
            <ImpactStats />
            <ImpactCTA />
        </main>
    )
}

export default Impact