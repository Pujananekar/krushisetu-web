import FounderFocus from "../../components/founder/FounderFocus"
import FounderHero from "../../components/founder/FounderHero"
// import FounderInitiatives from "../../components/founder/FounderInitiative"
import FounderMessage from "../../components/founder/FounderMessage"
import FounderProfile from "../../components/founder/FounderProfile"

const Founder = () => {
  return (
    <main>
        <FounderHero />
        <FounderProfile />
        <FounderMessage />
        {/* <FounderInitiatives /> */}
        <FounderFocus />
    </main>
  )
}

export default Founder
