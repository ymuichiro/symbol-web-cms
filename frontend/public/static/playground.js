const content = `
const sym = require('symbol-sdk@2.0.3');

(async () => {
  const NODE = 'https://symbolnode.blockchain-authn.app:3001';
  const repo = new sym.RepositoryFactoryHttp(NODE);
  const txRepo = repo.createTransactionRepository();
  const networkType = await repo.getNetworkType().toPromise();
  const generationHash = await repo.getGenerationHash().toPromise();
  const epochAdjustment = await repo.getEpochAdjustment().toPromise();
  const alice = sym.Account.generateNewAccount(networkType);

  // ---- edit area ----
  return "alice's address: " + alice.address.pretty();
})();
`;

const note = RunKit.createNotebook({
  element: document.getElementById('my-element'),
  minHeight: '300px',
  nodeVersion: '16.18.0',
  gutterStyle: 'outside',
  source: content,
});

document.getElementById('download').addEventListener('click', () => {
  note.getSource().then((e) => {
    const blob = new Blob([e], { type: 'text/plain' });
    const aTag = document.createElement('a');
    aTag.href = URL.createObjectURL(blob);
    aTag.target = '_blank';
    aTag.download = `symbol-playground-${new Date().getTime()}`;
    aTag.click();
    URL.revokeObjectURL(aTag.href);
  });
});

document.getElementById('save').addEventListener('click', () => {
  navigator.permissions.query({ name: 'clipboard-write' }).then(() => {
    note.getShareableURL().then((e) => {
      navigator.clipboard.writeText(e).then(() => alert('copied'));
    });
  });
});
