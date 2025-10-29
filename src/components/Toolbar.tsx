import { ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface ToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onDownload: () => void;
}

export function Toolbar({ onZoomIn, onZoomOut, onFitView, onDownload }: ToolbarProps) {
  const buttons = [
    { icon: ZoomIn, label: 'Zoom In', onClick: onZoomIn, showOnMobile: false },
    { icon: ZoomOut, label: 'Zoom Out', onClick: onZoomOut, showOnMobile: false },
    { icon: Maximize2, label: 'Fit View', onClick: onFitView, showOnMobile: true },
    { icon: Download, label: 'Download Tree', onClick: onDownload, showOnMobile: true },
  ];

  return (
    <div className="flex items-center gap-1 md:gap-2 p-1 md:p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600">
      {buttons.map((button, index) => {
        const Icon = button.icon;
        const mobileClass = button.showOnMobile ? '' : 'hidden md:flex';
        return (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.onClick}
            className={`
              p-1.5 md:p-2 rounded-md
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              hover:bg-gray-50 dark:hover:bg-gray-700
              transition-colors duration-200
              group
              ${mobileClass}
            `}
            title={button.label}
            aria-label={button.label}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
          </motion.button>
        );
      })}
    </div>
  );
}
