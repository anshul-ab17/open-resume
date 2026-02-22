export default function Hero() {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
          Hi, I'm <span style={{ color: "#f97316" }}>Anshul Bharat</span>
        </h1>
        <p style={{ marginTop: "16px", color: "#aaa" }}>
          Full Stack Developer • AI Systems • Monorepo Architect
        </p>
      </div>
    </section>
  );
}