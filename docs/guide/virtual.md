---
sidebarDepth: 4
prev: ./usage
next: false
---

# 虚拟服务与虚拟请求

本架构的设计原则就是将后端的路由模式迁移到前端来使用，提供基于页面级的服务模型和请求调用模式，使前端能够达到逻辑与数据分离的效果。此架构更加适合mock化数据，我们可以采用不同的service编写方式来获取数据，大大解偶了开发过程中数据源与逻辑绑定的痛点。

## 虚拟服务

它是一种基于`KOA`的洋葱模型而建立的服务体系，理论上存在与`Node service`一致的中间件模式，能够使我们使用中间件模型来编写我们的应用。这种设计模式让我们可以搭建大型的后台项目而不用觉得路由难以管理。虚拟服务分为3层模型，即我们熟悉的`MVC`化：

- **M** 指`service`文件夹下的文件。主要用于数据的获取。
- **V** 指`webview`文件夹下的文件。主要用于页面的渲染展示。
- **C** 指`controller`文件夹下的文件。主要用于服务的路由引导和数据的整合。

比如我们需要展示学生的数据列表，那么我们就可以依据`MVC`分层来编写我们的代码：

### 确定数据源

建立一个service文件来获取数据 *File: app/service/student.js*

```javascript
class Student {
  async GetStudents() {
    // 如果我们已经定义了ctx.ajax为请求对象
    return await this.ctx.ajax.get('/api/students');
  }
}
```

如果之后后端的api有所变动，那么我们只需要在service层改动这个方法就行了，而不需要变动在view层的请求方式。如果您还没有理解这句话的意思，没有关系，[往后看](#虚拟请求)。


### 编写页面

我们编写页面完全与vue的组件编写模式相同 *File: app/webview/student.vue*

```vue
<template>
  <ul>
    <li v-for="student in students" :key="student.id">
      {{student.name}} 已经 {{student.age}} 岁了！
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'student',
    props: {
      students: Array
    }
  }
</script>
```

### 定义路由

路由的定义直接可以指定到层controller上，它可以是一个`.js`文件，也可以是一个`.jsx`文件。 这里我们用`jsx`来说明： *File: app/controller/student.jsx*

```javascript
import { Controller, Http, Interface } from '@wox/wox';
import StudentService from '../service/student';
import StudentViewPage from '../webview/student.vue';

@Controller('/student')
export default class Student {
  @Http.Get
  @Interface.Service('student', StudentService)
  async StudentList({ Service }) {
    const students = await Service.student.GetStudents();
    return <StudentViewPage students={students}></StudentViewPage>
  }
}
```

或者我们可以直接用`.js`文件来说明： *File: app/controller/student.js*

```javascript
import { Controller, Http, Interface } from '@wox/wox';
import StudentService from '../service/student';
import StudentViewPage from '../webview/student.vue';

@Controller('/student')
export default class Student {
  @Http.Get
  @Interface.Service('student', StudentService)
  async StudentList({ Service }) {
    const students = await Service.student.GetStudents();
    return await this.ctx.render(StudentViewPage, { students });
  }
}
```

当我们访问`/student`路由的时候，我们就可以看到学生列表了。

### 注意点

当我们使用`.jsx`和`.js`文件来创建路由的时候，他们是有区别的。在`.jsx`文件中我们可以直接使用`<StudentViewPage students={students}></StudentViewPage>`的写法来编写，但是在`.js`文件中您只能使用`await this.ctx.render(StudentViewPage, { students });`方式来编写。他们之间存在着不同的表现方式。

当我们使用`render`函数来渲染页面，如果前后路由渲染的组件为同一个，那么不会产生刷新的效果。但是，如果是`.jsx`写法来渲染页面，一定会看到刷新效果。所以在使用时候要注意这个区别，不然使用`.jsx`会带来额外的副作用。

### 使用普通中间件

比如我们需要在`/student`的路由优先经过一系列函数来处理，那么我们就需要使用中间件，类似于我们提供了比较规范化的`Hooks`模式来预处理请求。我们来将上面的代码改写为中间件模式：*File: app/middleware/student.js*

```javascript {5}
import StudentService from '../service/student';
export default async (ctx, next) => {
  const student = new StudentService(ctx);
  const students = await student.GetStudents();
  ctx.students = students;
  await next();
}
```

修改 *app/controller/student.js* 的调用：

```javascript {11}
import { Controller, Http, Middleware } from '@wox/wox';
import StudentViewPage from '../webview/student.vue';
import StudentMiddleware from '../middleware/student';

@Controller('/student')
export default class Student {
  @Http.Get
  @Middleware(StudentMiddleware) // 只对当前路由经过中间件处理
  async StudentList() {
    return await this.ctx.render(StudentViewPage, { 
      students: this.ctx.students
    });
  }
}
```

或者

```javascript {6}
import { Controller, Http, Middleware } from '@wox/wox';
import StudentViewPage from '../webview/student.vue';
import StudentMiddleware from '../middleware/student';

@Controller('/student')
@Middleware(StudentMiddleware) // 全部路由都将经过中间件
export default class Student {
  @Http.Get
  async StudentList() {
    return await this.ctx.render(StudentViewPage, { 
      students: this.ctx.students
    });
  }
}
```

### 使用 PARAM 中间件

这种中间件是用来拦截请求中出现某个变量的时候优先执行的中间件。比如我们需要对`id`变量的路由优先处理，那么：

```javascript
import { Controller, Http, Middleware } from '@wox/wox';
import StudentViewPage from '../webview/student.vue';

async function StudentMiddleware(value, ctx, next) {
  ctx.value = await ctx.ajax.get('/student/' + value);
  await next();
}

@Controller('/student')
@Param('id', StudentMiddleware) // 全部路由都将经过中间件
export default class Student {
  @Http.Get('/:id(\\d+)')
  async StudentList() {
    return await this.ctx.render(StudentViewPage, { 
      students: ctx.value
    });
  }
}
```

## 虚拟请求

虚拟请求是基于虚拟服务产生的，目的是模拟后端的请求模式，可以在前端通过虚拟请求优先定义数据返回而不依赖后端真实接口，这里就解释了[虚拟服务的service为什么只需要调整数据结构而不动逻辑](#确定数据源)的原因。

### 请求类型

- **PUT** 类似于Http的PUT请求方式，用来表述添加过程。 `C`
- **GET** 类似于Http的GET请求方式，用来表述查询数据。 `R`
- **POST** 类似于Http的POST请求方式，用来表述更新过程。 `U`
- **DELETE** 类似于Http的DELETE请求方式，用来表述删除过程。 `D`

> 其实在虚拟服务一章中已经使用了虚拟请求(Http.Get)，只是表述了一个渲染过程。

### GET & DELETE

这两种方式比较共通，它们的调用方式是

```javascript
@Controller
class Demo {
  @Http.Get
  async Main() {
    // await this.ctx.get('/abc/123');
    // await this.ctx.delete('/abc/123');
  }

  @Http.Get('/abc/:id(\\d+)')
  async ABC() {}

  @Http.Delete('/abc/:id(\\d+)')
  async DEF() {}
}
```

当我们调用`this.ctx.get('/abc/123')`的时候，程序会得到`ABC()`方法的结果返回。同理，会得到`DEF()`方法的结果返回。

### PUT & POST

它们都具有请求数据主体，我们可以通过`ctx.req.body`获取到数据。

```javascript
@Controller
class Demo {
  @Http.Get
  async Main() {
    // await this.ctx.put('/abc/123', { a: 1 });
    // await this.ctx.post('/abc/123', { b: 2 });
  }

  @Http.Put('/abc/:id(\\d+)')
  async ABC() {
    console.log(this.ctx.req.body);
  }

  @Http.Post('/abc/:id(\\d+)')
  async DEF() {
    console.log(this.ctx.req.body);
  }
}
```


### Restfull设计模式

我们建议通过标准的`restfull`风格来设计路由的虚拟请求，比如说：

- **Get: /api** 查询数据
- **Put: /api** 添加数据
- **Post: /api/:id(\\d+)** 更新数据
- **Delete: /api/:id(\\d+)** 删除数据

如果您对`restfull`风格的设计比较了解，那么你就能够管理好你的路由，不至于项目路由的混乱。