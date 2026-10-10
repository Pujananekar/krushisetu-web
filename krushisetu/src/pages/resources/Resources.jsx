import ResourcesHero from "../../components/resources/ResourcesHero"
import ResourceCategories from "../../components/resources/ResourceCategories"
import ResourcesCTA from "../../components/resources/ResourcesCTA"

const Resources = () => {
    return (
        <main className="min-h-screen bg-[#F6FAF7]">
            <ResourcesHero />
            <ResourceCategories />
            <ResourcesCTA />
        </main>
    )
}

export default Resources