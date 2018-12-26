from config import db
# 管理员类


class Administrator(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    uname = db.Column(db.String(30))
    pswd = db.Column(db.String(30))

    def __init__(self, uid=None, uname=None, pswd=None):
        self.uid = uid
        self.uname = uname
        self.pswd = pswd
