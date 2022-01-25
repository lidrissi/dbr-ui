export function listToTree(selfParentTree, currentRoles = []) {
  // edge case
  if (!selfParentTree || selfParentTree.length < 1) {
    return [];
  }
  // group by parent
  const listNode = {};
  selfParentTree.forEach((node) => {
    if (
      !node.roles ||
      node.roles.length == 0 ||
      node.roles.some((role) => currentRoles.indexOf(role) > -1)
    ) {
      listNode[node._id] = {
        ...node,
        lat: node.location?.coordinates[1],
        lng: node.location?.coordinates[0],
        children: node.children || [],
      };
    }
  });
  const tree = [];
  Object.keys(listNode).forEach((id, index) => {
    if (listNode && listNode.hasOwnProperty(id)) {
      const mappedElem = listNode[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parent && listNode[mappedElem.parent]) {
        listNode[mappedElem.parent].children.push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  });
  for (let i = 0; i < tree.length; i++) {
    tree[i].isRoot = true;
  }
  return tree;
}

function constructList(nodeList, parent, parents) {
  let list = [];
  nodeList.forEach((node) => {
    node.parents = parents;
    node.parent = parent;
    list.push(node);
    list = list.concat(
      constructList(node.children || [], node._id, [...parents, node._id])
    );
  });
  return list;
}

export function treeToList(tree) {
  return constructList(tree, null, []);
}
