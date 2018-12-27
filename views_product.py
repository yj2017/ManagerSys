from decorators import *
from config import *
from models.User import User
from models.product import Product
from models.PurchaseCar import PurchaseCar
from datetime import datetime



@app.route('/index')
@login_required
def index():
    prods = Product.query.all()
    print(len(prods))
    return render_template('index.html', prods=prods)


@app.route('/index_admin')
@login_required
# @admin_required
def index_admin():
    return render_template('index_admin.html')


@app.route('/add_product', methods=['GET', 'POST'])
@login_required
# @admin_required
def add_product():
    if request.method == 'POST':
        f = request.form
        prod = Product()
        prod.name = f['productName']
        prod.price = float(f['price'])
        #在这里补全其它属性
        prod.origination=f['origination']
        prod.saleVolume=int(f['saleVolume'])
        # prod.view=f['view']
        # prod.userID=f['userID']
        prod.brand=f['brand']
        prod.type=f['type']
        prod.details=f['details']
        db.session.add(prod)
    
        db.session.commit()
        return render_template('index_admin.html', msg='添加成功！')
    else:
        return render_template('addProduct.html')


@app.route('/product_detail/<int:pid>')
@login_required
def prod_detail(pid):
    prod = Product.query.get(pid)
    prod.view = prod.view + 1
    db.session.add(prod)
    db.session.commit()
    return render_template('product_detail.html', prod=prod)


@app.route('/add_cart/<int:pid>')
@login_required
def add_cart(pid):
    chart = PurchaseCar(pid, g.user.userID, datetime.now())
    db.session.add(chart)
    db.session.commit()
    return redirect(url_for('chart', msg='加入成功！'))


@app.route('/chart')
@login_required
def chart():
    chart = PurchaseCar.query.filter_by(
        userID=g.user.userID).order_by(PurchaseCar.purchaseTime).all()
    prods = []
    for c in chart:
        prods.append(Product.query.get(c.productID))
    return render_template('shoppingCar.html', prods=prods)
