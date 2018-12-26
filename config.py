from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask('网购系统')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/managersys_db'
db = SQLAlchemy(app)