import SuccessStoriesHero from "../../components/successStories/SuccessStoriesHero"
import SuccessStoryCategories from "../../components/successStories/SuccessStoryCategories"
import SuccessStoryGrid from "../../components/successStories/SuccessStoryGrid"
import SuccessStoriesCTA from "../../components/successStories/SuccessStoriesCTA"

const SuccessStories = () => {
    return (
        <main className="min-h-screen bg-[#F6FAF7]">
            <SuccessStoriesHero />
            <SuccessStoryCategories />
            <SuccessStoryGrid />
            <SuccessStoriesCTA />
        </main>
    )
}

export default SuccessStories