import TerminusClient from '@terminusdb/terminusdb-client';

const teamName = 'admin';
const username = 'admin';

const client = new TerminusClient.WOQLClient(`http://localhost:6363/`, {
  user: username,
  organization: teamName,
  key: 'root',
});

client.db('phylogeny');

export default client;

export const {
  Vars,
  select,
  triple,
  like,
  greater,
  and,
  string,
  optional,
  path,
} = TerminusClient.WOQL;
