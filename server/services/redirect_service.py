from models.models import URL

class RedirectService:
    @staticmethod
    def get_original_url(short_code: str):
        """
        Retrieves the original URL associated with the given short code.

        :param short_code: The short code for which to find the original URL.
        :return: The original URL if found, otherwise None.
        """
        url_entry = URL.find_by_short_code(short_code)
        return url_entry.original_url if url_entry else None
