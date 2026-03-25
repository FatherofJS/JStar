export interface TourStep {
  selector: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  spotlightScale?: number;
  spotlightShape?: 'circle' | string;
  scrollBlock?: ScrollLogicalPosition;
}
export const natalTourSteps: TourStep[] = [
  {
    selector: '.chart-wheel-container',
    title: 'Bản Đồ Sao Cá Nhân',
    description:
      'Đây là bản đồ sao của bạn.\n\nẢnh chụp bầu trời đúng cái khoảnh khắc bạn sinh ra, lúc chưa kịp fake personality.\n\nMấy ký hiệu trong này không random đâu. Nó là bản thiết kế con người bạn luôn.',
    position: 'right',
    spotlightScale: 0.86,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: '12 Cung Hoàng Đạo',
    description:
      'Vòng ngoài chia thành 12 cung.\n\nHành tinh của bạn rơi vào cung nào thì mang vibe của cung đó.\n\nVí dụ Mặt Trời Xử Nữ thì kiểu gì cũng dính bệnh khó ở, thích soi chi tiết và tự làm khổ mình.',
    position: 'right',
    spotlightScale: 0.81,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: 'Hành Tinh Của Bạn',
    description:
      'Mấy icon nhỏ bên trong là hành tinh lúc bạn sinh.\n\nMỗi đứa quản lý một mảng. Mặt Trời là cái tôi, Mặt Trăng là cảm xúc, Kim Tinh là cách bạn yêu.\n\nNói đơn giản là team này đang điều khiển bạn mỗi ngày.',
    position: 'right',
    spotlightScale: 0.69,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: '12 Nhà Mệnh',
    description:
      '12 ô bên trong là 12 mảng cuộc sống.\n\nHành tinh nằm ở đâu thì nó quậy chỗ đó.\n\nTiền, tình, sự nghiệp. Không có cái nào thoát được.',
    position: 'right',
    spotlightScale: 0.47,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: 'Góc Chiếu',
    description:
      'Mấy đường chằng chịt ở giữa là cách các hành tinh tương tác.\n\nXanh là êm. Đỏ là căng.\n\nNhiều đỏ thì đời bạn không bao giờ yên. Kiểu lúc nào cũng có chuyện.',
    position: 'right',
    spotlightScale: 0.41,
    spotlightShape: 'circle',
  },
  {
    selector: '[data-tour="natal-planets"]',
    title: 'Chi Tiết Hành Tinh',
    description:
      'Kéo xuống là phần bóc từng hành tinh.\n\nĐây là chỗ bạn bắt đầu thấy mấy cái nết của mình bị lôi ra ánh sáng.\n\nĐọc chậm thôi. Không cần sốc một lần.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '[data-tour="natal-houses"]',
    title: 'Chi Tiết 12 Nhà',
    description:
      'Phần này cho bạn biết cuộc sống mình đang ổn chỗ nào và nát chỗ nào.\n\nTiền bạc, tình cảm, công việc. Không có vùng an toàn đâu.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '.chat-popup-container',
    title: 'Hỏi AI',
    description:
      'Không hiểu thì hỏi.\n\nHỏi thẳng vào vấn đề. Ví dụ tại sao mình hay overthink, tại sao yêu toàn sai người.\n\nNó đọc chart của bạn rồi trả lời. Không né.',
    position: 'left',
  },
];
export const synastryTourSteps: TourStep[] = [
  {
    selector: '.synastry-wheel-container',
    title: 'Bản Đồ Hai Người',
    description:
      'Đây là bản đồ sao ghép đôi.\n\nHai lá số chồng lên nhau để xem hai người tác động nhau kiểu gì.\n\nKhông phải định mệnh. Nhưng cũng không phải trùng hợp.',
    position: 'right',
    spotlightScale: 0.86,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Hành Tinh Của Người Ta',
    description:
      'Vòng ngoài là của người kia.\n\nĐây là năng lượng họ mang vào cuộc đời bạn.\n\nCó người mang yên bình. Có người mang nguyên combo stress.',
    position: 'right',
    spotlightScale: 0.69,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Hành Tinh Của Bạn',
    description:
      'Vòng trong là của bạn.\n\nChỗ nào hai bên chạm nhau là chỗ mạnh nhất.\n\nThường là vừa hút vừa mệt. Không có chuyện chỉ một chiều.',
    position: 'right',
    spotlightScale: 0.55,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Ảnh Hưởng Lên Bạn',
    description:
      'Hành tinh của họ rơi vào nhà nào của bạn thì ảnh hưởng chỗ đó.\n\nRơi vào nhà tình cảm thì dễ dính.\n\nRơi vào nhà 12 thì chuẩn bị tinh thần cho mấy mối quan hệ khó gọi tên.',
    position: 'right',
    spotlightScale: 0.42,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Góc Giữa Hai Người',
    description:
      'Các đường nối là cách hai người tương tác.\n\nXanh là dễ chịu. Đỏ là căng.\n\nNhiều đỏ thì kiểu không bỏ được nhưng cũng không yên.',
    position: 'right',
    spotlightScale: 0.36,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Soi Kỹ',
    description:
      'Di chuột vào từng đường để xem chi tiết.\n\nĐây là lúc bạn bắt đầu hiểu vì sao hai người vừa hợp vừa cãi nhau suốt.',
    position: 'top',
  },
  {
    selector: '[data-tour="synastry-aspects"]',
    title: 'Danh Sách Aspect',
    description:
      'Danh sách các tương tác quan trọng nhất.\n\nKhông phải cái nào cũng đẹp.\n\nNhưng mấy cái không đẹp mới là thứ khiến bạn nhớ lâu.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '[data-tour="synastry-aspects"]',
    title: 'Rồi Sao Nữa',
    description:
      'Biết rồi thì chọn.\n\nỞ lại, rời đi, hay cứ lao vào tiếp.\n\nChart không quyết định. Bạn mới là người quyết định.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '.chat-popup-container',
    title: 'Hỏi AI',
    description:
      'Rối quá thì hỏi.\n\nNó sẽ nói rõ hai người hợp chỗ nào, lệch chỗ nào.\n\nCòn có tiếp tục hay không thì… tự chịu.',
    position: 'left',
  },
];