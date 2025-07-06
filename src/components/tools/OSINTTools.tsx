import React, { useState } from 'react';
import { Search, User, Mail, Globe, ExternalLink } from 'lucide-react';

export default function OSINTTools() {
  const [searchType, setSearchType] = useState<'username' | 'email' | 'domain'>('username');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchSources = {
    username: [
      { name: 'GitHub', url: 'https://github.com/', icon: '🐙' },
      { name: 'Twitter', url: 'https://twitter.com/', icon: '🐦' },
      { name: 'Instagram', url: 'https://instagram.com/', icon: '📷' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/', icon: '💼' },
      { name: 'Reddit', url: 'https://reddit.com/user/', icon: '🔍' },
      { name: 'TikTok', url: 'https://tiktok.com/@', icon: '🎵' }
    ],
    email: [
      { name: 'HaveIBeenPwned', url: 'https://haveibeenpwned.com/account/', icon: '🔒' },
      { name: 'Hunter.io', url: 'https://hunter.io/search/', icon: '🎯' },
      { name: 'Skype Resolver', url: 'https://skype-resolver.com/', icon: '📞' },
      { name: 'Gravatar', url: 'https://gravatar.com/', icon: '👤' }
    ],
    domain: [
      { name: 'WHOIS', url: 'https://whois.net/', icon: '🌐' },
      { name: 'DNS Lookup', url: 'https://dnslookup.org/', icon: '🔍' },
      { name: 'SSL Certificate', url: 'https://crt.sh/', icon: '🔐' },
      { name: 'Wayback Machine', url: 'https://web.archive.org/web/*/', icon: '⏰' }
    ]
  };

  const performSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const sources = searchSources[searchType];
    const searchResults = sources.map(source => ({
      ...source,
      fullUrl: source.url + encodeURIComponent(query),
      status: Math.random() > 0.3 ? 'found' : 'not_found', // Simulate results
      data: Math.random() > 0.5 ? generateMockData(searchType) : null
    }));

    setResults(searchResults);
    setLoading(false);
  };

  const generateMockData = (type: string) => {
    switch (type) {
      case 'username':
        return {
          profile: 'Active profile found',
          followers: Math.floor(Math.random() * 10000),
          posts: Math.floor(Math.random() * 500),
          joined: '2021-03-15'
        };
      case 'email':
        return {
          breaches: Math.floor(Math.random() * 5),
          lastBreach: '2023-01-15',
          verified: Math.random() > 0.5
        };
      case 'domain':
        return {
          registrar: 'Example Registrar',
          created: '2020-01-01',
          expires: '2025-01-01',
          country: 'US'
        };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Search className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">OSINT Tools</h2>
      </div>

      {/* Search Type Selection */}
      <div className="flex space-x-1 bg-green-900/20 p-1 rounded-lg">
        <button
          onClick={() => setSearchType('username')}
          className={`flex-1 py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 ${
            searchType === 'username' ? 'bg-green-700 text-black' : 'text-green-400 hover:bg-green-900/20'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Username</span>
        </button>
        <button
          onClick={() => setSearchType('email')}
          className={`flex-1 py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 ${
            searchType === 'email' ? 'bg-green-700 text-black' : 'text-green-400 hover:bg-green-900/20'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </button>
        <button
          onClick={() => setSearchType('domain')}
          className={`flex-1 py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 ${
            searchType === 'domain' ? 'bg-green-700 text-black' : 'text-green-400 hover:bg-green-900/20'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Domain</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500"
          placeholder={`Enter ${searchType} to search...`}
          onKeyPress={(e) => e.key === 'Enter' && performSearch()}
        />
        <button
          onClick={performSearch}
          disabled={loading || !query.trim()}
          className="bg-green-700 text-black px-6 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="bg-green-900/20 border border-green-700 rounded p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-2"></div>
            <p className="text-green-400">Searching intelligence databases...</p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-green-400 font-medium">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded border transition-all ${
                  result.status === 'found' 
                    ? 'bg-green-900/20 border-green-700' 
                    : 'bg-gray-900/20 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{result.icon}</span>
                    <span className="text-green-400 font-medium">{result.name}</span>
                  </div>
                  <a
                    href={result.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="text-sm">
                  <div className={`mb-1 ${
                    result.status === 'found' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {result.status === 'found' ? '✓ Found' : '✗ Not found'}
                  </div>
                  
                  {result.data && (
                    <div className="text-green-300 text-xs space-y-1">
                      {Object.entries(result.data).map(([key, value]) => (
                        <div key={key}>
                          <span className="capitalize">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-red-900/20 border border-red-700 rounded p-3">
        <p className="text-red-400 text-sm">
          <strong>DISCLAIMER:</strong> These tools are for educational purposes only. 
          Always ensure you have proper authorization before conducting any intelligence gathering activities.
        </p>
      </div>
    </div>
  );
}