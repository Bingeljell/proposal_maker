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
  LayoutTemplate,
  Briefcase
} from 'lucide-react';
import { templates } from '../data/templates';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 selection:bg-brand-mint/30 selection:text-gray-900 scroll-smooth">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] -left-[10%] w-[40%] h-[40%] bg-brand-mint/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-brand-aqua/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-gray-900 font-bold shadow-lg">
              <FileText size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight">The Decent Proposal</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#templates" className="text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Templates</a>
            <Link 
              to="/builder" 
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-2xl text-sm font-bold hover:scale-105 transition-all shadow-xl hover:shadow-gray-900/20 dark:hover:shadow-white/10"
            >
              Start Building
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-24 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/30 dark:bg-brand-mint/10 text-gray-900 dark:text-brand-mint text-xs font-bold mb-10 border border-brand-mint/50 dark:border-brand-mint/20 backdrop-blur-sm">
            <Zap size={14} className="fill-current" />
            <span className="uppercase tracking-wider">v2.0 Now Live with AI Writer</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-10 leading-[1.1]">
            Because Demi Moore <br className="hidden md:block" />
            won't <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-brand-aqua to-brand-mint">win you the business.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            The lightweight document builder for winning proposals. 
            No complexity, just decent design and high-converting structure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/builder" 
              className="w-full sm:w-auto px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-3xl font-black text-xl transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
            >
              Get Started <ArrowRight size={24} strokeWidth={3} />
            </Link>
            <a 
              href="#templates" 
              className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-brand-aqua dark:hover:border-brand-aqua/50 text-gray-900 dark:text-gray-200 rounded-3xl font-bold text-xl transition-all"
            >
              Browse Templates
            </a>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-brand-mint" /> No Signup</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-brand-mint" /> 100% Free</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-brand-mint" /> Print-Ready</span>
          </div>
        </div>
      </header>

      {/* Product Preview */}
      <section className="px-6 mb-40 relative z-10">
        <div className="max-w-6xl mx-auto bg-gray-900/5 dark:bg-white/5 p-4 rounded-[2.5rem] shadow-sm backdrop-blur-3xl border border-white/20">
          <div className="relative rounded-[2rem] overflow-hidden bg-gray-900 aspect-[16/10] border border-gray-800 group shadow-2xl">
             {/* Abstract UI Representation */}
             <div className="absolute inset-0 flex opacity-40">
                {/* Sidebar */}
                <div className="w-64 bg-black/40 border-r border-white/5 hidden md:flex flex-col p-6 gap-6">
                    <div className="h-10 w-32 bg-white/10 rounded-xl"></div>
                    <div className="space-y-3 mt-4">
                        {[1,2,3,4,5,6,7].map(i => (
                            <div key={i} className="h-10 w-full bg-white/5 rounded-xl flex items-center px-4 gap-4">
                                <div className="w-5 h-5 bg-white/10 rounded-lg"></div>
                                <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Main */}
                <div className="flex-1 bg-gradient-to-br from-gray-900 to-black p-12 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto space-y-8">
                        <div className="h-12 w-3/4 bg-white/10 rounded-2xl"></div>
                        <div className="space-y-4">
                            <div className="h-3 w-full bg-white/5 rounded-full"></div>
                            <div className="h-3 w-full bg-white/5 rounded-full"></div>
                            <div className="h-3 w-2/3 bg-white/5 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-12">
                            <div className="h-32 bg-white/5 rounded-3xl border border-white/5"></div>
                            <div className="h-32 bg-white/5 rounded-3xl border border-white/5"></div>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Dynamic Overlays */}
             <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-[15%] right-[10%] w-72 bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl transform rotate-3 transition-transform group-hover:rotate-0 duration-700 pointer-events-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-brand-mint rounded-2xl text-gray-900 shadow-lg shadow-brand-mint/20"><Wand2 size={20}/></div>
                        <div className="text-base font-black text-white">AI Assistant</div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-2.5 w-full bg-white/20 rounded-full"></div>
                        <div className="h-2.5 w-full bg-white/20 rounded-full"></div>
                        <div className="h-2.5 w-4/5 bg-white/20 rounded-full"></div>
                    </div>
                </div>

                <div className="absolute bottom-[15%] left-[8%] w-96 bg-white rounded-[2.5rem] p-8 shadow-2xl transform -rotate-2 transition-transform group-hover:rotate-0 duration-700 z-30 text-gray-900 pointer-events-auto border border-gray-100">
                    <div className="flex justify-between items-end border-b border-gray-100 pb-6 mb-6">
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Total Project Fee</div>
                            <div className="text-4xl font-black text-gray-900">$12,500<span className="text-gray-300 ml-1 text-xl font-medium">.00</span></div>
                        </div>
                        <div className="text-right">
                            <div className="px-3 py-1 bg-brand-mint rounded-full text-[10px] font-black uppercase">Approved</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm items-center">
                            <span className="font-bold text-gray-500 flex items-center gap-2">
                                <div className="w-2 h-2 bg-brand-aqua rounded-full"></div>
                                Social Strategy
                            </span>
                            <span className="font-mono font-bold">$8,000</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                            <span className="font-bold text-gray-500 flex items-center gap-2">
                                <div className="w-2 h-2 bg-brand-mint rounded-full"></div>
                                Creative Production
                            </span>
                            <span className="font-mono font-bold">$4,500</span>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Center Callout */}
             <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                <Link to="/builder" className="bg-white text-gray-900 px-10 py-4 rounded-3xl font-black text-xl shadow-2xl transform scale-100 hover:scale-110 transition-all pointer-events-auto ring-8 ring-white/10">
                    Launch Free Builder
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white dark:bg-gray-800/20 relative z-10 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Everything you need to win</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-medium">
              We stripped away the corporate bloat. No complex pipelines, 
              just a powerful, designer-grade builder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={Wand2}
              color="bg-brand-mint"
              title="AI Writing Assistant"
              description="Stop staring at a blank screen. Our Gemini-powered AI drafts compelling copy for your summaries and objectives in seconds."
            />
            <FeatureCard 
              icon={LayoutTemplate}
              color="bg-brand-aqua"
              title="Starter Templates"
              description="Get a head start with field-tested structures for Video, Web, Branding, and Social Media projects. Proven to convert."
            />
            <FeatureCard 
              icon={Layers}
              color="bg-purple-200"
              title="Dynamic Costing"
              description="Automate your math. Itemized tables with auto-calculated totals, optional line items, discounts, and multi-currency support."
            />
            <FeatureCard 
              icon={Download}
              color="bg-orange-200"
              title="Export Anywhere"
              description="Present a beautiful, print-ready PDF to the client, or download an editable Word doc (.docx) for legal and procurement teams."
            />
            <FeatureCard 
              icon={Globe}
              color="bg-blue-200"
              title="Global Branding"
              description="Choose from curated themes, fonts, and patterns. Match your agency’s identity with cover page designs that make an impact."
            />
            <FeatureCard 
              icon={CheckCircle2}
              color="bg-green-200"
              title="Stateless & Private"
              description="Your data stays in your browser. No accounts, no trackers, and total privacy until you decide to export or share."
            />
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-32 bg-white dark:bg-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-aqua/30 dark:bg-brand-aqua/10 text-gray-900 dark:text-brand-aqua text-xs font-bold mb-6 border border-brand-aqua/50 dark:border-brand-aqua/20">
              <LayoutTemplate size={14} className="fill-current" />
              <span className="uppercase tracking-widest">Speed up your workflow</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Choose your starting point</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              Don't reinvent the wheel. Use our pre-built proposal skeletons.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {templates.map((template) => (
              <div key={template.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] overflow-hidden border-2 border-transparent hover:border-brand-aqua dark:hover:border-brand-aqua transition-all group flex flex-col hover:shadow-2xl">
                <div className="h-56 bg-white dark:bg-gray-800 relative overflow-hidden flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
                   {/* Abstract Preview */}
                   <div className="w-2/3 h-3/4 bg-gray-50 dark:bg-gray-900 shadow-2xl rounded-3xl flex flex-col p-5 transform group-hover:scale-110 transition-transform duration-700 border border-gray-100 dark:border-gray-800">
                      <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3"></div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mb-2"></div>
                      <div className="h-2 w-2/3 bg-gray-100 dark:bg-gray-800 rounded-full mb-6"></div>
                      <div className="flex-1 bg-brand-mint/20 dark:bg-brand-mint/5 rounded-2xl border border-brand-mint/30"></div>
                   </div>
                   <div className="absolute top-6 right-6">
                      <span className={`text-xs px-3 py-1.5 rounded-2xl border-2 font-black uppercase tracking-widest ${
                        template.category === 'Creative' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        template.category === 'Technical' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-brand-mint text-gray-900 border-brand-mint'
                      }`}>
                        {template.category}
                      </span>
                   </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">{template.name}</h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 flex-1 leading-relaxed font-medium">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm font-bold text-gray-400 mb-10 border-t border-gray-100 dark:border-gray-700 pt-8">
                    <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg"><Layers size={16} /> {template.data.scope.length} Services</span>
                    <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg"><Briefcase size={16} /> {template.data.team.length} Roles</span>
                  </div>

                  <Link 
                    to="/builder" 
                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-lg hover:bg-brand-aqua dark:hover:bg-brand-aqua hover:text-gray-900 transition-all text-center shadow-lg"
                  >
                    Start with this
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-aqua to-brand-mint rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px) 0 0 / 20px 20px' }}></div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 relative z-10 leading-tight">Ready to send <br/>your best proposal?</h2>
            <Link 
                to="/builder" 
                className="inline-flex items-center gap-3 px-12 py-6 bg-gray-900 text-white rounded-3xl font-black text-2xl hover:scale-105 transition-all shadow-2xl relative z-10"
            >
                Get Started Now <ArrowRight size={28} strokeWidth={3} />
            </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 text-gray-500 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-gray-900 font-bold">
                <FileText size={18} />
                </div>
                <span className="font-black text-xl text-gray-900 dark:text-white">The Decent Proposal</span>
            </div>
            <p className="max-w-xs font-medium leading-relaxed">
                Empowering creative teams to win more business with less effort.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 font-bold uppercase tracking-widest text-xs">
            <div className="flex flex-col gap-4">
                <span className="text-gray-900 dark:text-white mb-2">Product</span>
                <a href="#features" className="hover:text-brand-aqua transition-colors">Features</a>
                <a href="#templates" className="hover:text-brand-aqua transition-colors">Templates</a>
                <Link to="/builder" className="hover:text-brand-aqua transition-colors">Builder</Link>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-gray-900 dark:text-white mb-2">Social</span>
                <a href="https://github.com/Bingeljell/proposal_maker" className="hover:text-brand-aqua transition-colors">GitHub</a>
                <a href="#" className="hover:text-brand-aqua transition-colors">Twitter</a>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-gray-900 dark:text-white mb-2">Legal</span>
                <a href="#" className="hover:text-brand-aqua transition-colors">Privacy</a>
                <a href="#" className="hover:text-brand-aqua transition-colors">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            &copy; {new Date().getFullYear()} The Decent Proposal. Crafted for winners.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, color, title, description }: { icon: any, color: string, title: string, description: string }) => (
  <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-brand-aqua dark:hover:border-brand-aqua/50 transition-all shadow-sm hover:shadow-2xl group">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-8 shadow-inner transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
      <Icon size={32} className="text-gray-900" />
    </div>
    <h3 className="text-2xl font-black mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);
