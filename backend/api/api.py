import json
import os
import re
import requests
from dotenv import load_dotenv
load_dotenv()
from datetime import datetime
from flask import Flask, request
from flask_cors import CORS

import push_notification as pn

import database

import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
logger.addHandler(handler)
formatter = logging.Formatter("%(asctime)s [%(levelname)s]-[%(name)s] %(message)s")
handler.setFormatter(formatter)

api = Flask(__name__)
CORS(api)

@api.route('/docs')
@api.route('/docs/<path:path>')
def swagger_docs(path=None):
    if not path or path == 'index.html':
        return api.send_static_file('./swagger/index.html'), 200
    else:
        return api.send_static_file(f'./swagger/{path}'), 200

def build_response(succeed, status, message=None, error_message=None, response=None, headers=None,
                   mimetype='application/json'):
    data = {'succeed': succeed}
    if message is not None:
        data['message'] = message
    if error_message is not None:
        data['error-message'] = error_message
    if response is not None:
        data['response'] = response
    return api.response_class(
        response=json.dumps(data),
        status=status,
        mimetype=mimetype,
        headers=headers
    )

@api.route('/', methods=['GET'])
def get_tree():
    return build_response(True, 200, response={"Endpoints":{
        "/contact": "POST"
    }})

@api.route('/contact', methods=['POST'])
def contact():
    try:
        full_name = request.form.get('full_name')
        if full_name is None or len(full_name) == 0:
            return build_response(False, 400,
                                error_message="Full name is required but not provided!")
        elif len(full_name) > 64:
            return build_response(False, 400,
                                error_message="full_name exceed length")
        email = request.form.get('email')
        if email is not None and len(email) > 100:
            return build_response(False, 400,
                                error_message="email exceed length")
        elif email is not None and len(email) != 0 and not checkEmail(email):
            return build_response(False, 400,
                                error_message="email address is not valid")
        elif email is None or len(email) == 0:
            email = None
        message = request.form.get('message')
        if message is None or len(message) == 0:
            return build_response(False, 400,
                                error_message="message is required but not provided!")
        elif len(message) > 1000:
            return build_response(False, 400,
                                error_message="message exceed length")

        if full_name is None or message is None:
            return build_response(False, 400,
                                error_message="'name' and/or 'message' was required but not provided!")
        
        query = f"INSERT INTO contact (full_name, email, message) " \
                f"VALUES(%s, %s, %s, %s)"
        values = (full_name, email, message)

        db_result = database.statement(query, values)
        if db_result is not None:
            PROJECT_ID = pn.getProjectId()
            ACCESS_TOKEN = pn.getAccessToken()
            FCM_TOKEN = pn.getFcmToken()
            r = requests.post(
                f"https://fcm.googleapis.com/v1/projects/{PROJECT_ID}/messages:send",
                headers={
                    "Authorization": f"Bearer {ACCESS_TOKEN}",
                    "Content-Type": "application/json"
                },
                data=json.dumps({
                    "message": {
                        "token": FCM_TOKEN,
                        "notification": {
                            "title": "Portfolio Nachricht",
                            "body": f"Neue Nachricht von {full_name}"
                        },
                        "data": {
                            "created_at": str(datetime.now()),
                            "full_name": full_name,
                            "email": None if email is None or email == "" else email,
                            "message": message
                        }
                    }
                })
            )
            logger.info(f"Push Notification {r.status_code} {r.reason}")
            return build_response(True, 201, message="The contact request was successfully sent.")
        else:
            return build_response(False, 403,
                                  error_message=f"The contact request failed.")
            
    except Exception as e:
        logger.info(f"{type(e).__name__} - {e}")
        return build_response(False, 501, error_message="An internal error occur.")

@api.route('/notifications', methods=['GET'])
def notifications():
    try:
        auth_header = request.headers.get("Authorization")
        auth_token = auth_header.split(" ")[1] if auth_header and auth_header.startswith("Bearer ") else None

        if auth_token is None or auth_token != os.getenv("AUTH_TOKEN"):
            return build_response(False, 401, error_message="Request had invalid authentication credentials.")
        
        query = f"""
                SELECT 
                    id,
                    created_at, 
                    full_name, 
                    email, 
                    message
                FROM contact c 
                GROUP BY c.id 
                ORDER BY c.id desc
                """
        values = ()
        db_result = database.statement(query, values)

        results = []

        if db_result is not None and len(db_result) >= 1:
            for id, created_at, full_name, email, message in db_result:
                results.append({
                    "id": id,
                    "created_at": str(created_at),
                    "full_name": full_name,
                    "email": None if email is None or email == "" else email,
                    "message": message
                })

        return build_response(True, 200, response=results)
    except Exception as e:
        logger.info(f"{type(e).__name__} - {e}")
        return build_response(False, 501, error_message="An internal error occur.")

@api.route('/notifications/<id>', methods=['DELETE'])
def delete_notifications(id):
    try:
        try:
            message_id = int(id)
        except:
            return build_response(False, 422, error_message="id is not a valid number")
        
        auth_header = request.headers.get("Authorization")
        auth_token = auth_header.split(" ")[1] if auth_header and auth_header.startswith("Bearer ") else None

        if auth_token is None or auth_token != os.getenv("AUTH_TOKEN"):
            return build_response(False, 401, error_message="Request had invalid authentication credentials.")
        
        query = "DELETE FROM contact WHERE id = %s"
        values = (message_id, )
        db_result = database.statement(query, values)

        if db_result is not None:
            return build_response(True, 200,
                                    message=f"Message with ID '{id}' was successfully deleted.")

        return build_response(False, 403, message=f"The Message with ID '{id}' does not exist")
    except Exception as e:
        logger.info(f"{type(e).__name__} - {e}")
        return build_response(False, 501, error_message="An internal error occur.")


def checkEmail(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    return re.fullmatch(regex, email)

# @api.route('/project_list', methods=['GET'])
# def project_list():
#     try:
#         language = get_language()

#         if language is None:
#             return build_response(False, 400, error_message="The parameter 'language' is required but not provided!")

#         query = f"""
#             SELECT 
#                 p.id, 
#                 p.image, 
#                 pt.title, 
#                 pt.description, 
#                 pt.categorie,
#                 coalesce(pt.labels, '[]') AS labels,
#                 coalesce(pt.features, '[]') AS features,
#                 coalesce(json_agg(
#                     json_build_object(
#                         'name', plt.name,
#                         'url', pl.url
#                     )
#                 ) FILTER (WHERE pl.project_id is not null), '[]') AS links
#             FROM project p
#             JOIN project_translation pt 
#                 ON pt.project_id = p.id 
#                 AND pt.language_id = %s
#             LEFT JOIN project_link pl 
#                 ON pl.project_id  = p.id
#             LEFT JOIN project_link_translation plt 
#                 ON plt.project_link_id = pl.project_link_id 
#             AND plt.language_id = %s
#             GROUP BY p.id, pt.title, pt.description, pt.categorie, pt.labels, pt.features
#             ORDER BY p.id ASC;
#         """
#         values = (language, language, )

#         db_result = database.statement(query, values)

#         results = []

#         if db_result is not None and len(db_result) >= 1:
#             for id, image, title, description, categorie, labels, features, links in db_result:
#                 results.append({
#                     "id": id,
#                     "image": image,
#                     "title": title,
#                     "description": description,
#                     "categorie": categorie,
#                     "labels": labels,
#                     "features": features,
#                     "links": links
#                 })

#         return build_response(True, 200, response=results)
        
#     except Exception as e:
#         logger.info(f"{type(e).__name__} - {e}")
#         return build_response(False, 501, error_message="An internal error occur.")
    

# @api.route('/project', methods=['POST'])
# @api.route('/project/', methods=['POST'])
# @api.route('/project/<id>', methods=['GET', 'PUT', 'DELETE'])
# def project(id=None):
#     token = get_auth_token()
#     # To Do for later

#     if request.method == 'POST':
#         image = request.form.get('image')
#         title = request.form.get('title')
#         description = request.form.get('description')
#         categorie = request.form.get('categorie')
#         labels = json.loads(request.form.get('labels'))
#         features = json.loads(request.form.get('features'))
#         links = json.loads(request.form.get('links'))

#         print(image)
#         print(title)
#         print(description)
#         print(categorie)
#         print(labels)
#         print(features)
#         print(links)

# def get_auth_token():
#     auth_header = request.headers.get("Authorization")
#     return auth_header.split(" ")[1] if auth_header and auth_header.startswith("Bearer ") else None

# def get_form(key, default=None, key_type=None) -> str | int | None:
#     try:
#         data = request.form.get(key)
#         if key_type is int:
#             return int(data)
#         else:
#             return data
#     except Exception as e:
#         logger.info(f"{type(e).__name__} - {e}")
#         if default is not None:
#             return default
#         return None

# def get_language():
#     auth_header = request.args.get('language')
#     return auth_header

# def get_data(key, default=None, key_type=None) -> str | bool | int | None:
#     try:
#         data = json.loads(request.data)
#         if key_type is bool:
#             return bool(data[key])
#         elif key_type is int:
#             return int(data[key])
#         else:
#             return data[key]
#     except Exception as e:
#         logger.info(f"{type(e).__name__} - {e}")
#         if default is not None:
#             return default
#         return None

if __name__ == "__main__":
    api.run(port=7750)
