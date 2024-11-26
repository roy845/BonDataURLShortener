from flask import request
from flask_restx import Namespace, Resource, fields
from middlewares.validate_request_data import validate_request_data
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

error_model = shorten_api.model('Error', {
    'message': fields.String(description='Error message'),
})

@shorten_api.route('/')
class ShortenURL(Resource):
    @shorten_api.expect(shorten_model)
    @validate_request_data()
    @shorten_api.response(HTTPStatus.CREATED, 'URL successfully shortened', model=response_model)
    @shorten_api.response(HTTPStatus.BAD_REQUEST, 'Invalid URL provided', model=error_model)
    @shorten_api.response(HTTPStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred')
    @shorten_api.doc(description='Shortens a given long URL into a shorter version.')
    def post(self):
      
            data = request.json
        
            long_url = data.get('url')

            result = ShortenService.generate_short_url(long_url)

            return shorten_api.marshal(result, response_model), HTTPStatus.CREATED