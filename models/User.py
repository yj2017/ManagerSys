from config import db
import datetime
# 用户类
# Column参数：https://blog.csdn.net/nunchakushuang/article/details/80392200


class User(db.Model):
    userID = db.Column(db.Integer, primary_key=True,autoincrement=True)
    birthday = db.Column(db.Date, default=datetime.date(1999, 1, 1))
    pswd = db.Column(db.String(30))
    sex=db.Column(db.Integer)
    accPoint=db.Column(db.Integer,default=0)
    address= db.Column(db.String(30))
    telephone =db.Column(db.String(11))
    username=db.Column(db.String(30))
    role=db.Column(db.Integer,default=1)

    def __init__(self, username=None,pswd=None,birthday=None,sex=None,accPoint=None,address=None,telephone=None,role=None, userID=None):
        self.userID = userID
        self.pswd=pswd
        self.username=username
        self.birthday = birthday
        self.accPoint=accPoint
        self.address=address
        self.telephone=telephone
        self.sex=sex
        self.role=role
        

