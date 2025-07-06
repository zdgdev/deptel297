import React from 'react';
import { LogOut, Globe, Clock, Zap, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  userProfile: any;
  currentTime: Date;
}

export default function Header({ userProfile, currentTime }: HeaderProps) {
  const { logout } = useAuth();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      timeZoneName: 'short' 
    });
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* CIA Logo */}
          <div className="relative">
            <img 
              src="/cialogo.png" 
              alt="CIA Logo" 
              className="w-12 h-12 rounded-full shadow-lg"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <Zap className="w-2 h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CIA DEPTEL 297/279</h1>
            <p className="text-slate-300 text-sm">Intelligence Monitoring System</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* World Clock */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">LOCAL:</span>
              <span className="text-white font-mono">{formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">UTC:</span>
              <span className="text-white font-mono">
                {new Date().toLocaleTimeString('en-US', { 
                  hour12: false, 
                  timeZone: 'UTC' 
                })}
              </span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-medium">{userProfile?.name}</p>
              <p className="text-slate-300 text-sm">{userProfile?.rank}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* Security Status */}
      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span className="text-slate-300">SECURITY STATUS: </span>
          <span className="text-green-400 font-medium">ACTIVE</span>
          <span className="text-slate-300">CLEARANCE: </span>
          <span className="text-red-400 font-bold">{userProfile?.clearanceLevel}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-400">SECURE CONNECTION ESTABLISHED</span>
        </div>
      </div>
    </header>
  );
}