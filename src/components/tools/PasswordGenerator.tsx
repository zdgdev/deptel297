import React, { useState } from 'react';
import { Copy, RefreshCw, CheckCircle, Key } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const getStrengthColor = (length: number) => {
    if (length < 8) return 'bg-red-400';
    if (length < 12) return 'bg-yellow-400';
    if (length < 16) return 'bg-orange-400';
    return 'bg-green-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Key className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">Password Generator</h2>
      </div>

      {/* Password Output */}
      <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-400 text-sm font-medium">Generated Password</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={generatePassword}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={copyToClipboard}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="bg-black border border-green-700 rounded p-3 font-mono text-green-400 text-lg break-all">
          {password || 'Click generate to create password'}
        </div>
      </div>

      {/* Password Length */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-green-300 text-sm">Length: {length}</label>
          <div className="flex items-center space-x-2">
            <span className="text-green-400 text-xs">Strength:</span>
            <div className={`w-20 h-2 rounded-full ${getStrengthColor(length)}`}></div>
          </div>
        </div>
        <input
          type="range"
          min="4"
          max="128"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Options */}
      <div className="space-y-3">
        <h3 className="text-green-400 font-medium">Options</h3>
        <div className="space-y-2">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="w-4 h-4 text-green-400 bg-black border-green-700 rounded focus:ring-green-500"
              />
              <span className="text-green-300 text-sm">
                {key === 'uppercase' && 'Uppercase Letters (A-Z)'}
                {key === 'lowercase' && 'Lowercase Letters (a-z)'}
                {key === 'numbers' && 'Numbers (0-9)'}
                {key === 'symbols' && 'Symbols (!@#$%^&*)'}
                {key === 'excludeSimilar' && 'Exclude Similar Characters (il1Lo0O)'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="w-full bg-green-700 text-black py-3 px-4 rounded font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
      >
        <RefreshCw className="w-5 h-5" />
        <span>Generate Password</span>
      </button>
    </div>
  );
}