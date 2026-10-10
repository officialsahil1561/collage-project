import React, { useState } from 'react';
import { ReconciledRecord, Project } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RecordDetailModal } from './components/RecordDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';

import { OverviewPage } from './pages/OverviewPage';
import { SpendingPage } from './pages/SpendingPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CoveragePage } from './pages/CoveragePage';
import { ComparePage } from './pages/ComparePage';
import { SourcesAuditPage } from './pages/SourcesAuditPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedAuthorityKey, setSelectedAuthorityKey] = useState<string>('pune-pmc');
  const [selectedRecord, setSelectedRecord] = useState<ReconciledRecord | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F7] text-[#142B3B] font-sans antialiased selection:bg-[#0D9488] selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAuthorityKey={selectedAuthorityKey}
        setSelectedAuthorityKey={setSelectedAuthorityKey}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewPage
            selectedAuthorityKey={selectedAuthorityKey}
            setSelectedAuthorityKey={setSelectedAuthorityKey}
            onSelectRecord={setSelectedRecord}
            onSelectProject={setSelectedProject}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'spending' && (
          <SpendingPage
            selectedAuthorityKey={selectedAuthorityKey}
            setSelectedAuthorityKey={setSelectedAuthorityKey}
            onSelectRecord={setSelectedRecord}
          />
        )}
        {activeTab === 'departments' && (
          <DepartmentsPage
            onSelectRecord={setSelectedRecord}
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsPage
            onSelectProject={setSelectedProject}
          />
        )}
        {activeTab === 'coverage' && (
          <CoveragePage
            onSelectAuthority={setSelectedAuthorityKey}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'compare' && (
          <ComparePage />
        )}
        {(activeTab === 'sources' || activeTab === 'about') && (
          <SourcesAuditPage />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        setSelectedAuthorityKey={setSelectedAuthorityKey}
      />

      {/* Detail Modals */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRecord={(rec) => {
          setSelectedRecord(rec);
        }}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
        }}
      />

    </div>
  );
}

export default App;
