import React, { useState } from 'react';
import { Key, Shield, Search, Wifi, QrCode, Hash, MapPin, Eye, Wrench } from 'lucide-react';
import PasswordGenerator from '../tools/PasswordGenerator';
import Encryptor from '../tools/Encryptor';
import OSINTTools from '../tools/OSINTTools';
import NetworkScanner from '../tools/NetworkScanner';
import QRCodeTools from '../tools/QRCodeTools';
import HashGenerator from '../tools/HashGenerator';
import IPTracker from '../tools/IPTracker';
import FileAnalyzer from '../tools/FileAnalyzer';

export default function ToolsPanel() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { id: 'password', name: 'Password Generator', icon: Key, component: PasswordGenerator },
    { id: 'encrypt', name: 'Encrypt/Decrypt', icon: Shield, component: Encryptor },
    { id: 'osint', name: 'OSINT Tools', icon: Search, component: OSINTTools },
    { id: 'network', name: 'Network Scanner', icon: Wifi, component: NetworkScanner },
    { id: 'qr', name: 'QR Code Tools', icon: QrCode, component: QRCodeTools },
    { id: 'hash', name: 'Hash Generator', icon: Hash, component: HashGenerator },
    { id: 'ip', name: 'IP Tracker', icon: MapPin, component: IPTracker },
    { id: 'file', name: 'File Analyzer', icon: Eye, component: FileAnalyzer }
  ];

  const ActiveComponent = activeTool ? tools.find(t => t.id === activeTool)?.component : null;

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-slate-700/50 border-b border-white/10 px-4 py-3">
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Wrench className="w-5 h-5 text-blue-400" />
          <span>INTELLIGENCE TOOLS</span>
        </h2>
      </div>

      <div className="flex h-[calc(100%-60px)]">
        {/* Tools Menu */}
        <div className="w-64 bg-slate-800/50 border-r border-white/10 p-4">
          <div className="space-y-2">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    activeTool === tool.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm">{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tool Content */}
        <div className="flex-1 p-4">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Wrench className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-white text-lg font-semibold mb-2">Intelligence Tools</h3>
                <p className="text-white/60">Select a tool from the left panel to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}