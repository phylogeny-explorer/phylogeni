import { chakra } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import type { CustomNodeElementProps } from 'react-d3-tree';

export interface Props extends CustomNodeElementProps {
  nodeSize: { x: number; y: number };
  rootId?: string;
  selectedNodeId?: string;
}

const Node = ({
  rootId,
  onNodeClick,
  nodeDatum,
  toggleNode,
  nodeSize,
  selectedNodeId,
}: Props) => {
  const router = useRouter();

  const id = nodeDatum.attributes?.id.toString() || '';
  const hasChildren = nodeDatum.attributes?.hasChildren;
  const hasChildrenData = nodeDatum.children && nodeDatum.children.length > 0;
  const parent = (nodeDatum.attributes?.lineage as unknown as string[])?.[0];

  const updateQuery = (nodeId: string) =>
    router.push(`/tree?node_id=${nodeId}`);

  const onClickCircle = () => {
    if (hasChildrenData) toggleNode?.();
    else updateQuery(id);
  };

  const goToParent = () => updateQuery(parent);

  const isRoot = id === rootId;

  return (
    <chakra.g width={nodeSize.x} height={nodeSize.y} strokeWidth={2.5}>
      {parent && isRoot && (
        <chakra.polygon
          points="5,5 -5,0 5,-5"
          fill="yellow.500"
          stroke="yellow.500"
          onClick={goToParent}
        />
      )}
      {!parent && isRoot && (
        <chakra.circle r={5} fill="yellow.500" stroke="yellow.500" />
      )}
      {!isRoot && (
        <chakra.circle
          r={5}
          fill={{
            base: hasChildren ? 'gray.50' : 'teal.500',
            _dark: hasChildren ? 'gray.900' : 'teal.500',
          }}
          stroke={hasChildren && !isRoot ? 'teal.500' : 'none'}
          onClick={onClickCircle}
        />
      )}

      <chakra.text
        dy="0.31em"
        x={12}
        stroke={{ base: 'white', _dark: 'gray.900' }}
        strokeWidth={5}
        fontSize={14}
        fontWeight={500}
      >
        {nodeDatum.name || 'Unnamed Clade'}
      </chakra.text>
      <chakra.text
        dy="0.31em"
        x={12}
        fill={id === selectedNodeId ? 'teal.500' : 'currentColor'}
        stroke="none"
        fontSize={14}
        fontWeight={500}
        onClick={onNodeClick}
      >
        {nodeDatum.name || 'Unnamed Clade'}
      </chakra.text>
    </chakra.g>
  );
};

export default Node;
