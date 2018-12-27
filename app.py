from flask import Flask, render_template
from flask import request as req
from config import app, db
from models.User import User
import views_user
import views_product
from decorators import *

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
