import React, { useState, useEffect } from 'react';
import { ReconciledRecord, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageSectionHeader } from './components/PageSectionHeader';
import { RecordDetailModal } from './components/RecordDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OverviewPage } from './pages/OverviewPage';
import { BudgetTrackerPage } from './pages/BudgetTrackerPage';
import { RevenueExpenditurePage } from './pages/RevenueExpenditurePage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { WardsPage } from './pages/WardsPage';
import { WaterSanitationPage } from './pages/WaterSanitationPage';
import { RoadsDevelopmentPage } from './pages/RoadsDevelopmentPage';
import { PublicFacilitiesPage } from './pages/PublicFacilitiesPage';
import { EnvironmentPage } from './pages/EnvironmentPage';
import { TendersPage } from './pages/TendersPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { SpendingPage } from './pages/SpendingPage';
import { SourcesAuditPage } from './pages/SourcesAuditPage';
import { CivicComplaintsPage } from './pages/CivicComplaintsPage';
import { CitizenFeedbackPage } from './pages/CitizenFeedbackPage';
import { dataProvider } from './services/dataProvider';
import {
  getBreadcrumbsForPage,
  getDocumentTitleForPage,
  getPathForPage,
  normalizePageKey,
  resolvePageFromPathname
} from './utils/navigation';

const EXPLORE_PAGES = ['projects', 'wards', 'tenders', 'infrastructure'];
const FINANCE_PAGES = ['finances', 'budget', 'revenue-expenditure', 'departments', 'records'];
const CIVIC_SERVICES_PAGES = [
  'water-sanitation',
  'roads-development',
  'public-facilities',
  'environment',
  'complaints',
  'feedback'
];
const ABOUT_PAGES = ['about', 'sources', 'audit-report', 'methodology'];

export function App() {
  const [activePage, setActivePage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return resolvePageFromPathname(window.location.pathname);
    }
    return 'home';
  });
  const [selectedRecord, setSelectedRecord] = useState<ReconciledRecord | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const metrics = dataProvider.getReconciliationMetrics();
  const sources = dataProvider.getSourceRegistry();

  // Sync browser document title
  useEffect(() => {
    document.title = getDocumentTitleForPage(activePage);
  }, [activePage]);

  // Listen to browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(resolvePageFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global keyboard shortcuts ('/', Cmd/Ctrl+K, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((e.key === '/' && !isInput) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSelectedRecord(null);
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (rawPage: string) => {
    const nextPage = normalizePageKey(rawPage);
    setActivePage(nextPage);

    if (typeof window !== 'undefined') {
      const targetPath = getPathForPage(nextPage);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page: nextPage }, '', targetPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbs = getBreadcrumbsForPage(activePage);
  const isExploreSection = EXPLORE_PAGES.includes(activePage);
  const isFinanceSection = FINANCE_PAGES.includes(activePage);
  const isCivicServicesSection = CIVIC_SERVICES_PAGES.includes(activePage);
  const isAboutSection = ABOUT_PAGES.includes(activePage);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#1C2422] font-sans antialiased selection:bg-[#0E7C74] selection:text-white">
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 w-full">
        {activePage === 'home' && <HomePage onNavigate={navigateTo} />}

        {/* GROUP 1: EXPLORE */}
        {isExploreSection && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Civic Exploration"
              title="Projects, Wards, Tenders & Infrastructure"
              description="Explore major sanctioned PMC infrastructure schemes, all 15 Regional Ward Offices & 41 Prabhags, procurement tenders on MahaTenders, and 12 citywide civic sectors."
              breadcrumbs={breadcrumbs}
              onNavigate={navigateTo}
              tabs={[
                { key: 'projects', label: 'Public Projects (8)' },
                { key: 'wards', label: 'Ward Explorer (15 · 41)' },
                { key: 'tenders', label: 'Tenders & Contracts (5)' },
                { key: 'infrastructure', label: 'Civic Infrastructure (12)' }
              ]}
              activeTab={activePage}
              onSelectTab={navigateTo}
            />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {activePage === 'projects' && (
                <ProjectsPage onSelectProject={setSelectedProject} />
              )}
              {activePage === 'wards' && <WardsPage />}
              {activePage === 'tenders' && <TendersPage />}
              {activePage === 'infrastructure' && <InfrastructurePage />}
            </div>
          </>
        )}

        {/* GROUP 2: FINANCE */}
        {isFinanceSection && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Public Finance"
              title="Municipal Finance, Budgets & Departments"
              description={`Inspect PMC's multi-year Budget Estimates (FY 2022–27), Audited Financial Statements, revenue receipts, 20 municipal departments, and the full ${metrics.total}-record audit ledger.`}
              breadcrumbs={breadcrumbs}
              onNavigate={navigateTo}
              tabs={[
                { key: 'finances', label: 'Financial Overview' },
                { key: 'budget', label: 'Annual Budget Tracker' },
                { key: 'revenue-expenditure', label: 'Revenue & Expenditure' },
                { key: 'departments', label: 'Departments (20)' },
                { key: 'records', label: `Financial Records (${metrics.total})` }
              ]}
              activeTab={activePage}
              onSelectTab={navigateTo}
            />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {activePage === 'finances' && (
                <OverviewPage
                  onSelectRecord={setSelectedRecord}
                  onSelectProject={setSelectedProject}
                  setActiveTab={navigateTo}
                />
              )}
              {activePage === 'budget' && <BudgetTrackerPage />}
              {activePage === 'revenue-expenditure' && (
                <RevenueExpenditurePage onSelectRecord={setSelectedRecord} />
              )}
              {activePage === 'departments' && (
                <DepartmentsPage onSelectRecord={setSelectedRecord} />
              )}
              {activePage === 'records' && (
                <SpendingPage onSelectRecord={setSelectedRecord} />
              )}
            </div>
          </>
        )}

        {/* GROUP 3: CIVIC SERVICES */}
        {isCivicServicesSection && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Civic Services & Citizen Desk"
              title="Water, Roads, Public Facilities, Environment & Grievances"
              description="Track PMC water treatment & 11 JICA STPs, road & mobility projects, public clinics/schools/fire stations, ESR environment data, or prepare PMC CARE civic complaints & data feedback."
              breadcrumbs={breadcrumbs}
              onNavigate={navigateTo}
              tabs={[
                { key: 'water-sanitation', label: 'Water & Sanitation' },
                { key: 'roads-development', label: 'Roads & Development' },
                { key: 'public-facilities', label: 'Public Facilities' },
                { key: 'environment', label: 'Environment Dashboard' },
                { key: 'complaints', label: 'Civic Complaints' },
                { key: 'feedback', label: 'Citizen Feedback' }
              ]}
              activeTab={activePage}
              onSelectTab={navigateTo}
            />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {activePage === 'water-sanitation' && <WaterSanitationPage />}
              {activePage === 'roads-development' && <RoadsDevelopmentPage />}
              {activePage === 'public-facilities' && <PublicFacilitiesPage />}
              {activePage === 'environment' && <EnvironmentPage />}
              {activePage === 'complaints' && <CivicComplaintsPage />}
              {activePage === 'feedback' && <CitizenFeedbackPage />}
            </div>
          </>
        )}

        {/* GROUP 4: ABOUT & VERIFICATION */}
        {isAboutSection && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Verification & Governance"
              title="About JanDhan Insights, Sources & Methodology"
              description="Platform mission, primary PMC & OpenCity publications, 43-record quarantine audit decisions, and accounting standards separating Budget Estimates from Audited Actuals."
              breadcrumbs={breadcrumbs}
              onNavigate={navigateTo}
              tabs={[
                { key: 'about', label: 'About JanDhan Insights' },
                { key: 'sources', label: `Data Sources (${sources.length})` },
                { key: 'audit-report', label: `Audit Report (${metrics.total})` },
                { key: 'methodology', label: 'Methodology' }
              ]}
              activeTab={activePage}
              onSelectTab={navigateTo}
            />

            {activePage === 'about' ? (
              <AboutPage onNavigate={navigateTo} />
            ) : (
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <SourcesAuditPage
                  initialSubTab={
                    activePage === 'sources'
                      ? 'registry'
                      : activePage === 'methodology'
                      ? 'methodology'
                      : 'reconciliation'
                  }
                  hideSubNav={true}
                  onOpenRecords={() => navigateTo('records')}
                />
              </div>
            )}
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      <RecordDetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRecord={(rec) => setSelectedRecord(rec)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onNavigateTab={(tab) => navigateTo(tab)}
      />
    </div>
  );
}

export default App;
