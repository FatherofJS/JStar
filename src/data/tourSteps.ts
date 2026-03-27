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
      'Đây là bản đồ sao của bạn.\n\nNói đơn giản là bầu trời lúc bạn sinh ra trông như thế nào thì nó nằm hết trong này.\n\nMấy ký hiệu này đều có ý nghĩa riêng.',
    position: 'right',
    spotlightScale: 0.86,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: '12 Cung Hoàng Đạo',
    description:
      'Vòng ngoài là 12 cung.\n\nHành tinh rơi vào cung nào thì sẽ “nhuốm màu” cung đó.\n\nNên cùng một hành tinh nhưng mỗi người thể hiện khác nhau.',
    position: 'right',
    spotlightScale: 0.81,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: 'Hành Tinh',
    description:
      'Các icon bên trong là các hành tinh.\n\nMỗi cái đại diện cho một phần trong bạn, như cách nghĩ, cảm xúc hay cách bạn yêu.\n\nGộp lại thì ra cách bạn vận hành mỗi ngày.',
    position: 'right',
    spotlightScale: 0.69,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: '12 Nhà Mệnh',
    description:
      '12 phần bên trong là 12 mảng cuộc sống.\n\nHành tinh nằm ở đâu thì ảnh hưởng nhiều ở đó.\n\nVí dụ tiền bạc, công việc hay chuyện tình cảm.',
    position: 'right',
    spotlightScale: 0.47,
    spotlightShape: 'circle',
  },
  {
    selector: '.chart-wheel-container',
    title: 'Góc Chiếu',
    description:
      'Mấy đường nối ở giữa cho thấy các hành tinh đang tương tác với nhau.\n\nCó cái hợp, có cái căng.\n\nNên mới có chuyện trong bạn có lúc rất mượt, có lúc lại tự đụng nhau.',
    position: 'right',
    spotlightScale: 0.41,
    spotlightShape: 'circle',
  },
  {
    selector: '[data-tour="natal-planets"]',
    title: 'Chi Tiết Hành Tinh',
    description:
      'Kéo xuống là phần đọc từng hành tinh.\n\nMuốn hiểu rõ từng phần trong mình thì xem ở đây.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '[data-tour="natal-houses"]',
    title: 'Chi Tiết 12 Nhà',
    description:
      'Phần này nói về từng mảng trong cuộc sống.\n\nBạn sẽ thấy chỗ nào đang ổn, chỗ nào dễ gặp vấn đề.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '.chat-popup-container',
    title: 'Hỏi AI',
    description:
      'Có gì thắc mắc thì hỏi luôn.\n\nCứ hỏi thẳng vấn đề bạn đang quan tâm.\n\nBên này sẽ dựa trên chart của bạn để trả lời.',
    position: 'left',
  },
];
export const synastryTourSteps: TourStep[] = [
  {
    selector: '.synastry-wheel-container',
    title: 'Bản Đồ Hai Người',
    description:
      'Đây là bản đồ sao của hai bạn.\n\nHai lá số chồng lên nhau để xem hai người chạm vào nhau thế nào.\n\nCó những thứ nhìn vào là thấy lý do vì sao lại gặp nhau.',
    position: 'right',
    spotlightScale: 0.86,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Hành Tinh Của Người Ta',
    description:
      'Vòng ngoài là của người kia.\n\nĐây là những gì họ mang vào cuộc sống của bạn.\n\nCó thứ rất dễ chịu. Có thứ khiến bạn nhớ mãi.',
    position: 'right',
    spotlightScale: 0.69,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Hành Tinh Của Bạn',
    description:
      'Vòng trong là của bạn.\n\nChỗ hai bên chạm nhau là chỗ cảm nhận rõ nhất.\n\nThường là vừa hợp. Vừa không dứt ra được.',
    position: 'right',
    spotlightScale: 0.55,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Ảnh Hưởng Lên Bạn',
    description:
      'Hành tinh của họ rơi vào đâu trong bạn thì chạm vào đúng chỗ đó.\n\nCó chỗ làm bạn thấy an toàn. Có chỗ khiến bạn rung lên.',
    position: 'right',
    spotlightScale: 0.42,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Góc Giữa Hai Người',
    description:
      'Các đường nối là cách hai bạn tương tác.\n\nCó cái rất êm. Có cái không dễ chịu lắm.\n\nNhưng chính mấy chỗ đó mới tạo nên cảm giác “khó hiểu mà vẫn muốn ở lại”.',
    position: 'right',
    spotlightScale: 0.36,
    spotlightShape: 'circle',
  },
  {
    selector: '.synastry-wheel-container',
    title: 'Soi Kỹ',
    description:
      'Di chuột vào từng đường để xem chi tiết.\n\nBạn sẽ bắt đầu thấy rõ vì sao hai người lại ảnh hưởng nhau như vậy.',
    position: 'top',
  },
  {
    selector: '[data-tour="synastry-aspects"]',
    title: 'Danh Sách Aspect',
    description:
      'Đây là những tương tác chính giữa hai bạn.\n\nKhông phải cái nào cũng nhẹ nhàng.\n\nNhưng thường chính mấy cái đó mới làm mọi thứ trở nên đáng nhớ.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '[data-tour="synastry-aspects"]',
    title: 'Rồi Sao Nữa',
    description:
      'Hiểu được rồi thì bạn sẽ tự biết mình muốn gì.\n\nỞ lại, bước tiếp, hay giữ khoảng cách.\n\nMối quan hệ nào cũng là lựa chọn.',
    position: 'top',
    scrollBlock: 'start',
  },
  {
    selector: '.chat-popup-container',
    title: 'Hỏi AI',
    description:
      'Nếu còn thắc mắc thì cứ hỏi.\n\nNói rõ điều bạn đang nghĩ.\n\nBên này sẽ giúp bạn nhìn rõ hơn một chút.',
    position: 'left',
  },
];