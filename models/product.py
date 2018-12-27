from config import db

# 用户类
# Column参数：https://blog.csdn.net/nunchakushuang/article/details/80392200


class Product(db.Model):
    productID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userID = db.Column(db.Integer)
    name = db.Column(db.String(30))
    price = db.Column(db.Float)
    origination = db.Column(db.String(30))
    saleVolume = db.Column(db.Integer)
    view = db.Column(db.Integer, default=0)
    imgPath = db.Column(db.String(100))  # 图片路径
    # details
    brand = db.Column(db.String(30))
    type = db.Column(db.String(30))
    details = db.Column(db.String(100))

    def __init__(self, userID=None, name=None, price=None, origination=None, saleVolume=None, view=None, imgPath=None, brand=None, type=None, details=None, productID=None):
        self.productID = productID
        self.userID = userID
        self.name = name
        self.price = price
        self.origination = origination
        self.saleVolume = saleVolume
        self.view = view
        self.imgPath = imgPath
        self.brand = brand
        self.details = details
        self.type = type
