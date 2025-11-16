import traceback
from datetime import datetime, timedelta

import database

allowed_chars_type_token = "abcdef0123456789"


def is_not_whitelist_chars_only(input_string, whitelist):
    for char in input_string:
        if char not in whitelist:
            return True
    return False


def auth_token(token):
    try:
        # Checks that all required parameters were provided
        if token is None:
            return {"succeed": False, "error-message": "Token is required but not provided"}
        elif is_not_whitelist_chars_only(token, allowed_chars_type_token):
            return {"succeed": False, "error-message": f"The token contains invalid characters. Please only use characters from the following list: {allowed_chars_type_token}."}

        # Check if Token exist in Database
        db_result = database.statement(f"SELECT created_at, expires_at, user_id, access_level FROM api.tokens WHERE token = '{token}'")

        if db_result is not None and len(db_result) >= 1:
            db_created_at, db_expires_at, db_user_id, db_access_level = db_result[0]

            # Prepare the date from database
            datetime_expires = datetime.strptime(f"{db_expires_at}", '%Y-%m-%d %H:%M:%S')
            datetime_now = datetime.now()

            # Compare if Token is still valid
            if datetime_expires > datetime_now:

                # Add 15 Minutes if token expires within next 10 minutes
                if datetime_expires - datetime_now <= timedelta(minutes=10):
                    datetime_expires = datetime_expires + timedelta(minutes=15)
                    query = "UPDATE api.tokens SET expires_at=%s WHERE token=%s"
                    values = (datetime_expires.strftime('%Y-%m-%d %H:%M:%S'), token)
                    database.statement(query, values)

                return {"succeed": True, "access_level": db_access_level, "user_id": db_user_id, "created_at": db_created_at, "expires_at": datetime_expires}
            return {"succeed": False, "error-message": "Your Session expired"}
        return {"succeed": False, "error-message": "This Session Token is invalid"}

    # Throw exception if Token was not found in Database or in other case
    except Exception as e:
        print(type(e).__name__, "–", e)
        print(traceback.print_exc())
        return {"succeed": False, "error-message": "An error occurred while verifying the token"}