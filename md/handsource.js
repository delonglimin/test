const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', checked: true },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2', checked: true },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1', checked: true },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      checked: true,
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

function rebuild(treeData) {
    function refreshNode(node, tag) {
        if (node.hasOwnProperty('children')) {
            if (!node.hasOwnProperty('checked')) {
                node.tag = tag;
            } else {
                node.tag = 2
            }
            const arr = []
            for (let i = 0; i < node.children.length; i++) {
                const element = node.children[i];
                const res = refreshNode(element, node.tag)
                arr.push(res)
            }
            if (arr.filter(item => item == 2).length == arr.length) {
                node.tag = 2
            } else if (arr.filter(item => item == 0).length == arr.length) {
                node.tag = 0
            } else {
                node.tag = 1
            }
            console.log(arr)
        } else {
            if (tag == 2) {
                node.tag = 2
            } else if (node.hasOwnProperty('checked')) {
                node.tag = 2;
            } else {
                node.tag = 0;
            }
        }
        return node.tag
    }
    for (let i = 0; i < treeData.length; i++) {
        treeData[i].tag = treeData.hasOwnProperty('checked') ? 2 : 0
        refreshNode(treeData[i], treeData[i].tag)
    }
}
rebuild(treeData)

