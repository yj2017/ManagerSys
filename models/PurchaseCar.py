from config import db
import datetime
# 管理员类


class PurchaseCar(db.Model):
    purchaseID = db.Column(db.Integer, primary_key=True,autoincrement=true)
    productID = db.Column(db.Integer)
    userID = db.Column(db.Integer)
    purchaseTime=db.Column(db.Date)

    def __init__(self,purchaseID=None,productID=None, userID=None,purchaseTime=None):
        self.purchaseID=purchaseID
        self.productID=productID
        self.userID=userID
        self.purchaseTime=purchaseTime
