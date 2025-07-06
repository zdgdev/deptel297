import React, { useState, useEffect } from 'react';
import { User, MapPin, Phone, Clock, Activity, Eye, Users } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  codename: string;
  location: string;
  status: 'active' | 'standby' | 'offline' | 'deep_cover';
  lastContact: Date;
  mission: string;
  clearance: string;
}

export default function AgentPanel() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const generateAgents = () => {
      const codenames = ['NIGHTFALL', 'PHOENIX', 'SHADOW', 'VIPER', 'RAVEN', 'GHOST'];
      const locations = ['London', 'Moscow', 'Beijing', 'Tokyo', 'Berlin', 'Paris'];
      const missions = [
        'Operation BLACKBIRD',
        'Asset Protection',
        'Intelligence Gathering',
        'Counter-Intelligence',
        'Surveillance',
        'Deep Cover'
      ];

      const newAgents: Agent[] = Array.from({ length: 6 }, (_, i) => ({
        id: `agent-${i + 1}`,
        name: `Agent ${String.fromCharCode(65 + i)}`,
        codename: codenames[i],
        location: locations[i],
        status: ['active', 'standby', 'offline', 'deep_cover'][Math.floor(Math.random() * 4)] as any,
        lastContact: new Date(Date.now() - Math.random() * 86400000),
        mission: missions[Math.floor(Math.random() * missions.length)],
        clearance: ['SECRET', 'TOP SECRET'][Math.floor(Math.random() * 2)]
      }));

      setAgents(newAgents);
    };

    generateAgents();
    const interval = setInterval(generateAgents, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'standby': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'offline': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'deep_cover': return 'text-purple-400 bg-purple-900/20 border-purple-500/30';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Activity;
      case 'standby': return Clock;
      case 'offline': return User;
      case 'deep_cover': return Eye;
      default: return User;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-400" />
          <span>FIELD AGENTS</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-blue-300 text-sm">TRACKING</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {agents.map((agent) => {
          const StatusIcon = getStatusIcon(agent.status);
          return (
            <div
              key={agent.id}
              className={`p-3 rounded-lg border transition-all hover:bg-slate-700/30 cursor-pointer ${getStatusColor(agent.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{agent.codename}</span>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-slate-900/30">
                  {agent.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span className="text-slate-200">{agent.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span className="text-slate-200">{agent.lastContact.toLocaleString()}</span>
                </div>
                <div className="text-slate-100 font-medium">
                  {agent.mission}
                </div>
                <div className="text-red-400 font-medium">
                  {agent.clearance}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}