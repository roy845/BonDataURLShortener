from flask import request
from flask_restx import Namespace, Resource, fields
from services.shorten_service import ShortenService
from http import HTTPStatus
import validators

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
    @shorten_api.marshal_with(response_model)
    def post(self):
        try:
            
            data = request.json
            if not data:
                return {"message": "Request body must be JSON"}, HTTPStatus.BAD_REQUEST
            
           
            if set(data.keys()) != {'url'}:
                return {"message": "Invalid fields in request. Only 'url' is allowed."}, HTTPStatus.BAD_REQUEST
            
            
            long_url = data.get('url')
            if not long_url:
                return {"message": "The 'url' field is required."}, HTTPStatus.BAD_REQUEST
            if not validators.url(long_url):
                return {"message": "The provided 'url' is not a valid URL."}, HTTPStatus.BAD_REQUEST
            
            
            result = ShortenService.generate_short_url(long_url)
            return result, HTTPStatus.CREATED
        
        except Exception as e:
            return {"message": f"An unexpected error occurred: {str(e)}"}, HTTPStatus.INTERNAL_SERVER_ERROR
