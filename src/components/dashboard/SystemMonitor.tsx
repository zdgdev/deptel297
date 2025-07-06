import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Wifi, Activity, Server } from 'lucide-react';

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export default function SystemMonitor() {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 20) + 45,
        disk: Math.floor(Math.random() * 10) + 25,
        network: Math.floor(Math.random() * 40) + 30
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number) => {
    if (value > 80) return 'text-red-400';
    if (value > 60) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getBarColor = (value: number) => {
    if (value > 80) return 'bg-red-400';
    if (value > 60) return 'bg-yellow-400';
    return 'bg-blue-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center space-x-2">
          <Server className="w-5 h-5 text-blue-400" />
          <span>SYSTEM MONITOR</span>
        </h3>
        <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
      </div>

      <div className="space-y-4">
        {/* CPU */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-slate-200 text-sm">CPU Usage</span>
            </div>
            <span className={`text-sm font-mono ${getStatusColor(stats.cpu)}`}>
              {stats.cpu}%
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${getBarColor(stats.cpu)}`}
              style={{ width: `${stats.cpu}%` }}
            ></div>
          </div>
        </div>

        {/* Memory */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-blue-400" />
              <span className="text-slate-200 text-sm">Memory</span>
            </div>
            <span className={`text-sm font-mono ${getStatusColor(stats.memory)}`}>
              {stats.memory}%
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${getBarColor(stats.memory)}`}
              style={{ width: `${stats.memory}%` }}
            ></div>
          </div>
        </div>

        {/* Disk */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-blue-400" />
              <span className="text-slate-200 text-sm">Disk I/O</span>
            </div>
            <span className={`text-sm font-mono ${getStatusColor(stats.disk)}`}>
              {stats.disk}%
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${getBarColor(stats.disk)}`}
              style={{ width: `${stats.disk}%` }}
            ></div>
          </div>
        </div>

        {/* Network */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-blue-400" />
              <span className="text-slate-200 text-sm">Network</span>
            </div>
            <span className={`text-sm font-mono ${getStatusColor(stats.network)}`}>
              {stats.network}%
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${getBarColor(stats.network)}`}
              style={{ width: `${stats.network}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-blue-400">Uptime:</span>
            <span className="text-slate-200 ml-1">47d 12h</span>
          </div>
          <div>
            <span className="text-blue-400">Load:</span>
            <span className="text-slate-200 ml-1">1.2, 1.5, 1.8</span>
          </div>
          <div>
            <span className="text-blue-400">Processes:</span>
            <span className="text-slate-200 ml-1">247</span>
          </div>
          <div>
            <span className="text-blue-400">Users:</span>
            <span className="text-slate-200 ml-1">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}