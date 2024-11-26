from flask import redirect
from flask_restx import Namespace, Resource
from services.redirect_service import RedirectService
from http import HTTPStatus

redirect_api = Namespace('redirect', description='URL Redirection operations')

@redirect_api.route('/<short_code>')
@redirect_api.doc(params={
    'short_code': 'The unique short code associated with the original URL'
})
class RedirectURL(Resource):
    @redirect_api.doc(
        responses={
            HTTPStatus.FOUND: 'Redirects to the original URL',
            HTTPStatus.NOT_FOUND: 'Short code not found',
            HTTPStatus.INTERNAL_SERVER_ERROR: 'An unexpected error occurred'
        },
        description='Redirect to the original URL based on the provided short code.'
    )
    def get(self, short_code):
        """
        Redirects to the original URL using the provided short code.
        """
        try:
            original_url = RedirectService.get_original_url(short_code)
            if original_url:
                return redirect(original_url, code=HTTPStatus.FOUND)
            return {"message": "URL not found"}, HTTPStatus.NOT_FOUND
        
        except Exception as e:
            return {"message": f"An unexpected error occurred: {str(e)}"}, HTTPStatus.INTERNAL_SERVER_ERROR
