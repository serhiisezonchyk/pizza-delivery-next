import Feature from '@/components/feature/Feature'
import Offer from '@/components/offer/Offer'
import Slider from '@/components/slider/Slider'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Slider/>
      <Feature/>
      <Offer/>
    </main>
  )
}
