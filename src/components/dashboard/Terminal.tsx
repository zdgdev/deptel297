import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalEntry {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
  type: 'command' | 'output' | 'error';
}

export default function Terminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeEntry: TerminalEntry = {
      id: '1',
      command: '',
      output: `CIA DEPTEL 297/279 Intelligence Terminal v2.1.7
Connected to secure network: 192.168.1.100
Clearance Level: TOP SECRET
Ready for commands...

Type 'help' for available commands.`,
      timestamp: new Date(),
      type: 'output'
    };
    setEntries([welcomeEntry]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [entries]);

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    setIsProcessing(true);
    const newEntry: TerminalEntry = {
      id: Date.now().toString(),
      command,
      output: '',
      timestamp: new Date(),
      type: 'command'
    };

    setEntries(prev => [...prev, newEntry]);
    setCommandHistory(prev => [...prev, command]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    let output = '';
    let type: 'output' | 'error' = 'output';

    const cmd = command.toLowerCase().trim();

    switch (cmd) {
      case 'help':
        output = `Available Commands:
  help                  - Show this help message
  status               - Show system status
  trace <ip>           - Trace IP address
  decrypt <file>       - Decrypt classified file
  encrypt <file>       - Encrypt file
  scan <target>        - Port scan target
  intel <query>        - Search intelligence database
  agent <id>           - Agent status lookup
  mission <id>         - Mission briefing
  satellite <coords>   - Satellite imagery
  wiretap <number>     - Telecommunications monitoring
  clear                - Clear terminal
  exit                 - Exit terminal`;
        break;

      case 'status':
        output = `System Status:
  Network: SECURE
  Encryption: AES-256 ACTIVE
  Surveillance: ONLINE
  Intel Feeds: 47 ACTIVE
  Threat Level: ELEVATED
  Uptime: 47d 12h 23m`;
        break;

      case 'clear':
        setEntries([]);
        setIsProcessing(false);
        return;

      default:
        if (cmd.startsWith('trace ')) {
          const ip = cmd.substring(6);
          output = `Tracing route to ${ip}...
  1    192.168.1.1      1ms
  2    10.0.0.1         5ms
  3    172.16.0.1       12ms
  4    ${ip}            45ms

Trace complete. Location: [CLASSIFIED]
ISP: [REDACTED]
Threat Assessment: MEDIUM`;
        } else if (cmd.startsWith('decrypt ')) {
          const file = cmd.substring(8);
          output = `Decrypting ${file}...
[████████████████████████████████] 100%

Decryption successful.
Classification: TOP SECRET
Source: NSA PRISM
Content: [CLASSIFIED - EYES ONLY]`;
        } else {
          output = `Command not found: ${command}
Type 'help' for available commands.`;
          type = 'error';
        }
    }

    const outputEntry: TerminalEntry = {
      id: (Date.now() + 1).toString(),
      command: '',
      output,
      timestamp: new Date(),
      type
    };

    setEntries(prev => [...prev, outputEntry]);
    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isProcessing) {
      executeCommand(currentCommand);
      setCurrentCommand('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="h-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-slate-800/50 border-b border-white/10 px-4 py-3">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-5 h-5 text-blue-400" />
          <span className="text-white font-semibold">CIA SECURE TERMINAL</span>
          <div className="flex space-x-1 ml-auto">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex flex-col h-[calc(100%-60px)]">
        <div
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-black/20"
        >
          {entries.map((entry) => (
            <div key={entry.id} className="mb-2">
              {entry.type === 'command' && (
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">root@cia-intel:~$</span>
                  <span className="text-white">{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className={`whitespace-pre-wrap ${
                  entry.type === 'error' ? 'text-red-400' : 'text-white/90'
                }`}>
                  {entry.output}
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="text-blue-400 animate-pulse">
              Processing...
            </div>
          )}
        </div>

        {/* Command Input */}
        <div className="border-t border-white/10 p-4 bg-slate-800/30">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <span className="text-blue-400 font-mono">root@cia-intel:~$</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white font-mono outline-none"
              placeholder="Enter command..."
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={isProcessing || !currentCommand.trim()}
              className="text-blue-400 hover:text-blue-300 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}