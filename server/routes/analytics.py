from flask import request
from http import HTTPStatus
from flask_restx import Namespace, Resource
from models.models import URL
from services.analytics_service import AnalyticsService

analytics_api = Namespace('analytics', description='Analytics operations')


@analytics_api.route('/short-codes')
class AllShortCodes(Resource):
    @analytics_api.param('keyword', 'Keyword to filter short codes (case-insensitive)', required=False)
    @analytics_api.response(HTTPStatus.OK, 'Short codes retrieved successfully')
    @analytics_api.response(HTTPStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred')
    @analytics_api.doc(description='Fetches all short codes and original URLS.')
    def get(self):
        """
        Handles the GET request to fetch all short codes and original URLs.
        """
        try:
            keyword = request.args.get('keyword', None)
            short_codes = AnalyticsService.get_all_short_codes(keyword=keyword)
            return short_codes, HTTPStatus.OK
        
        except Exception as e:
            return {"message": "An unexpected error occurred"}, HTTPStatus.INTERNAL_SERVER_ERROR
    
    @analytics_api.response(HTTPStatus.OK, 'All short codes deleted successfully')
    @analytics_api.response(HTTPStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred')
    @analytics_api.doc(description='Deletes all short codes from the database.')
    def delete(self):
        """
        Handles the DELETE request to remove all short codes from the database.
        """
        try:
            result = AnalyticsService.delete_all()
            return result, HTTPStatus.OK

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
            analytics_data = AnalyticsService.get_url_analytics(short_code)
            if not analytics_data:
                return {'message': 'Short URL not found'}, HTTPStatus.NOT_FOUND
            return analytics_data, HTTPStatus.OK

        except Exception as e:
            return {'message': 'An unexpected error occurred'}, HTTPStatus.INTERNAL_SERVER_ERROR
    
    @analytics_api.response(HTTPStatus.OK, 'Short code deleted successfully')
    @analytics_api.response(HTTPStatus.NOT_FOUND, 'Short URL not found')
    @analytics_api.response(HTTPStatus.INTERNAL_SERVER_ERROR, 'An unexpected error occurred')
    @analytics_api.doc(description='Deletes a specific short code from the database.')
    def delete(self, short_code):
        """
        Handles the DELETE request to remove a specific short code from the database.
        """
        try:
            result = AnalyticsService.delete_by_short_code(short_code)
            if not result['success']:
                return {'message': result['message']}, HTTPStatus.NOT_FOUND
            return result, HTTPStatus.OK

        except Exception as e:
            return {'message': 'An unexpected error occurred'}, HTTPStatus.INTERNAL_SERVER_ERROR