import TerminusClient from '@terminusdb/terminusdb-client';

const Page = async () => {
  const baseUrl = 'https://api.opentreeoflife.org/v3/';

  const result = await fetch(`${baseUrl}/tree_of_life/node_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      node_id: 'ott304358',
    }),
  }).then((res) => res.json());

  const teamName = 'admin';
  const username = 'admin';

  const client = new TerminusClient.WOQLClient(`http://localhost:6363/`, {
    user: username,
    organization: teamName,
    key: 'root',
  });

  client.db('phylogeny');
  // const schema = await client.getSchema();

  // console.log(schema);

  const queryTemplate = { extinct: false };

  const life = await client.getDocument({
    type: 'Clade',
    as_list: true,
    query: queryTemplate,
  });

  return (
    <div style={{ padding: 50 }}>
      {Object.keys(result).map((key) => (
        <div key={key}>
          {key}: {JSON.stringify(result[key])}
        </div>
      ))}
      {/* {life.map((item, i) => (
        <div key={i}>
          {Object.keys(item).map((key) => (
            <div key={key}>
              {key}: {JSON.stringify(item[key])}
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default Page;
