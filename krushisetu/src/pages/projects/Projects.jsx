import ProjectsHero from "../../components/projects/ProjectsHero"
import ProjectCategories from "../../components/projects/ProjectCategories"
import ProjectGrid from "../../components/projects/ProjectGrid"
import ProjectsCTA from "../../components/projects/ProjectsCTA"

const Projects = () => {
    return (
        <main className="min-h-screen bg-[#F6FAF7]">
            <ProjectsHero />
            <ProjectCategories />
            <ProjectGrid />
            <ProjectsCTA />
        </main>
    )
}

export default Projects