import React, { useState } from 'react';
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
  Clock,
  Users,
  Layers
} from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    description: 'Create professional proposals in minutes, not hours. Our template system gets you started instantly.'
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Beautiful by Default',
    description: 'Every proposal looks polished and professional. Custom cover pages, consistent styling, print-ready output.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Privacy First',
    description: 'Your data stays with you. No cloud required, no tracking, no AI training on your content.'
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Export Anywhere',
    description: 'Export to PDF for sharing, Word for editing, or JSON for backup. Your proposals, your way.'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Track & Win',
    description: 'Monitor proposal status, track win/loss rates, and analyze your pipeline with built-in analytics.'
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI Powered',
    description: 'Stuck on wording? Our AI assistant helps you write compelling executive summaries and scope descriptions.'
  }
];

const capabilities = [
  { icon: <FileText className="w-5 h-5" />, text: 'Executive Summaries & Objectives' },
  { icon: <Layers className="w-5 h-5" />, text: 'Detailed Scope of Work' },
  { icon: <Users className="w-5 h-5" />, text: 'Team Structure & Allocations' },
  { icon: <BarChart3 className="w-5 h-5" />, text: 'Commercials & Rate Cards' },
  { icon: <Clock className="w-5 h-5" />, text: 'Expiration Dates & Validity' },
  { icon: <CheckCircle className="w-5 h-5" />, text: 'Terms, Sign-offs & Approvals' }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  
  const onEnterApp = () => navigate('/app');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              The Decent Proposal
            </span>
          </div>
          <button
            onClick={onEnterApp}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            Launch App
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Now with AI Writing Assistant
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            Create proposals that
            <span className="text-blue-600 dark:text-blue-400"> win deals</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            The Decent Proposal is a powerful, privacy-first proposal builder for agencies, 
            freelancers, and consultants. No cloud required. No subscriptions. Just decent proposals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onEnterApp}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              Start Creating Free
              <ArrowRight className={`w-5 h-5 transition-transform ${isHovering ? 'translate-x-1' : ''}`} />
            </button>
            <a
              href="#features"
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-lg font-semibold rounded-xl border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
            >
              See Features
            </a>
          </div>
          
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            No sign-up required. Works entirely in your browser.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">10+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Built-in Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">100%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Free & Open</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">0</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Cloud Required</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">∞</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Proposals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to win
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From first draft to signed contract, The Decent Proposal has you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Complete proposal sections
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Every proposal needs structure. We've built in all the sections you need, 
                fully customizable for your business.
              </p>
              <ul className="space-y-4">
                {capabilities.map((cap, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <span className="w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
                      {cap.icon}
                    </span>
                    {cap.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 space-y-4">
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/2" />
                <div className="h-32 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-400">
                  <FileText className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-5/6" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-4/6" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-1" />
                  <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Start with a Template</h3>
              <p className="text-slate-600 dark:text-slate-400">Choose from pre-built templates or start from scratch.</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Customize & Refine</h3>
              <p className="text-slate-600 dark:text-slate-400">Fill in your details, adjust pricing, add your team.</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Export & Send</h3>
              <p className="text-slate-600 dark:text-slate-400">Export to PDF or Word and send to your client.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to create your first proposal?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use The Decent Proposal to win more business. 
            Completely free, no strings attached.
          </p>
          <button
            onClick={onEnterApp}
            className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-xl"
          >
            Launch The Decent Proposal →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
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
