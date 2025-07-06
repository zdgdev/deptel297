import React, { useState } from 'react';
import { FileText, Download, Lock, AlertTriangle, Clock, User, Target } from 'lucide-react';

interface Mission {
  id: string;
  codename: string;
  classification: string;
  status: 'active' | 'pending' | 'completed' | 'classified';
  priority: 'low' | 'medium' | 'high' | 'critical';
  briefing: string;
  objectives: string[];
  assignedAgents: string[];
  deadline: Date;
  progress: number;
}

export default function MissionBriefing() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const missions: Mission[] = [
    {
      id: 'mission-1',
      codename: 'OPERATION BLACKBIRD',
      classification: 'TOP SECRET',
      status: 'active',
      priority: 'critical',
      briefing: 'Intelligence gathering operation targeting high-value assets in Eastern Europe. Primary objective involves surveillance and data collection on suspected terrorist activities.',
      objectives: [
        'Establish surveillance network in target region',
        'Identify and track high-value targets',
        'Collect intelligence on terrorist financing',
        'Maintain operational security at all times'
      ],
      assignedAgents: ['NIGHTFALL', 'PHOENIX', 'SHADOW'],
      deadline: new Date('2024-01-15'),
      progress: 75
    },
    {
      id: 'mission-2',
      codename: 'OPERATION GHOST PROTOCOL',
      classification: 'SECRET',
      status: 'pending',
      priority: 'high',
      briefing: 'Counter-intelligence operation to identify and neutralize foreign agents operating within domestic territory.',
      objectives: [
        'Identify foreign intelligence operatives',
        'Monitor communications networks',
        'Gather evidence of espionage activities',
        'Coordinate with domestic law enforcement'
      ],
      assignedAgents: ['VIPER', 'RAVEN'],
      deadline: new Date('2024-02-01'),
      progress: 25
    },
    {
      id: 'mission-3',
      codename: 'OPERATION DEEP BLUE',
      classification: 'TOP SECRET',
      status: 'completed',
      priority: 'medium',
      briefing: 'Cyber warfare operation targeting enemy communication networks and infrastructure.',
      objectives: [
        'Penetrate enemy cyber defenses',
        'Gather intelligence on military capabilities',
        'Disrupt enemy communication systems',
        'Maintain plausible deniability'
      ],
      assignedAgents: ['GHOST', 'CIPHER'],
      deadline: new Date('2023-12-01'),
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'completed': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'classified': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-blue-400';
    }
  };

  const selectedMissionData = missions.find(m => m.id === selectedMission);

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-slate-700/50 border-b border-white/10 px-4 py-3">
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-400" />
          <span>MISSION BRIEFINGS</span>
        </h2>
      </div>

      <div className="flex h-[calc(100%-60px)]">
        {/* Mission List */}
        <div className="w-96 bg-slate-800/50 border-r border-white/10 p-4 overflow-y-auto">
          <div className="space-y-3">
            {missions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => setSelectedMission(mission.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-white/5 ${
                  selectedMission === mission.id ? 'border-blue-400 bg-blue-900/10' : 'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold text-sm">{mission.codename}</h3>
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(mission.status)}`}>
                    {mission.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Priority:</span>
                    <span className={getPriorityColor(mission.priority)}>
                      {mission.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Classification:</span>
                    <span className="text-red-400">{mission.classification}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Progress:</span>
                    <span className="text-blue-400">{mission.progress}%</span>
                  </div>
                </div>
                
                <div className="mt-2 w-full bg-slate-700 rounded-full h-1">
                  <div
                    className="bg-blue-400 h-1 rounded-full transition-all"
                    style={{ width: `${mission.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Details */}
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedMissionData ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-slate-700/30 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {selectedMissionData.codename}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-400 text-sm font-bold">
                      {selectedMissionData.classification}
                    </span>
                    <Lock className="w-4 h-4 text-red-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Status:</span>
                    <span className={`ml-2 ${getStatusColor(selectedMissionData.status).split(' ')[0]}`}>
                      {selectedMissionData.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/60">Priority:</span>
                    <span className={`ml-2 ${getPriorityColor(selectedMissionData.priority)}`}>
                      {selectedMissionData.priority.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/60">Deadline:</span>
                    <span className="text-white ml-2">
                      {selectedMissionData.deadline.toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/60">Progress:</span>
                    <span className="text-blue-400 ml-2">{selectedMissionData.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Briefing */}
              <div className="bg-slate-700/30 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>MISSION BRIEFING</span>
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {selectedMissionData.briefing}
                </p>
              </div>

              {/* Objectives */}
              <div className="bg-slate-700/30 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">OBJECTIVES</h3>
                <ul className="space-y-2">
                  {selectedMissionData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-white/80">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assigned Agents */}
              <div className="bg-slate-700/30 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>ASSIGNED AGENTS</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedMissionData.assignedAgents.map((agent, index) => (
                    <div key={index} className="bg-blue-900/20 rounded p-2">
                      <span className="text-blue-400 text-sm font-medium">{agent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download Brief</span>
                </button>
                <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Report Issue</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-white text-lg font-semibold mb-2">Mission Briefings</h3>
                <p className="text-white/60">Select a mission from the left panel to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}