from flask import request
from http import HTTPStatus
from utils.validations import Validations
from functools import wraps

def validate_request_data():
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                data = request.json
                Validations.validate_request_body(data)
                Validations.validate_request_fields(data)
                Validations.validate_url_field(data.get('url'))
            except ValueError as ve:
                return {"message": str(ve)}, HTTPStatus.BAD_REQUEST
            except Exception as e:
                return {"message": f"An unexpected error occurred: {str(e)}"}, HTTPStatus.INTERNAL_SERVER_ERROR
            return f(*args, **kwargs)
        return wrapper
    return decorator
