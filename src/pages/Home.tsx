import Reveal from '../components/ui/Reveal'
// import Hero from '../components/home/Hero'
import HeroCarousel from '../components/home/HeroCarousel'
import FeatureStrip from '../components/home/FeatureStrip'
import AboutScrapbook from '../components/home/AboutScrapbook'
import Academics from '../components/home/Academics'
import CampusInfrastructure from '../components/home/CampusInfrastructure'
import StudentInitiatives from '../components/home/StudentInitiatives'
import WhyChooseUs from '../components/home/WhyChooseUs'
import NewsAndAchievements from '../components/home/NewsAndAchievements'
import LeadershipMessages from '../components/home/LeadershipMessages'
import ParentTrust from '../components/home/ParentTrust'
import AdmissionsCta from '../components/home/AdmissionsCta'

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <HeroCarousel />
      <Reveal>
        <FeatureStrip />
      </Reveal>
      <Reveal>
        <AboutScrapbook />
      </Reveal>
      <Reveal>
        <Academics />
      </Reveal>
      <Reveal>
        <CampusInfrastructure />
      </Reveal>
      <Reveal>
        <StudentInitiatives />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <NewsAndAchievements />
      </Reveal>
      <Reveal>
        <LeadershipMessages />
      </Reveal>
      <Reveal>
        <ParentTrust />
      </Reveal>
      <Reveal>
        <AdmissionsCta />
      </Reveal>
    </>
  )
}
