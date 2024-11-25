import random
import string

class Utils:
    @staticmethod
    def generate_short_code():
        return ''.join(random.choices(string.ascii_letters + string.digits, k=6))