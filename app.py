from flask import Flask
from models.Administrator import Administrator
from config import app, db
import views_auth


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True)
