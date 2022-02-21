## 虚拟DOM库

### h函数

> 用来产生虚拟节点（vnode）

```javascript
var myVnode1 = h(
  "a",
  { 
    props: { href: "https://baidu.com", target: "_blank" },
    class: 'test'
  },
  "百度"
);

// console.log(myVnode1)输出以下
// {
//   children: undefined,
//   data: {
//     props: {
//       href: 'https://baidu.com',
//       target: '_blank'
//     },
//     class: "test"
//   }
//   elm: a,
//   key: undefined,
//   sel: "a",
//   text: "百度"
// }
```

```javascript
// 创建虚拟节点
const vnode = h('ul', {}, [
  h('li', {}, '牛奶'),
  h('li', {}, '咖啡'),
  h('li', {}, '可乐')
])
// console.log(vnode)
// {
//   children:[
//     {
//       children: undefined,
//       data: {},
//       elm: undefined,
//       key: undefined,
//       sel: "li",
//       text: "牛奶"
//     },
//     {
//       children: undefined,
//       data: {},
//       elm: undefined,
//       key: undefined,
//       sel: "li",
//       text: "咖啡"
//     },
//     {
//       children: undefined,
//       data: {},
//       elm: undefined,
//       key: undefined,
//       sel: "li",
//       text: "可乐"
//     }
//   ],
//   data: {},
//   elm: undefined,
//   key: undefined,
//   sel: "ul",
//   text: undefined
// }
```

> diff算法

让dom进行最小量更新。

key是节点的唯一标识，它能告诉diff算法，在更改前后它们是同一个dom节点

只有是同一个虚拟节点（选择器相同且key相同），才进行精细化比较

只进行同层比较，不会进行跨层比较


### diff算法子节点优化策略

按顺序比对，四种命中查找，命中一种不再继续比对，如果都没命中，就需要用循环来寻找

> 新前与旧前

> 新后与旧后

> 新后与旧前 （此规则命中时，需要移动旧前指向的节点到老节点的旧后的后面）

> 新前与旧后 （此规则命中时，需要移动旧后指向的节点到老节点的旧前的前面）

如果是旧节点先循环完毕，说明新节点中有要插入的节点

如果是新节点先循环完毕，如果老节点中还有剩余节点，说明它们是要被删除的节点

新旧两列对比中,前往下移,后往上移
