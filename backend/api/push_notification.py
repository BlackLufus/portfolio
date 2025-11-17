import json
import os
import firebase_admin
from firebase_admin import credentials

# with open("cred/serviceAccountKey.json") as f:
#     print(json.dumps(f.read()))

cred_json = os.getenv("FIREBASE_CREDENTIALS")

if not cred_json:
    raise RuntimeError("FIREBASE_CREDENTIALS not set")

cred_dict = json.loads(cred_json)
cred = credentials.Certificate(cred_dict)
firebase_admin.initialize_app(cred)

def getFcmToken():

    return os.getenv("FCM_TOKEN")

def getProjectId():
    return cred.project_id

def getAccessToken():
    return cred.get_access_token().access_token
