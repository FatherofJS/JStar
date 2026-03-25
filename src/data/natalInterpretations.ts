export const NATAL_INTRO = "BÓC TRẦN LÁ SỐ: Đây là ảnh chụp bầu trời đúng cái khoảnh khắc bạn chào đời, lúc bạn còn chưa kịp fake personality.\n\nMặt Trời, Mặt Trăng và cả đám hành tinh lúc đó đứng ở đâu, tụ lại kiểu gì thì nó build sẵn cái 'bản thiết kế con người' của bạn luôn. Không phải ngẫu nhiên bạn như này đâu, có kịch bản hết rồi.\n\nĐọc xong có thể hơi nhột. Nhưng thôi, vũ trụ nó không có thói quen nịnh người.";
export const PLANET_MEANINGS: Record<string, string> = {
  Sun: "Cái tôi xưng bá vũ trụ của bạn. Bản ngã to bự, thích chiếm spotlight, luôn đinh ninh mình là nhân vật chính diện.\n\nMặt Trời rơi trúng cung nào thì bạn sẽ 'diễn' nét diễn đó cho cả thiên hạ xem.",
  Moon: "Con người thật của bạn khi chui vào góc tối. Lúc 2 giờ sáng khóc ướt gối, lúc giãy nảy đòi tình cảm, lúc overthinking cắn dở cái chăn.\n\nTất cả mớ drama nội tâm đấy đều do ông Trăng này giật dây!",
  Mercury: "Cái miệng và bộ não của bạn. Mở mồm ra là tuôn đạo lý hay hở ra là nói hớ, cãi nhau trên mạng bất bại hay chửi thề thành thơ đều do sao Thủy quyết định.\n\nSao Thủy mà đi lùi thì xác định chuẩn bị nhắn tin nhầm cho người yêu cũ!",
  Venus: "Trụ sở chính quản lý tình yêu và cái đẹp. Bạn dễ đổ kiểu người nào, thích được tặng quà gì, ghen tuông lồng lộn hay ghen ngầm, toxic hay simp chúa đều nằm hết ở đây.\n\nSao Kim mà yếu thì tình duyên lận đận, sao Kim mà mạnh thì sát gái sát trai!",
  Mars: "Bản năng động thủ và nết chiến đấu. Bạn máu chó hay hiền khô, quyết làm tới cùng hay chần chừ nhát cáy, xông pha cống hiến hay đắp chăn trùm đầu đều do ông Hỏa cầm trịch.\n\nSao Hỏa mạnh là chiến binh, yếu là tàng hình!",
  Jupiter: "Ông thần tài béo tốt của bản đồ sao. Sao Mộc ở đâu là bạn được độ ở đó, may mắn tràn trề, phóng đại mọi thứ lên mức vô cực.\n\nNhưng chú ý nhé, may mắn quá trớn dễ sinh ra ảo não và lười biếng khó chữa!",
  Saturn: "Cụ giáo siêu cấp khó tính của vũ trụ. Bạn sợ hãi cái gì, tự ti chỗ nào, bị cuộc đời vả xưng mặt ở lĩnh vực nào thì cứ nhìn thẻ điểm của sao Thổ.\n\nNhưng một khi qua được bài test của cụ thì bạn sẽ vô địch thiên hạ!",
  Uranus: "Thành phần chống đối xã hội. Đóng đô ở đâu là bạn phát rồ ở đó, lập dị, nổi loạn và quái thai không giống ai.\n\nĐam mê tự do đến mức sẵn sàng tự tay đập nát cái bát cơm ổn định chỉ để đổi lấy hai chữ 'khác biệt'.",
  Neptune: "Trùm tạo ảo giác. Chuyên gia mơ mộng, chúa tể lãng mạn, nhưng cũng ngây thơ xám xịt dễ bị lừa gạt tình cảm.\n\nSao Hải Vương mà vượng thì hoặc là nghệ sĩ tài ba, hoặc là kẻ nghiện ngập chìm đắm trong ảo mộng!",
  Pluto: "Trùm phản diện ép bạn tiến hóa. Những cú sốc giập mật, những lần bị úp sọt phản bội, và cách bạn bò lên từ đống tro tàn đều do Diêm Vương Tinh đạo diễn.\n\nCái gì không hạ gục được bạn sẽ làm bạn hung hãn hơn!",
  Chiron: "Vết thương hở miệng không bao giờ đóng vảy. Nỗi đau giấu kín nhất, cục tạ mặc cảm nặng nhất.\n\nNhưng trớ trêu thay, chính chỗ bạn đau lại là nơi bạn đi rắc thuốc đỏ chữa lành cho thiên hạ. Nghe có cay không cơ chứ!",
  "North Node": "Giao Điểm Bắc. Đích đến ép buộc của kiếp này. Bài tập về nhà bạn PHẢI làm nhưng toàn kiếm cớ lỉnh đi vì nó chua và chát.\n\nCứ cố chấp bơi ngược dòng thì cả đời dậm chân tại chỗ!",
  "South Node": "Giao Điểm Nam. Cái nôi nghiệp chướng từ kiếp trước. Khu vực bạn bá đạo sẵn rồi nhưng nếu cứ ru rú bám lấy nó thì vĩnh viễn không chịu lớn.\n\nĐấy chính là cái bẫy comfort zone êm ái nhưng chết người!"
};

export const HOUSE_MEANINGS: Record<number, string> = {
  1: "MẶT TIỀN XÃ HỘI. Cú lừa thị giác đầu tiên bạn tạo ra, phong cách cá nhân và lớp mặt nạ bạn trát lên mặt khi ra đường.\n\nNhà 1 mà rực rỡ thì điệu bộ như minh tinh, Nhà 1 mà hẻo thì tàng hình giữa đám đông!",
  2: "SỔ MỘT TÀI CHIẾNH. Bạn hốt bạc giỏi cỡ nào, phá sản nhanh ra sao, và định giá lòng tự trọng của bản thân ở mức nào.\n\nNhà 2 mà gánh nghiệp thì tài khoản ngân hàng lúc nào cũng chơi trò tàu lượn siêu tốc!",
  3: "LOA PHƯỜNG. Kỹ năng múa mép, buôn dưa lê bán dưa chuột, quan hệ với hàng xóm láng giềng và lối tư duy vặt vãnh hàng ngày.\n\nNhà 3 mà vượng thì cãi tay đôi không ai lại, Nhà 3 mà hẻo thì ra đường câm như hến!",
  4: "HANG Ổ KÍN THUẬT. Nơi trốn giấu kỹ nhất, nguồn cội gia tiên, hình bóng rành rành của vị mẫu thân, và định nghĩa 'nhà' của bạn.\n\nNhà 4 mà tanh bành thì tuổi thơ đẫm máu nước mắt, lớn lên vẫn vác theo mớ hành lý tổn thương!",
  5: "SÂN CHƠI TÓP TÓP. Chỗ để bung xõa, crush dạo qua đường, tình trường lãng xẹt, con cái nheo nhóc và ma lực tiệc tùng.\n\nNhà 5 mà trống hoác thì thanh xuân nhạt như nước ốc, Nhà 5 mà xôm tụ thì đóng cọc sàn nhảy!",
  6: "MÁY CÀY DEADLINE. Thói quen hành hạ bản thân mỗi sáng, hồ sơ bệnh án và cung cách cúc cung tận tụy hầu hạ người khác.\n\nNhà 6 mà trúng độc thì dăm bữa nửa tháng ốm lặt vặt, chạy KPI lao lực đến hói cả đầu!",
  7: "KỊCH BẢN CHỐT ĐƠN. Hình mẫu người chung chăn gối, đối tác làm ăn và cả mấy đứa kẻ thù thích hất cùn công khai hắt nước bẩn mặt bạn.\n\nĐáng buồn là Nhà 7 hay hút đúng cái đám mà bạn thề sống thề chết KHÔNG thèm đụng tới!",
  8: "CHUYỆN KÍN BƯNG VÀ TIỀN THIÊN HẠ. Hòm châu báu của người khác, tiền ăn bám, thừa kế, chuyện phòng the góc khuất và mấy pha thót tim cải tử hoàn sinh.\n\nNhà 8 mà mạnh thì ăn lộc ké cực sướng, Nhà 8 mà yếu thì hở ra là bị xù nợ mất trắng!",
  9: "SỔ TAY TRIẾT GIA. Chuyến bay xuất ngoại, giáo sư tiến sĩ, tôn giáo, và góc nhìn trên trời mây.\n\nNhà 9 vượng thì hở tí là xách vali đi chữa lành, Nhà 9 yếu thì quanh năm suốt tháng lướt tóp tóp ngắm cảnh ở nhà!",
  10: "HÀOO QUANG CHÁNH QUẢ. Cái ghế giám đốc, danh ảo trên mạng, hình bóng vị phụ thân, và cách thiên hạ phong thánh cho bạn.\n\nNhà 10 đỉnh thì thở ra cũng có người dạ vâng, Nhà 10 bèo thì làm trâu làm ngựa mãi chả ai thèm khen!",
  11: "ĐẢNG PHÁI BÈ LŨ. Hội nhóm tụ tập, cộng đồng fan club, ước mơ đổi đời trúng Vietlott và hy vọng tương lai.\n\nNhà 11 rực rỡ thì đi đâu cũng chốt được mối quan hệ, Nhà 11 tẻ nhạt thì chỉ có nước tự chơi với dế!",
  12: "KHO LƯU TRỮ VONG LINH. Góc khuất vô thức, bí mật động trời, kẻ đâm sau lưng, chuyện tâm linh và chỗ đứng tự kỷ một mình.\n\nNhà 12 mà trỗi dậy thì hoặc là làm pháp sư gọi cõi âm, hoặc là chuyên gia hù dọa... chính mình!"
};
