import validators

class Validations:
    @staticmethod
    def validate_request_body(data):
        if not data:
             raise ValueError("Request body must be JSON")

    @staticmethod
    def validate_request_fields(data):
        if set(data.keys()) != {'url','custom_slug'}:
            raise ValueError("Invalid fields in request. Only 'url' and 'custom_slug' is allowed.")
        
    @staticmethod
    def validate_url_field(url):
        if not url:
            raise ValueError("The 'url' field is required.")
        if not validators.url(url):
            raise ValueError("The provided 'url' is not a valid URL.")