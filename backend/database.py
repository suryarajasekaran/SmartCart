import pymongo
import ast
import json
from bson import json_util
from bson.objectid import ObjectId
import os

class DataAccess(object):

    def __init__(self):
        mongodb_url = "mongodb://mongo:27017"
        self.mongodb_obj = MongoDB(url=mongodb_url)

class MongoDB(object):

    def __init__(self, url):
        self.client = pymongo.MongoClient(url)
        self.default_db = self.client.get_default_database()
        self.collection_list = self.default_db["list"]
        self.collection_product = self.default_db["product"]

    @staticmethod #converts bson to json
    def json_out(results):
        json_results = []
        for result in results:
            json_results.append(result)
        return ast.literal_eval(json.dumps(json_results, default=json_util.default))

    ####################
    # LIST
    ####################

    def add_list(self, list_data):
        self.collection_list.insert(list_data)
        return True

    def get_list(self, query_filter={}):
        return self.json_out(self.collection_list.find(query_filter))

    def update_list(self, query_filter={}, list_update_data={}):
        query_data = self.get_list(query_filter=query_filter)
        if len(query_data) == 1:
            self.collection_list.update_one({"id" : ObjectId(query_data[0]["_id"]["$oid"])}, {"$set" : list_update_data})
            return True
        else:
            return False

    def delete_list(self, query_filter={}):
        query_data = self.get_list(query_filter=query_filter)
        if len(query_data) == 1:
            self.collection_list.remove(ObjectId(query_data[0]["_id"]["$oid"]))
            return True
        else:
            return False

    ####################
    # PRODUCT
    ####################

    def add_product(self, product_data):
        self.collection_product.insert(product_data)
        return True

    def get_product(self, query_filter={}):
        return self.json_out(self.collection_product.find(query_filter))

    def update_product(self, query_filter={}, product_update_data={}):
        query_data = self.get_product(query_filter=query_filter)
        if len(query_data) == 1:
            self.collection_product.update_one({"id" : ObjectId(query_data[0]["_id"]["$oid"])}, {"$set" : product_update_data})
            return True
        else:
            return False

    def delete_product(self, query_filter={}):
        query_data = self.get_product(query_filter=query_filter)
        if len(query_data) == 1:
            self.collection_product.remove(ObjectId(query_data[0]["_id"]["$oid"]))
            return True
        else:
            return False