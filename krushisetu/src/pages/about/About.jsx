import AboutSection from "../../components/about/AboutSection"
import FounderSection from "../../components/about/FounderSection"
import ObjectivesSection from "../../components/about/ObjectiveSection"
import ValuesSection from "../../components/about/ValueSection"
import VisionMissionSection from "../../components/about/VisionMissionSection"

const About = () => {
  return (
    <main>
        <AboutSection />
        <VisionMissionSection />
        <ObjectivesSection />
        <ValuesSection />
        <FounderSection />
    </main>
  )
}

export default About
