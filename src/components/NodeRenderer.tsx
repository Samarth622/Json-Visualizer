import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { motion } from 'motion/react';
import { Database, List, Hash } from 'lucide-react';
import type { JsonNodeData } from '../utils/jsonToNodes';

export const NodeRenderer = memo(({ data, selected }: NodeProps<JsonNodeData>) => {
  const { label, nodeType, path } = data;

  const getNodeStyles = () => {
    switch (nodeType) {
      case 'object':
        return {
          bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-500/30 dark:to-blue-600/30',
          border: 'border-blue-500/50 dark:border-blue-400/50',
          icon: <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          text: 'text-blue-900 dark:text-blue-100',
        };
      case 'array':
        return {
          bg: 'bg-gradient-to-br from-green-500/20 to-green-600/20 dark:from-green-500/30 dark:to-green-600/30',
          border: 'border-green-500/50 dark:border-green-400/50',
          icon: <List className="w-4 h-4 text-green-600 dark:text-green-400" />,
          text: 'text-green-900 dark:text-green-100',
        };
      case 'primitive':
        return {
          bg: 'bg-gradient-to-br from-amber-500/20 to-amber-600/20 dark:from-amber-500/30 dark:to-amber-600/30',
          border: 'border-amber-500/50 dark:border-amber-400/50',
          icon: <Hash className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          text: 'text-amber-900 dark:text-amber-100',
        };
    }
  };

  const styles = getNodeStyles();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-gray-400! dark:bg-gray-500!"
      />

      <div
        className={`
          px-4 py-3 rounded-lg border-2
          ${styles.bg} ${styles.border}
          backdrop-blur-sm
          shadow-lg hover:shadow-xl
          transition-all duration-200
          min-w-[180px] max-w-[300px]
          cursor-pointer
          ${selected ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900' : ''}
        `}
        title={`Click to copy: ${path}`}
      >
        <div className="flex items-center gap-2">
          <div className="shrink-0">
            {styles.icon}
          </div>
          <div className={`flex-1 ${styles.text} wrap-break-word`}>
            {label}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-gray-400! dark:bg-gray-500!"
      />
    </motion.div>
  );
});

NodeRenderer.displayName = 'NodeRenderer';
