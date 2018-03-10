import requests
import json
import datetime

URL = "http://ec2-54-183-133-199.us-west-1.compute.amazonaws.com:8881/list"

def send_data(data):
    headers = {
        'content-type': "application/json"
    }
    response = requests.post(url=URL, data=json.dumps(data), headers=headers)

def create_data(sensor_id, product_id, sensor_type, client_id):
    data = {
        "client_id": client_id,
        "sensor_type": sensor_type,
        "sensor_id": sensor_id,
        "product_id": product_id
    }
    return json.dumps(data)

if __name__ == '__main__':