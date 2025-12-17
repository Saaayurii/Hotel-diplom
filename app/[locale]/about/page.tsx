'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { Award, Users, Globe, Headphones, Star, Shield, Heart, Zap, Target, Compass, CheckCircle2, ArrowRight, Quote, Building, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animated counter
  const [counts, setCounts] = useState({ hotels: 0, customers: 0, countries: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { hotels: 500, customers: 50000, countries: 30 };
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts({
        hotels: Math.round((targets.hotels * step) / steps),
        customers: Math.round((targets.customers * step) / steps),
        countries: Math.round((targets.countries * step) / steps),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const values = [
    { icon: Star, title: t('value1Title'), text: t('value1Text'), color: 'from-amber-500 to-orange-500' },
    { icon: Shield, title: t('value2Title'), text: t('value2Text'), color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, title: t('value3Title'), text: t('value3Text'), color: 'from-purple-500 to-pink-500' },
    { icon: Heart, title: t('value4Title'), text: t('value4Text'), color: 'from-rose-500 to-red-500' },
  ];

  const timeline = [
    { year: '2020', title: t('timeline.2020.title'), description: t('timeline.2020.description'), icon: Sparkles },
    { year: '2021', title: t('timeline.2021.title'), description: t('timeline.2021.description'), icon: Building },
    { year: '2022', title: t('timeline.2022.title'), description: t('timeline.2022.description'), icon: Globe },
    { year: '2023', title: t('timeline.2023.title'), description: t('timeline.2023.description'), icon: TrendingUp },
    { year: '2024', title: t('timeline.2024.title'), description: t('timeline.2024.description'), icon: Award },
  ];

  const team = [
    { name: 'Alex Johnson', role: t('teamRoles.ceo'), image: null, bio: t('teamBios.ceo') },
    { name: 'Maria Garcia', role: t('teamRoles.operations'), image: null, bio: t('teamBios.operations') },
    { name: 'David Chen', role: t('teamRoles.experience'), image: null, bio: t('teamBios.experience') },
    { name: 'Emma Wilson', role: t('teamRoles.marketing'), image: null, bio: t('teamBios.marketing') },
  ];

  const testimonials = [
    { text: t('testimonials.1.text'), author: t('testimonials.1.author'), location: t('testimonials.1.location') },
    { text: t('testimonials.2.text'), author: t('testimonials.2.author'), location: t('testimonials.2.location') },
    { text: t('testimonials.3.text'), author: t('testimonials.3.author'), location: t('testimonials.3.location') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section - Cinematic style */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A56B] rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(201, 165, 107, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 165, 107, 0.3) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Award className="w-4 h-4 text-[#C9A56B]" />
              {t('timeoutTravelAgency')}
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('heroTitle')}
              <span className="block text-[#C9A56B] mt-2">{t('heroHighlight')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with animated counters */}
        <section ref={statsRef} className="py-16 bg-[#C9A56B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center text-white">
                <Award className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-bold mb-1">{counts.hotels}+</div>
                <div className="text-sm opacity-80">{t('stats.hotels')}</div>
              </div>
              <div className="text-center text-white">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-bold mb-1">{counts.customers >= 1000 ? `${Math.round(counts.customers / 1000)}K` : counts.customers}+</div>
                <div className="text-sm opacity-80">{t('stats.customers')}</div>
              </div>
              <div className="text-center text-white">
                <Globe className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-bold mb-1">{counts.countries}+</div>
                <div className="text-sm opacity-80">{t('stats.countries')}</div>
              </div>
              <div className="text-center text-white">
                <Headphones className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-bold mb-1">24/7</div>
                <div className="text-sm opacity-80">{t('stats.support')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story - Asymmetric layout */}
        <section className="py-24 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-6">
                  <Compass className="w-4 h-4" />
                  {t('ourStory')}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {t('storyTitle')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {t('ourStoryText')}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {t('ourMissionText')}
                </p>

                {/* Key achievements */}
                <div className="space-y-4">
                  {[t('achievement1'), t('achievement2'), t('achievement3')].map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#C9A56B] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                {/* Decorative image composition */}
                <div className="relative h-[500px]">
                  <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl bg-gradient-to-br from-[#C9A56B] to-[#B89560] shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building className="w-32 h-32 text-white/20" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-3xl bg-gray-900 dark:bg-gray-800 shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-24 h-24 text-[#C9A56B]/30" />
                    </div>
                  </div>
                  {/* Floating card */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#C9A56B]/10 flex items-center justify-center">
                        <Award className="w-8 h-8 text-[#C9A56B]" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">5+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t('yearsExperience')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" />
                {t('ourJourney')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {t('journeyTitle')}
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#C9A56B] via-[#C9A56B] to-transparent" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className={`inline-block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                        <span className="text-[#C9A56B] font-bold text-lg">{item.year}</span>
                        <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Center icon */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-[#C9A56B] flex items-center justify-center shadow-lg">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Card grid */}
        <section className="py-24 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                {t('ourValues')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t('valuesTitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('valuesSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color}`} />

                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                {t('team')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t('teamTitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('teamSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group text-center"
                >
                  {/* Avatar */}
                  <div className="relative mb-6 inline-block">
                    <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-[#C9A56B]/30 to-[#C9A56B]/10 group-hover:from-[#C9A56B] group-hover:to-[#B89560] transition-all duration-300 flex items-center justify-center">
                      <Users className="w-16 h-16 text-[#C9A56B] group-hover:text-white transition-colors" />
                    </div>
                    {/* Status indicator */}
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-gray-900" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#C9A56B] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #C9A56B 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A56B]/20 text-[#C9A56B] text-sm font-medium mb-4">
                <Quote className="w-4 h-4" />
                {t('testimonials.title')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
                {t('testimonials.heading')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Quote className="w-10 h-10 text-[#C9A56B] mb-6" />
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A56B]/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#C9A56B]" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-[#C9A56B] to-[#B89560] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white rounded-full" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/hotels`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#C9A56B] font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
              >
                {t('ctaExplore')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
              >
                {t('ctaContact')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
