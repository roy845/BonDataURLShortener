from flask import request
from flask_restx import Namespace, Resource, fields
from utils.validations import Validations
from services.shorten_service import ShortenService
from http import HTTPStatus


shorten_api = Namespace('shorten', description='URL Shortening operations')

shorten_model = shorten_api.model('Shorten', {
    'url': fields.String(required=True, description='The long URL to shorten')
})

response_model = shorten_api.model('Response', {
    'short_url': fields.String(description='The shortened URL'),
    'short_code': fields.String(description='The unique code for the shortened URL')
})

@shorten_api.route('/')
class ShortenURL(Resource):
    @shorten_api.expect(shorten_model)
    def post(self):
        try:
            data = request.json
            Validations.validate_request_body(data)
            Validations.validate_request_fields(data)
        
            long_url = data.get('url')

            Validations.validate_url_field(long_url)
        
            result = ShortenService.generate_short_url(long_url)
            return shorten_api.marshal(result, response_model), HTTPStatus.CREATED
        
        except ValueError as ve:
            return {"message": str(ve)}, HTTPStatus.BAD_REQUEST
        
        except Exception as e:
            return {"message": f"An unexpected error occurred: {str(e)}"}, HTTPStatus.INTERNAL_SERVER_ERROR
