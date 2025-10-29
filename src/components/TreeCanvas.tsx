import { useCallback, useMemo, useRef, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  type Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeRenderer } from './NodeRenderer';
import { SearchBar } from './SearchBar';
import { Toolbar } from './Toolbar';
import { InfoPanel } from './InfoPanel';
import { jsonToNodes, type JsonNodeData } from '../utils/jsonToNodes';
import { getLayoutedElements } from '../utils/layoutHelper';
import { exportAsImage } from '../utils/exportImage';
import { useSearchNode } from '../hooks/useSearchNode';
import { copyToClipboard } from '../utils/clipboard';

interface TreeCanvasProps {
  jsonData: any;
  onCopyPath: (path: string, success?: boolean) => void;
  onSearchResult: (found: boolean, path?: string) => void;
}

const nodeTypes = {
  custom: NodeRenderer,
};

export function TreeCanvas({ jsonData, onCopyPath, onSearchResult }: TreeCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const lastSearchTerm = useRef<string>('');
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const { nodes, edges } = jsonToNodes(jsonData);
    return { nodes: getLayoutedElements(nodes, edges), edges };
  }, [jsonData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { highlightedNodeId, searchNode } = useSearchNode(nodes);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 300 });
    }, 50);
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  const onNodeClick = useCallback(async (_: React.MouseEvent, node: Node<JsonNodeData>) => {
    const path = node.data.path;
    const success = await copyToClipboard(path);
    onCopyPath(path, success);
  }, [onCopyPath]);

  const handleSearch = useCallback((searchPath: string) => {
    if (!searchPath.trim()) {
      lastSearchTerm.current = '';
      return;
    }

    if (lastSearchTerm.current === searchPath) {
      return;
    }

    lastSearchTerm.current = searchPath;
    const foundNode = searchNode(searchPath);
    
    if (foundNode) {
      onSearchResult(true, foundNode.data.path);
      
      const node = nodes.find(n => n.id === foundNode.id);
      if (node) {
        fitView({
          nodes: [{ id: foundNode.id }],
          duration: 500,
          padding: 0.3,
        });
      }
    } else {
      onSearchResult(false);
    }
  }, [searchNode, nodes, onSearchResult, fitView]);

  const handleDownload = useCallback(async () => {
    if (reactFlowWrapper.current) {
      const flowElement = reactFlowWrapper.current.querySelector('.react-flow') as HTMLElement;
      if (flowElement) {
        try {
          await exportAsImage(flowElement, 'json-tree.png');
        } catch (error) {
          console.error('Failed to export image:', error);
        }
      }
    }
  }, []);

  const highlightedNodes = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      selected: node.id === highlightedNodeId,
    }));
  }, [nodes, highlightedNodeId]);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative">
      <ReactFlow
        nodes={highlightedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
        }}
        className="bg-gray-50 dark:bg-gray-900"
      >
        <Background 
          gap={16} 
          size={1}
          className="bg-gray-50 dark:bg-gray-900"
        />
        
        <MiniMap
          className="bg-white! dark:bg-gray-800! border-gray-300! dark:border-gray-600! hidden md:block"
          maskColor="rgba(0, 0, 0, 0.1)"
          nodeColor={(node) => {
            const data = node.data as JsonNodeData;
            switch (data.nodeType) {
              case 'object': return '#3b82f6';
              case 'array': return '#10b981';
              case 'primitive': return '#f59e0b';
              default: return '#6b7280';
            }
          }}
        />

        <Controls 
          className="bg-white! dark:bg-gray-800! border-gray-300! dark:border-gray-600!"
          showInteractive={false}
        />

        <Panel position="top-left" className="m-2 md:m-4">
          <SearchBar onSearch={handleSearch} />
        </Panel>

        <Panel position="top-right" className="m-2 md:m-4 flex gap-2">
          <Toolbar
            onZoomIn={() => zoomIn({ duration: 300 })}
            onZoomOut={() => zoomOut({ duration: 300 })}
            onFitView={() => fitView({ padding: 0.2, duration: 300 })}
            onDownload={handleDownload}
          />
          <InfoPanel
            nodeCount={nodes.length}
            edgeCount={edges.length}
          />
        </Panel>
      </ReactFlow>
    </div>
  );
}
