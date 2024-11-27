from models.models import URL

class AnalyticsService:
    @staticmethod
    def get_all_short_codes(keyword: str = None):
        """
        Retrieves all short codes and their original URLs, optionally filtered by a keyword.

        :param keyword: The keyword to filter by (case-insensitive) on short_code.
        :return: A list of dictionaries containing short codes and their original URLs.
        """
        urls = URL.get_all(keyword)
        return [{"short_code": url.short_code, "original_url": url.original_url} for url in urls]

    @staticmethod
    def get_url_analytics(short_code):
        """
        Retrieves analytics for a specific short code.
        """
        url_entry = URL.find_by_short_code(short_code)
        if not url_entry:
            return None

        return {
            'original_url': url_entry.original_url,
            'short_code': url_entry.short_code,
            'access_count': url_entry.access_count or 0,
            'last_accessed': url_entry.last_accessed.isoformat() if url_entry.last_accessed else None
        }
    
    @staticmethod
    def delete_by_short_code(short_code):
        """
        Deletes a URL by its short code.

        :param short_code: The short code to delete.
        :return: A dictionary indicating success or failure.
        """
        success = URL.delete_by_short_code(short_code)
        if success:
            return {"message": f"Short code '{short_code}' deleted successfully.", "success": True}
        return {"message": f"Short code '{short_code}' not found.", "success": False}

    @staticmethod
    def delete_all():
        """
        Deletes all URLs in the database.

        :return: A dictionary indicating the operation's success.
        """
        URL.delete_all()
        return {"message": "All short codes deleted successfully.", "success": True}