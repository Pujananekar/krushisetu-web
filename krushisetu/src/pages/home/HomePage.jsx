import AboutHome from "./AboutHome"
import ContactHome from "./ContactHome"
import DepartmentsHome from "./DepartmentsHome"
import FAQHome from "./FaqHome"
import GovernmentSchemesHome from "./GovernmentSchemesHome"
import Home from "./Home"
import LeadershipHome from "./LeadershipHome"
import PartnersHome from "./PartnersHome"
// import ProgramsHome from "./ProgramsHome"
import TrainingHome from "./TrainingHome"

const HomePage = () => {
  return (
    <>
        <Home />
        <AboutHome />
        <DepartmentsHome />
        {/* <ProgramsHome /> */}
        <GovernmentSchemesHome />
        <TrainingHome />
        <PartnersHome />
        <LeadershipHome />
        <FAQHome />
        <ContactHome />
    </>
  )
}

export default HomePage
