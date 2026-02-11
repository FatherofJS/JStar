export type CountryCode = "VN" | "US"

export type City = {
  code: number
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
      { code: 1, "name": "Thủ đô Hà Nội" },
      { code: 4, "name": "Tỉnh Cao Bằng" },
      { code: 8, "name": "Tỉnh Tuyên Quang" },
      { code: 10, "name": "Tỉnh Lào Cai" },
      { code: 11, "name": "Tỉnh Điện Biên" },
      { code: 12, "name": "Tỉnh Lai Châu" },
      { code: 14, "name": "Tỉnh Sơn La" },
      { code: 19, "name": "Tỉnh Thái Nguyên" },
      { code: 20, "name": "Tỉnh Lạng Sơn" },
      { code: 22, "name": "Tỉnh Quảng Ninh" },
      { code: 25, "name": "Tỉnh Phú Thọ" },
      { code: 27, "name": "Tỉnh Bắc Ninh" },
      { code: 31, "name": "Thành phố Hải Phòng" },
      { code: 33, "name": "Tỉnh Hưng Yên" },
      { code: 37, "name": "Tỉnh Ninh Bình" },
      { code: 38, "name": "Tỉnh Thanh Hóa" },
      { code: 40, "name": "Tỉnh Nghệ An" },
      { code: 42, "name": "Tỉnh Hà Tĩnh" },
      { code: 45, "name": "Tỉnh Quảng Trị" },
      { code: 46, "name": "Thành phố Huế" },
      { code: 48, "name": "Thành phố Đà Nẵng" },
      { code: 51, "name": "Tỉnh Quảng Ngãi" },
      { code: 56, "name": "Tỉnh Khánh Hòa" },
      { code: 64, "name": "Tỉnh Gia Lai" },
      { code: 66, "name": "Tỉnh Đắk Lắk" },
      { code: 68, "name": "Tỉnh Lâm Đồng" },
      { code: 72, "name": "Tỉnh Tây Ninh" },
      { code: 75, "name": "Tỉnh Đồng Nai" },
      { code: 79, "name": "Thành phố Hồ Chí Minh" },
      { code: 86, "name": "Tỉnh Vĩnh Long" },
      { code: 87, "name": "Tỉnh Đồng Tháp" },
      { code: 89, "name": "Tỉnh An Giang" },
      { code: 92, "name": "Thành phố Cần Thơ" },
      { code: 96, "name": "Tỉnh Cà Mau" }],
  },
]
