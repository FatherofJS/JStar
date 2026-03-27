export interface DocsSection {
  id: string;
  title: string;
  image?: string;
  content: string[];
}

export const DOCS_SECTIONS: DocsSection[] = [
  {
    id: "birth-chart",
    title: "Birth Chart Là Gì Mà Ai Cũng Nhắc?",
    image: "https://picsum.photos/seed/birthchart/800/400",
    content: [
      "Birth chart là ảnh chụp bầu trời đúng khoảnh khắc bạn vừa sinh ra. Không phải ảnh selfie. Là vị trí của Mặt Trời, Mặt Trăng và toàn bộ hành tinh lúc đó.",
      "Giờ sinh cực kỳ quan trọng. Sai 30 phút là lệch luôn Mặt Trăng. Lệch mood. Lệch tính cách. Xong rồi lại thắc mắc tại sao mình cứ yêu nhầm người.",
      "Lá số có 3 thứ chính. Hành tinh là cái gì đang hoạt động. Cung hoàng đạo là nó hoạt động kiểu gì. Nhà là nó xảy ra ở đâu trong cuộc đời bạn. Ghép lại là ra bản hướng dẫn sử dụng bản thân. Nhưng đọc lần đầu kiểu gì cũng lú.",
    ],
  },

  {
    id: "zodiac-wheel",
    title: "Vòng Hoàng Đạo: Nhìn Rối Nhưng Không Phải Nghệ Thuật",
    image: "https://picsum.photos/seed/zodiacwheel/800/400",
    content: [
      "Cái vòng tròn này không phải bánh pizza. Dù nhìn lâu cũng thấy đói. Đây là Zodiac Wheel. Nó được chia thành 12 phần bằng nhau. Mỗi phần là một cung hoàng đạo.",
      "Vòng ngoài là 12 cung. Vòng bên trong là 12 nhà. Các hành tinh nằm rải rác khắp nơi. Mấy đường kẻ chéo bên trong gọi là aspect. Hiểu đơn giản là hành tinh đang hợp nhau hay đang ghét nhau.",
      "Cách đọc thì rất đơn giản. Nhìn hành tinh nằm ở cung nào. Nằm trong nhà nào. Và đang tương tác với hành tinh nào khác. Nghe thì dễ. Nhưng đọc lần đầu đảm bảo sẽ muốn tắt tab.",
    ],
  },

  {
    id: "planets",
    title: "Hành Tinh: Ai Đang Điều Khiển Cuộc Đời Bạn",
    image: "https://picsum.photos/seed/planets/800/400",
    content: [
      "Mỗi hành tinh đại diện cho một phần trong con người bạn. Coi như dàn nhân vật chính trong bộ phim cuộc đời. Có đứa hiền. Có đứa chuyên gây drama.",
      "Mặt Trời là cái tôi của bạn. Là thứ bạn muốn người khác nhìn thấy. Kiểu phần profile bạn khoe với crush.",
      "Mặt Trăng là cảm xúc thật. Phiên bản bạn lúc 2 giờ sáng. Overthink. Nhớ người cũ. Xong rồi lại tự nhắn tin xin lỗi dù mình không sai.",
      "Sao Thủy là cách bạn suy nghĩ và nói chuyện. Khi nó đi lùi thì nhắn tin dễ hiểu lầm. Gửi một câu mà người ta đọc ra ba ý khác nhau.",
      "Sao Kim là tình yêu và gu của bạn. Thích kiểu người nào. Yêu kiểu nhẹ nhàng hay yêu kiểu đau tim mỗi ngày.",
      "Sao Hỏa là động lực và cơn giận. Có người tức là nói luôn. Có người im im rồi block thẳng tay.",
      "Mộc Tinh là may mắn. Nó nằm ở đâu thì cuộc sống ở chỗ đó dễ thở hơn.",
      "Thổ Tinh là áp lực. Là thứ bắt bạn trưởng thành dù bạn chưa sẵn sàng.",
      "Mấy hành tinh ngoài như Uranus, Neptune, Pluto thì không gây drama mỗi ngày. Nhưng mỗi lần nó xuất hiện là cuộc đời đổi hướng luôn.",
    ],
  },

  {
    id: "houses",
    title: "12 Nhà: Cuộc Đời Bạn Chia Thành 12 Khu",
    image: "https://picsum.photos/seed/houses12/800/400",
    content: [
      "12 nhà là 12 lĩnh vực trong cuộc sống. Hành tinh rơi vào nhà nào thì nhà đó bị ảnh hưởng mạnh nhất.",
      "Nhà 1 là bản thân bạn. Vibe bạn phát ra khi người khác nhìn lần đầu.",
      "Nhà 2 là tiền và giá trị bản thân. Nhà này yếu là dễ rơi vào tình trạng vừa nghèo vừa tự ti.",
      "Nhà 3 là giao tiếp. Nói chuyện có duyên hay nói xong người ta muốn bỏ đi là nhìn ở đây.",
      "Nhà 4 là gia đình và nơi bạn cảm thấy an toàn. Kiểu chỗ để trốn khi cuộc đời quá mệt.",
      "Nhà 5 là yêu đương và crush. Nhà này mạnh là kiểu người yêu đương liên tục. Nhưng bền hay không thì chưa chắc.",
      "Nhà 6 là học hành, công việc, sức khỏe. Tức là phần không vui lắm nhưng vẫn phải làm mỗi ngày.",
      "Nhà 7 là người yêu, người yêu cũ và cả người yêu tương lai. Nếu drama tình cảm nhiều thì nhìn thẳng nhà này.",
      "Nhà 8 là cảm xúc sâu và mấy chuyện không muốn nói ra. Nhà này mạnh là yêu kiểu rất sâu. Nhưng đau cũng rất sâu.",
      "Nhà 9 là ước mơ lớn và suy nghĩ về cuộc đời. Kiểu lúc nằm nghĩ tương lai lúc 1 giờ sáng.",
      "Nhà 10 là sự nghiệp và hình ảnh ngoài xã hội. Người ta nhìn bạn thành công hay không là nhìn ở đây.",
      "Nhà 11 là bạn bè và hội nhóm. Bạn chơi với người tốt hay toàn người khiến bạn mất ngủ cũng nằm ở đây.",
      "Nhà 12 là nỗi sợ và những thứ bạn giấu kỹ nhất. Kiểu ngoài mặt ổn nhưng trong đầu thì đang hỗn loạn.",
    ],
  },

  {
    id: "aspects",
    title: "Aspect: Hành Tinh Có Hợp Nhau Không",
    image: "https://picsum.photos/seed/aspects/800/400",
    content: [
      "Aspect là cách các hành tinh tương tác với nhau. Hiểu đơn giản giống như mối quan hệ giữa người với người. Có người hợp ngay từ đầu. Có người nhìn là thấy mệt.",
      "Conjunction là dính sát nhau. Năng lượng mạnh. Có thể rất tốt hoặc rất toxic.",
      "Opposition là đối đầu. Luôn có cảm giác bị kéo hai phía. Kiểu vừa muốn ở lại vừa muốn biến mất.",
      "Trine là dễ chịu. Mọi thứ trôi rất mượt. Nhưng đôi khi dễ quá nên lại thành lười.",
      "Square là căng thẳng. Nhưng chính mấy cái này lại làm bạn trưởng thành nhanh nhất.",
      "Sextile là cơ hội. Không tự đến đâu. Bạn phải chủ động mới dùng được.",
      "Nhìn chart mà thấy nhiều đường đỏ là biết cuộc đời không nhẹ nhàng. Nhưng bù lại thường rất thú vị.",
    ],
  },

  {
    id: "synastry",
    title: "Synastry: Hai Người Có Hợp Không Hay Chỉ Hợp Drama",
    image: "https://picsum.photos/seed/synastry/800/400",
    content: [
      "Synastry là chồng hai lá số lên nhau để xem hai người tương tác thế nào. Không phải định mệnh. Nhưng cũng không phải trùng hợp.",
      "Nếu nhiều góc đẹp thì dễ hiểu nhau hơn. Ít cãi nhau hơn. Nhưng đôi khi lại hơi chán vì không có drama.",
      "Nếu nhiều góc căng thì sẽ rất thu hút. Kiểu vừa mệt vừa không bỏ được. Chính xác kiểu relationship làm bạn mất ngủ lúc 2 giờ sáng.",
      "Mấy combo kiểu Venus và Mars thường rất mạnh. Thu hút nhanh. Yêu nhanh. Cũng dễ cháy nhanh.",
      "Quan trọng nhất. Điểm cao không đảm bảo yêu lâu. Điểm thấp cũng không có nghĩa là không yêu được. Nó chỉ cho bạn thấy hai người hoạt động với nhau như thế nào.",
    ],
  },

  {
    id: "chatbot",
    title: "AI Astrologer: Hỏi Đúng Thì Nó Trả Lời Chuẩn",
    image: "https://picsum.photos/seed/aichatbot/800/400",
    content: [
      "Sau khi có chart thì dùng AI để hỏi. Nó đọc trực tiếp từ lá số của bạn chứ không trả lời chung chung.",
      "Hỏi kiểu thông minh là hỏi cụ thể. Ví dụ Mặt Trăng nhà 12 nghĩa là gì. Hoặc tại sao mình hay overthink.",
      "Hỏi kiểu vô vọng là hỏi mai có người yêu không. Không ai biết được cái đó.",
      "Càng hỏi rõ thì câu trả lời càng đúng. Hỏi chung chung thì nó cũng chỉ trả lời chung chung.",
      "Coi nó như một đứa bạn hiểu bạn hơi quá mức. Hơi đáng sợ nhưng cũng khá hữu ích.",
    ],
  },

  {
    id: "aesthetic-board",
    title: "Aesthetic Board: Nhìn Thấy Năng Lượng Của Bạn",
    image: "https://picsum.photos/seed/aesthetic/800/400",
    content: [
      "Aesthetic Board không phải là một bộ sưu tập ảnh ngẫu nhiên. Nó là visual hóa những dấu ấn năng lượng trong lá số của bạn.",
      "Sun Sign cho biết phong cách tổng thể. Moon Sign là cảm xúc bên trong. ASC là vẻ ngoài bạn phát ra. AI sẽ tinh tuyển những tấm ảnh khớp với các tần số này.",
      "Bạn có thể dùng nút shuffle để thay đổi góc nhìn. Và đừng quên xem bản Song Hành cùng người yêu để thấy hai vũ trụ hòa quyện thế nào.",
    ],
  },

  {
    id: "how-to-use",
    title: "Cách Dùng JSTAR Trong 1 Phút",
    image: "https://picsum.photos/seed/howtouse/800/400",
    content: [
      "Bước 1. Nhập thông tin sinh. Đặc biệt là giờ sinh. Không có giờ sinh là chart sai gần một nửa.",
      "Bước 2. Bấm generate chart và đợi vài giây.",
      "Bước 3. Xem vòng tròn chart và kéo xuống để đọc dữ liệu chi tiết.",
      "Bước 4. Muốn xem với người khác thì dùng Synastry. Rất hợp để test crush.",
      "Bước 5. Không hiểu gì thì hỏi AI. Đừng cố đọc một mình rồi stress.",
      "Xong rồi. Không phức tạp. Chỉ là lần đầu nhìn sẽ hơi choáng thôi.",
    ],
  },
];