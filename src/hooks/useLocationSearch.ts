import { useState, useCallback, useRef } from 'react';
import type { LocationData, LocationSearchResponse } from '../types/location';
import { API, getApiEndpoint } from '../constants';

export function useLocationSearch() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchLocations = useCallback(async (query: string) => {
    // Clear previous results if query is empty
    if (!query || query.trim().length < 2) {
      setLocations([]);
      return;
    }

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setLoading(true);
    setError(null);

    try {
      abortControllerRef.current = new AbortController();
      
      // Use API configuration for full URL
      const apiUrl = getApiEndpoint(API.LOCATION.SEARCH);
      const response = await fetch(
        `${apiUrl}?q=${encodeURIComponent(query)}&limit=5`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }

      const data: LocationSearchResponse = await response.json();

      if (data.success && data.data) {
        setLocations(data.data);
      } else {
        setLocations([]);
        setError('Unknown error');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Location search error:', err);
        setError((err as Error).message || 'Failed to search locations');
        setLocations([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearLocations = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLocations([]);
    setLoading(false);
    setError(null);
  }, []);

  return {
    locations,
    loading,
    error,
    searchLocations,
    clearLocations
  };
}
