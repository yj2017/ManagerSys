from config import db

# 用户类
# Column参数：https://blog.csdn.net/nunchakushuang/article/details/80392200


class Product(db.Model):
    productID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer)
    name = db.Column(db.String(30))
    price = db.Column(db.Float)
    originationt = db.Column(db.String(30))
    saleVolume = db.Column(db.Integer)
    view = db.Column(db.Integer, default=0)
    imgPath = db.Column(db.String(100))  # 图片路径

    def __init__(self, userID=None, name=None, price=None, originationt=None, saleVolume=None, view=None, imgPath=None, productID=None):
        self.productID = productID
        self.userID = userID
        self.name = name
        self.price = price
        self.originationt = originationt
        self.saleVolume = saleVolume
        self.view = view
        self.imgPath = imgPath
