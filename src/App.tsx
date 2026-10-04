import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScheduleSection } from './components/ScheduleSection';
import { HowItWorks } from './components/HowItWorks';
import { ServiceMenu } from './components/ServiceMenu';
import { ServiceArea } from './components/ServiceArea';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { MasterBarberBio } from './components/MasterBarberBio';
import { BookingModal } from './components/BookingModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-amber-400 selection:text-black font-sans relative">
      
      {/* Top Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenBooking={(id) => handleOpenBooking(id)} />

        {/* Pressure Made — Weekly Booking Schedule & Mobile Mileage Pricing */}
        <ScheduleSection onOpenBooking={(id) => handleOpenBooking(id)} />

        {/* 3-Step How Mobile House Calls Work */}
        <HowItWorks />

        {/* Service Menu & Pricing Breakdown */}
        <ServiceMenu onSelectService={(id) => handleOpenBooking(id)} />

        {/* Metro Atlanta Territory Coverage */}
        <ServiceArea onOpenBooking={() => handleOpenBooking()} />

        {/* Cut Gallery & Instagram Feed */}
        <Gallery />

        {/* 5-Star Reviews & Trust Badges */}
        <Reviews />

        {/* Master Barber Jaquan Bio */}
        <MasterBarberBio onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Sticky Mobile Bottom Navigation for Easy Thumb Reach */}
      <MobileBottomBar onOpenBooking={() => handleOpenBooking()} />

      {/* Multi-Step Booking Modal with Calendar Sync & SMS Notifications */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={selectedServiceId}
      />

    </div>
  );
};

export default App;
