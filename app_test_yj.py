from flask import Flask, render_template
from flask import request as req
from models.Administrator import Administrator
from config import app, db
from models.User import User
import views_auth


@app.route('/test')
def test():
    return render_template('index.html', uname=req.args['uname'])


if __name__ == '__main__':
    # 如果修改了表结构，需要Ctrl+C退出程序，重新运行
    db.create_all()  # 生成数据库表结构

    # 在这里写测试代码
    admin = Administrator(1, 'yml', '123456')
    print(admin.uname)
    user = User()
    print(user.birthday)
    db.session.add(user)
    db.session.commit()

    print(User.query.first())

    # 测试代码结束
    app.run(debug=True)
    db.drop_all()  # 删除所有表
    print('exit.....')