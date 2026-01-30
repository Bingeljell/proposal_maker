import { Link } from 'react-router-dom';
import { 
  FileText, 
  Wand2, 
  Download, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Globe,
  LayoutTemplate
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              <FileText size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">The Decent Proposal</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/builder" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
            <Link to="/builder" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Templates</Link>
            <Link 
              to="/builder" 
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Start Building Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-8 border border-blue-100 dark:border-blue-800">
            <Zap size={12} fill="currentColor" />
            <span>v2.0 Now Live with AI Writer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Because Demi Moore won't <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">win you the business.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create professional, winning proposals in minutes, not hours. 
            No design skills required. Just decent proposals that sell.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/builder" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-blue-500/30 shadow-lg flex items-center justify-center gap-2"
            >
              Create Proposal <ArrowRight size={20} />
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-bold text-lg transition-all"
            >
              View Examples
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-gray-400 text-sm font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> No Signup Required</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Free Forever</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Print-Ready PDF</span>
          </div>
        </div>
      </header>

      {/* Product Preview */}
      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl p-2 sm:p-4 shadow-2xl ring-1 ring-gray-900/5">
          <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-[16/9] border border-gray-700 group">
             {/* Abstract UI Representation */}
             <div className="absolute inset-0 flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col p-4 gap-4">
                    <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
                    <div className="space-y-2 mt-4">
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="h-8 w-full bg-gray-800/50 rounded flex items-center px-3 gap-3">
                                <div className="w-4 h-4 bg-gray-700 rounded"></div>
                                <div className="h-2 w-20 bg-gray-700 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Main */}
                <div className="flex-1 bg-gray-800 p-8 relative overflow-hidden">
                    {/* Floating Cards */}
                    <div className="absolute top-10 right-10 w-64 bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/10 shadow-xl transform rotate-3 transition-transform group-hover:rotate-0 duration-500">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/20 rounded text-blue-400"><Wand2 size={16}/></div>
                            <div className="text-sm font-bold text-white">AI Writing Assistant</div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-white/20 rounded"></div>
                            <div className="h-2 w-3/4 bg-white/20 rounded"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-20 w-80 bg-white rounded-lg p-6 shadow-xl transform -rotate-2 transition-transform group-hover:rotate-0 duration-500 z-10 text-gray-900">
                        <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-4">
                            <div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Total Estimate</div>
                                <div className="text-2xl font-extrabold text-blue-600">$12,500</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-400">Includes Taxes</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Web Development</span>
                                <span>$8,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">SEO Setup</span>
                                <span>$2,500</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Center Callout */}
             <div className="absolute inset-0 flex items-center justify-center">
                <Link to="/builder" className="bg-blue-600/90 hover:bg-blue-600 backdrop-blur text-white px-8 py-3 rounded-full font-bold shadow-lg transform scale-100 hover:scale-105 transition-all">
                    Launch Editor
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to win</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We stripped away the bloat and kept the essentials. No complex pipelines, 
              just a powerful document builder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Wand2}
              title="AI Writing Assistant"
              description="Stuck on the Executive Summary? Let our integrated AI draft compelling copy for you in seconds."
            />
            <FeatureCard 
              icon={LayoutTemplate}
              title="Smart Templates"
              description="Don't start from scratch. Load industry-standard templates for Video, Web, Social, and SEO projects."
            />
            <FeatureCard 
              icon={Layers}
              title="Dynamic Costing"
              description="Calculate totals, add optional upsells, apply discounts, and handle taxes automatically."
            />
            <FeatureCard 
              icon={Download}
              title="Export Anywhere"
              description="Download as a polished PDF for the client, or an editable Word doc (.docx) for legal redlining."
            />
            <FeatureCard 
              icon={Globe}
              title="Multi-Currency"
              description="Work with global clients? Switch between USD, EUR, GBP, INR, and more with one click."
            />
            <FeatureCard 
              icon={FileText}
              title="Cover Designer"
              description="Make a great first impression with beautiful, customizable cover pages and background patterns."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <FileText size={14} />
            </div>
            <span className="font-bold">The Decent Proposal</span>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} The Decent Proposal. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="https://github.com/Bingeljell/proposal_maker" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);
