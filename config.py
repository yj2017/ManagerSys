from flask import Flask, render_template, session, request
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask('网购系统')
# 数据库创建语句：create database managersys_db character set utf8mb4;
# 数据库用户名:root
# 数据库密码:123456
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/managersys_db'
app.secret_key = os.urandom(24)
db = SQLAlchemy(app)