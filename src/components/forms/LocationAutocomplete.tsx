import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { LocationData, LocationSearchType } from '../../types/location';
import { API, getApiEndpoint } from '../../constants';

const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const LocationInput = styled.input<{ $hasError?: boolean; $isLight?: boolean }>`
  width: 100%;
  min-height: 52px;
  box-sizing: border-box;
  padding: 14px 18px;
  border-radius: 12px;
  border: ${props => props.$hasError ? '1px solid #ff6b6b' : `1px solid ${props.$isLight ? 'rgba(0, 0, 0, 0.1)' : 'var(--glass-border)'}`};
  background: ${props => props.$isLight
    ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.$isLight ? '#1e293b' : 'var(--text-inverse)'};
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${props => props.$isLight ? '#4f46e5' : 'var(--hero-gradient-start)'};
    box-shadow: ${props => props.$isLight
    ? '0 0 0 3px rgba(79, 70, 229, 0.2)'
    : '0 0 0 3px rgba(120, 140, 255, 0.2)'};
  }

  &::placeholder {
    color: ${props => props.$isLight ? 'rgba(30, 41, 59, 0.5)' : 'var(--text-secondary)'};
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 13px 16px;
    font-size: 16px;
  }
`;

const SuggestionsList = styled.ul<{ $isLight?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.$isLight ? '#ffffff' : 'var(--nav-bg)'};
  border: 1px solid ${props => props.$isLight ? 'rgba(0, 0, 0, 0.1)' : 'var(--glass-border)'};
  border-radius: 12px;
  margin-top: 8px;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  max-height: 240px;
  overflow: auto;
  box-shadow: ${props => props.$isLight
    ? '0 4px 20px rgba(0, 0, 0, 0.15)'
    : '0 4px 20px rgba(0, 0, 0, 0.3)'};

  @media (max-width: 768px) {
    max-height: min(240px, 42dvh);
    margin-top: 6px;
  }
`;

const SuggestionItem = styled.li<{ $selected?: boolean; $isLight?: boolean }>`
  padding: 12px 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$selected
    ? (props.$isLight ? 'rgba(79, 70, 229, 0.1)' : 'rgba(120, 140, 255, 0.1)')
    : 'transparent'};

  &:hover {
    background: ${props => props.$isLight ? 'rgba(79, 70, 229, 0.1)' : 'rgba(120, 140, 255, 0.1)'};
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const SuggestionText = styled.span<{ $isLight?: boolean }>`
  display: block;
  font-size: 14px;
  color: ${props => props.$isLight ? '#1e293b' : 'var(--text-inverse)'};
`;

const SuggestionSubtext = styled.span<{ $isLight?: boolean }>`
  display: block;
  font-size: 12px;
  color: ${props => props.$isLight ? 'rgba(30, 41, 59, 0.6)' : 'var(--text-secondary)'};
  margin-top: 4px;
`;

const LoadingText = styled.div<{ $isLight?: boolean }>`
  padding: 12px 18px;
  font-size: 14px;
  color: ${props => props.$isLight ? 'rgba(30, 41, 59, 0.6)' : 'var(--text-secondary)'};
  text-align: center;
`;

const ErrorText = styled.div<{ $isLight?: boolean }>`
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
  searchType?: LocationSearchType;
  isLight?: boolean;
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search city...",
  error,
  searchType = 'city',
  isLight = false
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
      // Use API configuration for full URL - choose endpoint based on searchType
      const apiEndpoint = searchType === 'country'
        ? API.LOCATION.SEARCH_COUNTRIES
        : API.LOCATION.SEARCH;
      const apiUrl = getApiEndpoint(apiEndpoint);

      const response = await fetch(
        `${apiUrl}?q=${encodeURIComponent(query)}&limit=5`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json'
          }
        }
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
  }, [searchType]);

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

  // Update placeholder based on searchType
  const defaultPlaceholder = searchType === 'country' ? 'Search country...' : 'Search city...';

  return (
    <AutocompleteWrapper ref={wrapperRef}>
      <InputWrapper>
        <LocationInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder || defaultPlaceholder}
          $hasError={!!error}
          $isLight={isLight}
          name={`search-location-${searchType}`}
          autoComplete="new-password"
        />
      </InputWrapper>

      {error && <ErrorText $isLight={isLight}>{error}</ErrorText>}

      {showSuggestions && (loading || locations.length > 0 || searchError) && (
        <SuggestionsList $isLight={isLight}>
          {loading && (
            <LoadingText $isLight={isLight}>Searching...</LoadingText>
          )}

          {locations.map((location, index) => (
            <SuggestionItem
              key={location.id}
              $selected={index === selectedIndex}
              $isLight={isLight}
              onClick={() => handleSelect(location)}
            >
              <SuggestionText $isLight={isLight}>{location.name}</SuggestionText>
              <SuggestionSubtext $isLight={isLight}>
                {searchType === 'country'
                  ? location.country_code
                  : [location.administrative_area, location.country]
                    .filter(Boolean)
                    .join(', ')}
              </SuggestionSubtext>
            </SuggestionItem>
          ))}

          {!loading && locations.length === 0 && searchError && (
            <ErrorText $isLight={isLight} style={{ padding: '12px 18px' }}>
              {searchError}
            </ErrorText>
          )}
        </SuggestionsList>
      )}
    </AutocompleteWrapper>
  );
}