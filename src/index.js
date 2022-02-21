import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

// var myVnode1 = h("h1", {}, "你好");

var myVnode1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "QQQ" }, "QQQ"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
]);
const container = document.getElementById("container");
const btn = document.getElementById("btn");

patch(container, myVnode1);

var myVnode2 = h("ul", {}, [
  h("li", { key: "C" }, "C"),
  h("li", { key: "QE" }, "QE"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
  h("li", { key: "F" }, "F"),
  h("li", { key: "A" }, "AAAA"),
]);

btn.onclick = function () {
  patch(myVnode1, myVnode2);
};
