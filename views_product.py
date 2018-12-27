from decorators import *
from config import *
from models.User import User
from models.product import Product


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
        prod.price = f['price']
        #在这里补全其它属性

        db.session.add(prod)
        db.session.commit()
        return render_template('index_admin.html', msg='添加成功！')
    else:
        return render_template('addProduct.html')
