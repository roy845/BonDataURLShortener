from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_test_url:str
    postgres_password:str
    postgres_db:str
    sqlalchemy_track_modifications: bool = False

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'


settings = Settings()