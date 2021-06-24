# NekoToDo

Native js implements Todos —— 1852345 毛靖鑫

## Welcome to 【电脑端：[Neko Todo](http://mjx.ink)】 or 【移动端：[Neko Todo Mobile](http://todo.mjx.ink)】

---

### 项目地址

#### 电脑端：https://github.com/NeKoSaNnn/NekoToDo

#### 移动端：https://github.com/NeKoSaNnn/NeKoSaNnn.github.io

---

### 项目介绍

#### 无任何框架，本地持久化存储，原生开发，实现的 Todo MVC，仅前端模块，不收集任何用户信息，请放心使用~

---

### 项目结构

└─ css<br/>
　 │ main.css<br/>
　 │ modal.css<br/>
　 │ popbtn.css<br/>
　 │ preload.css<br/>
└─ fonts<br/>
　 │ Inkfree.ttf<br/>
　 │ mvboli.ttf<br/>
└─ icon<br/>
　 │ logo.png<br/>
└─ js<br/>
　 │ localStore.js<br/>
　 │ modal.js<br/>
　 │ preload.js<br/>
　 │ star_bg.js<br/>
　 │ toastr.js<br/>
　 │ todo_main.js<br/>
　 │ tool.js<br/>
└─ vendor<br/>
　 └─fontawesome-5.15.3<br/>
　　 ├─css<br/>
　　 ├─js<br/>
　　 └─webfonts<br/>
└─ index.html<br/>

---

### 设计思路

- #### 使用 `localStorage` 进行数据持久化存储
- #### 通过 `window.location.hash` 进行过滤选择判断
- #### 加入功能栏进行批量操作，并使用悬浮弹出按钮进行收纳，简洁页面
- #### 通过加入模式切换按钮在【Add 模式】与【Search 模式】之间切换，不进行页面跳转而做到了功能的完全扩增（Search 模块相较于 Add 模块是相似但又有区别的全新内容），简洁页面
- #### 相应的过滤块下功能栏的批量操作是相对应的，不采用全局操作，只对当前过滤块操作
- #### 采用图标代替文字，直观易懂，并加入`title`元素设置提示
- #### 采用模态框进行内容修改，对于多行内容提供支持，进行完全展示
- #### 对于每条 Todo 设定最小高度与最大高度（最多显示 4 行内容`-webkit-box`），多余内容进行省略号显示，提高用户体验，避免一行到底

---

### 功能点介绍

- #### 基本功能
  - 新增 Todo
  - 删除 Todo
  - 展现列表
  - 全部取消完成 (All Todo)【对于当前过滤块的内容】
  - 全部完成(All Done)【对于当前过滤块的内容】
  - 删除全部已完成(Delete All Done)【对于当前过滤块的内容】
  - localStorage 保存页面状态，在不清除浏览器数据的情况下保存数据，刷新页面可恢复
- #### 高级功能
  - 过滤列表，伪 Tab 块的实现
  - 编辑单条 Todo 内容
- #### 额外功能
  - **星标**(对 Todo 进行收藏)，并可以进行星标过滤
  - **全部删除**(Delete All)【对于当前过滤块的内容】
  - **搜索 Todo**(对 Todo 根据内容进行搜索)，并可**根据过滤 Tab 来筛选搜索内容**
  - **显示 Todo,Done,Star 的总记录数**【对于 Add Todo 显示不受过滤 Tab 影响，对于 Search Todo 根据过滤 Tab 进行实时更新】
  - 对编辑后的 Todo 内容，进行前端友好提示【<span style="color:red">_New !_</span>】，该提示会在最新修改完成 6h 后自动消失
  - 记录 Todo 最新的更新时间，初始时间为添加时间

---

### HTML 设计

- `index.html`
  - 背景部分:`#stars`
    - 生成星星背景，如果页面存在明显卡顿则删除该元素
  - 模态框：`#modal`
    - 模态框内容
  - 主要内容：`#content`
    - 包含标题，统计数字，输入框，以及 Todo 列表
  - 左悬浮弹出按钮:`#todo-left-pop`
    - 包含【Done All】,【Cancel Done All】,【Delete All】,【Change Model】四个功能块
  - 右悬浮按钮：`#todo-right-pop`
    - 【Clear Done】功能块

---

### CSS 设计

- `main.css`
  主要部分的 css，网页整体的 css 设计，进行响应式支持
- `modal.css`
  模态框整体的 css,进行渐变色与动画设计，进行响应式支持
- `preload.css`
  预加载样式的 css，主要进行预加载动画设计
- `popbtn.css`
  悬浮弹出按钮的 css，主要进行弹出动画设计

---

### JS 设计

- `localStore.js`
  主要进行 localStorage 的初始化，更新与写入操作，用于前端的数据持久化操作
- `modal.js`
  主要进行模态框开启，关闭，修改保存的逻辑实现，并且实现了空白处（模态框外）点击关闭的效果，并且进行了模态框输入框的内容非空判断
- `preload.js`
  主要进行预加载的控制实现，但页面加载完毕后短暂延迟关闭遮罩层
- `star_bg.js`
  主要进行背景星星的生成与位移控制
- `toastr.js`
  主要进行悬浮提示框的生成
- `tool.js`
  工具辅助 JS，为适应本人使用习惯，模仿 Jquery 风格进行部分简化表达
- `todo_main.js`
  Todo 的核心逻辑 JS
  - `window.load`:
    - 模型初始化
    - 监听事件初始化绑定
    - 初始化搜索栏与添加栏状态切换
  - `initMyToDo`:
    - 初始化动态创建 Todo 列表，在模型初始化时被调用
  - `addToDo`:
    - 在【Add 状态】下对相应的过滤块添加一条内容
    - 绑定该条内容的监听事件
  - `updateMyToDo`:
    - 用户在【Add 状态】 下点击过滤标签进行内容过滤时所调用
  - `updateMyOneToDo`:
    - 用户在修改内容后，单独更新修改块，优化效率
  - `deleteToDo`:
    - 每条 Todo 均绑定的删除按钮的触发事件（进行删除操作）
  - `starToDo`:
    - 每条 Todo 均绑定的星标按钮的触发事件（进行 Start 与 Not Star 的状态切换）
  - `updateStar`:
    - 更新 star 切换的 css 样式，在`starToDo`后触发
  - `doneToDo`:
    - 每条 Todo 均绑定的完成按钮的触发事件（进行 Todo 与 Done 的状态切换）
  - `updateDone`:
    - 更新 done 切换的 css 样式，在`doneToDo`后触发
  - `editText`:
    - 绑定点击内容块弹出模态框进行修改的事件
  - `setItemStyle`:
    - 设置单条 Todo 的 css 样式，主要服务于工具栏按钮（【Done All】,【Cancel Done All】,【Delete All】,【Clear Done】）
  - `deleteAll`:
    - 工具栏的删除全部（Delete All）的绑定事件
  - `doneAll`:
    - 工具栏的完成全部（Done All）的绑定事件
  - `notdoneAll`:
    - 工具栏的取消全部完成（Cancel Done All）的绑定事件
  - `clearDone`:
    - 工具栏的清除已完成（Clear Done）的绑定事件
  - `updateDateTime`:
    - 在修改内容后进行【New!】提示，该提示在 6h 后自动消失
  - `filter`:
    - 过滤函数，根据【Add 模式】与【Search 模式】进行选择性过滤，来调用不同的函数
  - `changeModel`:
    - 工具栏的切换模式按钮绑定的事件，用于【Add 模式】与【Search 模式】的切换
  - `updateMySearch`:
    - 用户在【Search 状态】 下点击过滤标签进行内容过滤时所调用
  - `Search`:
  - 用户在【Search 状态下】在输入框进行搜索所绑定的事件

---

### 参考源码

- #### `vendor/fontawsome-5.13.3/` 参考 100%
  来源：https://fontawesome.com/v5.15/how-to-use/on-the-web/setup/getting-started
- #### `toastr.js` 参考 80%
  来源：https://github.com/mehmetemineker/vanilla-toast
- #### `modal.css` 参考 20%

  来源:https://blog.csdn.net/zl_best/article/details/62423802

- #### `star_bg.js` 参考 20%

  来源：https://www.jq22.com/jquery-info22256

- #### `popbtn.js` 参考 10%
  来源：http://www.dmaku.com/jquery-1273.html
