// 判断是否同一个虚拟节点
import patchVnode from "./patchVnode";
import createElement from "./createElement";

function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  console.log("updateChildren", oldCh, newCh);

  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1;
  //旧前节点
  let oldStartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx];
  // 新前节点
  let newStartVnode = newCh[0];
  // 新后节点
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log("1. 新前与旧前");
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log("2. 新后与旧后");
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log("3. 新后与旧前");
      patchVnode(oldStartVnode, newEndVnode);
      // 移动节点
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      console.log("4. 新前与旧后");
      patchVnode(oldEndVnode, newStartVnode);
      // 移动节点
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      console.log("都没有找到");
      // 寻找key的map
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld === undefined) {
        // 全新的项, 新增
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 旧的,移动
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined,表示已经处理完这项了
        oldCh[idxInOld] = undefined;
        // 移动,insertBefore实现
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      // 指针下移
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // 继续看看有没有剩余的
  if (newStartIdx <= newEndIdx) {
    console.log("new 还有剩余节点没有处理");
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null, 如果是null就会自动排到队尾去, 和appendChild是一致的
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("old还有剩余节点没有处理");
    // 批量删除oldStart和oldEnd指针之间的项
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm);
    }
  }
}
