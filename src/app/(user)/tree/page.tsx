import Dendrogram from './dendrogram';
import getTree from './getTree';

export default async function TreePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getTree(searchParams.node_id as string);

  if (!data) {
    return null;
  }

  return <Dendrogram data={data} />;
}
