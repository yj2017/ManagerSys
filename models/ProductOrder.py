from config import db
import datetime

class ProductOrder(db.Model):
    orderID=db.Column(db.Integer,primary_key=True,autoincrement=True)
    productID=db.Column(db.Integer)
    userID=db.Column(db.Integer)
    sumMoney=db.Column(db.Float)
    orderTime= db.Column(db.Date)
    comment=db.Column(db.String(100))
    status=db.Column(db.Integer)

    def __init__(self,productID=None,userID=None,sumMoney=None,orderTime=None,comment=None,status=None,orderID=None):
        self.orderID=orderID
        self.productID=productID
        self.userID=userID
        self.sumMoney=sumMoney
        self.orderTime=orderTime
        self.comment=comment
        self.status=status



