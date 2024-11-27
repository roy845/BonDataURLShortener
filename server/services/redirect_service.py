from datetime import datetime
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
        if url_entry:
            # Update analytics
            url_entry.access_count = (url_entry.access_count or 0) + 1
            url_entry.last_accessed = datetime.now()
            url_entry.save()
            return url_entry.original_url

        return None
