from config import db

class Product(db.Model):
    productID = db.Column(db.Integer, primary_key=True,autoincrement=True)
    brand=db.Column(db.String(30))
    type=db.Column(db.String(30))
    details=db.Column(db.String(100))


    def __init__(self, productID=None,brand=None,type=None,details=None):
        self.productID=productID
        self.brand=brand
        self.details=details
        self.type=type
      