from database import db

class URL(db.Model):
    __tablename__ = 'URL'
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(2048), nullable=False)
    short_code = db.Column(db.String(6), unique=True, nullable=False,index=True)
    access_count = db.Column(db.Integer, default=0)
    last_accessed = db.Column(db.DateTime)

    def save(self) -> None:
        """
        Saves the current instance to the database.
        """
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def get_all(keyword: str = None):
        """
        Retrieves all URLs or filters them by short code if a keyword is provided.

        :param keyword: The keyword to filter by (case-insensitive).
        :return: A list of filtered URL objects.
        """
        if keyword:
            keyword_filter = f"%{keyword.lower()}%"
            return URL.query.filter(URL.short_code.ilike(keyword_filter)).all()
        return URL.query.all()

    @staticmethod
    def find_by_short_code(short_code: str):
        """
        Finds a URL by its short code.

        :param short_code: The short code to search for.
        :return: The URL object if found, otherwise None.
        """
        return URL.query.filter_by(short_code=short_code).first()
    
    @staticmethod
    def delete_by_short_code(short_code: str) -> bool:
        """
        Deletes a URL by its short code.

        :param short_code: The short code of the URL to delete.
        :return: True if the URL was found and deleted, False otherwise.
        """
        url = URL.query.filter_by(short_code=short_code).first()
        if url:
            db.session.delete(url)
            db.session.commit()
            return True
        return False

    @staticmethod
    def delete_all() -> None:
        """
        Deletes all URL records from the database.
        """
        URL.query.delete()
        db.session.commit()