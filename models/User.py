from config import db
import datetime
# 用户类
# Column参数：https://blog.csdn.net/nunchakushuang/article/details/80392200


class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    birthday = db.Column(db.Date, default=datetime.date(1999, 1, 1))

    def __init__(self, uid=None, birthday=None):
        self.uid = uid
        self.birthday = birthday
