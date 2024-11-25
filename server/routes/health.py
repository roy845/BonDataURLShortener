from http import HTTPStatus
from flask_restx import Namespace, Resource
from services.health_service import HealthService

health_api = Namespace('health', description='Health check operations')

@health_api.route('/')
class Health(Resource):
    @health_api.doc(
        responses={
            HTTPStatus.OK: 'Server is healthy and running',
        }
    )
    def get(self):
        """
        Health Check Endpoint

        Returns a JSON response indicating the health status of the server, including the current UTC timestamp.
        """
        current_time = HealthService.get_current_time()
        return {
            "ok": True,
            "date":current_time
        }, HTTPStatus.OK