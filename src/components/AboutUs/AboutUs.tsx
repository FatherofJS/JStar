import React, { useCallback, useMemo, useState, useEffect, memo } from "react";
import { useDynamicScale } from "../../hooks/useDynamicScale";

import { IconZodiacLeo } from "@tabler/icons-react";
import { IconZodiacVirgo } from "@tabler/icons-react";
import { IconZodiacTaurus } from "@tabler/icons-react";
import { IconZodiacAries } from "@tabler/icons-react";
import { IconZodiacPisces } from "@tabler/icons-react";
import { IconZodiacAquarius } from "@tabler/icons-react";
import { IconZodiacCancer } from "@tabler/icons-react";

import AnhDuc from "./TVimg/DoneDucAnh.webp";
import Huy from "./TVimg/Huy.webp";
import Huyen from "./TVimg/Huyen.webp";
import Manh from "./TVimg/Manh.webp";
import NgocBich from "./TVimg/NgocBich.webp";
import TangThang from "./TVimg/TangThang.webp";
import ThaiMinh from "./TVimg/ThaiMinh.webp";
import TheAnh from "./TVimg/TheAnh.webp";
import Toan from "./TVimg/Toan.webp";
import Tuong from "./TVimg/Tuong.webp";
import QuocAnh from "./TVimg/QuocAnh.webp";
import Sun from "./SunEarth/Sun";
import Earth from "./SunEarth/Earth";
import "./AboutUs.css";

// Member interface
interface Member {
  id: string; // Thêm ID để quản lý chính xác từng thẻ
  name: string;
  role: string;
  imgSrc: string;
  backImgSrc?: string | React.ReactNode; // Thêm ảnh mặt sau hoặc Icon
}

// React.memo giúp thẻ không render lại nếu dữ liệu không đổi
const FlipCardUnit = React.memo(
  ({
    id,
    name,
    role,
    imgSrc,
    backImgSrc,
    style,
    isFlipped,
    onToggle,
  }: {
    id: string;
    name: string;
    role: string;
    imgSrc: string;
    backImgSrc?: string | React.ReactNode;
    style?: React.CSSProperties;
    isFlipped: boolean;
    onToggle: (id: string) => void;
  }) => {
    return (
      <div className="ducanh" style={style}>
        <div className="upright-container">
          <label className="flip-card">
            {/* Chuyển checkbox thành dạng controlled component */}
            <input
              type="checkbox"
              className="flip-input"
              checked={isFlipped}
              onChange={() => onToggle(id)}
            />
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={imgSrc}
                  alt={name}
                  className="imgngon"
                  loading="lazy"
                />
              </div>
              <div className="flip-card-back">
                {typeof backImgSrc === "string" || !backImgSrc ? (
                  <img
                    src={(backImgSrc as string) || imgSrc}
                    alt={`${name} Back`}
                    className="imgngon-sau"
                    loading="lazy"
                  />
                ) : (
                  <div className="imgngon-sau-icon">{backImgSrc}</div>
                )}
              </div>
            </div>
          </label>
          <div className="thongtin">
            <h1 className="chucvu">{role}</h1>
            <h1 className="name">{name}</h1>
          </div>
        </div>
      </div>
    );
  },
);

// Hàm xếp thành hình tròn
const CircularGroup = React.memo(
  ({
    data,
    title,
    radius = 250,
    speed = "40s",
    flippedIds,
    onToggle,
    children,
  }: {
    data: Member[];
    title: string;
    radius?: number;
    speed?: string;
    flippedIds: Set<string>;
    onToggle: (id: string) => void;
    children?: React.ReactNode;
  }) => {
    const count = data.length;
    return (
      <div
        className="circle-wrapper"
        style={{ "--speed": speed } as React.CSSProperties}
      >
        {title && <h2 className="group-title">{title}</h2>}
        <div className="group-circular">
          {children}
          {data.map((member, i) => {
            const angle = (i / count) * 2 * Math.PI;
            const x = Math.round(radius * Math.cos(angle));
            const y = Math.round(radius * Math.sin(angle));

            return (
              <FlipCardUnit
                key={member.id}
                id={member.id}
                name={member.name}
                role={member.role}
                imgSrc={member.imgSrc}
                backImgSrc={member.backImgSrc}
                isFlipped={flippedIds.has(member.id)}
                onToggle={onToggle}
                style={
                  {
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      </div>
    );
  },
);

export const AboutUs = memo(function AboutUs() {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());

  // Mảng dữ liệu các Member Nhóm 1 (Nhóm nhỏ bên trong)
  const group1Members = useMemo(
    (): Member[] => [
      {
        id: "g1-1",
        name: "Tiến Mạnh",
        role: "Take Care",
        imgSrc: Manh, // Ảnh mặt trước (Hãy import ảnh mới ở trên và thay vào đây)
        backImgSrc: <IconZodiacLeo />, // Ảnh mặt sau (Hãy import ảnh mới ở trên và thay vào đây)
      },
      {
        id: "g1-2",
        name: "Tăng Thắng",
        role: "Mentor",
        imgSrc: TangThang,
        backImgSrc: <IconZodiacAries />,
      },
      {
        id: "g1-3",
        name: "Thái Minh",
        role: "Take Care",
        imgSrc: ThaiMinh,
        backImgSrc: <IconZodiacCancer />,
      },
      {
        id: "g1-4",
        name: "Thế Anh",
        role: "Take Care",
        imgSrc: TheAnh,
        backImgSrc: <IconZodiacTaurus />,
      },
      {
        id: "g1-5",
        name: "Ngọc Bích",
        role: "Take Care",
        imgSrc: NgocBich,
        backImgSrc: <IconZodiacTaurus />,
      },
    ],
    [],
  );

  // Mảng dữ liệu các Member Nhóm 2 (Nhóm lớn bên ngoài)
  const group2Members = useMemo(
    (): Member[] => [
      {
        id: "g2-1",
        name: "Anh Đức",
        role: "CTV",
        imgSrc: AnhDuc,
        backImgSrc: <IconZodiacVirgo />,
      },
      {
        id: "g2-2",
        name: "Đức Huy",
        role: "CTV",
        imgSrc: Huy,
        backImgSrc: <IconZodiacPisces />,
      },
      {
        id: "g2-3",
        name: "Khánh Huyền",
        role: "CTV",
        imgSrc: Huyen,
        backImgSrc: <IconZodiacLeo />,
      },
      {
        id: "g2-4",
        name: "Quang Toàn",
        role: "CTV",
        imgSrc: Toan,
        backImgSrc: <IconZodiacCancer />,
      },
      {
        id: "g2-5",
        name: "Hữu Tường",
        role: "CTV",
        imgSrc: Tuong,
        backImgSrc: <IconZodiacAquarius />,
      },
      {
        id: "g2-6",
        name: "Quốc Anh",
        role: "CTV",
        imgSrc: QuocAnh,
        backImgSrc: <IconZodiacVirgo />,
      },
    ],
    [],
  );

  // Xử lý đóng/mở từng thẻ - useCallback giúp React.memo hoạt động đúng
  const toggleCard = useCallback((id: string) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Xử lý click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Nếu nơi click vào KHÔNG nằm trong một tấm thẻ (.flip-card)
      // thì chúng ta lật tất cả về mặt trước nhưng chỉ cập nhật state nếu thực sự có thẻ đang lật
      if (!target.closest(".flip-card")) {
        setFlippedIds((prev) => {
          if (prev.size === 0) return prev; // Bail out to prevent re-renders
          return new Set();
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý scale mượt mà (fluid scaling) dùng hook dùng chung
  const dynamicScale = useDynamicScale();

  return (
    <div className="about-us-wrapper">
      <h2 className="about-us-title">Our Team</h2>
      <div
        className="usercontainer"
        style={{ zoom: dynamicScale } as React.CSSProperties}
      >
        <CircularGroup
          data={group1Members}
          title=""
          radius={200}
          speed="40s"
          flippedIds={flippedIds}
          onToggle={toggleCard}
        >
          <div className="upright-container">
            <Earth />
          </div>
        </CircularGroup>
        <CircularGroup
          data={group2Members}
          title=""
          radius={250}
          speed="40s"
          flippedIds={flippedIds}
          onToggle={toggleCard}
        >
          <div className="upright-container">
            <Sun />
          </div>
        </CircularGroup>
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <a
          href="/fatherofjs"
          className="easter-egg-link"
          style={{
            color: "inherit",
            textDecoration: "none",
            fontSize: "0.8rem",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
        >
          ✦ bí mật vũ trụ ✦
        </a>
      </div>
    </div>
  );
});

export default AboutUs;
