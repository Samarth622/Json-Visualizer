import { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { JsonInputPanel } from './components/JsonInputPanel';
import { TreeCanvas } from './components/TreeCanvas';
import { ThemeToggle } from './components/ThemeToggle';
import { Toast } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useJsonParser } from './hooks/useJsonParser';
import { useToast } from './hooks/useToast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Code } from 'lucide-react';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { parseJson } = useJsonParser();
  const { toasts, showToast, hideToast } = useToast();
  const [visualizedData, setVisualizedData] = useState<any>(null);
  const [isInputSheetOpen, setIsInputSheetOpen] = useState(false);

  const handleVisualize = (input: string) => {
    const parseResult = parseJson(input);
    
    if (parseResult.isValid && parseResult.data) {
      setVisualizedData(parseResult.data);
      showToast('✨ JSON visualized successfully!', 'success');
      setIsInputSheetOpen(false);
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
      <header className="h-14 md:h-16 border-b border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="h-full px-3 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm md:text-base">🌳</span>
            </div>
            <div>
              <h1 className="text-sm md:text-base text-gray-900 dark:text-gray-100">
                JSON Tree Visualizer
              </h1>
              <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
                Interactive visualization tool
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet open={isInputSheetOpen} onOpenChange={setIsInputSheetOpen}>
              <SheetTrigger>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="lg:hidden"
                >
                  <Code className="w-4 h-4 mr-2" />
                  JSON Input
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[400px] p-0">
                <div className="h-full flex flex-col">
                  <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <SheetTitle>JSON Input</SheetTitle>
                    <SheetDescription>
                      Enter or paste your JSON data here
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-hidden p-6">
                    <JsonInputPanel
                      onVisualize={handleVisualize}
                      onClear={handleClear}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
        <div className="hidden lg:block w-1/3 min-w-[400px] border-r border-gray-300 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
          <div className="h-full p-6">
            <JsonInputPanel
              onVisualize={handleVisualize}
              onClear={handleClear}
            />
          </div>
        </div>

        <div className="flex-1 relative">
          {visualizedData ? (
            <ReactFlowProvider>
              <TreeCanvas
                jsonData={visualizedData}
                onCopyPath={handleCopyPath}
                onSearchResult={handleSearchResult}
              />
            </ReactFlowProvider>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-linear-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl">🌳</span>
                </div>
                <h2 className="mb-2 text-gray-900 dark:text-gray-100">
                  Ready to Visualize
                </h2>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4">
                  {visualizedData === null && (
                    <span className="lg:hidden">
                      Tap "JSON Input" to enter your data and visualize the tree
                    </span>
                  )}
                  <span className="hidden lg:inline">
                    Enter your JSON on the left and click "Visualize" to see the tree
                  </span>
                </p>
                <Button
                  onClick={() => setIsInputSheetOpen(true)}
                  className="lg:hidden"
                  variant="default"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Open JSON Input
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Toast toasts={toasts} onClose={hideToast} />
    </div>
  );
}
