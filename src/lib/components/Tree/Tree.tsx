'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import TreeComponent from 'react-d3-tree';
import type { RawNodeDatum } from 'react-d3-tree';

import type { Node as NodeType } from '~/types/tree';

import Node from './Node';

interface TreeProps {
  data: NodeType;
  isVertical?: boolean;
  onClickNode: (id: string) => void;
  selectedNodeId?: string;
}

const Tree = ({ data, isVertical, onClickNode, selectedNodeId }: TreeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState({ x: 200, y: 300 });
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    setShowTree(true);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 4, y: height / 2 });
    }
  }, [containerRef, showTree]);

  const nodeSize = { x: 350, y: 24 };

  if (!showTree) return null;

  return (
    <Box id="treeWrapper" width="100%" height="100%" ref={containerRef}>
      <TreeComponent
        key={data.id}
        zoomable
        data={data as RawNodeDatum}
        dimensions={dimensions}
        translate={translate}
        nodeSize={nodeSize}
        separation={{ siblings: 1, nonSiblings: 2 }}
        orientation={isVertical ? 'vertical' : 'horizontal'}
        onNodeClick={({ data: nodeData }) => {
          const id = nodeData.attributes?.id.toString();
          if (id) onClickNode(id);
        }}
        renderCustomNodeElement={(nodeProps) => (
          <Node
            {...nodeProps}
            nodeSize={nodeSize}
            rootId={data.id}
            selectedNodeId={selectedNodeId}
          />
        )}
        initialDepth={2}
      />
    </Box>
  );
};

export default Tree;
