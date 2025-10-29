import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Trash2 } from 'lucide-react';

interface JsonInputPanelProps {
  onVisualize: (json: string) => void;
  onClear: () => void;
}

const SAMPLE_JSON = {
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    }
  },
  "orders": [
    {
      "id": 101,
      "product": "Laptop",
      "price": 999.99,
      "quantity": 1
    },
    {
      "id": 102,
      "product": "Mouse",
      "price": 29.99,
      "quantity": 2
    }
  ],
  "premium": true,
  "createdAt": "2025-10-28T00:00:00Z"
};

export function JsonInputPanel({ onVisualize, onClear }: JsonInputPanelProps) {
  const [input, setInput] = useState(JSON.stringify(SAMPLE_JSON, null, 2));

  const handleVisualize = () => {
    onVisualize(input);
  };

  const handleClear = () => {
    setInput('');
    onClear();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleVisualize();
    }
  };

  return (
    <div className="flex flex-col h-full gap-3 md:gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm md:text-base text-gray-900 dark:text-gray-100">
          JSON Input
        </h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="
              px-3 py-1.5 md:px-4 md:py-2 rounded-lg
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-600
              hover:bg-gray-50 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-300
              transition-colors duration-200
              flex items-center gap-2
              text-sm
            "
          >
            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Clear</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVisualize}
            className="
              px-3 py-1.5 md:px-4 md:py-2 rounded-lg
              bg-blue-600 hover:bg-blue-700
              text-white
              transition-colors duration-200
              flex items-center gap-2
              text-sm
            "
          >
            <Play className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Visualize
          </motion.button>
        </div>
      </div>

      <div className="flex-1 relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste or type your JSON here..."
          className="
            w-full h-full p-3 md:p-4 rounded-lg
            bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            text-sm md:text-base text-gray-900 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            font-mono
            resize-none
            transition-all duration-200
          "
        />
      </div>
    </div>
  );
}
