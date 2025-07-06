import React, { useState } from 'react';
import { Eye, FileText, AlertTriangle, Upload, Download } from 'lucide-react';

interface FileAnalysis {
  name: string;
  size: number;
  type: string;
  lastModified: Date;
  hash: string;
  entropy: number;
  threat: {
    level: 'safe' | 'suspicious' | 'malicious';
    score: number;
    reasons: string[];
  };
  metadata: {[key: string]: any};
}

export default function FileAnalyzer() {
  const [analysis, setAnalysis] = useState<FileAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const analyzeFile = async (file: File) => {
    setLoading(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockAnalysis: FileAnalysis = {
      name: file.name,
      size: file.size,
      type: file.type || 'unknown',
      lastModified: new Date(file.lastModified),
      hash: 'sha256:' + Math.random().toString(36).substring(2, 66),
      entropy: Math.random() * 8,
      threat: {
        level: Math.random() > 0.8 ? 'malicious' : Math.random() > 0.6 ? 'suspicious' : 'safe',
        score: Math.floor(Math.random() * 100),
        reasons: [
          'File signature matches known pattern',
          'Entropy level within normal range',
          'No suspicious metadata detected'
        ].filter(() => Math.random() > 0.5)
      },
      metadata: {
        'File Extension': file.name.split('.').pop()?.toUpperCase() || 'NONE',
        'Created': new Date().toISOString(),
        'Modified': new Date(file.lastModified).toISOString(),
        'MIME Type': file.type || 'application/octet-stream'
      }
    };
    
    setAnalysis(mockAnalysis);
    setLoading(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      analyzeFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      analyzeFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'malicious': return 'text-red-400 bg-red-900/20 border-red-700';
      case 'suspicious': return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'safe': return 'text-green-400 bg-green-900/20 border-green-700';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Eye className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">File Analyzer</h2>
      </div>

      {/* File Upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver 
            ? 'border-green-400 bg-green-900/10' 
            : 'border-green-700 hover:border-green-600'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="file-analyzer"
        />
        <label htmlFor="file-analyzer" className="cursor-pointer">
          <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-green-400 text-lg font-medium mb-2">
            Upload File for Analysis
          </h3>
          <p className="text-green-300 text-sm">
            Drag and drop or click to select a file
          </p>
          <p className="text-green-400 text-xs mt-2">
            Supports all file types • Max size: 100MB
          </p>
        </label>
      </div>

      {/* Analysis Progress */}
      {loading && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
            <div className="flex-1">
              <h3 className="text-green-400 font-medium">Analyzing File...</h3>
              <p className="text-green-300 text-sm">
                Running security scans and extracting metadata
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full w-1/3 animate-pulse"></div>
            </div>
            <div className="text-xs text-green-400">
              Scanning for threats and extracting file signatures...
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          {/* Threat Assessment */}
          <div className={`border rounded-lg p-4 ${getThreatColor(analysis.threat.level)}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Threat Assessment</span>
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Risk Level:</span>
                <span className="font-medium">{analysis.threat.level.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <span>Threat Score:</span>
                <span className="ml-2 font-mono">{analysis.threat.score}/100</span>
              </div>
              <div>
                <span>File Entropy:</span>
                <span className="ml-2 font-mono">{analysis.entropy.toFixed(2)}</span>
              </div>
            </div>
            
            {analysis.threat.reasons.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Analysis Details:</h4>
                <ul className="text-sm space-y-1">
                  {analysis.threat.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* File Information */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-3 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>File Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-green-300">File Name:</span>
                  <span className="text-green-400 ml-2 break-all">{analysis.name}</span>
                </div>
                <div>
                  <span className="text-green-300">File Size:</span>
                  <span className="text-green-400 ml-2">{formatFileSize(analysis.size)}</span>
                </div>
                <div>
                  <span className="text-green-300">File Type:</span>
                  <span className="text-green-400 ml-2">{analysis.type}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-green-300">Last Modified:</span>
                  <span className="text-green-400 ml-2">
                    {analysis.lastModified.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-green-300">Hash:</span>
                  <span className="text-green-400 ml-2 font-mono text-xs break-all">
                    {analysis.hash}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-3">File Metadata</h3>
            
            <div className="space-y-2 text-sm">
              {Object.entries(analysis.metadata).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-green-300">{key}:</span>
                  <span className="text-green-400 font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-green-700 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span>Report Malware</span>
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
        <p className="text-yellow-400 text-sm">
          <strong>Note:</strong> This is a demo file analyzer. For production use, implement proper 
          antivirus scanning, sandboxing, and file signature analysis. Never execute untrusted files.
        </p>
      </div>
    </div>
  );
}