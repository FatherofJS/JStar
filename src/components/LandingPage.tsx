import AboutUs from "./AboutUs/AboutUs";
export function LandingPage() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        width: "100%",
        height: "100%",
      }}
    >
      <AboutUs />
    </div>
  );
}
