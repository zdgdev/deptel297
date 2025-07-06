import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle, Lock, Globe, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(credentials);
      if (!success) {
        setError('Invalid credentials. Access denied.');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>

      <div className="relative z-10 max-w-md w-full mx-auto px-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* CIA Header */}
          <div className="text-center mb-8">
            {/* CIA Seal */}
            <div className="relative mx-auto mb-6 w-24 h-24">
              <img 
                src="/cialogo.png" 
                alt="CIA Logo" 
                className="w-full h-full rounded-full shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2 text-white">
              CENTRAL INTELLIGENCE AGENCY
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-blue-300" />
              <p className="text-blue-200 text-sm font-medium">DEPTEL 297/279</p>
            </div>
            <p className="text-blue-100 text-sm">Intelligence Monitoring System</p>
            
            {/* Security Badge */}
            <div className="inline-flex items-center space-x-2 mt-4 px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full">
              <Zap className="w-3 h-3 text-red-400" />
              <span className="text-red-300 text-xs font-medium">CLASSIFIED ACCESS</span>
            </div>
          </div>

          {/* Security Warning */}
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-3 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-400 mr-2 flex-shrink-0" />
              <div>
                <p className="text-amber-200 text-sm font-medium">RESTRICTED SYSTEM</p>
                <p className="text-amber-300 text-xs">Authorized Personnel Only</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Agent Identification
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                placeholder="Enter agent ID"
                required
              />
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Security Clearance Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all pr-12"
                  placeholder="Enter clearance code"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                'ACCESS SYSTEM'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-blue-300/80 space-y-1">
            <p>This system is monitored and recorded for security purposes.</p>
            <p>Unauthorized access is strictly prohibited and punishable by law.</p>
            <div className="flex items-center justify-center space-x-2 mt-3 pt-3 border-t border-white/10">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-400 font-medium">CLASSIFICATION: TOP SECRET</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}