import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Check if we should use mock database
def _should_use_mock_db() -> bool:
    """Check if we should use mock database"""
    database_url = os.environ.get('DATABASE_URL')
    use_mock = os.environ.get('USE_MOCK_DB', 'false').lower()
    
    # Use mock if no DATABASE_URL or USE_MOCK_DB is explicitly set to true
    if use_mock == 'true':
        return True
    if not database_url:
        return True
    return False


class Database:
    def __init__(self):
        self.connection = None
        self.cursor = None
        self.connect()
    
    def connect(self):
        """Establish database connection"""
        # Use mock database if no DATABASE_URL or USE_MOCK_DB is true
        if _should_use_mock_db():
            from src.database_mock import MockDatabase
            print("🔧 Using Mock Database (no DATABASE_URL found)")
            mock_instance = MockDatabase()
            self.connection = mock_instance.connection
            self.cursor = mock_instance.cursor
            # Replace methods to use mock
            self.get_cursor = mock_instance.get_cursor
            self.execute = mock_instance.execute
            self.fetch_one = mock_instance.fetch_one
            self.fetch_all = mock_instance.fetch_all
            self.close = mock_instance.close
            return
        
        database_url = os.environ.get('DATABASE_URL')
        
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
