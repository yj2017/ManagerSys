from decorators import *
from config import *
from models.User import User


@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        uname = request.form['username']
        pswd = request.form['password']
        user = User.query.filter_by(username=uname).first()
        if user is None:
            return render_template('login.html', err_msg='用户名不存在！')
        elif user.pswd != pswd:
            return render_template('login.html', err_msg='密码错误！')
        else:
            session['uid'] = user.userID
            g.user = user
            return render_template('index.html')
    else:
        if 'uid' in session:
            return render_template('index.html')
        else:
            return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        uname = request.form['username']
        pswd = request.form['password']
        rpswd = request.form['rpassword']
        if pswd == '' or rpswd == '' or pswd != rpswd:
            return render_template('register.html', err_msg='两次密码不同！')

        user = User.query.filter_by(username=uname).first()
        if user is not None:
            return render_template('register.html', err_msg='用户名已存在！')
        else:
            user = User(uname, pswd)
            db.session.add(user)
            db.session.commit()
            return render_template('login.html', err_msg='注册成功！')
    else:
        return render_template('register.html')


@app.route('/logout')
@login_required
def logout():
    session.clear()
    return render_template('login.html', err_msg='退出登录！')
