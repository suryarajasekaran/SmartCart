from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS, cross_origin
import json
import requests
import datetime

from database import *

origin_str = "*" # 'http://smartcart.com:8881'
app = Flask(__name__)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["CORS_SUPPORTS_CREDENTIALS"]=True
app.config["CORS_ALLOW_HEADERS"] = True
app.config["CORS_EXPOSE_HEADERS"] = True
CORS(app, resources={r"/*": {"origins": origin_str}})

@app.route('/ping')
@cross_origin(origin=origin_str)
def ping():
    return json.dumps({"status":True})

@app.route('/list', methods=['GET','POST', 'PUT'])
@cross_origin(origin=origin_str)
def list():
    if request.method == 'GET':
        arg_state = request.args.get('state', None)
        if arg_state is not None:
            query_filter = {"state":arg_state}
        else:
            query_filter = {}
        data_access_obj = DataAccess()
        output_data = data_access_obj.mongodb_obj.get_list(query_filter=query_filter)
        return json.dumps(output_data)
    elif request.method == 'POST':
        timestamp = datetime.datetime.now()
        json_data = request.get_json(force=True)
        json_data["timestamp"] = timestamp
        json_data["state"] = "active"
        data_access_obj = DataAccess()
        temp_json_data = {
            "query_filter": {"client_id": json_data["client_id"], "state":"active"},
            "list_update_data": {"state":"inactive"}
        }
        data_access_obj.mongodb_obj.update_list(query_filter=temp_json_data["query_filter"], list_update_data=temp_json_data["list_update_data"])
        data_access_obj.mongodb_obj.add_list(list_data=json_data)
        return json.dumps({"status": True})
    elif request.method == 'PUT':
        json_data = request.get_json(force=True)
        if json_data["list_update_data"]["state"] == "bought" or json_data["list_update_data"]["state"] == "remove":
            timestamp = datetime.datetime.now()
            json_data["list_update_data"]["timestamp"] = timestamp
        data_access_obj = DataAccess()
        data_access_obj.mongodb_obj.update_list(query_filter=json_data["query_filter"], list_update_data=json_data["list_update_data"])
        return json.dumps({"status": True})
    else:
        return json.dumps({"status":False})


@app.route('/product', methods=['GET','POST', 'PUT'])
@cross_origin(origin=origin_str)
def product():
    if request.method == 'GET':
        arg_product_id = request.args.get('product_id', None)
        if arg_product_id is not None:
            query_filter = {"product_id": arg_product_id}
        else:
            query_filter = {}
        data_access_obj = DataAccess()
        output_data = data_access_obj.mongodb_obj.get_product(query_filter=query_filter)
        return json.dumps(output_data)
    elif request.method == 'POST':
        json_data = request.get_json(force=True)
        data_access_obj = DataAccess()
        data_access_obj.mongodb_obj.add_product(product_data=json_data)
        return json.dumps({"status": True})
    elif request.method == 'PUT':
        json_data = request.get_json(force=True)
        data_access_obj = DataAccess()
        data_access_obj.mongodb_obj.update_product(query_filter=json_data["query_filter"], product_update_data=json_data["product_update_data"])
        return json.dumps({"status": True})
    else:
        return json.dumps({"status":False})

@app.after_request
def after_request(response):
  #response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin', origin_str))
  # response.headers.add('Access-Control-Allow-Credentials', 'true')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8881, debug=True)