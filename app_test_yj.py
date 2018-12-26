from flask import Flask, render_template
from flask import request as req
from config import app, db
from models.User import User
from models.product import Product

import views_auth
import datetime


@app.route('/test')
def test():
    return render_template('index.html', uname=req.args['uname'])


if __name__ == '__main__':
    # 如果修改了表结构，需要Ctrl+C退出程序，重新运行
    db.create_all()  # 生成数据库表结构

    # 在这里写测试代码

    user1=User('herina','111111',datetime.date(1997,8,27),1,0,'湖北省武汉市武汉理工大学余家头校区','18672019299',0)
    user2=User('yj','111111',datetime.date(1997,8,27),1,0,'湖北省武汉市武汉理工大学南湖校区','18672019299',1)
    product1=Product(2,'优衣库羽绒服女装',499,'武汉',195,202)
    product2=Product(2,'优衣库牛仔裤女装',299,'武汉',10,210)
    product3=Product(2,'纯羊毛帽男女',199,'上海',100,200)
    product_details1=Product_details('UNIQLO','冬装 女装 衣服','填充白鸭绒，材料不错，但是不会钻毛。白色枣红色藏青色三色可以选择')
    product_details2=Product_details('UNIQLO','冬装 女装 裤装','材料好，轻，一共才200g')
    product_details3=Product_details('UNIQLO','冬 帽子','100%羊毛，暖和，不起球')

    print(user1.birthday)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product_details1)
    db.session.add(product_details2)
    db.session.add(product_details3)
    db.session.commit()

    print(User.query.first())
    







    
    # 测试代码结束
    app.run(debug=True)
    # app.run()
    db.drop_all()  # 删除所有表
    print('exit.....')
