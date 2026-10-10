import ApplyHero from "../../components/apply/ApplyHero"
import ApplyOptions from "../../components/apply/ApplyOptions"
import ApplyProcess from "../../components/apply/ApplyProcess"
import ApplyCTA from "../../components/apply/ApplyCTA"

const Apply = () => {
    return (
        <main className="min-h-screen overflow-hidden bg-[#F6FAF7]">
            <ApplyHero />
            <ApplyOptions />
            <ApplyProcess />
            <ApplyCTA />
        </main>
    )
}

export default Apply