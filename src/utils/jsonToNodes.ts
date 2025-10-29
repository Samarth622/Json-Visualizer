import type { Node, Edge } from 'reactflow';

export type JsonNodeType = 'object' | 'array' | 'primitive';

export interface JsonNodeData {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  path: string;
  nodeType: JsonNodeType;
  keyName?: string;
}

let nodeId = 0;

function generateId(): string {
  return `node-${nodeId++}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonToNodes(json: any): { nodes: Node<JsonNodeData>[]; edges: Edge[] } {
  nodeId = 0;
  const nodes: Node<JsonNodeData>[] = [];
  const edges: Edge[] = [];

  function traverse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any,
    parentId: string | null = null,
    key: string | null = null,
    path: string = '$'
  ): string {
    const currentId = generateId();
    const isArray = Array.isArray(obj);
    const isObject = typeof obj === 'object' && obj !== null && !isArray;
    const isPrimitive = !isObject && !isArray;

    let nodeType: JsonNodeType;
    let label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any;

    if (isPrimitive) {
      nodeType = 'primitive';
      label = key !== null ? `${key}: ${JSON.stringify(obj)}` : JSON.stringify(obj);
      value = obj;
    } else if (isArray) {
      nodeType = 'array';
      label = key !== null ? `${key} []` : '[]';
    } else {
      nodeType = 'object';
      label = key !== null ? `${key} {}` : '{}';
    }

    nodes.push({
      id: currentId,
      type: 'custom',
      data: {
        label,
        value,
        path,
        nodeType,
        keyName: key || undefined,
      },
      position: { x: 0, y: 0 },
    });

    if (parentId !== null) {
      edges.push({
        id: `edge-${parentId}-${currentId}`,
        source: parentId,
        target: currentId,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
    }

    if (isObject) {
      Object.keys(obj).forEach((childKey) => {
        const childPath = `${path}.${childKey}`;
        traverse(obj[childKey], currentId, childKey, childPath);
      });
    } else if (isArray) {
      obj.forEach((item, index) => {
        const childPath = `${path}[${index}]`;
        traverse(item, currentId, `[${index}]`, childPath);
      });
    }

    return currentId;
  }

  traverse(json);
  return { nodes, edges };
}

export function findNodeByPath(nodes: Node<JsonNodeData>[], searchPath: string): Node<JsonNodeData> | null {
  const normalizedSearch = searchPath.trim().replace(/\s+/g, '');
  
  return nodes.find(node => {
    const nodePath = node.data.path.replace(/\s+/g, '');
    return nodePath === normalizedSearch || nodePath.includes(normalizedSearch);
  }) || null;
}
