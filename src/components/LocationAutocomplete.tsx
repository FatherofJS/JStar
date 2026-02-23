import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { LocationData } from '../types/location';
import { API, getApiEndpoint } from '../constants';

const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const LocationInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: ${props => props.$hasError ? '1px solid #ff6b6b' : '1px solid var(--glass-border)'};
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--hero-gradient-start);
    box-shadow: 0 0 0 3px rgba(120, 140, 255, 0.2);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--nav-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  margin-top: 8px;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  max-height: 240px;
  overflow: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const SuggestionItem = styled.li<{ $selected?: boolean }>`
  padding: 12px 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$selected ? 'rgba(120, 140, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(120, 140, 255, 0.1);
  }
`;

const SuggestionText = styled.span`
  display: block;
  font-size: 14px;
  color: var(--text-inverse);
`;

const SuggestionSubtext = styled.span`
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
`;

const LoadingText = styled.div`
  padding: 12px 18px;
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
`;

const ErrorText = styled.div`
  padding: 8px 16px;
  font-size: 13px;
  color: #ff6b6b;
  margin-top: 4px;
`;

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: LocationData | null) => void;
  placeholder?: string;
  error?: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search city...",
  error
}: LocationAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchLocations = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setLocations([]);
      return;
    }

    setLoading(true);
    setSearchError(null);

    try {
      // Use API configuration for full URL
      const apiUrl = getApiEndpoint(API.LOCATION.SEARCH);
      const response = await fetch(
        `${apiUrl}?q=${encodeURIComponent(query)}&limit=5`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }

      const data = await response.json();

      if (data.success && data.data) {
        setLocations(data.data);
      } else {
        setLocations([]);
      }
    } catch (err) {
      console.error('Location search error:', err);
      setSearchError((err as Error).message || 'Failed to search locations');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSelectedIndex(-1);
    
    // Debounce the search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      searchLocations(newValue);
      setShowSuggestions(true);
    }, 300);
  }, [searchLocations]);

  const handleSelect = useCallback((location: LocationData) => {
    setInputValue(location.display_name.split(',')[0]);
    setShowSuggestions(false);
    setLocations([]);
    onChange(location);
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions || locations.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < locations.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && locations[selectedIndex]) {
          handleSelect(locations[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  }, [showSuggestions, locations, selectedIndex, handleSelect]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <AutocompleteWrapper ref={wrapperRef}>
      <InputWrapper>
        <LocationInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          $hasError={!!error}
          autoComplete="off"
        />
      </InputWrapper>

      {error && <ErrorText>{error}</ErrorText>}

      {showSuggestions && (loading || locations.length > 0 || searchError) && (
        <SuggestionsList>
          {loading && (
            <LoadingText>Searching...</LoadingText>
          )}
          
          {locations.map((location, index) => (
            <SuggestionItem
              key={location.id}
              $selected={index === selectedIndex}
              onClick={() => handleSelect(location)}
            >
              <SuggestionText>{location.name}</SuggestionText>
              <SuggestionSubtext>
                {[location.administrative_area, location.country]
                  .filter(Boolean)
                  .join(', ')}
              </SuggestionSubtext>
            </SuggestionItem>
          ))}

          {!loading && locations.length === 0 && searchError && (
            <ErrorText style={{ padding: '12px 18px' }}>
              {searchError}
            </ErrorText>
          )}
        </SuggestionsList>
      )}
    </AutocompleteWrapper>
  );
}
