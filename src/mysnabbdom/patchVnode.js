import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
  // 判断新旧vnode是否是同一个对象
  if (oldVnode === newVnode) return;
  // 判断新vnode有没有text属性
  if (
    newVnode.text !== undefined &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    console.log("新vnode有text属性");
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    console.log("新vnode没有text属性");
    // 判断老的有没有children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 新老都有children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
      // let un = 0;
      // for (let i = 0; i < newVnode.children.length; i++) {
      //   let ch = newVnode.children[i];
      //   // 再次遍历，看看oldVnode中有没有节点和它是一样的
      //   let isExist = false;
      //   for (let j = 0; j < oldVnode.children.length; j++) {
      //     if (
      //       oldVnode.children[j].sel === ch.sel &&
      //       oldVnode.children[j].key === ch.key
      //     ) {
      //       isExist = true;
      //     }
      //   }
      //   if (!isExist) {
      //     // 有新增的节点
      //     let dom = createElement(ch);
      //     ch.elm = dom;
      //     if (un < oldVnode.children.length) {
      //       oldVnode.insertBefore(dom, oldVnode.children[un].elm);
      //     } else {
      //       oldVnode.appendChild(dom, oldVnode.children[un].elm);
      //     }
      //   } else {
      //     // 让处理的节点指针下移
      //     un++;
      //     // 存在但位置是否一样
      //   }
      // }
    } else {
      // 老的没有children，新的有children
      // 清空老的节点的内容
      oldVnode.elm.innerHTML = "";
      // 遍历新的vnode节点，上树
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
