import React, { useState, useEffect } from 'react';
import { MapPin, Satellite, Radio, AlertTriangle, Globe } from 'lucide-react';

interface IntelPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'threat' | 'asset' | 'intel' | 'surveillance';
  status: 'active' | 'inactive' | 'alert';
  description: string;
  timestamp: Date;
}

export default function WorldMap() {
  const [intelPoints, setIntelPoints] = useState<IntelPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<IntelPoint | null>(null);

  useEffect(() => {
    const generateIntelPoints = () => {
      const points: IntelPoint[] = [
        {
          id: '1',
          lat: 40.7128,
          lng: -74.0060,
          type: 'surveillance',
          status: 'active',
          description: 'NYC Field Office - Active surveillance on target',
          timestamp: new Date()
        },
        {
          id: '2',
          lat: 51.5074,
          lng: -0.1278,
          type: 'intel',
          status: 'alert',
          description: 'London Station - High priority intelligence gathered',
          timestamp: new Date()
        },
        {
          id: '3',
          lat: 35.6762,
          lng: 139.6503,
          type: 'asset',
          status: 'active',
          description: 'Tokyo Asset - Reliable source reporting',
          timestamp: new Date()
        },
        {
          id: '4',
          lat: 55.7558,
          lng: 37.6173,
          type: 'threat',
          status: 'alert',
          description: 'Moscow - Elevated threat level detected',
          timestamp: new Date()
        },
        {
          id: '5',
          lat: 39.9042,
          lng: 116.4074,
          type: 'surveillance',
          status: 'active',
          description: 'Beijing - Monitoring communications',
          timestamp: new Date()
        }
      ];
      setIntelPoints(points);
    };

    generateIntelPoints();
    const interval = setInterval(generateIntelPoints, 30000);

    return () => clearInterval(interval);
  }, []);

  const getPointColor = (type: string, status: string) => {
    if (status === 'alert') return 'text-red-400';
    switch (type) {
      case 'threat': return 'text-red-400';
      case 'asset': return 'text-blue-400';
      case 'intel': return 'text-yellow-400';
      case 'surveillance': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'threat': return AlertTriangle;
      case 'asset': return Satellite;
      case 'intel': return Radio;
      case 'surveillance': return MapPin;
      default: return MapPin;
    }
  };

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-700/50 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Globe className="w-6 h-6 text-blue-400" />
            <span>GLOBAL INTELLIGENCE MAP</span>
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400">LIVE</span>
            </div>
            <span className="text-white/80">
              {intelPoints.length} ACTIVE OPERATIONS
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100%-80px)]">
        {/* Map Area */}
        <div className="flex-1 relative bg-slate-900/50 overflow-hidden">
          {/* World map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-blue-800/20"></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20stroke=%22%23ffffff%22%20stroke-width=%220.5%22%20stroke-opacity=%220.1%22%3E%3Cpath%20d=%22M0%2020h40M20%200v40%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

          {/* Intel Points */}
          {intelPoints.map((point) => {
            const IconComponent = getPointIcon(point.type);
            return (
              <div
                key={point.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${getPointColor(point.type, point.status)} transition-all hover:scale-110`}
                style={{
                  left: `${((point.lng + 180) / 360) * 100}%`,
                  top: `${((90 - point.lat) / 180) * 100}%`,
                }}
                onClick={() => setSelectedPoint(point)}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <IconComponent className="w-5 h-5 animate-pulse" />
                  </div>
                  {point.status === 'alert' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {intelPoints.map((point, index) => {
              if (index === 0) return null;
              const prevPoint = intelPoints[index - 1];
              const x1 = ((prevPoint.lng + 180) / 360) * 100;
              const y1 = ((90 - prevPoint.lat) / 180) * 100;
              const x2 = ((point.lng + 180) / 360) * 100;
              const y2 = ((90 - point.lat) / 180) * 100;
              
              return (
                <line
                  key={`line-${point.id}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>

        {/* Intel Details Panel */}
        <div className="w-80 bg-slate-800/50 border-l border-white/10 p-4 overflow-y-auto">
          <h3 className="text-white font-semibold mb-4">INTELLIGENCE FEEDS</h3>
          
          {selectedPoint ? (
            <div className="space-y-4">
              <div className="bg-slate-700/50 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 text-sm font-medium">
                    {selectedPoint.type.toUpperCase()}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedPoint.status === 'alert' ? 'bg-red-900/20 text-red-400' : 'bg-blue-900/20 text-blue-400'
                  }`}>
                    {selectedPoint.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-white/80 text-sm mb-2">
                  {selectedPoint.description}
                </p>
                <p className="text-blue-400 text-xs">
                  {selectedPoint.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {intelPoints.map((point) => {
                const IconComponent = getPointIcon(point.type);
                return (
                  <div
                    key={point.id}
                    className="bg-slate-700/30 border border-white/10 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => setSelectedPoint(point)}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <IconComponent className={`w-4 h-4 ${getPointColor(point.type, point.status)}`} />
                      <span className="text-white font-medium text-sm">
                        {point.type.toUpperCase()}
                      </span>
                      {point.status === 'alert' && (
                        <span className="text-red-400 text-xs">ALERT</span>
                      )}
                    </div>
                    <p className="text-white/70 text-xs">
                      {point.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}