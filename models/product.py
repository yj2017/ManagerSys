from config import db

# 用户类
# Column参数：https://blog.csdn.net/nunchakushuang/article/details/80392200


class Product(db.Model):
    productID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer)
    name = db.Column(db.String(30))
    price=db.Column(db.Float)
    originationt=db.Column(db.String(30))
    saleVolume= db.Column(db.Integer)
    view =db.Column(db.Integer)


    def __init__(self, productID=None,userID=None,name=None,price=None, originationt=None,saleVolume=None,view=None):
        self.productID=productID
        self.userID=userID
        self.name=name
        self.price=price
        self.originationt=originationt
        self.saleVolume=saleVolume
        self.view=view
        

