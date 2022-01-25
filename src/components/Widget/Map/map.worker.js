export default function () {
  onmessage = (e) => {
    const { action, stratificationTree } = e.data;
    if (action === "getNodesWithoutParent") {
      // eslint-disable-next-line no-use-before-define
      const nodesWithoutParent = getNodesWithoutParent(stratificationTree);
      postMessage({ action, nodesWithoutParent });
    }
  };

  let getNodesWithoutParent = (stratificationTree) => {
    const nodesIds = stratificationTree.map(({ _id }) => _id);
    const nodesWithoutParent = stratificationTree
      .filter(({ parent }) => {
        return !nodesIds.includes(parent);
      })
      .map(({ parent }) => parent);

    return nodesWithoutParent;
  };
}
