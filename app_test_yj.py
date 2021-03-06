from flask import Flask, render_template
from flask import request as req
from config import app, db
from models.User import User
from models.product import Product
from models.ProductOrder import ProductOrder 
import views_user
import views_product
import datetime


@app.route('/test')
def test():
    return render_template('index.html', uname=req.args['uname'])


if __name__ == '__main__':
    # 如果修改了表结构，需要Ctrl+C退出程序，重新运行
    db.create_all()  # 生成数据库表结构

    # 在这里写测试代码

    user1=User('yangjin','111111',datetime.date(1997,8,27),1,0,'湖北省武汉市武汉理工大学余家头校区','18672019299',0)
    user2=User('yj','111111',datetime.date(1997,8,27),1,0,'湖北省武汉市武汉理工大学南湖校区','18672019299',0)
    product1=Product(2,'优衣库羽绒服女装',499,'武汉',195,202,'D:\\tomcat9\\webapps\\managerSys\\pictures\\UNIQLO women coat.jpg','UNIQLO','冬装 衣服','填充白鸭绒，材料不错，不会钻毛,三色可以选择')
    product2=Product(2,'优衣库牛仔裤女装',299,'武汉',10,210,'D:\\tomcat9\\webapps\managerSys\\pictures\\women jeans1.jpg','UNIQLO','秋冬 裤子','100%棉')
    product3=Product(2,'纯羊毛帽男女',199,'上海',100,200,'D:\\tomcat9\\webapps\\managerSys\\pictures\\hat1.jpg','UNIQLO','帽','100%羊毛')
    
    # product4=Product(3,'优衣库羽绒服男装',499,'武汉',195,400,'D:\\tomcat9\\webapps\\managerSys\\pictures\\UNIQLO man coat.jpg','UNIQLO','冬装 男装 衣服','填充白鸭绒，材料不错，不会钻毛,三色可以选择')
    # product5=Product(4,'HM男帽秋冬',199,'武汉',195,400,'D:\\tomcat9\\webapps\\managerSys\\pictures\\hat2.jpg','HM','冬装 男帽','100%棉')
    # order1=ProductOrder(1,2,499,datetime.date(2018,12,25),'超级棒',0)
    # order2=ProductOrder(2,2,299,datetime.date(2018,12,25),'便宜又好',1)
    # user1=User('herina yang','111111',datetime.date(1997,8,27),0,0,'北京市丰台区','18672019299',0)
    # user2=User('herina','111111',datetime.date(1997,8,27),1,0,'湖北省武汉市武汉大学','18672019299',0)
    

    # print(user1.birthday)
    # db.session.add(user1)
    # db.session.add(user2)
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
   
    db.session.commit()
    print(User.query.first())
    

    
    # 测试代码结束
    app.run(debug=True)
    # app.run()
    db.drop_all()  # 删除所有表
    print('exit.....')
