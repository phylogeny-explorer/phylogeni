import { createClient } from '~/lib/utils/supabase/server';
import type { Node } from '~/types/tree';

type Clade = {
  id: string;
  name: string;
  parent: string;
  extant: boolean;
  hasChildren: boolean;
  children: Clade[];
};

const getSubtree = async (
  id = '55ae8ce9343108fa191058d2'
): Promise<Node | null> => {
  if (!id) return null;

  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_clades_tree', {
    node_id: id,
    depth: 5,
  });
  console.log(data, error);

  if (error) {
    console.error('error', error);
    return null;
  }
  console.log('data', data);

  const item = data as Clade | null;

  const resolveNode = (node: Clade): Node => {
    return {
      ...node,
      id: node.id.toString(),
      children: node.children.map(resolveNode),
      attributes: {
        id: node.id.toString(),
        extant: node.extant,
        lineage: [node.parent],
        hasChildren: node.hasChildren,
      },
    };
  };

  return item ? resolveNode(item) : null;
};

export default getSubtree;
