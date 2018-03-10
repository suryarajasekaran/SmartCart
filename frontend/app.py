from flask import Flask, render_template
from flask_restful import Api
import json

app = Flask(__name__)
api = Api(app)

@app.route('/ping')
def ping():
    return json.dumps({"status":True})

@app.route('/')
@app.route('/home')
@app.route('/index')
@app.route('/list')
def home():
    return render_template("index.html")

@app.route('/realtime')
def ping():
    return render_template("realtime.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6662, debug=True)
