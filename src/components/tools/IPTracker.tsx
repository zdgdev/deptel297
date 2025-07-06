import React, { useState } from 'react';
import { MapPin, Search, Globe, Shield, AlertTriangle } from 'lucide-react';

interface IPInfo {
  ip: string;
  country: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
  isp: string;
  org: string;
  as: string;
  timezone: string;
  threat: {
    level: 'low' | 'medium' | 'high';
    type: string[];
    score: number;
  };
}

export default function IPTracker() {
  const [ipInput, setIpInput] = useState('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupIP = async () => {
    if (!ipInput.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock IP information
      const mockInfo: IPInfo = {
        ip: ipInput,
        country: 'United States',
        region: 'California',
        city: 'San Francisco',
        lat: 37.7749,
        lon: -122.4194,
        isp: 'Cloudflare, Inc.',
        org: 'Cloudflare',
        as: 'AS13335 Cloudflare, Inc.',
        timezone: 'America/Los_Angeles',
        threat: {
          level: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
          type: ['malware', 'phishing', 'botnet'].filter(() => Math.random() > 0.7),
          score: Math.floor(Math.random() * 100)
        }
      };
      
      setIpInfo(mockInfo);
    } catch (err) {
      setError('Failed to lookup IP address');
    } finally {
      setLoading(false);
    }
  };

  const getMyIP = async () => {
    setIpInput('8.8.8.8'); // Demo IP
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIpInput('203.0.113.1'); // Mock current IP
    } catch (err) {
      setError('Failed to get current IP');
    } finally {
      setLoading(false);
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <MapPin className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">IP Address Tracker</h2>
      </div>

      {/* IP Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
          className="flex-1 px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500 font-mono"
          placeholder="Enter IP address (e.g., 8.8.8.8)"
          onKeyPress={(e) => e.key === 'Enter' && lookupIP()}
        />
        <button
          onClick={lookupIP}
          disabled={loading || !ipInput.trim()}
          className="bg-green-700 text-black px-6 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Lookup</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <button
          onClick={getMyIP}
          className="text-green-400 hover:text-green-300 text-sm border border-green-700 px-3 py-1 rounded"
        >
          Get My IP
        </button>
        <button
          onClick={() => setIpInput('8.8.8.8')}
          className="text-green-400 hover:text-green-300 text-sm border border-green-700 px-3 py-1 rounded"
        >
          Google DNS
        </button>
        <button
          onClick={() => setIpInput('1.1.1.1')}
          className="text-green-400 hover:text-green-300 text-sm border border-green-700 px-3 py-1 rounded"
        >
          Cloudflare DNS
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-green-900/20 border border-green-700 rounded p-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
            <span className="text-green-400">Looking up IP information...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* IP Information */}
      {ipInfo && (
        <div className="space-y-4">
          {/* Threat Assessment */}
          <div className={`border rounded-lg p-4 ${getThreatColor(ipInfo.threat.level)}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Threat Assessment</span>
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Risk Level:</span>
                <span className="font-medium">{ipInfo.threat.level.toUpperCase()}</span>
                {ipInfo.threat.level === 'high' && <AlertTriangle className="w-4 h-4" />}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span>Threat Score:</span>
                <span className="ml-2 font-mono">{ipInfo.threat.score}/100</span>
              </div>
              <div>
                <span>Known Threats:</span>
                <span className="ml-2">
                  {ipInfo.threat.type.length > 0 ? ipInfo.threat.type.join(', ') : 'None detected'}
                </span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Location Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-green-300">IP Address:</span>
                  <span className="text-green-400 ml-2 font-mono">{ipInfo.ip}</span>
                </div>
                <div>
                  <span className="text-green-300">Country:</span>
                  <span className="text-green-400 ml-2">{ipInfo.country}</span>
                </div>
                <div>
                  <span className="text-green-300">Region:</span>
                  <span className="text-green-400 ml-2">{ipInfo.region}</span>
                </div>
                <div>
                  <span className="text-green-300">City:</span>
                  <span className="text-green-400 ml-2">{ipInfo.city}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-green-300">Latitude:</span>
                  <span className="text-green-400 ml-2 font-mono">{ipInfo.lat}</span>
                </div>
                <div>
                  <span className="text-green-300">Longitude:</span>
                  <span className="text-green-400 ml-2 font-mono">{ipInfo.lon}</span>
                </div>
                <div>
                  <span className="text-green-300">Timezone:</span>
                  <span className="text-green-400 ml-2">{ipInfo.timezone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network Information */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-3">Network Information</h3>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-green-300">ISP:</span>
                <span className="text-green-400 ml-2">{ipInfo.isp}</span>
              </div>
              <div>
                <span className="text-green-300">Organization:</span>
                <span className="text-green-400 ml-2">{ipInfo.org}</span>
              </div>
              <div>
                <span className="text-green-300">ASN:</span>
                <span className="text-green-400 ml-2 font-mono">{ipInfo.as}</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-3">Geographic Location</h3>
            <div className="bg-black border border-green-700 rounded h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-green-400 mx-auto mb-2 opacity-50" />
                <p className="text-green-400">Map visualization</p>
                <p className="text-green-300 text-sm">
                  Lat: {ipInfo.lat}, Lon: {ipInfo.lon}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
        <p className="text-yellow-400 text-sm">
          <strong>Note:</strong> IP geolocation is approximate and may not reflect the actual physical location. 
          This tool is for educational purposes only.
        </p>
      </div>
    </div>
  );
}