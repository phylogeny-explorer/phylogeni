'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tree from '~/lib/components/Tree';
import type { Node } from '~/types/tree';

interface Props {
  data: Node;
}

const Dendrogram = ({ data }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  return (
    <Tree
      data={data}
      onClickNode={(id) => {
        newSearchParams.set('selected_node_id', id);
        router.push(`${pathname}?${newSearchParams.toString()}`);
      }}
    />
  );
};

export default Dendrogram;
