import json
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("cred/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def getFcmToken():
    filepath = "cred/fcmToken.txt"

    with open(filepath, "r") as file:
        FCM_TOKEN = file.read()

    return FCM_TOKEN

def getProjectId():
    return cred.project_id

def getAccessToken():
    return cred.get_access_token().access_token



# print(getProjectId())
# print(getAccessToken())