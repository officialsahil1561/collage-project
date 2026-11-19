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
import { TendersPage } from './pages/TendersPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { SpendingPage } from './pages/SpendingPage';
import { SourcesAuditPage } from './pages/SourcesAuditPage';

const FINANCE_PAGES = ['finances', 'overview', 'budget', 'revenue-expenditure', 'records', 'spending'];
const PROJECT_PAGES = ['projects', 'tenders', 'wards', 'infrastructure'];

export function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedRecord, setSelectedRecord] = useState<ReconciledRecord | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

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

  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFinanceSection = FINANCE_PAGES.includes(activePage);
  const isProjectSection = PROJECT_PAGES.includes(activePage);
  const isSourcesSection = activePage === 'sources' || activePage === 'methodology';

  const normalizedFinanceTab =
    activePage === 'overview'
      ? 'finances'
      : activePage === 'spending'
      ? 'records'
      : activePage;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#1C2422] font-sans antialiased selection:bg-[#0E7C74] selection:text-white">
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 w-full">
        {activePage === 'home' && <HomePage onNavigate={navigateTo} />}

        {activePage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {isFinanceSection && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Public Finance"
              title="Financial Overview & Municipal Accounts"
              description="Inspect Pune Municipal Corporation's multi-year Budget Estimates (BE), Audited Financial Statements, revenue receipts, and the full 38-record audit ledger."
              tabs={[
                { key: 'finances', label: 'Executive Summary & Charts' },
                { key: 'budget', label: 'Annual Budget Tracker' },
                { key: 'revenue-expenditure', label: 'Revenue & Expenditure' },
                { key: 'records', label: 'Financial Records (38)' }
              ]}
              activeTab={normalizedFinanceTab}
              onSelectTab={navigateTo}
            />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {normalizedFinanceTab === 'finances' && (
                <OverviewPage
                  onSelectRecord={setSelectedRecord}
                  onSelectProject={setSelectedProject}
                  setActiveTab={navigateTo}
                />
              )}
              {normalizedFinanceTab === 'budget' && <BudgetTrackerPage />}
              {normalizedFinanceTab === 'revenue-expenditure' && (
                <RevenueExpenditurePage onSelectRecord={setSelectedRecord} />
              )}
              {normalizedFinanceTab === 'records' && (
                <SpendingPage onSelectRecord={setSelectedRecord} />
              )}
            </div>
          </>
        )}

        {activePage === 'departments' && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Administration"
              title="Municipal Departments (20 Profiles)"
              description="Dedicated allocation profiles across all 20 Pune Municipal Corporation departments, isolating quarantined sub-heads and flagging missing disclosures honestly."
            />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <DepartmentsPage onSelectRecord={setSelectedRecord} />
            </div>
          </>
        )}

        {isProjectSection && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Civic Works"
              title="Public Projects, Wards & Civic Infrastructure"
              description="Explore major sanctioned infrastructure schemes, procurement tenders, 15 Regional Ward Offices (41 Prabhags), and 12 Environment Status Report sectors across Pune."
              tabs={[
                { key: 'projects', label: 'Public Projects (8)' },
                { key: 'tenders', label: 'Tenders & Contracts (5)' },
                { key: 'wards', label: 'Wards & Prabhags (15)' },
                { key: 'infrastructure', label: 'Civic Infrastructure (12)' }
              ]}
              activeTab={activePage}
              onSelectTab={navigateTo}
            />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {activePage === 'projects' && (
                <ProjectsPage onSelectProject={setSelectedProject} />
              )}
              {activePage === 'tenders' && <TendersPage />}
              {activePage === 'wards' && <WardsPage />}
              {activePage === 'infrastructure' && <InfrastructurePage />}
            </div>
          </>
        )}

        {isSourcesSection && (
          <>
            <PageSectionHeader
              eyebrow="Pune Municipal Corporation · Verification Standard"
              title="Official Data Sources & Audit Methodology"
              description="Primary PMC publications, OpenCity datasets, quarantine reconciliation rules, and accounting standards separating Budget Estimates from Audited Actuals."
            />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <SourcesAuditPage
                initialSubTab={activePage === 'methodology' ? 'methodology' : 'reconciliation'}
                onOpenRecords={() => navigateTo('records')}
              />
            </div>
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
