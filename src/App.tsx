import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './components/landing/LandingPage';
import { IntroForm } from './components/builder/IntroForm';
import { HistoryForm } from './components/builder/HistoryForm';
import { SummaryForm } from './components/builder/SummaryForm';
import { ScopeForm } from './components/builder/ScopeForm';
import { CostingForm } from './components/builder/CostingForm';
import { RateCardForm } from './components/builder/RateCardForm';
import { ClientReqForm } from './components/builder/ClientReqForm';
import { OutOfScopeForm } from './components/builder/OutOfScopeForm';
import { TeamForm } from './components/builder/TeamForm';
import { TermsForm } from './components/builder/TermsForm';
import { SignOffForm } from './components/builder/SignOffForm';

function App() {
  const [showApp, setShowApp] = useState(false);

  // Show landing page initially
  if (!showApp) {
    return <LandingPage onEnterApp={() => setShowApp(true)} />;
  }

  return (
    <Layout>
      {(activeSection) => {
        switch (activeSection) {
          case 'intro':
            return <IntroForm />;
          case 'history':
            return <HistoryForm />;
          case 'summary':
            return <SummaryForm />;
          case 'scope':
            return <ScopeForm />;
          case 'costing':
            return <CostingForm />;
          case 'ratecard':
            return <RateCardForm />;
          case 'client-req':
            return <ClientReqForm />;
          case 'out-of-scope':
            return <OutOfScopeForm />;
          case 'team':
            return <TeamForm />;
          case 'terms':
            return <TermsForm />;
          case 'sign-off':
            return <SignOffForm />;
          default:
            return (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  Form for <span className="font-semibold text-gray-800 capitalize">{(activeSection as string).replace('-', ' ')}</span> is under construction.
                </p>
              </div>
            );
        }
      }}
    </Layout>
  );
}

export default App;
