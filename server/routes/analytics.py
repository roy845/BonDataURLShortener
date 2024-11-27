from http import HTTPStatus
from flask_restx import Namespace, Resource
from models.models import URL

analytics_api = Namespace('analytics', description='Analytics operations')


@analytics_api.route('/short-codes')
class AllShortCodes(Resource):
    @analytics_api.response(HTTPStatus.OK, 'Short codes retrieved successfully')
    @analytics_api.response(HTTPStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred')
    @analytics_api.doc(description='Fetches all short codes and original URLS.')
    def get(self):
        """
        Handles the GET request to fetch all short codes and original URLs.
        """
        try:
            urls = URL.get_all()
            short_codes = [{"short_code": url.short_code, "original_url": url.original_url} for url in urls]
            return short_codes, HTTPStatus.OK
        except Exception as e:
            return {"message": "An unexpected error occurred"}, HTTPStatus.INTERNAL_SERVER_ERROR

@analytics_api.route('/<string:short_code>')
class URLAnalytics(Resource):
    @analytics_api.response(HTTPStatus.OK, 'Usage analytics retrieved successfully')
    @analytics_api.response(HTTPStatus.NOT_FOUND, 'Short URL not found')
    @analytics_api.doc(description='Fetches usage analytics for a specific short URL.')
    def get(self, short_code):
        """
        Handles the GET request to fetch analytics data for a specific short code.
        """
        try:
            url_entry = URL.find_by_short_code(short_code)
            if not url_entry:
                return {'message': 'Short URL not found'}, HTTPStatus.NOT_FOUND

            analytics_data = {
                'original_url': url_entry.original_url,
                'short_code': url_entry.short_code,
                'access_count': url_entry.access_count or 0,
                'last_accessed': url_entry.last_accessed.isoformat() if url_entry.last_accessed else None
            }

            return analytics_data, HTTPStatus.OK
        except Exception as e:
            return {'message': 'An unexpected error occurred'}, HTTPStatus.INTERNAL_SERVER_ERROR