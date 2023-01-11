/*
 * 登陆的路由组件
 */

import React, {Component} from 'react';

import './login.less'
import logo from './images/logo.png'

import {Form, Icon, Input, Button} from 'antd';

const Item = Form.Item  // 不能写在import之前

class Login extends Component {

  handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('提交登陆的ajax请求: ', values);
      } else {
        console.log('检验失败!')
      }
    });


    //   //得到form对象
    //   const form = this.props.form
    //   // 获取表单项的输入数据
    //   const values = form.getFieldsValue()
    //   console.log('getFieldsValue()', values)
  }

  /*
  * 对密码进行自定义验证
  * */
  validatorPwd = (rule, value, callback) => {
    console.log('validatorPwd()', rule, value)
    if (!value) {
      callback('必须输入密码')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须为英文、数字、下划线组成')
    } else if (value.length < 6) {
      callback('密码长度不能小于6位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else {
      callback()  // 验证通过
    }
  }


  render() {
    // 得到具有强大功能的form对象
    const form = this.props.form
    const {getFieldDecorator} = form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                // 声明式验证,直接使用别人定义好的验证规则进行验证
                rules: [
                  {
                    required: true, whitespace: true, message: '用户名不能为空'
                  },
                  {
                    required: true, min: 4, message: '用户名至少4位'
                  },
                  {
                    required: true, max: 12, message: '用户名最多12位'
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/, message: '请使用英文、数字、下划线组成'
                  },
                ]
              })(<Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Username"
              />)}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.validatorPwd
                  }
                ]
              })(<Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Password"
              />)}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 陆
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}


/*
* 1.高阶函数
*   1) 一类特别的函数
*     a.接收函数类型的参数
*     b.函数的返回值是函数
*   2) 常见的高阶函数
*     a. 定时器: setTimeout()/setInterval()
*     b. Promise: Promise(()=>{}), then(value=>{},reason=>{})
*     c. 数组遍历相关函数: forEach()/filter()/map()/reduce()/find()/findIndex()
*     d. 函数对象的bind()
*     e. Form.create()()/getFieldDecorator()()
*   3) 高阶函数更加动态,更加具有扩展性
*
* 2.高阶组件
*   1) 高阶组件本质就是一个函数
*   2) 接收一个组件(被包装组件),返回一个新的组件(包装组件), 新组件内部渲染被包装的组件,包装组件会向被包装组件传入特定属性
*   3) 作用:扩展组件的功能
*   4) 高阶组件也是一个高阶函数: 接收一个组件函数,返回一个新的组件函数
 */


/*
* 包装form组件,生成一个新的组件:Form(Login)
* 新组件会向Form组件传递一个强大的对象属性:form
*/
const WrapLogin = Form.create()(Login);
export default WrapLogin

/*
* 1.前台表单验证
* 2.收集表单输入的数据
*/