import { Header } from '../components/ui/Header';
import { Footer } from '../components/ui/Footer';
import Link from 'next/link';
import { Search, Calendar, Users, Star, Shield, Headphones, Award, MapPin, Compass } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(#C9A56B 1px, transparent 1px), linear-gradient(90deg, #C9A56B 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }} />
            </div>
          </div>

          {/* Decorative Map Overlay - Europe/Mediterranean inspired */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 800 800" className="w-full h-full">
              <path
                d="M400,100 L450,150 L500,140 L520,180 L480,220 L500,260 L460,300 L420,280 L380,320 L340,300 L320,260 L280,240 L300,200 L340,180 L360,140 L400,100 Z"
                fill="#C9A56B"
                opacity="0.3"
              />
            </svg>
          </div>

          {/* Compass Decoration */}
          <div className="absolute top-10 left-10 opacity-20 hidden lg:block">
            <Compass className="w-24 h-24 text-[#C9A56B]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <div className="inline-block mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium">
                    <MapPin size={16} />
                    TIMEOUT TRAVEL AGENCY
                  </span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                  IT'S TIME TO
                  <br />
                  <span className="text-[#C9A56B]">EXPLORE</span>
                  <br />
                  THE WORLD
                </h1>

                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 italic font-serif">
                  adventure time is today
                </p>

                <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                  Book your perfect hotel room with our modern online booking system. Experience luxury, comfort, and unforgettable stays around the world.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#search"
                    className="px-8 py-4 rounded-lg bg-[#C9A56B] text-white font-medium hover:bg-[#B89560] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    EXPLORE HOTELS
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium hover:border-[#C9A56B] hover:text-[#C9A56B] transition-all"
                  >
                    LEARN MORE
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">500+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hotels</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">50K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bookings</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">4.9</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                </div>
              </div>

              {/* Hero Image Area - Decorative */}
              <div className="hidden lg:block relative">
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Decorative Circle */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C9A56B]/20 to-transparent" />

                  {/* Image Placeholder with Beach/Travel Theme */}
                  <div className="absolute inset-8 rounded-2xl bg-gradient-to-br from-blue-100 to-amber-50 dark:from-blue-900/30 dark:to-amber-900/30 overflow-hidden shadow-2xl">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm mb-4">
                          <MapPin className="w-16 h-16 text-[#C9A56B]" />
                        </div>
                        <p className="text-lg font-serif italic text-gray-600 dark:text-gray-400">
                          Your next adventure<br />awaits
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#C9A56B]/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-[#C9A56B]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Best Choice</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">2025 Award</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="search" className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                  Find Your Perfect Stay
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Destination */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Where to?"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Check-in */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Check-out */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent outline-none transition-all appearance-none">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 px-8 py-4 rounded-lg bg-[#C9A56B] text-white font-medium hover:bg-[#B89560] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Search size={20} />
                  SEARCH HOTELS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                WHY CHOOSE US
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                The Best Opportunity<br />to Travel
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Experience seamless booking with our modern platform designed for travelers who seek comfort and luxury.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A56B]/10 group-hover:bg-[#C9A56B] transition-all mb-4">
                  <Star className="w-8 h-8 text-[#C9A56B] group-hover:text-white transition-all" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Premium Quality
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Handpicked luxury hotels and resorts for unforgettable experiences
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A56B]/10 group-hover:bg-[#C9A56B] transition-all mb-4">
                  <Shield className="w-8 h-8 text-[#C9A56B] group-hover:text-white transition-all" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Secure Booking
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Safe and encrypted payment system for your peace of mind
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A56B]/10 group-hover:bg-[#C9A56B] transition-all mb-4">
                  <Headphones className="w-8 h-8 text-[#C9A56B] group-hover:text-white transition-all" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  24/7 Support
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Round-the-clock customer service for all your needs
                </p>
              </div>

              {/* Feature 4 */}
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A56B]/10 group-hover:bg-[#C9A56B] transition-all mb-4">
                  <Award className="w-8 h-8 text-[#C9A56B] group-hover:text-white transition-all" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Best Prices
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Competitive rates and exclusive deals for our members
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                POPULAR DESTINATIONS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Journey Through<br />the Mediterranean
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
                Discover exclusive offers and luxury accommodations in the world's most beautiful destinations
              </p>
              <p className="text-lg font-semibold text-[#C9A56B]">
                UP TO 20% OFF
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Destination Card 1 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-300/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-20 h-20 text-[#C9A56B] opacity-30" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Greece
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#C9A56B] text-white text-xs font-semibold">
                      -20%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Experience the beauty of Greek islands with crystal clear waters and ancient history
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500 line-through">$299</span>
                      <span className="ml-2 text-xl font-bold text-[#C9A56B]">$239</span>
                      <span className="text-gray-600 dark:text-gray-400">/night</span>
                    </div>
                    <Link
                      href="/destinations/greece"
                      className="text-sm font-medium text-[#C9A56B] hover:text-[#B89560] transition-colors"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Destination Card 2 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-900/20 dark:to-orange-800/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-300/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-20 h-20 text-[#C9A56B] opacity-30" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Italy
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#C9A56B] text-white text-xs font-semibold">
                      -15%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Indulge in Italian culture, cuisine, and Renaissance art in historic cities
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500 line-through">$349</span>
                      <span className="ml-2 text-xl font-bold text-[#C9A56B]">$296</span>
                      <span className="text-gray-600 dark:text-gray-400">/night</span>
                    </div>
                    <Link
                      href="/destinations/italy"
                      className="text-sm font-medium text-[#C9A56B] hover:text-[#B89560] transition-colors"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Destination Card 3 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-900/20 dark:to-pink-800/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-300/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-20 h-20 text-[#C9A56B] opacity-30" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Spain
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#C9A56B] text-white text-xs font-semibold">
                      -20%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Discover vibrant culture, stunning beaches, and world-class gastronomy
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500 line-through">$279</span>
                      <span className="ml-2 text-xl font-bold text-[#C9A56B]">$223</span>
                      <span className="text-gray-600 dark:text-gray-400">/night</span>
                    </div>
                    <Link
                      href="/destinations/spain"
                      className="text-sm font-medium text-[#C9A56B] hover:text-[#B89560] transition-colors"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offer Banner */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#C9A56B]/10 via-[#C9A56B]/5 to-transparent border border-[#C9A56B]/20 p-6 md:p-8">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
                  <MapPin className="absolute right-4 top-4 w-16 h-16 text-[#C9A56B]" />
                  <Compass className="absolute right-12 bottom-4 w-12 h-12 text-[#C9A56B]" />
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#C9A56B] mb-2">EXCLUSIVE OFFER</p>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Book 3 Nights, Get the 4th Free
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        With exclusive amenities and special packages for your budget
                      </p>
                    </div>
                    <Link
                      href="/offers"
                      className="flex-shrink-0 px-6 py-3 rounded-lg bg-[#C9A56B] text-white font-medium hover:bg-[#B89560] transition-all shadow-lg"
                    >
                      View All Offers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#C9A56B] to-[#B89560] relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10">
              <Compass className="w-32 h-32 text-white" />
            </div>
            <div className="absolute bottom-10 left-10">
              <MapPin className="w-24 h-24 text-white" />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                ARE YOU READY?
              </h2>
              <p className="text-xl md:text-2xl font-serif italic mb-4">
                adventure time is today
              </p>
              <p className="text-lg mb-8 opacity-90">
                Special packages for you and your budget. Book 3 nights and get a fourth night free with exclusive amenities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-8 py-4 rounded-lg bg-white text-[#C9A56B] font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  GET STARTED NOW
                </Link>
                <a
                  href="tel:+14556516"
                  className="px-8 py-4 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-[#C9A56B] transition-all"
                >
                  CALL US AT +1 455 6516
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
