export const SYNASTRY_INTRO = "BẢNG PHONG THẦN SYNASTRY.\n\nNơi bóc trần sự thật phũ phàng về mối quan hệ của bạn! Tưởng là định mệnh hóa ra toàn là nghiệp chướng đan xen. Hệ thống đã tự động vứt sọt rác mấy điểm sương sương vô thưởng vô phạt để focus thẳng vào những pha combat nảy lửa hoặc u mê mù quáng nhất giữa hai người.\n\nÔm tim cho chặt vào, kết quả có thể làm bạn suy cả tuần đấy!";

export const ASPECT_MEANINGS: Record<string, string> = {
  conjunction: "Trùng Tụ (Conjunction). Dính nhau như đỉa, u mê quên lối về. Đầu thai chắc cũng đòi đi chung!\n\nGóc chiếu này làm hai bạn hiểu ý nhau tới mức đáng sợ. Nhưng lỡ đứa nào dở chứng toxic thì đứa kia cũng hắc hóa theo luôn. Kiểu 'chết chùm còn hơn sống lẻ'.",
  sextile: "Lục Hợp (Sextile). Bạn bè sương sương, support xã giao.\n\nTương tác kiểu 'có thì vui, không có cũng chả chết ai'. Cả hai có khối tiềm năng để bào tiền của nhau nhưng lại thiếu một mồi lửa đê mê cháy bỏng để gọi là tình yêu sét đánh.",
  square: "Vuông Góc (Square). KẺ THÙ TRUYỀN KIẾP! Hai cái tôi chọi nhau sứt đầu mẻ trán.\n\nCứ hễ mở miệng là bốc hỏa, combat lôi lỗi lầm cũ ra lải nhải từ năm này qua tháng nọ. Nhưng ngộ thay, càng ghét nhau lại càng quấn lấy nhau vì sức hút thao túng quá rùng rợn. Nói chung là cái red flag bự chà bá nhưng vẫn đâm đầu!",
  trine: "Tam Hợp (Trine). Bình yên đến mức buồn ngủ. Mọi thứ mượt mà trơn tuột như nước ốc.\n\nHợp nhau quá đâm ra ỷ y, lười biếng nâng cấp tình cảm, cứ ru ngủ nhau trong một cái kén an toàn giả tạo. Cẩn thận rảnh rỗi sinh nông nổi đi tìm drama ở bên ngoài để đổi gió đấy nha!",
  opposition: "Đối Đỉnh (Opposition). THỪA SỐNG THIẾU CHẾT! Hai thỏi nam châm ngang ngược hút nhau chí mạng.\n\nLúc mới gặp thì bị hớp hồn vì đối phương xài thứ đồ hiệu mình không có. Nhưng chui chung chăn mới lòi ra việc khắc khẩu, giành giật quyền lực, dằn vặt nhau lên bờ xuống ruộng. Kèo này 50/50, một là phát thiệp cưới, hai là phát biên bản hầu tòa!"
};

export function calculateSynastryScore(aspects: { type: string, orb?: number }[]): number {
  if (!aspects || aspects.length === 0) return 20;

  let baseScore = 50;
  let currentWeight = 0;

  for (const aspect of aspects) {
    const orb = aspect.orb ?? 0;
    let weightValue = 0;

    // Tighter orb = more intense score modification
    const orbDensity = Math.max(0.3, 1 - (orb / 7));

    switch (aspect.type.toLowerCase()) {
      case 'conjunction': weightValue = 18; break;
      case 'trine': weightValue = 12; break;
      case 'sextile': weightValue = 5; break;
      case 'square': weightValue = -16; break;
      case 'opposition': weightValue = -11; break;
    }

    currentWeight += (weightValue * orbDensity);
  }

  let finalScore = baseScore + currentWeight;

  // Strictly prevent default 100s or 0s
  if (finalScore >= 100) finalScore = 95 + Math.random() * 4;
  if (finalScore <= 0) finalScore = 2 + Math.random() * 6;

  return Math.round(Math.max(1, Math.min(99, finalScore)));
}
