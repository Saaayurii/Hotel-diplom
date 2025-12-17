'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/app/components/ui/Header';
import { Footer } from '@/app/components/ui/Footer';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ChevronDown, Globe, Headphones, CheckCircle, ArrowRight, Facebook, Twitter, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeContactMethod, setActiveContactMethod] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: t('methods.call.title'),
      description: t('methods.call.description'),
      value: t('info.phoneValue'),
      action: t('methods.call.action'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: t('methods.email.title'),
      description: t('methods.email.description'),
      value: t('info.emailValue'),
      action: t('methods.email.action'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageCircle,
      title: t('methods.chat.title'),
      description: t('methods.chat.description'),
      value: t('methods.chat.availability'),
      action: t('methods.chat.action'),
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const contactInfo = [
    { icon: MapPin, label: t('info.address'), value: t('info.addressValue') },
    { icon: Phone, label: t('info.phone'), value: t('info.phoneValue') },
    { icon: Mail, label: t('info.email'), value: t('info.emailValue') },
    { icon: Clock, label: t('info.hours'), value: t('info.hoursValue') },
  ];

  const faqs = [
    {
      question: t('faqs.1.question'),
      answer: t('faqs.1.answer'),
    },
    {
      question: t('faqs.2.question'),
      answer: t('faqs.2.answer'),
    },
    {
      question: t('faqs.3.question'),
      answer: t('faqs.3.answer'),
    },
    {
      question: t('faqs.4.question'),
      answer: t('faqs.4.answer'),
    },
    {
      question: t('faqs.5.question'),
      answer: t('faqs.5.answer'),
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:bg-blue-600' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:bg-sky-500' },
    { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:bg-pink-600' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:bg-blue-700' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section - Modern split design */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Animated shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C9A56B]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                  <MessageSquare className="w-4 h-4 text-[#C9A56B]" />
                  {t('heroTag')}
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {t('heroTitle')}
                  <span className="block text-[#C9A56B]">{t('heroHighlight')}</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8">
                  {t('heroSubtitle')}
                </p>

                {/* Quick contact stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A56B]/20 flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-[#C9A56B]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-sm text-gray-400">{t('stats.support')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">&lt;2h</div>
                      <div className="text-sm text-gray-400">{t('stats.responseTime')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">30+</div>
                      <div className="text-sm text-gray-400">{t('stats.languages')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact method cards */}
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer transition-all duration-300 ${activeContactMethod === index ? 'bg-white/10 scale-[1.02]' : 'hover:bg-white/10'}`}
                    onClick={() => setActiveContactMethod(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}>
                        <method.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{method.title}</h3>
                        <p className="text-sm text-gray-400">{method.description}</p>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${activeContactMethod === index ? 'translate-x-1' : ''}`} />
                    </div>
                    {activeContactMethod === index && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-[#C9A56B] font-medium mb-2">{method.value}</p>
                        <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${method.color} text-white text-sm font-medium hover:opacity-90 transition-opacity`}>
                          {method.action}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form - Takes 3 columns */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="mb-8">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                      {t('form.tag')}
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {t('form.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('form.subtitle')}
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('form.successTitle')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t('form.success')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('form.name')} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent focus:bg-white dark:focus:bg-gray-600 outline-none transition-all"
                            placeholder={t('form.namePlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('form.email')} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent focus:bg-white dark:focus:bg-gray-600 outline-none transition-all"
                            placeholder={t('form.emailPlaceholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('form.subject')} <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent focus:bg-white dark:focus:bg-gray-600 outline-none transition-all"
                        >
                          <option value="">{t('form.subjectPlaceholder')}</option>
                          <option value="booking">{t('form.subjects.booking')}</option>
                          <option value="support">{t('form.subjects.support')}</option>
                          <option value="partnership">{t('form.subjects.partnership')}</option>
                          <option value="feedback">{t('form.subjects.feedback')}</option>
                          <option value="other">{t('form.subjects.other')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('form.message')} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={5}
                          className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#C9A56B] focus:border-transparent focus:bg-white dark:focus:bg-gray-600 outline-none transition-all resize-none"
                          placeholder={t('form.messagePlaceholder')}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A56B] to-[#B89560] text-white font-semibold hover:from-[#B89560] hover:to-[#A08550] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {t('form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t('form.send')}
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Info - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('info.title')}
                  </h3>

                  <div className="space-y-5">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-[#C9A56B]/10 group-hover:bg-[#C9A56B] flex items-center justify-center flex-shrink-0 transition-colors">
                          <info.icon className="w-5 h-5 text-[#C9A56B] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            {info.label}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line text-sm">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="h-48 bg-gradient-to-br from-[#C9A56B]/20 to-blue-500/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-[#C9A56B] mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('map.placeholder')}</p>
                      </div>
                    </div>
                    {/* Fake map elements */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-gray-400 rounded-lg" />
                      <div className="absolute bottom-4 right-4 w-24 h-12 border-2 border-gray-400 rounded-lg" />
                      <div className="absolute top-1/2 left-1/3 w-8 h-8 border-2 border-gray-400 rounded-full" />
                    </div>
                  </div>
                  <div className="p-4">
                    <a
                      href="#"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-[#C9A56B] text-[#C9A56B] font-medium hover:bg-[#C9A56B] hover:text-white transition-all"
                    >
                      <MapPin className="w-4 h-4" />
                      {t('map.openMaps')}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">{t('social.title')}</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-all ${social.color} hover:text-white`}
                        title={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 rounded-full bg-[#C9A56B]/10 text-[#C9A56B] text-sm font-medium mb-4">
                  FAQ
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('faq.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('faq.subtitle')}
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'ring-2 ring-[#C9A56B]' : ''}`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-lg bg-[#C9A56B]/10 flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === index ? 'bg-[#C9A56B]' : ''}`}>
                        <ChevronDown
                          className={`w-5 h-5 transition-all duration-300 ${openFaq === index ? 'rotate-180 text-white' : 'text-[#C9A56B]'}`}
                        />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="px-6 pb-5">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Still have questions? */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('faq.stillQuestions')}</p>
                <Link
                  href={`/${locale}/contact#form`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A56B] text-white font-medium hover:bg-[#B89560] transition-all"
                >
                  {t('faq.contactUs')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-[#C9A56B] to-[#B89560]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-white mb-4">
                {t('newsletter.title')}
              </h2>
              <p className="text-white/80 mb-8">
                {t('newsletter.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <button className="px-8 py-4 rounded-xl bg-white text-[#C9A56B] font-semibold hover:bg-gray-100 transition-all shadow-lg">
                  {t('newsletter.button')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
