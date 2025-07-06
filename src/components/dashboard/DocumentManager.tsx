import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Eye, 
  Lock, 
  Folder, 
  Plus,
  Search,
  Filter,
  Star,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP SECRET';
  uploadDate: Date;
  lastModified: Date;
  folder: string;
  starred: boolean;
  content?: string;
}

interface Folder {
  id: string;
  name: string;
  classification: string;
  documentCount: number;
}

export default function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Operation_Blackbird_Brief.pdf',
      type: 'pdf',
      size: 2048576,
      classification: 'TOP SECRET',
      uploadDate: new Date('2024-01-15'),
      lastModified: new Date('2024-01-15'),
      folder: 'Operations',
      starred: true
    },
    {
      id: '2',
      name: 'Asset_Report_7742.docx',
      type: 'docx',
      size: 1024000,
      classification: 'SECRET',
      uploadDate: new Date('2024-01-14'),
      lastModified: new Date('2024-01-14'),
      folder: 'Intelligence',
      starred: false
    },
    {
      id: '3',
      name: 'Surveillance_Photos_Moscow.zip',
      type: 'zip',
      size: 15728640,
      classification: 'CONFIDENTIAL',
      uploadDate: new Date('2024-01-13'),
      lastModified: new Date('2024-01-13'),
      folder: 'Surveillance',
      starred: false
    }
  ]);

  const [folders] = useState<Folder[]>([
    { id: '1', name: 'Operations', classification: 'TOP SECRET', documentCount: 12 },
    { id: '2', name: 'Intelligence', classification: 'SECRET', documentCount: 8 },
    { id: '3', name: 'Surveillance', classification: 'CONFIDENTIAL', documentCount: 15 },
    { id: '4', name: 'Communications', classification: 'SECRET', documentCount: 6 }
  ]);

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDoc: Document = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.name.split('.').pop() || 'unknown',
          size: file.size,
          classification: 'CONFIDENTIAL',
          uploadDate: new Date(),
          lastModified: new Date(),
          folder: selectedFolder || 'General',
          starred: false
        };
        setDocuments(prev => [...prev, newDoc]);
      });
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const toggleStar = (id: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, starred: !doc.starred } : doc
    ));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'SECRET': return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
      case 'CONFIDENTIAL': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'UNCLASSIFIED': return 'text-green-400 bg-green-900/20 border-green-500/30';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx':
      case 'doc': return '📝';
      case 'zip':
      case 'rar': return '📦';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      case 'mp4':
      case 'avi': return '🎥';
      default: return '📄';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = !selectedFolder || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="h-full bg-slate-900/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Document Management System</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">SECURE</span>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100%-80px)]">
        {/* Sidebar - Folders */}
        <div className="w-64 bg-slate-800/30 border-r border-white/10 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">Folders</h3>
              <button className="text-blue-400 hover:text-blue-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={() => setSelectedFolder(null)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                !selectedFolder ? 'bg-blue-600/20 text-blue-300' : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Folder className="w-4 h-4" />
                <span>All Documents</span>
              </div>
              <div className="text-xs text-white/50 mt-1">{documents.length} files</div>
            </button>

            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.name)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedFolder === folder.name ? 'bg-blue-600/20 text-blue-300' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Folder className="w-4 h-4" />
                  <span>{folder.name}</span>
                </div>
                <div className="text-xs text-white/50 mt-1">
                  {folder.documentCount} files • {folder.classification}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search and Controls */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  placeholder="Search documents..."
                />
              </div>
              <button className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredDocuments.map(doc => (
                <div
                  key={doc.id}
                  className="flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  onClick={() => setSelectedDocument(doc)}
                >
                  <div className="text-2xl">{getFileIcon(doc.type)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-white font-medium truncate">{doc.name}</h4>
                      {doc.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span>{formatFileSize(doc.size)}</span>
                      <span>{doc.uploadDate.toLocaleDateString()}</span>
                      <span>{doc.folder}</span>
                    </div>
                  </div>

                  <div className={`px-2 py-1 rounded text-xs border ${getClassificationColor(doc.classification)}`}>
                    {doc.classification}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(doc.id);
                      }}
                      className="p-1 text-white/50 hover:text-yellow-400 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${doc.starred ? 'fill-current text-yellow-400' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDocument(doc);
                      }}
                      className="p-1 text-white/50 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-white/50 hover:text-green-400 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDocument(doc.id);
                      }}
                      className="p-1 text-white/50 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Preview */}
        {selectedDocument && (
          <div className="w-96 bg-slate-800/30 border-l border-white/10 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Document Details</h3>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-white/50 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl mb-2">{getFileIcon(selectedDocument.type)}</div>
                  <h4 className="text-white font-medium break-words">{selectedDocument.name}</h4>
                </div>

                <div className={`p-3 rounded-lg border ${getClassificationColor(selectedDocument.classification)}`}>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span className="font-medium">{selectedDocument.classification}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Size:</span>
                    <span className="text-white">{formatFileSize(selectedDocument.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Type:</span>
                    <span className="text-white">{selectedDocument.type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Folder:</span>
                    <span className="text-white">{selectedDocument.folder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Uploaded:</span>
                    <span className="text-white">{selectedDocument.uploadDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Modified:</span>
                    <span className="text-white">{selectedDocument.lastModified.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Document</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}