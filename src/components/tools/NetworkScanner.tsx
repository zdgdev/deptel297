import React, { useState } from 'react';
import { Wifi, Activity, AlertTriangle } from 'lucide-react';

interface ScanResult {
  ip: string;
  hostname: string;
  ports: { port: number; service: string; status: 'open' | 'closed' | 'filtered' }[];
  os: string;
  mac: string;
}

export default function NetworkScanner() {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState<'quick' | 'full' | 'stealth'>('quick');
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const performScan = async () => {
    if (!target.trim()) return;

    setScanning(true);
    setResults([]);
    setProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate scan delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Generate mock results
    const mockResults: ScanResult[] = [
      {
        ip: '192.168.1.1',
        hostname: 'router.local',
        ports: [
          { port: 22, service: 'SSH', status: 'open' },
          { port: 80, service: 'HTTP', status: 'open' },
          { port: 443, service: 'HTTPS', status: 'open' },
          { port: 23, service: 'Telnet', status: 'filtered' }
        ],
        os: 'Linux 4.x',
        mac: '00:1B:44:11:3A:B7'
      },
      {
        ip: '192.168.1.100',
        hostname: 'desktop.local',
        ports: [
          { port: 135, service: 'RPC', status: 'open' },
          { port: 445, service: 'SMB', status: 'open' },
          { port: 3389, service: 'RDP', status: 'closed' }
        ],
        os: 'Windows 10',
        mac: '00:1A:2B:3C:4D:5E'
      },
      {
        ip: '192.168.1.101',
        hostname: 'printer.local',
        ports: [
          { port: 80, service: 'HTTP', status: 'open' },
          { port: 443, service: 'HTTPS', status: 'open' },
          { port: 9100, service: 'JetDirect', status: 'open' }
        ],
        os: 'Embedded Linux',
        mac: '00:11:22:33:44:55'
      }
    ];

    setResults(mockResults);
    setScanning(false);
    clearInterval(progressInterval);
  };

  const getPortColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'filtered': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getVulnerabilityRisk = (ports: any[]) => {
    const riskyPorts = [21, 22, 23, 135, 139, 445, 3389];
    const openRiskyPorts = ports.filter(p => p.status === 'open' && riskyPorts.includes(p.port));
    
    if (openRiskyPorts.length > 2) return 'High';
    if (openRiskyPorts.length > 0) return 'Medium';
    return 'Low';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Wifi className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">Network Scanner</h2>
      </div>

      {/* Scan Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-green-300 text-sm">Target (IP/Range/Hostname)</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500"
            placeholder="192.168.1.0/24 or example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-green-300 text-sm">Scan Type</label>
          <select
            value={scanType}
            onChange={(e) => setScanType(e.target.value as any)}
            className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500"
          >
            <option value="quick">Quick Scan (Common Ports)</option>
            <option value="full">Full Scan (All Ports)</option>
            <option value="stealth">Stealth Scan (SYN)</option>
          </select>
        </div>
      </div>

      {/* Scan Button */}
      <button
        onClick={performScan}
        disabled={scanning || !target.trim()}
        className="w-full bg-green-700 text-black py-3 px-4 rounded font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Activity className="w-5 h-5" />
        <span>{scanning ? 'Scanning...' : 'Start Scan'}</span>
      </button>

      {/* Progress Bar */}
      {scanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-300">Scanning network...</span>
            <span className="text-green-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-green-400 font-medium">Scan Results ({results.length} hosts found)</h3>
          
          {results.map((result, index) => (
            <div key={index} className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium">{result.hostname}</span>
                  <span className="text-green-300 text-sm">({result.ip})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-300 text-sm">Risk:</span>
                  <span className={`text-sm font-medium ${getRiskColor(getVulnerabilityRisk(result.ports))}`}>
                    {getVulnerabilityRisk(result.ports)}
                  </span>
                  {getVulnerabilityRisk(result.ports) === 'High' && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="text-sm">
                  <span className="text-green-300">OS:</span>
                  <span className="text-green-400 ml-2">{result.os}</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-300">MAC:</span>
                  <span className="text-green-400 ml-2 font-mono">{result.mac}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-green-400 text-sm font-medium">Open Ports:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {result.ports.map((port, portIndex) => (
                    <div
                      key={portIndex}
                      className={`text-xs p-2 rounded border ${
                        port.status === 'open' ? 'bg-green-900/20 border-green-700' : 'bg-gray-900/20 border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">{port.port}</span>
                        <span className={getPortColor(port.status)}>
                          {port.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-green-300 truncate">{port.service}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-red-900/20 border border-red-700 rounded p-3">
        <p className="text-red-400 text-sm">
          <strong>WARNING:</strong> Only scan networks you own or have explicit permission to test. 
          Unauthorized network scanning may be illegal in your jurisdiction.
        </p>
      </div>
    </div>
  );
}