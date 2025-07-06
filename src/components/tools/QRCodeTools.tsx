import React, { useState } from 'react';
import { QrCode, Download, Upload, FileText } from 'lucide-react';

export default function QRCodeTools() {
  const [mode, setMode] = useState<'generate' | 'decode'>('generate');
  const [inputText, setInputText] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#00ff41');
  const [bgColor, setBgColor] = useState('#000000');
  const [decodedText, setDecodedText] = useState('');

  const generateQRCode = () => {
    if (!inputText.trim()) return '';
    
    // Using a QR code API service
    const encodedText = encodeURIComponent(inputText);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodedText}&color=${qrColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`;
  };

  const downloadQRCode = () => {
    const qrUrl = generateQRCode();
    if (!qrUrl) return;

    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would use a QR code reading library
      // For demo purposes, we'll simulate decoding
      setDecodedText('Decoded text would appear here (requires QR code reading library)');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <QrCode className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-semibold text-green-400">QR Code Tools</h2>
      </div>

      {/* Mode Selection */}
      <div className="flex space-x-1 bg-green-900/20 p-1 rounded-lg">
        <button
          onClick={() => setMode('generate')}
          className={`flex-1 py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 ${
            mode === 'generate' ? 'bg-green-700 text-black' : 'text-green-400 hover:bg-green-900/20'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Generate</span>
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2 ${
            mode === 'decode' ? 'bg-green-700 text-black' : 'text-green-400 hover:bg-green-900/20'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Decode</span>
        </button>
      </div>

      {mode === 'generate' ? (
        <div className="space-y-6">
          {/* Input Text */}
          <div className="space-y-2">
            <label className="text-green-300 text-sm">Text to Encode</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500 h-24 resize-none"
              placeholder="Enter text, URL, or data to encode..."
            />
          </div>

          {/* QR Code Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-green-300 text-sm">Size (px)</label>
              <input
                type="number"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                min="128"
                max="512"
                className="w-full px-3 py-2 bg-black border border-green-700 rounded text-green-400 focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-green-300 text-sm">QR Color</label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-full h-10 bg-black border border-green-700 rounded cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-green-300 text-sm">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 bg-black border border-green-700 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Generated QR Code */}
          {inputText && (
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-400 font-medium">Generated QR Code</h3>
                <button
                  onClick={downloadQRCode}
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
              <div className="flex justify-center">
                <img
                  src={generateQRCode()}
                  alt="Generated QR Code"
                  className="border border-green-700 rounded"
                />
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-green-400 text-sm font-medium">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInputText('https://example.com')}
                className="text-left p-2 bg-green-900/20 border border-green-700 rounded hover:bg-green-900/30 transition-colors"
              >
                <div className="text-green-400 text-sm">Website URL</div>
                <div className="text-green-300 text-xs">Create QR for website</div>
              </button>
              <button
                onClick={() => setInputText('WIFI:T:WPA;S:NetworkName;P:password;;')}
                className="text-left p-2 bg-green-900/20 border border-green-700 rounded hover:bg-green-900/30 transition-colors"
              >
                <div className="text-green-400 text-sm">WiFi Network</div>
                <div className="text-green-300 text-xs">Share WiFi credentials</div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-green-300 text-sm">Upload QR Code Image</label>
            <div className="border-2 border-dashed border-green-700 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="qr-upload"
              />
              <label htmlFor="qr-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400">Click to upload QR code image</p>
                <p className="text-green-300 text-sm">Supports PNG, JPG, GIF</p>
              </label>
            </div>
          </div>

          {/* Decoded Result */}
          {decodedText && (
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <h3 className="text-green-400 font-medium mb-3">Decoded Text</h3>
              <div className="bg-black border border-green-700 rounded p-3">
                <p className="text-green-300 font-mono text-sm whitespace-pre-wrap">
                  {decodedText}
                </p>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> QR code decoding requires additional libraries. 
              This demo shows the UI structure. In a real implementation, you would use 
              libraries like jsQR or qr-scanner.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}