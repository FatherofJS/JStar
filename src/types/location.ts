// Location types for geocoding API

export type LocationSearchType = 'city' | 'country';

export interface LocationData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  display_name: string;
  country_code: string;
  country: string;
  administrative_area?: string;
  timezone?: string;
}

export interface LocationSearchResponse {
  success: boolean;
  data: LocationData[];
}
