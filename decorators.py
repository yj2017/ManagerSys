from config import *
from functools import wraps
from flask import g, request, redirect, url_for
from models.User import User


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'uid' not in session:
            return redirect(url_for('login', next=request.url))
        g.user = User.query.get(session['uid'])
        return f(*args, **kwargs)
    return decorated_function


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user.role == 1:
            return redirect(url_for('index', next=request.url))
        return f(*args, **kwargs)
    return decorated_function
