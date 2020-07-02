# react-redux 

1. react 插件库
2. 简化在react中使用redux  

安装  
npm install react-redux --save  

## react-redux将所有的组件分为两类 
1. UI组件  
只负责显示  没有任何业务逻辑 
使用props接收数据 
没有任何redux语法 
一般放在components文件夹下面 

2. 容器组件 
专门负责数据和业务逻辑  不负责UI显示  
使用redux语法  
一般放在containers文件夹下面

### API  
1. Provider 
所有的组件通过它获取state
```
<Provider store={store}>
    <App />
</Provider>
```

2. connect() 
```
  // 使用它来包装 UI 组件生成容器组件 
  connect(
            mapStateToprops,
            mapDispatchToProps
        )(Counter)  
```

3. mapStateToprops()
```
    //将 state 数据转换为 UI 组件的标签属性 function mapStateToProps (state) {
          return {
            count: state
    } 
}
```

4. mapDispatchToProps()

```
// 函数: 将分发 action 的函数转换为 UI 组件的标签属性
function mapDispatchToProps(dispatch) { return {
increment: (number) => dispatch(increment(number)),
decrement: (number) => dispatch(decrement(number)), }
}
```

```
// 简单写法 
// 可以直接指定包含多个 action 方法 const mapDispatchToProps = {
    increment,
    decrement 
}
```
