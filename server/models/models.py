from database import db

class URL(db.Model):
    __tablename__ = 'URL'
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(2048), nullable=False)
    short_code = db.Column(db.String(6), unique=True, nullable=False,index=True)

    def save(self) -> None:
        """
        Saves the current instance to the database.
        """
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def find_by_short_code(short_code: str):
        """
        Finds a URL by its short code.

        :param short_code: The short code to search for.
        :return: The URL object if found, otherwise None.
        """
        return URL.query.filter_by(short_code=short_code).first()