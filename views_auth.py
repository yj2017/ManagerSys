from decorators import *
from config import *


@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if request.form['username'] == 'yml':  # 登录成功
            session['user'] = {'uname': request.form['username'],
                               'pswd': request.form['password']}
            return render_template('index.html')
        else:  # 登录失败
            return render_template('login.html', err_msg=request.form['username'])
    else:
        if 'user' in session:
            return render_template('index.html')
        else:
            return render_template('login.html')
