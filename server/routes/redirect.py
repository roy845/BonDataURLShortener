from flask import redirect
from flask_restx import Namespace, Resource
from services.redirect_service import RedirectService
from http import HTTPStatus

redirect_api = Namespace('redirect', description='URL Redirection operations')

@redirect_api.route('/<short_code>')
class RedirectURL(Resource):
    def get(self, short_code):
        try:
            original_url = RedirectService.get_original_url(short_code)
            if original_url:
                return redirect(original_url, code=302)
            return {"message": "URL not found"}, HTTPStatus.NOT_FOUND
        
        except Exception as e:
            return {"message": f"An unexpected error occurred: {str(e)}"}, HTTPStatus.INTERNAL_SERVER_ERROR