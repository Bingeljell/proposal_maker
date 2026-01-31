import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Zap, 
  Shield, 
  Palette, 
  BarChart3, 
  Download,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Star,
  ArrowUpRight
} from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lightning Fast',
    description: 'Create professional proposals in minutes with smart templates and AI assistance.'
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: 'Beautiful by Default',
    description: 'Every proposal looks polished with professional styling and custom cover pages.'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'Your data stays in your browser. No cloud required, no tracking, completely private.'
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: 'Export Anywhere',
    description: 'Export to PDF, Word, or JSON. Your proposals, your way.'
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Win More Deals',
    description: 'Track proposal status, analyze win rates, and optimize your pipeline.'
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'AI Powered',
    description: 'AI writing assistant helps you craft compelling executive summaries and scope.'
  }
];

const proposalSections = [
  { name: 'Cover Page', icon: '📄' },
  { name: 'Executive Summary', icon: '📝' },
  { name: 'Scope of Work', icon: '📋' },
  { name: 'Team Structure', icon: '👥' },
  { name: 'Commercials', icon: '💰' },
  { name: 'Terms & Sign-off', icon: '✍️' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-teal-950/20 dark:to-cyan-950/20">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-teal-200/30 dark:border-teal-800/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-400/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-teal-700 to-cyan-700 dark:from-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
              The Decent Proposal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/app')}
              className="hidden sm:flex px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-2xl hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decoration - mint/aqua gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-emerald-200/40 via-teal-200/30 to-transparent dark:from-emerald-800/20 dark:via-teal-800/15 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-b from-cyan-200/30 to-transparent dark:from-cyan-800/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-teal-200/20 to-transparent dark:from-teal-800/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 border border-emerald-200 dark:border-emerald-700 rounded-2xl text-sm font-medium text-teal-700 dark:text-teal-300 mb-6">
                <Sparkles className="w-4 h-4" />
                Now with AI Writing Assistant
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6">
                Create proposals that{' '}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  win deals
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
                The privacy-first proposal builder for agencies and consultants. 
                No subscriptions. No cloud lock-in. Just beautiful proposals that close.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/app')}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={scrollToFeatures}
                  className="px-8 py-4 text-teal-700 dark:text-teal-300 font-semibold hover:text-teal-900 dark:hover:text-teal-100 transition-colors flex items-center justify-center gap-2 rounded-2xl hover:bg-teal-50 dark:hover:bg-teal-900/20"
                >
                  See Features
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Free forever
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  No signup required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Works offline
                </div>
              </div>
            </div>

            {/* Right content - Preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                {/* Main preview card - more rounded */}
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-teal-200/50 dark:shadow-teal-900/20 border border-teal-100 dark:border-teal-800/50 p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-teal-100 dark:border-teal-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-400/20">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Digital Marketing Proposal</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">For: Acme Corp</div>
                      </div>
                    </div>
                    <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-medium rounded-full">
                      Draft
                    </div>
                  </div>

                  {/* Sections preview */}
                  <div className="space-y-3">
                    {proposalSections.map((section, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-teal-50/50 to-cyan-50/50 dark:from-teal-900/20 dark:to-cyan-900/20 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 transition-all cursor-pointer group border border-transparent hover:border-teal-200 dark:hover:border-teal-700"
                      >
                        <span className="text-2xl">{section.icon}</span>
                        <span className="flex-1 font-medium text-slate-700 dark:text-slate-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                          {section.name}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>

                  {/* Action bar */}
                  <div className="mt-6 pt-4 border-t border-teal-100 dark:border-teal-800/50 flex gap-3">
                    <div className="flex-1 h-12 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-2xl flex items-center px-5 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Total: ₹95,000
                    </div>
                    <div className="px-8 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl flex items-center text-sm font-medium shadow-lg shadow-teal-500/20">
                      Preview
                    </div>
                  </div>
                </div>

                {/* Floating elements - more rounded */}
                <div className="absolute -top-4 -right-4 px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-teal-100 dark:border-teal-800 flex items-center gap-2 animate-bounce">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">4.9 rating</span>
                </div>

                <div className="absolute -bottom-4 -left-4 px-5 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl shadow-xl text-sm font-semibold">
                  Free & Open Source
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-teal-100 dark:border-teal-800/50 bg-gradient-to-r from-teal-50/50 via-cyan-50/50 to-emerald-50/50 dark:from-teal-900/10 dark:via-cyan-900/10 dark:to-emerald-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10+', label: 'Templates' },
              { value: '100%', label: 'Free' },
              { value: '0', label: 'Cloud Needed' },
              { value: '∞', label: 'Proposals' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to win
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              From first draft to signed contract, we've got you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-teal-100 dark:border-teal-800/50 hover:border-teal-300 dark:hover:border-teal-600 transition-all hover:shadow-2xl hover:shadow-teal-500/10"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                  hoveredFeature === index 
                    ? 'bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-white scale-110 shadow-lg shadow-teal-400/30' 
                    : 'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-teal-600 dark:text-teal-400'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-teal-50/70 via-cyan-50/70 to-emerald-50/70 dark:from-teal-900/10 dark:via-cyan-900/10 dark:to-emerald-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Three simple steps to your winning proposal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: '01', 
                title: 'Start with a Template', 
                desc: 'Choose from our library of professional templates or start from scratch.' 
              },
              { 
                step: '02', 
                title: 'Customize & Refine', 
                desc: 'Fill in your details, adjust pricing, add your team, and polish the content.' 
              },
              { 
                step: '03', 
                title: 'Export & Send', 
                desc: 'Export to PDF or Word and send to your client. Track the outcome.' 
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center p-8 rounded-[2rem] bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-teal-100 dark:border-teal-800/50">
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-800 dark:to-teal-800 bg-clip-text text-transparent mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 px-8 py-16 lg:px-16 lg:py-20 text-center shadow-2xl shadow-teal-500/20">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }} />
            </div>

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to create your first proposal?
              </h2>
              <p className="text-teal-50 text-lg mb-8 max-w-2xl mx-auto">
                Join professionals who use The Decent Proposal to win more business. 
                Completely free, no strings attached.
              </p>
              <button
                onClick={() => navigate('/app')}
                className="px-10 py-5 bg-white text-teal-600 font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all text-lg"
              >
                Launch The Decent Proposal →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-teal-100 dark:border-teal-800/50 bg-gradient-to-b from-transparent to-teal-50/50 dark:to-teal-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                The Decent Proposal
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © 2026 The Decent Proposal. Built for professionals who value privacy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
