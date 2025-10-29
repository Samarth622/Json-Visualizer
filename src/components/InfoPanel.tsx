import { Info, Layers, Code, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface InfoPanelProps {
  nodeCount?: number;
  edgeCount?: number;
  depth?: number;
}

export function InfoPanel({ nodeCount = 0, edgeCount = 0 }: InfoPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          p-1.5 md:p-2 rounded-lg
          bg-white/50 dark:bg-gray-800/50
          border border-gray-300 dark:border-gray-600
          hover:bg-white/80 dark:hover:bg-gray-800/80
          transition-all duration-200
          backdrop-blur-sm
        "
        title="View Statistics"
        aria-label="Toggle info panel"
      >
        <Info className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-10 md:top-12 right-0 z-50
              w-64 md:w-72 p-3 md:p-4 rounded-lg
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-600
              shadow-xl
              backdrop-blur-sm
            "
          >
            <h3 className="mb-2 md:mb-3 text-sm md:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Layers className="w-3 h-3 md:w-4 md:h-4" />
              Tree Statistics
            </h3>
            
            <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
              <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <Code className="w-3 h-3 md:w-4 md:h-4" />
                  Nodes
                </span>
                <span className="font-mono">{nodeCount}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <Hash className="w-3 h-3 md:w-4 md:h-4" />
                  Connections
                </span>
                <span className="font-mono">{edgeCount}</span>
              </div>
            </div>

            <div className="pt-2 md:pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 <strong>Tip:</strong> Click any node to copy its JSON path
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
