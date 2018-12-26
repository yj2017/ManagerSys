from flask import Flask, render_template
from flask import request as req
from config import app, db
from models.User import User
import views_user
import views_product
from decorators import *

@app.route('/test')
def test():
    return render_template('index.html', uname=req.args['uname'])

@app.route('/authtest')
@login_required
def test_auth():
    return 'success'

if __name__ == '__main__':
    # 如果修改了表结构，需要Ctrl+C退出程序，重新运行
    u = User()
    print(u.__dict__)
    db.create_all()  # 生成数据库表结构

    # 在这里写测试代码


    # 测试代码结束
    app.run(debug=True)
    # db.drop_all()  # 删除所有表
    print('exit.....')
