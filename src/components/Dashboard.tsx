import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './dashboard/Header';
import WorldMap from './dashboard/WorldMap';
import Terminal from './dashboard/Terminal';
import IntelligenceFeeds from './dashboard/IntelligenceFeeds';
import SystemMonitor from './dashboard/SystemMonitor';
import ToolsPanel from './dashboard/ToolsPanel';
import AgentPanel from './dashboard/AgentPanel';
import MissionBriefing from './dashboard/MissionBriefing';
import DocumentManager from './dashboard/DocumentManager';

export default function Dashboard() {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <Header userProfile={userProfile} currentTime={currentTime} />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - FIXED */}
        <div className="w-80 bg-slate-900/80 backdrop-blur-sm border-r border-slate-700/50 overflow-y-auto">
          <div className="p-4 space-y-4">
            <IntelligenceFeeds />
            <SystemMonitor />
            <AgentPanel />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 px-4 py-3">
            <div className="flex space-x-1">
              {[
                { id: 'overview', label: 'OVERVIEW' },
                { id: 'intel', label: 'INTELLIGENCE' },
                { id: 'documents', label: 'DOCUMENTS' },
                { id: 'terminal', label: 'TERMINAL' },
                { id: 'tools', label: 'TOOLS' },
                { id: 'missions', label: 'MISSIONS' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-blue-600/20 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'overview' && (
              <div className="h-full p-4">
                <WorldMap />
              </div>
            )}
            {activeTab === 'intel' && (
              <div className="h-full p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                  <IntelligenceFeeds />
                  <SystemMonitor />
                </div>
              </div>
            )}
            {activeTab === 'documents' && (
              <div className="h-full p-4">
                <DocumentManager />
              </div>
            )}
            {activeTab === 'terminal' && (
              <div className="h-full">
                <Terminal />
              </div>
            )}
            {activeTab === 'tools' && (
              <div className="h-full p-4">
                <ToolsPanel />
              </div>
            )}
            {activeTab === 'missions' && (
              <div className="h-full p-4">
                <MissionBriefing />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}