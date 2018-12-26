from config import db
import datetime

class Order(db.Model):
    orderId=db.Column(db.Integer,primary_key=True,autoincrement=True)
    productID=db.Column(db.Integer)
    userID=db.Column(db.Integer)
    sumMoney=db.Column(db.Float)
    oderTime= db.Column(db.Date)
    comment=db.Column(db.String(100))
    status=db.Column(db.Integer)

    def __init__(self, orderID,productID,userID,sumMoney,oderTime ,comment ,status)
        self.orderID=orderID
        self.productID=productID
        self.userID=userID
        self.sumMoney=sumMoney
        self.orderTime=oderTime
        self.comment=comment
        self.status=status



