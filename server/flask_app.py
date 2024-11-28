from flask import Flask
import logging
from flask_restx import Api
from routes.shorten import shorten_api as shorten_namespace
from routes.redirect import redirect_api as redirect_namespace
from routes.health import health_api as health_namespace
from routes.analytics import analytics_api as analytics_namespace
from flask_cors import CORS
from database import db
from limiter.limiter import limiter
from utils.create_database import create_database
from config import settings


logger = logging.getLogger(__name__)

def create_app():
    logger.info("Initializing Flask app.....")

    DATABASE_URL: str = settings.database_test_url

    database_url = DATABASE_URL.rsplit('/', 1)[0]
    database_name = DATABASE_URL.rsplit('/', 1)[-1]

    create_database(database_url, database_name)

    app = Flask(__name__,static_folder='build', static_url_path='')

    app.config['SQLALCHEMY_DATABASE_URI'] = settings.database_test_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.sqlalchemy_track_modifications

    limiter.init_app(app)

    api = Api(app, version='1.0', prefix='/api', title='Shorten URL API', description='A simple Flask for shortening url API', doc='/api/docs/')
    
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    logger.info('Flask application initialized.')

    db.init_app(app)
    with app.app_context():
        db.create_all()

    logger.info('Adding namespaces to the API...')
    api.add_namespace(health_namespace, path='/health')
    api.add_namespace(shorten_namespace, path='/shorten')
    api.add_namespace(redirect_namespace, path='/redirect')
    api.add_namespace(analytics_namespace, path='/analytics')
    logger.info('Namespaces added to the API.')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5001)