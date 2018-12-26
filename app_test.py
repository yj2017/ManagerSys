from flask import Flask
from models.Administrator import Administrator
from config import app, db
from models.User import User



@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    admin = Administrator(1, 'yml', '123456')
    print(admin.uname)
    user = User()
    print(user.birthday)
    db.session.add(user)
    db.session.commit()

    print(User.query.first())

    db.create_all()
    app.run(debug=True)
    db.drop_all()
    print('exit.....')