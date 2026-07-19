import HeroVideo from '@/components/home/HeroVideo'
import StatsCounter from '@/components/home/StatsCounter'
import QuickActions from '@/components/home/QuickActions'
import FeaturedDestinations from '@/components/home/FeaturedDestinations'
import TimelessTreasures from '@/components/home/TimelessTreasures'
import InteractiveMap from '@/components/home/InteractiveMap'
import TravelStories from '@/components/home/TravelStories'
import FoodTrails from '@/components/home/FoodTrails'
import FestivalCalendar from '@/components/home/FestivalCalendar'
import PhotoGalleryStrip from '@/components/home/PhotoGalleryStrip'
import GovernmentAnnouncements from '@/components/home/GovernmentAnnouncements'
import StoryGallery from '@/components/home/StoryGallery'

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <FeaturedDestinations />
      <StatsCounter />
      <QuickActions />
      <TimelessTreasures />
      <FoodTrails />
      <FestivalCalendar />
      <StoryGallery />
      <InteractiveMap />
      <TravelStories />
      <PhotoGalleryStrip />
      <GovernmentAnnouncements />
    </>
  )
}
