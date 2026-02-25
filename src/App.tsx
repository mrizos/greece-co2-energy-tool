import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ComparePage from './pages/ComparePage';
import CalculatorPage from './pages/CalculatorPage';
import AnalysesPage from './pages/AnalysesPage';
import { useMetricView } from './hooks/useMetricView';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';

function AppContent() {
  const { lang, toggleLang } = useLanguage();
  const { dark, toggleTheme } = useTheme();
  const { metricView, setMetricView } = useMetricView();
  const location = useLocation();

  // Only show metric toggle on compare page
  const showMetricToggle = location.pathname === '/compare';

  return (
    <div className="min-h-screen bg-sand dark:bg-charcoal transition-colors">
      <Header
        lang={lang}
        toggleLang={toggleLang}
        dark={dark}
        toggleTheme={toggleTheme}
        metricView={metricView}
        setMetricView={setMetricView}
        showMetricToggle={showMetricToggle}
      />

      <Routes>
        <Route path="/" element={<LandingPage lang={lang} />} />
        <Route
          path="/compare"
          element={<ComparePage lang={lang} metricView={metricView} />}
        />
        <Route path="/calculator" element={<CalculatorPage lang={lang} />} />
        <Route path="/analyses" element={<AnalysesPage lang={lang} />} />
      </Routes>

      <Footer lang={lang} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
