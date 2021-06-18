# NekoToDo

Native js implements ToDo Lists —— Neko

## Welcome to [Neko Todo](http://todo.mjx.ink) or [Neko Todo Github page](https://nekosannn.github.io)

### 项目介绍

### 项目结构

### 各模块功能点介绍

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

### HTML 设计

### CSS 设计

### JS 设计

### 参考源码

- #### `vendor/fontawsome-5.13.3/` 参考 100%
  来源：https://fontawesome.com/v5.15/how-to-use/on-the-web/setup/getting-started
- #### `toastr.js` 参考 95%
  来源：https://github.com/mehmetemineker/vanilla-toast
- #### `preload.css` 参考 60%
  来源：
- #### `modal.css` 参考 20%
  来源:
- #### `popbtn.js` 参考 10%
  来源：
- #### `star_bg.js` 参考 30%
  来源：
