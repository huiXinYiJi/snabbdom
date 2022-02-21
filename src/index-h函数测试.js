import h from "./mysnabbdom/h";

var myVnode = h("div", {}, h("span", {}, "hello"));

console.log(myVnode);
