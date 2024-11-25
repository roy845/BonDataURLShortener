from models.models import URL
from utils.utils import Utils


class ShortenService:
    @staticmethod
    def generate_short_url(long_url: str) -> dict:
        """
        Generates a short URL for the provided long URL.

        :param long_url: The original long URL to shorten.
        :return: A dictionary containing the short URL and its code.
        """
     
        short_code = Utils.generate_short_code()
        while URL.find_by_short_code(short_code):
            short_code = Utils.generate_short_code()

        url_to_save = {"original_url": long_url, "short_code": short_code}
        new_url = URL(**url_to_save)
        new_url.save()

   
        return {
            'short_url': f"http://localhost:5001/api/redirect/{short_code}",
            'short_code': short_code
        }
