import { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { ThemeToggle } from './components/ThemeToggle';
import { Toast } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useJsonParser } from './hooks/useJsonParser';
import { useToast } from './hooks/useToast';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { result, parseJson, reset } = useJsonParser();
  const { toasts, showToast, hideToast } = useToast();
  const [visualizedData, setVisualizedData] = useState<any>(null);

  const handleVisualize = (input: string) => {
    const parseResult = parseJson(input);
    
    if (parseResult.isValid && parseResult.data) {
      setVisualizedData(parseResult.data);
      showToast('✨ JSON visualized successfully!', 'success');
    } else if (parseResult.error) {
      setVisualizedData(null);
      showToast(`❌ ${parseResult.error}`, 'error');
    }
  };

  const handleClear = () => {
    setVisualizedData(null);
  };

  const handleCopyPath = (path: string, success: boolean = true) => {
    if (success) {
      showToast(`📋 Copied: ${path}`, 'success');
    } else {
      showToast(`📋 Path: ${path}`, 'info');
    }
  };

  const handleSearchResult = (found: boolean, path?: string) => {
    if (found && path) {
      showToast(`✅ Match found: ${path}`, 'success');
    } else if (!found) {
      showToast('❌ No match found', 'error');
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-linear-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="h-16 border-b border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white">🌳</span>
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-gray-100">
                JSON Tree Visualizer
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Interactive visualization tool
              </p>
            </div>
          </div>
          
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)] flex">
        {/* Left Panel - JSON Input */}
        <div className="w-1/3 min-w-[400px] border-r border-gray-300 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
          <div className="h-full p-6">
            {/* JsonInput */}
          </div>
        </div>

        {/* Right Panel - Tree Visualization */}
        <div className="flex-1 relative">
          {visualizedData ? (
            <ReactFlowProvider>
              {/* TreeCanvas */}
            </ReactFlowProvider>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <span className="text-5xl">🌳</span>
                </div>
                <h2 className="mb-2 text-gray-900 dark:text-gray-100">
                  Ready to Visualize
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your JSON on the left and click "Visualize" to see the tree
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Toast Notifications */}
      <Toast toasts={toasts} onClose={hideToast} />
    </div>
  );
}
