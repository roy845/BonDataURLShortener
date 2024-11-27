from models.models import URL
from utils.utils import Utils


class ShortenService:
    @staticmethod
    def generate_short_url(long_url: str, custom_slug: str = None) -> dict:
        """
        Generates a short URL for the provided long URL. If a custom slug is provided, it validates its uniqueness.

        :param long_url: The original long URL to shorten.
        :param custom_slug: Optional custom slug for the short URL.
        :return: A dictionary containing the short URL and its code or custom slug.
        """
        if custom_slug:
            # Validate custom slug length
            if len(custom_slug) > 6:
                raise ValueError("Custom slug must be 6 characters or fewer.")
            
            # Validate custom slug uniqueness
            if URL.find_by_short_code(custom_slug):
                raise ValueError(f"The custom slug '{custom_slug}' is already in use.")
            short_code = custom_slug
        else:
            # Generate a unique short code
            short_code = Utils.generate_short_code()
            while URL.find_by_short_code(short_code):
                short_code = Utils.generate_short_code()

        # Save the URL to the database
        url_to_save = {"original_url": long_url, "short_code": short_code}
        new_url = URL(**url_to_save)
        new_url.save()

        return {
            'short_url': f"http://localhost:5001/api/redirect/{short_code}",
            'short_code': short_code
        }
