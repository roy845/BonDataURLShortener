from datetime import datetime

class HealthService:
    @staticmethod
    def get_current_time():
        return datetime.now().isoformat() 