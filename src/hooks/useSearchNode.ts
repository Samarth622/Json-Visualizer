import { useState, useCallback } from 'react';
import type { Node } from 'reactflow';
import { type JsonNodeData, findNodeByPath } from '../utils/jsonToNodes';

export function useSearchNode(nodes: Node<JsonNodeData>[]) {
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const searchNode = useCallback((searchPath: string): Node<JsonNodeData> | null => {
    if (!searchPath.trim()) {
      setHighlightedNodeId(null);
      return null;
    }

    const foundNode = findNodeByPath(nodes, searchPath);
    
    if (foundNode) {
      setHighlightedNodeId(foundNode.id);
    } else {
      setHighlightedNodeId(null);
    }

    return foundNode;
  }, [nodes]);

  const clearHighlight = useCallback(() => {
    setHighlightedNodeId(null);
    setSearchTerm('');
  }, []);

  return {
    highlightedNodeId,
    searchTerm,
    setSearchTerm,
    searchNode,
    clearHighlight,
  };
}
