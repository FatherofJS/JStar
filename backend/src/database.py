import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Database:
    def __init__(self):
        self.connection = None
        self.cursor = None
        self.connect()
    
    def connect(self):
        """Establish database connection"""
        database_url = os.environ.get('DATABASE_URL')
        
        if not database_url:
            raise ValueError("DATABASE_URL environment variable is not set")
        
        try:
            self.connection = psycopg2.connect(database_url)
            self.connection.autocommit = True
            self.cursor = self.connection.cursor(cursor_factory=RealDictCursor)
            print("✅ Database connected successfully!")
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
            raise
    
    def get_cursor(self):
        """Get the database cursor"""
        if self.cursor is None:
            self.connect()
        return self.cursor
    
    def execute(self, query, params=None):
        """Execute a query"""
        cursor = self.get_cursor()
        cursor.execute(query, params)
        return cursor
    
    def fetch_one(self, query, params=None):
        """Fetch one row"""
        cursor = self.get_cursor()
        cursor.execute(query, params)
        return cursor.fetchone()
    
    def fetch_all(self, query, params=None):
        """Fetch all rows"""
        cursor = self.get_cursor()
        cursor.execute(query, params)
        return cursor.fetchall()
    
    def close(self):
        """Close database connection"""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
        print("Database connection closed")

# Global database instance
db = Database()
