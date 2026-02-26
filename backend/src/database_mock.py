"""
Mock Database - In-memory database for testing without PostgreSQL
"""
import threading
from typing import Any, Dict, List, Optional
from datetime import datetime


class MockCursor:
    """Mock cursor for executing queries"""
    
    def __init__(self, data_store: Dict[str, List[Dict]]):
        self.data_store = data_store
        self.last_query = None
        self.last_params = None
        self._results = []
    
    def execute(self, query: str, params: Optional[tuple] = None):
        """Execute a mock query"""
        self.last_query = query
        self.last_params = params
        
        query_lower = query.lower().strip()
        
        # Handle CREATE TABLE
        if query_lower.startswith('create table'):
            table_name = self._extract_table_name(query)
            if table_name and table_name not in self.data_store:
                self.data_store[table_name] = []
            return self
        
        # Handle INSERT
        if 'insert into' in query_lower:
            table_name = self._extract_table_name(query)
            if table_name:
                # Generate mock ID
                existing_ids = [row.get('id', 0) for row in self.data_store.get(table_name, [])]
                new_id = max(existing_ids, default=0) + 1
                
                # Parse values from query
                values = params if params else ()
                mock_row = {'id': new_id}
                
                # Add other fields based on table structure
                if table_name == 'users':
                    mock_row['email'] = values[0] if len(values) > 0 else ''
                    mock_row['name'] = values[1] if len(values) > 1 else ''
                    mock_row['password_hash'] = values[2] if len(values) > 2 else ''
                    mock_row['created_at'] = datetime.now()
                    mock_row['updated_at'] = datetime.now()
                
                if table_name not in self.data_store:
                    self.data_store[table_name] = []
                self.data_store[table_name].append(mock_row)
                
                self._results = [mock_row]
            return self
        
        # Handle SELECT
        if 'select' in query_lower:
            table_name = self._extract_table_name(query)
            if table_name and table_name in self.data_store:
                results = self.data_store[table_name].copy()
                
                # Extract selected columns from query
                selected_columns = self._extract_columns(query)
                
                # Filter to only selected columns
                if selected_columns and '*' not in selected_columns:
                    results = [{col: r.get(col) for col in selected_columns if col in r} for r in results]
                
                # Handle WHERE clause
                if 'where' in query_lower and params:
                    if 'email =' in query_lower:
                        email_val = params[0] if params else ''
                        results = [r for r in results if r.get('email', '').lower() == email_val.lower()]
                    elif 'id =' in query_lower:
                        id_val = params[0] if params else 0
                        results = [r for r in results if r.get('id') == id_val]
                
                self._results = results
            return self
        
        return self
    
    def _extract_columns(self, query: str) -> List[str]:
        """Extract column names from SELECT query"""
        import re
        # Match "SELECT col1, col2 FROM table"
        match = re.search(r'select\s+(.+?)\s+from', query, re.IGNORECASE)
        if match:
            cols = match.group(1).strip()
            if cols == '*':
                return ['*']
            return [c.strip() for c in cols.split(',')]
        return ['*']
    
    def fetchone(self) -> Optional[Dict]:
        """Fetch one row"""
        if self._results:
            result = self._results[0]
            # Convert datetime to string for JSON serialization
            return self._serialize_row(result)
        return None
    
    def fetchall(self) -> List[Dict]:
        """Fetch all rows"""
        return [self._serialize_row(r) for r in self._results]
    
    def _serialize_row(self, row: Dict) -> Dict:
        """Serialize row for JSON response"""
        serialized = {}
        for key, value in row.items():
            if isinstance(value, datetime):
                serialized[key] = value.isoformat()
            else:
                serialized[key] = value
        return serialized
    
    def _extract_table_name(self, query: str) -> Optional[str]:
        """Extract table name from query"""
        import re
        # Match "INSERT INTO table_name" or "SELECT * FROM table_name"
        match = re.search(r'(?:into|from)\s+(\w+)', query, re.IGNORECASE)
        if match:
            return match.group(1)
        return None


class MockDatabase:
    """Mock database class for testing without PostgreSQL"""
    
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self.connection = None
        self.cursor = None
        self._data_store: Dict[str, List[Dict]] = {}
        self.connect()
    
    def connect(self):
        """Establish mock database connection"""
        print("🔧 Using MOCK Database (no PostgreSQL)")
        self.cursor = MockCursor(self._data_store)
        print("✅ Mock Database connected successfully!")
    
    def get_cursor(self):
        """Get the mock cursor"""
        if self.cursor is None:
            self.connect()
        return self.cursor
    
    def execute(self, query: str, params: Optional[tuple] = None):
        """Execute a query"""
        cursor = self.get_cursor()
        cursor.execute(query, params)
        return cursor
    
    def fetch_one(self, query: str, params: Optional[tuple] = None):
        """Fetch one row"""
        cursor = self.get_cursor()
        cursor.execute(query, params)
        return cursor.fetchone()
    
    def fetch_all(self, query: str, params: Optional[tuple] = None):
        """Fetch all rows"""
        cursor = self.get_cursor()
        cursor.execute(query, params)
        return cursor.fetchall()
    
    def close(self):
        """Close mock database connection"""
        self.cursor = None
        print("Mock Database connection closed")
    
    def clear(self):
        """Clear all data (useful for testing)"""
        self._data_store.clear()


# Global mock database instance
mock_db = MockDatabase()

