import React, { useState, useEffect } from 'react';
import { Shield, Wifi, Database, Lock, Globe, Zap, Eye } from 'lucide-react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Initializing secure connection...',
    'Verifying CIA network access...',
    'Loading intelligence databases...',
    'Establishing encrypted channels...',
    'Synchronizing global surveillance...',
    'Access granted. Welcome to DEPTEL 297/279'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-blue-800/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        {/* CIA Logo */}
        <div className="mb-8">
          <div className="relative mx-auto mb-6 w-32 h-32">
            <img 
              src="/cialogo.png" 
              alt="CIA Logo" 
              className="w-full h-full rounded-full shadow-2xl animate-pulse"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-300/30 animate-spin"></div>
          </div>
          
          <h1 className="text-4xl font-bold mb-3 text-white">
            CENTRAL INTELLIGENCE AGENCY
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Globe className="w-5 h-5 text-blue-300" />
            <p className="text-xl text-blue-200 font-medium">DEPTEL 297/279</p>
          </div>
          <p className="text-lg text-blue-100 mt-2">Intelligence Monitoring System</p>
          
          {/* Classification Banner */}
          <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
            <Zap className="w-4 h-4 text-red-400" />
            <span className="text-red-300 font-medium">TOP SECRET CLEARANCE</span>
          </div>
        </div>

        {/* Status Icons */}
        <div className="flex justify-center space-x-12 mb-8">
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
              progress > 25 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
            }`}>
              <Wifi className={`w-6 h-6 ${progress > 25 ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <span className="text-sm text-blue-200">Network</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
              progress > 50 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
            }`}>
              <Database className={`w-6 h-6 ${progress > 50 ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <span className="text-sm text-blue-200">Database</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
              progress > 75 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-slate-700'
            }`}>
              <Eye className={`w-6 h-6 ${progress > 75 ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <span className="text-sm text-blue-200">Surveillance</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-slate-700/50 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-blue-200 text-xl font-medium">{progress}%</p>
        </div>

        {/* Loading Steps */}
        <div className="space-y-3 text-left max-w-md mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center transition-all duration-300 ${
              index <= currentStep ? 'text-blue-200' : 'text-slate-500'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                index < currentStep ? 'bg-blue-400' : index === currentStep ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'
              }`}></div>
              <span className={`text-sm ${index === currentStep ? 'animate-pulse' : ''}`}>{step}</span>
              {index < currentStep && <span className="ml-auto text-blue-400 text-sm">✓</span>}
            </div>
          ))}
        </div>

        {/* Classification Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-red-400 text-sm font-bold">CLASSIFIED - TOP SECRET</p>
          </div>
          <p className="text-blue-300 text-xs">Authorized Personnel Only • All Activities Monitored</p>
        </div>
      </div>
    </div>
  );
}