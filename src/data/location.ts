export type CountryCode = "VN" | "US"

export type City = {
  code: string
  name: string
}

export type Country = {
  code: CountryCode
  name: string
  cities: City[]
}

export const COUNTRIES: Country[] = [
  {
    code: "VN",
    name: "Việt Nam",
    cities: [
      { code: "HN", name: "Hà Nội" },
      { code: "HCM", name: "Hồ Chí Minh" },
    ],
  },
  {
    code: "US",
    name: "United States",
    cities: [
      { code: "NYC", name: "New York" },
      { code: "SF", name: "San Francisco" },
    ],
  },
]
