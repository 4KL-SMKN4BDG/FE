import React, { useState } from "react";

/* ================= INTERFACE ================= */
interface Tutorial {
  id: number;
  title: string;
  image: string;
}

interface Course {
  id: number;
  title: string;
  subtitle: string;
  logo: string;
}

/* ================= DATA ================= */
const tutorials: Tutorial[] = [
  { id: 1, title: "Selamat Datang", image: "src/assets/logoEflow.jpeg" },
  { id: 2, title: "Tutorial", image: "src/assets/logoEflow.jpeg" },
  { id: 3, title: "Tutorial 2", image: "src/assets/logoEflow.jpeg" },
];

const courses: Course[] = [
  {
    id: 1,
    title: "Eflow Baraya Multika",
    subtitle: "Eflow Baraya Multika",
    logo: "src/assets/logoEflow.jpeg",
  },
  {
    id: 2,
    title: "Curaweda Palangan Inotech",
    subtitle: "Curaweda Palangan Inotech",
    logo: "src/assets/logosmkn4.png",
  },
  {
    id: 3,
    title: "Eflow Baraya Multika",
    subtitle: "Eflow Baraya Multika",
    logo: "src/assets/logosmkn4.png",
  },
];

/* ================= COMPONENT ================= */
const MainPage: React.FC = () => {
  const [showForm, setShowForm] = useState(true);

  const [form, setForm] = useState({
    nama: "",
    ttl: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    organisasi: "",
    pengalaman: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert("Data berhasil dikirim");
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      {/* ================= MODAL FORM ================= */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3 style={styles.formTitle}>FORMULIR PROFIL DIRI</h3>

            <div style={styles.row}>
              <input
                style={styles.input}
                placeholder="NAMA LENGKAP"
                name="nama"
                onChange={handleChange}
              />
              <input
                style={styles.input}
                placeholder="TEMPAT, TANGGAL LAHIR"
                name="ttl"
                onChange={handleChange}
              />
            </div>

            <div style={styles.gridAlamat}>
              <input
                style={styles.input}
                placeholder="ALAMAT LENGKAP"
                name="alamat"
                onChange={handleChange}
              />
              <input
                style={styles.input}
                placeholder="KELURAHAN"
                name="kelurahan"
                onChange={handleChange}
              />
              <input
                style={styles.input}
                placeholder="KECAMATAN"
                name="kecamatan"
                onChange={handleChange}
              />
            </div>

            <textarea
              style={styles.textarea}
              placeholder="ORGANISASI YANG PERNAH ANDA IKUTI"
              name="organisasi"
              onChange={handleChange}
            />

            <textarea
              style={styles.textarea}
              placeholder="PENGALAMAN"
              name="pengalaman"
              onChange={handleChange}
            />

            <button style={styles.submitBtn} onClick={handleSubmit}>
              ➜
            </button>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <header style={styles.header}>
        <div>
          <h3 style={{ margin: 0 }}>Title</h3>
          <span style={{ fontSize: 12, color: "#666" }}>Description</span>
        </div>
        <button style={styles.logoutBtn}>Log Out</button>
      </header>

      {/* ================= BANNER ================= */}
      <section style={styles.banner}>
        <div style={styles.overlay}></div>
        <h1 style={styles.bannerText}>SELAMAT DATANG</h1>
      </section>

      {/* ================= TUTORIAL ================= */}
      <section style={styles.tutorialSection}>
        {tutorials.map((item) => (
          <div key={item.id} style={styles.tutorialItem}>
            <div style={styles.tutorialCircle}>
              <img src={item.image} style={styles.tutorialImg} />
            </div>
            <p style={styles.tutorialTitle}>{item.title}</p>
          </div>
        ))}
      </section>

      {/* ================= COURSE ================= */}
      <section style={styles.courseSection}>
        {courses.map((course) => (
          <div key={course.id} style={styles.courseCard}>
            <div style={styles.logoWrapper}>
              <img src={course.logo} style={styles.courseLogo} />
            </div>
            <h4>{course.title}</h4>
            <p style={{ fontSize: 13, color: "#666" }}>{course.subtitle}</p>
            <button style={styles.viewBtn}>View</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MainPage;

/* ================= STYLES ================= */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },

  /* ===== MODAL ===== */
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modalBox: {
    width: 750,
    maxWidth: "95%",
    background: "#fff",
    borderRadius: 20,
    padding: "32px 36px",
    position: "relative",
  },

  formTitle: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 20,
    fontWeight: "bold",
  },

  row: {
    display: "flex",
    gap: 12,
    marginBottom: 14,
  },

  gridAlamat: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: 12,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 15,
  },

  textarea: {
    width: "100%",
    height: 120,
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 15,
    marginBottom: 14,
  },

  submitBtn: {
    float: "right",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    width: 48,
    height: 48,
    borderRadius: "50%",
    fontSize: 20,
    cursor: "pointer",
  },

  /* ===== HEADER & CONTENT ===== */
  header: {
    background: "#fff",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoutBtn: {
    background: "transparent",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  banner: {
    position: "relative",
    height: 250,
    backgroundImage: "url('src/assets/fotodepansmk.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
  },

  bannerText: {
    position: "relative",
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  tutorialSection: {
    display: "flex",
    gap: 32,
    padding: 40,
  },

  tutorialItem: { textAlign: "center" },

  tutorialCircle: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    border: "5px solid #22c55e",
    overflow: "hidden",
  },

  tutorialImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  tutorialTitle: {
    marginTop: 12,
    fontWeight: "bold",
  },

  courseSection: {
    padding: 24,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 20,
  },

  courseCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
  },

  logoWrapper: {
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  courseLogo: {
    width: 120,
    height: 120,
    objectFit: "contain",
  },

  viewBtn: {
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    padding: "6px 16px",
    borderRadius: 4,
    cursor: "pointer",
  },
};
