from flask import Flask, render_template, session, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
import os
import json
from flask.json import JSONEncoder


app = Flask('网购系统')
# 数据库创建语句：create database managersys_db character set utf8mb4;
# 数据库用户名:db
# 数据库密码:123456
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://db:123456@localhost/managersys_db'
app.secret_key = os.urandom(24)
db = SQLAlchemy(app)
