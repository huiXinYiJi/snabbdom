import vnode from "./vnode";

/**
 * * 编写h函数，三个参数版本
 * @param {string} sel
 * @param {VNodeData | null} data
 * @param {string | Array | VNodeChildren} c
 * @returns {VNode}
 */
export default function h(sel, data, c) {
  if (arguments.length !== 3) {
    throw new Eror("h函数必须为三个参数");
  }
  if (typeof c === "string" || typeof c === "number") {
    // h('div', {}, '文字')
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // h('div', {}, [])
    let children = [];
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === "object" && c[i].hasOwnProperty("sel"))) {
        throw new Error("传入的数组子项中有非 h函数");
      }
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
    // h('div', {}, h())
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error("h函数，传入的第三个参数类型不对");
  }
}
