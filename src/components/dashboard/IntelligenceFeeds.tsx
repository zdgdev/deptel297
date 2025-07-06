import React, { useState, useEffect } from 'react';
import { Radio, AlertTriangle, Shield, Eye, Satellite } from 'lucide-react';

interface IntelFeed {
  id: string;
  source: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  classification: string;
}

export default function IntelligenceFeeds() {
  const [feeds, setFeeds] = useState<IntelFeed[]>([]);

  useEffect(() => {
    const generateFeeds = () => {
      const sources = ['NSA PRISM', 'HUMINT', 'SIGINT', 'CYBER CMD', 'FIELD OPS'];
      const messages = [
        'Unusual network activity detected in sector 7',
        'Asset reports increased surveillance in target area',
        'Encrypted communications intercepted',
        'Satellite imagery shows suspicious movement',
        'Financial transaction anomaly flagged',
        'Social media chatter indicates potential threat',
        'Border crossing alert triggered',
        'Diplomatic cable intercepted',
        'Cellular tower data shows pattern analysis',
        'Deep cover agent reporting'
      ];

      const newFeeds: IntelFeed[] = Array.from({ length: 8 }, (_, i) => ({
        id: (Date.now() + i).toString(),
        source: sources[Math.floor(Math.random() * sources.length)],
        priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(Date.now() - Math.random() * 3600000),
        classification: ['CONFIDENTIAL', 'SECRET', 'TOP SECRET'][Math.floor(Math.random() * 3)]
      }));

      setFeeds(newFeeds.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    };

    generateFeeds();
    const interval = setInterval(generateFeeds, 15000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return AlertTriangle;
      case 'high': return Shield;
      case 'medium': return Eye;
      case 'low': return Radio;
      default: return Radio;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center space-x-2">
          <Satellite className="w-5 h-5 text-blue-400" />
          <span>INTELLIGENCE FEEDS</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-blue-300 text-sm">LIVE</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {feeds.map((feed) => {
          const IconComponent = getPriorityIcon(feed.priority);
          return (
            <div
              key={feed.id}
              className={`p-3 rounded-lg border transition-all hover:bg-slate-700/30 ${getPriorityColor(feed.priority)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs font-medium">{feed.source}</span>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-slate-900/30">
                  {feed.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-200 mb-2">{feed.message}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{feed.timestamp.toLocaleTimeString()}</span>
                <span className="text-red-400 font-medium">{feed.classification}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}