from config import db
import datetime
# 管理员类


class Reback(db.Model):
    rebackID = db.Column(db.Integer, primary_key=True,autoincrement=True)
    orderID = db.Column(db.Integer)
    rebackTime=db.Column(db.Date)
    rebackReason=db.Column(db.String(30))
    sumMoney=db.Column(db.Float)

    def __init__(self,orderID=None,rebackTime=None,rebackReason=None,sumMoney=None,rebackID=None):
        self.rebackID=rebackID
        self.orderID=orderID
        self.rebackReason=rebackReason
        self.rebackTime=rebackTime
        self.sumMoney=sumMoney
