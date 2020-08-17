## 前端的结构与开发规范参考

### 1.0 命名规范

数据库表名和字段名采用驼峰命名法。

所有变量/方法采用驼峰命名法。

所有的页面名采用大写英文字母开头。

### 1.1 目录的划分

```javascript
|-assests    // 引入的资源，包括wxss，icon，img
	
	|-css

	|-icon

	|-img

|-components // 公共组件（多个页面共享的）

|-network	 // 网络请求

	|-request.js // 封装的axios请求
	
	|- xxx.js 	 // 引用request模块并封装数据请求块，用于页面引用

|-router	// 全局路由

	|-index.js	

|-store      // vuex全局数据

	|-index.js	  // 全局数据注册
	
	|-mutaions.js // 改变vuex的指定方法

|-views      // 页面

|-utils      // 全局工具类（如封装链表、全局方法）
```

### 1.2 页面的划分（Views）

> 第一层一般以主要功能页面划分，再将各页面对应的展示组件划入其中

例：

```javascript
|-Home

|-Manage

|-Message

|-Post

|-Profile
```

> 第二层：

```javascript
|-childCpn  //存储该页面或该页面子页面需要用到的组件

|-otherPage1

|-otherPage2 //命名正常取就可以，表示该页面对应需展示的其他页面

xxx.vue //这一部分为一级目录对应的页面信息
```

### 1.3代码规范

#### 1.3.1 html

```json
 {
     "parser": "html",
     "useTabs": false,
     "tabWidth": 2,
     "printWidth": 100,
     "singleQuote": false
 },
```

vscode插件Prettier - Code formatter默认配置即可，重点是tab为2个空格长，一个标签属性超过3个即换行。

html示例：

```vue
<div class="discuss-post-header">
  <img class="left" :src="item.imagePath" alt="图片无法加载QAQ" />
    <div class="name">
      {{ item.userName }}
    </div>
    <img
       class="level"
       :src="getLevel(item.userLevel)"
       alt="图片无法加载QAQ"
       />
    <div class="time">
      {{ item.createTime }}
    </div>
    <div class="postLevel">
      <div class="postLevel-content">
          等级Lv.{{ item.postLevel }}以上可浏览
      </div>
  </div>
</div>
```

#### 1.3.2 css（可以按照自己习惯命名，但请一定命名的特殊一点或直接样式隔离）

- 页面均使用flex布局来布局，尽量避免使用float，绝对定位

- 在每一个组件内，按照**wrapper布局**，**header头部**，**main主要部分**，**aside侧边**，**content内容**...等有意义且通用的名称进行class选择器命名，在一级下进一步使用有意义的单词进行分栏，如**header-title标题**，**header-content内容**，以及再下一级的**header-content-iamge头部内容的图片**。尽量避免三个单词以上的串联，过多的应考虑组件化。
- 注意上述为**块级标签**的命名，具体的元素标签即块级标签的子标签命名，应参考BEM标准

```css
.list{}			/* 块级标签 */
.list_select{}	/* 块级标签的修饰 */
.list__item{}	/* 块级标签的子元素 */
.list__item--active{}	/* 块级标签子元素的修饰 */
```

- 修饰器的使用顺序

```
:focus -> :hover -> :active
```

- 子css的语句顺序：首字母排序

```css
.header-assure {
  align-items: center;
  border-radius: 5%;
  background-color: #fff;
  color: white;
  display: flex;
  font-size: 20px;
  height: 45px;
  justify-content: center;
  margin-right: 20px;
  width: 100px;
}c
```

#### 1.3.3 javascript

```javascript

<script>
export default {
  name: "Profile",
  data() {
    return {
      paList: []	// 页面中用到的数据注意加上注释QAQ
    };
  },
  computed: {		// 善用计算属性
    isAdmin() {
      return this.$store.state.user.userIdentity == 1;
    }
  },
  components: {},
  methods: {						 // 所有自己定义的方法写在methods内
    onMyButtonTap: function(){},	 // 方法命名首字母小写，驼峰
    _myPrivateMethod: function(){    // 若有内部方法（仅由本页面其他方法调用的）建议以下划线开头
    }
  }
  created() {}		// 生命周期函数单写
};
</script>
```

### 路径配置



### 其他

全局注册组件各人加上自己的前缀，如我注册的就是m-xxx-xxx

所有子组件尽可能地使用样式隔离，如需引用全局样式可以单独import

待补充