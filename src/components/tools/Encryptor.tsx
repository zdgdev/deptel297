import React, { useState } from 'react';
import { Shield, Lock, Unlock, Copy, CheckCircle } from 'lucide-react';

export default function Encryptor() {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [key, setKey] = useState('');
  const [copied, setCopied] = useState(false);

  // Simple XOR encryption/decryption for demo purposes
  const xorEncrypt = (text: string, key: string) => {
    if (!text || !key) return '';
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); // Base64 encode
  };

  const xorDecrypt = (encrypted: string, key: string) => {
    if (!encrypted || !key) return '';
    
    try {
      const decoded = atob(encrypted); // Base64 decode
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return result;
    } catch (e) {
      return 'Invalid encrypted data';
    }
  };

  const processText = () => {
    if (!input || !key) return;
    
    if (mode === 'encrypt') {
      setOutput(xorEncrypt(input, key));
    } else {
      setOutput(xorDecrypt(input, key));
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setKey(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">Encrypt/Decrypt Tool</h2>
      </div>

      {/* Mode Selection */}
      <div className="flex space-x-1 bg-green-900/20 p-1 rounded-lg">
        <button
          onClick={() => setMode('encrypt')}
          className={`flex-1 py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 ${
            mode === 'encrypt' ? 'bg-green-700 text-black' : 'text-green-400 hover:bg-green-900/20'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Encrypt</span>
        </button>
        <button
          onClick={() => setMode('decrypt')}
          className={`flex-1 py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 ${
            mode === 'decrypt' ? 'bg-green-700 text-black' : 'text-green-400 hover:bg-green-900/20'
          }`}
        >
          <Unlock className="w-4 h-4" />
          <span>Decrypt</span>
        </button>
      </div>

      {/* Encryption Key */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-green-300 text-sm">Encryption Key</label>
          <button
            onClick={generateKey}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            Generate Key
          </button>
        </div>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500"
          placeholder="Enter encryption key..."
        />
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-green-300 text-sm">
          {mode === 'encrypt' ? 'Text to Encrypt' : 'Text to Decrypt'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500 h-32 resize-none"
          placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter encrypted text...'}
        />
      </div>

      {/* Process Button */}
      <button
        onClick={processText}
        disabled={!input || !key}
        className="w-full bg-green-700 text-black py-3 px-4 rounded font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {mode === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
        <span>{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</span>
      </button>

      {/* Output */}
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-green-300 text-sm">
              {mode === 'encrypt' ? 'Encrypted Text' : 'Decrypted Text'}
            </label>
            <button
              onClick={copyToClipboard}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="bg-green-900/20 border border-green-700 rounded p-3 font-mono text-green-400 text-sm break-all max-h-32 overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}