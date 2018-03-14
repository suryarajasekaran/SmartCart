from flask import Flask, render_template
from flask_restful import Api
import json
import time

app = Flask(__name__)
api = Api(app)

@app.route('/ping')
def ping():
    return json.dumps({"status":True})

@app.route('/')
def home():
    return render_template("index.html")
    #return render_template("index.html")

@app.route('/history')
def history():
    return render_template("history.html")
    #return render_template("index.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8882, debug=True)
