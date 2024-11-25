from flask import redirect
from flask_restx import Namespace, Resource
from services.redirect_service import RedirectService

redirect_api = Namespace('redirect', description='URL Redirection operations')

@redirect_api.route('/<short_code>')
class RedirectURL(Resource):
    def get(self, short_code):
        original_url = RedirectService.get_original_url(short_code)
        if original_url:
            return redirect(original_url, code=302)
        return {"message": "URL not found"}, 404