import React, { useState } from 'react';
import { Hash, Copy, CheckCircle } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{[key: string]: string}>({});
  const [copied, setCopied] = useState<string | null>(null);

  const generateHashes = (text: string) => {
    if (!text) {
      setResults({});
      return;
    }

    // Simple hash functions for demo purposes
    const hashes: {[key: string]: string} = {};
    
    // MD5 simulation (not actual MD5)
    hashes.MD5 = btoa(text).replace(/[^a-f0-9]/gi, '').substring(0, 32).padEnd(32, '0');
    
    // SHA-1 simulation
    hashes.SHA1 = btoa(text + 'salt').replace(/[^a-f0-9]/gi, '').substring(0, 40).padEnd(40, '0');
    
    // SHA-256 simulation
    hashes.SHA256 = btoa(text + 'salt256').replace(/[^a-f0-9]/gi, '').substring(0, 64).padEnd(64, '0');
    
    // SHA-512 simulation
    hashes.SHA512 = btoa(text + 'salt512').replace(/[^a-f0-9]/gi, '').substring(0, 128).padEnd(128, '0');
    
    // Simple checksum
    let checksum = 0;
    for (let i = 0; i < text.length; i++) {
      checksum += text.charCodeAt(i);
    }
    hashes.CRC32 = checksum.toString(16).padStart(8, '0');
    
    // Base64
    hashes.Base64 = btoa(text);
    
    setResults(hashes);
  };

  const copyToClipboard = async (hash: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(hash);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const hashAlgorithms = [
    { name: 'MD5', description: '128-bit hash function', color: 'text-red-400' },
    { name: 'SHA1', description: '160-bit hash function', color: 'text-orange-400' },
    { name: 'SHA256', description: '256-bit hash function', color: 'text-green-400' },
    { name: 'SHA512', description: '512-bit hash function', color: 'text-blue-400' },
    { name: 'CRC32', description: '32-bit checksum', color: 'text-purple-400' },
    { name: 'Base64', description: 'Base64 encoding', color: 'text-yellow-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Hash className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">Hash Generator</h2>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-green-300 text-sm">Text to Hash</label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            generateHashes(e.target.value);
          }}
          className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500 h-24 resize-none"
          placeholder="Enter text to generate hashes..."
        />
      </div>

      {/* Hash Results */}
      {Object.keys(results).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-green-400 font-medium">Generated Hashes</h3>
          
          {hashAlgorithms.map((algo) => {
            const hash = results[algo.name];
            if (!hash) return null;
            
            return (
              <div key={algo.name} className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${algo.color}`}>{algo.name}</span>
                    <span className="text-green-300 text-sm">({algo.description})</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(algo.name, hash)}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    {copied === algo.name ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="bg-black border border-green-700 rounded p-3 font-mono text-sm text-green-400 break-all">
                  {hash}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hash Comparison */}
      <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
        <h3 className="text-green-400 font-medium mb-3">Hash Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-green-300 text-sm">Hash 1</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500 font-mono text-sm"
              placeholder="Paste hash to compare..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-green-300 text-sm">Hash 2</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500 font-mono text-sm"
              placeholder="Paste hash to compare..."
            />
          </div>
        </div>
        <div className="mt-3 text-center">
          <span className="text-green-300 text-sm">Hashes match: </span>
          <span className="text-gray-400 text-sm">Enter hashes to compare</span>
        </div>
      </div>

      {/* File Hash */}
      <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
        <h3 className="text-green-400 font-medium mb-3">File Hash</h3>
        <div className="border-2 border-dashed border-green-700 rounded-lg p-6 text-center">
          <input
            type="file"
            className="hidden"
            id="file-hash"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // In a real implementation, you would read the file and hash it
                console.log('File selected:', file.name);
              }
            }}
          />
          <label htmlFor="file-hash" className="cursor-pointer">
            <Hash className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400">Click to select file for hashing</p>
            <p className="text-green-300 text-sm">Supports all file types</p>
          </label>
        </div>
      </div>

      {/* Note */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
        <p className="text-yellow-400 text-sm">
          <strong>Note:</strong> This is a demo implementation. For production use, 
          implement proper cryptographic hash functions using libraries like crypto-js or WebCrypto API.
        </p>
      </div>
    </div>
  );
}