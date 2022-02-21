import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建出patch函数
const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

// 创建虚拟节点
var myVnode1 = h(
  "a",
  { props: { href: "https://baidu.com", target: "_blank" }, class: "test" },
  "百度"
);
console.log(myVnode1);

var vnode2 = h("div", "hello");
console.log(vnode2);
//让虚拟节点上树
const container = document.getElementById("container");
patch(container, vnode2);

// const vnode = h(
//   "div#container.two.classes",
//   { on: { click: function () {} } },
//   [
//     h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//     " and this is just normal text",
//     h("a", { props: { href: "/foo" } }, "I'll take you places!"),
//   ]
// );
// // Patch into empty DOM element – this modifies the DOM as a side effect
// patch(container, vnode);

// const newVnode = h(
//   "div#container.two.classes",
//   { on: { click: function () {} } },
//   [
//     h(
//       "span",
//       { style: { fontWeight: "normal", fontStyle: "italic" } },
//       "This is now italic type"
//     ),
//     " and this is still just normal text",
//     h("a", { props: { href: "/bar" } }, "I'll take you places!"),
//   ]
// );
// // Second `patch` invocation
// patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
