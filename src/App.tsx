import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useMatch } from 'react-router-dom';
import { caseStudies } from './content/caseStudies';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollManager from './components/ScrollManager';
import SkipLink from './components/SkipLink';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const CaseStudy = lazy(() => import('./pages/CaseStudy'));

const Layout = () => {
  const match = useMatch('/work/:slug');
  const cs = match?.params.slug ? caseStudies[match.params.slug] : undefined;
  return (
    <div id="top" className="min-w-0">
      <SkipLink />
      {cs ? <Header backLabel="All work" pageLabel={cs.headerLabel} /> : <Header />}
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer label={cs?.footerLabel} />
    </div>
  );
};

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ScrollManager />
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
