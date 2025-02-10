import { Outlet } from 'react-router-dom'
import BackButton from '../navigation/BackButton'
import Footer from './Footer'
import MarqueeHeader from './MarqueeHeader'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarqueeHeader />
      <BackButton />
      <main className="flex-grow pt-[96px]"> {/* Increased padding-top for larger header */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}