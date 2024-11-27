from models.models import URL

class AnalyticsService:
    @staticmethod
    def get_all_short_codes():
        """
        Retrieves all short codes and their original URLs.
        """
        urls = URL.get_all()
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