import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";


// ── Color tokens ──
const C = {
  purple: "#6B4FE8",
  purpleDark: "#5038C4",
  purpleLight: "#8B72F0",
  purpleBg: "#F0ECFF",
  purpleBorder: "rgba(107,79,232,0.15)",
  bg: "#F2F1F6",
  white: "#FFFFFF",
  text: "#1A1025",
  textMid: "#5A4D7A",
  textLight: "#9B90B8",
  red: "#E53E3E",
  redBg: "#FFF0F0",
  green: "#22C55E",
  greenBg: "#F0FFF4",
};

// ── Shared styles ──
const S = {
  card: { background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 1px 8px rgba(107,79,232,0.07)" },
  btnPrimary: { background: C.purple, color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" },
  btnOutline: { background: "white", color: C.textMid, border: `1.5px solid #E8E4F4`, borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 7 },
  formInput: { width: "100%", padding: "12px 14px", border: "1.5px solid #E8E4F4", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none", background: C.white, color: C.text, boxSizing: "border-box" },
  label: { fontSize: 13, fontWeight: 600, color: C.textMid, display: "block", marginBottom: 6 },
};

// ── Toast ──
function useToast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef(null);
  const toast = (m) => {
    setMsg(m); setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2800);
  };
  return { msg, show, toast };
}

// ── Google icon ──
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ── Auth pages ──
function AuthLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: C.white, borderRadius: 20, padding: "48px 44px", width: "100%", maxWidth: 420, boxShadow: "0 8px 48px rgba(107,79,232,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <img src={logo} alt="LittleBoss" style={{ width: 50, height: 50, borderRadius: 10 }} />
          <span style={{ fontWeight: 700, fontSize: 18, color: C.text }}>LittleBoss</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function GoogleBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: 13, borderRadius: 10, fontSize: 14, fontWeight: 500, fontFamily: "inherit", cursor: "pointer", background: "white", border: "1.5px solid #E8E4F4", color: C.text, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
      <GoogleIcon /> {label}
    </button>
  );
}

function DividerOr() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.textLight, fontSize: 13, margin: "18px 0" }}>
      <div style={{ flex: 1, height: 1, background: "#E8E4F4" }} /> 또는 이메일로 <div style={{ flex: 1, height: 1, background: "#E8E4F4" }} />
    </div>
  );
}

function FormGroup({ label, type = "text", placeholder, hint }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={S.label}>{label}</label>
      <input style={S.formInput} type={type} placeholder={placeholder} />
      {hint && <p style={{ fontSize: 11, color: C.textLight, marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

function SignupPage({ onLogin, goLogin }) {
  return (
    <AuthLayout>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>회원가입</h2>
      <p style={{ fontSize: 14, color: C.textLight, marginBottom: 28 }}>계정을 만들고 AI 행정 비서를 시작하세요</p>
      <GoogleBtn label="Google로 계속하기" onClick={() => onLogin("Google 계정으로 가입됐어요 🎉")} />
      <DividerOr />
      <FormGroup label="이름" placeholder="홍길동" />
      <FormGroup label="이메일" type="email" placeholder="example@email.com" />
      <FormGroup label="비밀번호" type="password" placeholder="8자 이상 입력" hint="영문, 숫자, 특수문자 포함 8자 이상" />
      <FormGroup label="비밀번호 확인" type="password" placeholder="비밀번호 재입력" />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: C.textMid, marginBottom: 24 }}>
        <input type="checkbox" style={{ marginTop: 2, accentColor: C.purple }} />
        <label><span style={{ color: C.purple, cursor: "pointer" }}>이용약관</span> 및 <span style={{ color: C.purple, cursor: "pointer" }}>개인정보 처리방침</span>에 동의합니다.</label>
      </div>
      <button style={{ ...S.btnPrimary, width: "100%", justifyContent: "center", padding: 13, fontSize: 15 }} onClick={() => onLogin("🎉 회원가입이 완료됐어요!")}>가입하기</button>
      <div style={{ textAlign: "center", fontSize: 13, color: C.textLight, marginTop: 20 }}>
        이미 계정이 있으신가요? <span style={{ color: C.purple, fontWeight: 600, cursor: "pointer" }} onClick={goLogin}>로그인</span>
      </div>
    </AuthLayout>
  );
}

function LoginPage({ onLogin, goSignup }) {
  return (
    <AuthLayout>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>로그인</h2>
      <p style={{ fontSize: 14, color: C.textLight, marginBottom: 28 }}>계정에 로그인해 주세요</p>
      <GoogleBtn label="Google 로그인" onClick={() => onLogin("Google 계정으로 로그인됐어요")} />
      <DividerOr />
      <FormGroup label="이메일" type="email" placeholder="example@email.com" />
      <FormGroup label="비밀번호" type="password" placeholder="비밀번호 입력" />
      <button style={{ ...S.btnPrimary, width: "100%", justifyContent: "center", padding: 13, fontSize: 15, marginBottom: 12 }} onClick={() => onLogin("로그인됐어요 👋")}>로그인</button>
      <div style={{ textAlign: "center", fontSize: 12, color: C.textLight, marginBottom: 4 }}>
        <span style={{ color: C.purple, cursor: "pointer" }}>비밀번호를 잊으셨나요?</span>
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: C.textLight, marginTop: 16 }}>
        계정이 없으신가요? <span style={{ color: C.purple, fontWeight: 600, cursor: "pointer" }} onClick={goSignup}>회원가입</span>
      </div>
    </AuthLayout>
  );
}

// ── App Shell ──
function Header({ isLoggedIn, onLogout, onLogin, onSignup, onNavTo, sidebarOpen, setSidebarOpen }) {
  const [dd, setDd] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notificationsRaw = [
    { id: 0, type: "highlight", title: "공지사항", message: "2026-03-19 기능 업데이트 사항", time: "방금", pinned: true },
    { id: 1, type: "highlight", title: "졸업예비심사 신청", message: "3월 22일이 마감입니다", time: "3시간 전", pinned: true },
    { id: 2, title: "국가장학금 신청", message: "필수 서류가 미완료 상태입니다", time: "1일 전", icon: "📄"},
    { id: 3, title: " 근로장학금 신청", message: "신청 기간이 시작되었습니다", time: "3일 전", icon: "💼"},
    { id: 4, title: " 문서 분석 완료", message: "업로드하신 문서 분석이 완료되었습니다", time: "1주 전", icon: "✅"}
  ];
  const notifications = [...notificationsRaw.filter(n => n.pinned), ...notificationsRaw.filter(n => !n.pinned)];
  useEffect(() => {
    const h = () => { setDd(false); setNotifOpen(false); };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 58, zIndex: 50, background: C.white, borderBottom: `1px solid ${C.purpleBorder}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 16, minWidth: "1200px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: 36, height: 36, borderRadius: 8, border: "none", background: C.purpleBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: C.purple }}>☰</button>
        <div onClick={() => onNavTo("sub-home")} style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 17, color: C.text, cursor: "pointer" }}>
          <img src={logo} alt="LittleBoss" style={{ width: 44, height: 44, borderRadius: 8 }} />
          LittleBoss
        </div>
      </div>
      <span style={{ fontWeight: 700, fontSize: 15, color: C.text }} id="header-title"></span>
      <div style={{ flex: 1 }} />
      {!isLoggedIn ? (
        <div style={{ display: "flex", gap: 8 }}>
          <button style={S.btnOutline} onClick={onLogin}>로그인</button>
          <button style={S.btnPrimary} onClick={onSignup}>회원가입</button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: C.textMid, background: C.purpleBg, padding: "5px 12px", borderRadius: 20 }}>☀️ 오늘은 맑습니다</span>
          <div style={{ position: "relative" }}>
            <button onClick={e => { e.stopPropagation(); setNotifOpen(!notifOpen); setDd(false); }} style={{ width: 36, height: 36, borderRadius: 10, background: C.purpleBg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.purple, position: "relative" }}>
              🔔<span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: "50%", background: C.red, border: "1.5px solid white" }} />
            </button>
            {notifOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, background: "white", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", width: 320, maxHeight: 400, overflowY: "auto", zIndex: 200 }}>
                <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.purpleBorder}`, fontSize: 13, fontWeight: 700 }}>알림</div>
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map(notif => {
                      let bgColor = "transparent";
                      let titleColor = C.text;
                      let messageColor = C.textMid;
                      if (notif.type === "highlight") {
                        bgColor = "#FFF0F0";
                        titleColor = C.text;
                        messageColor = C.text;
                      }
                      const handleNotifClick = () => {
                        setNotifOpen(false);
                        if (notif.id === 0) {
                          onNavTo("notif-announcement");
                        } else if (notif.id === 1) {
                          onNavTo("schedule-detail", 22);
                        } else if (notif.id === 2) {
                          onNavTo("schedule-detail", 22);
                        } else if (notif.id === 3) {
                          onNavTo("schedule-detail", 27);
                        } else if (notif.id === 4) {
                          onNavTo("notif-analysis");
                        }
                      };
                      return (
                        <div key={notif.id} onClick={handleNotifClick} style={{ padding: "12px 14px", borderBottom: `1px solid ${C.purpleBorder}`, cursor: "pointer", transition: "background 0.2s", background: bgColor, hover: { background: bgColor } }}>
                          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            {notif.pinned && notif.type === "highlight" && <span style={{ fontSize: 16, flexShrink: 0, marginRight: -2 }}>📌</span>}
                            <span style={{ fontSize: 18 }}>{notif.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 12, fontWeight: 800, color: titleColor, marginBottom: 2 }}>{notif.title}</div>
                              <div style={{ fontSize: 11, color: messageColor, marginBottom: 4, lineHeight: 1.3 }}>{notif.message}</div>
                              <div style={{ fontSize: 10, color: C.textLight }}>{notif.time}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ padding: "20px", textAlign: "center", color: C.textLight, fontSize: 12 }}>알림이 없습니다</div>
                )}
              </div>
            )}
          </div>
          <div style={{ position: "relative" }} onClick={e => { e.stopPropagation(); setDd(p => !p); setNotifOpen(false); }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 10px 4px 4px", borderRadius: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${C.purple},${C.purpleLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700 }}>이</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>이가윤</span>
              <span style={{ fontSize: 11, color: C.textLight }}>▾</span>
            </div>
            {dd && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "white", borderRadius: 12, padding: 6, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 130, zIndex: 200 }}>
                {[{ label: "내 정보", action: () => { onNavTo("sub-profile"); setDd(false); } },
                  { label: "로그아웃", action: () => { onLogout(); setDd(false); }, danger: true }
                ].map(item => (
                  <div key={item.label} onClick={(e) => { e.stopPropagation(); item.action(); }} style={{ padding: "9px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", color: item.danger ? C.red : C.text }}>
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Sidebar({ currentSub, onNavTo, sidebarOpen }) {
  const [subOpen, setSubOpen] = useState(false);
  const navItem = (id, icon, label, active) => (
    <div onClick={() => onNavTo(id)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 10, fontSize: 13, fontWeight: active ? 600 : 500, color: active ? "white" : C.textMid, background: active ? C.purple : "transparent", cursor: "pointer", marginBottom: 2 }}>
      <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>{icon}</span>{label}
    </div>
  );
  const isDocsSub = ["sub-schedule","sub-ongoing","sub-expired"].includes(currentSub);
  return (
    <aside style={{ width: 200, flexShrink: 0, background: C.white, borderRight: `1px solid ${C.purpleBorder}`, position: "fixed", top: 58, bottom: 0, padding: "20px 12px", overflowY: "auto", transform: sidebarOpen ? "translateX(0)" : "translateX(-200px)", opacity: sidebarOpen ? 1 : 0, transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)", pointerEvents: sidebarOpen ? "auto" : "none" }}>
      {navItem("sub-home", "🏠", "대시보드", currentSub === "sub-home")}
      {navItem("sub-upload", "📎", "문서 업로드", currentSub === "sub-upload")}
      <div onClick={() => setSubOpen(p => !p)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, color: isDocsSub ? C.purple : C.textMid, cursor: "pointer", marginBottom: 2 }}>
        <span style={{ fontSize: 15, width: 18, textAlign: "center" }}>📁</span>
        내 문서 관리
        <span style={{ marginLeft: "auto", fontSize: 18, transition: "transform .25s", transform: subOpen ? "rotate(180deg)" : "none" }}>▾</span>
      </div>
      {subOpen && (
        <div style={{ paddingLeft: 16 }}>
          {[["sub-schedule","📅","일정 관리"],["sub-ongoing","📋","진행 중인 문서"],["sub-expired","🗂️","마감된 문서"]].map(([id,icon,label]) => (
            <div key={id} onClick={() => onNavTo(id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, fontSize: 12.5, color: currentSub === id ? C.purple : C.textMid, fontWeight: currentSub === id ? 600 : 400, cursor: "pointer", marginBottom: 2 }}>
              {icon} {label}
            </div>
          ))}
        </div>
      )}
      {navItem("sub-profile", "👤", "내 정보", currentSub === "sub-profile")}
    </aside>
  );
}

// ── Sub pages ──
function Dashboard({ onNavTo }) {
  const [month, setMonth] = useState(3);
  const [year, setYear] = useState(2026);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDocFilter, setShowDocFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [hoverDetailList, setHoverDetailList] = useState(false);

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const getDaysInMonth = (y, m) => new Date(y, m, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m - 1, 1).getDay();

  const handlePrevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const handleNextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const eventDates = { 3: { 19: "sky", 22: "gray", 27: "green" } };
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div><div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>좋은 아침입니다, 이가윤님 👋</div><div style={{ fontSize: 14, color: C.textLight }}>오늘 처리해야 할 행정 문서와 일정을 확인하세요.</div></div>
        <button style={S.btnPrimary} onClick={() => onNavTo("sub-upload")}>📎 새 문서 업로드</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Left card */}
        <div style={{...S.card, cursor: 'pointer', transition: 'all 0.2s'}} onClick={() => onNavTo('schedule-detail', 22)} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 32px rgba(107,79,232,0.15)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = S.card.boxShadow}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>마감 임박 문서</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ background: C.redBg, color: C.red, fontWeight: 700, fontSize: 15, padding: "5px 12px", borderRadius: 8 }}>D-3</span>
            <div style={{ textAlign: "right" }}><div style={{ fontWeight: 700, fontSize: 14 }}>국가장학금 신청</div><div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>마감 기한 | 2026-03-22 17:00</div></div>
          </div>
          <hr style={{ border: "none", borderTop: `1px solid ${C.purpleBorder}`, margin: "14px 0" }} />
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>미완료 서류</div>
          {["가족관계증명서","재학증명서"].map(d => <div key={d} style={{ fontSize: 13, color: C.textMid, marginBottom: 4 }}>· {d}</div>)}
          <hr style={{ border: "none", borderTop: `1px solid ${C.purpleBorder}`, margin: "14px 0" }} />
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>준비물 달성률</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#EDE9FF" strokeWidth="6"/>
              <circle cx="32" cy="32" r="26" fill="none" stroke={C.purple} strokeWidth="6" strokeLinecap="round" strokeDasharray="163" strokeDashoffset="40" transform="rotate(-90 32 32)"/>
              <text x="32" y="32" textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="700" fill={C.purple}>75%</text>
            </svg>
            <div style={{ fontSize: 12, color: C.textMid, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: C.purple, display: "inline-block" }} />준비 완료</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#DDD", display: "inline-block" }} />미완료</span>
            </div>
          </div>
        </div>
        {/* Calendar card */}
        <div style={S.card}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>다가오는 일정</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, position: "relative" }}>
            <div onClick={() => setShowDatePicker(!showDatePicker)} style={{ fontSize: 15, fontWeight: 700, cursor: "pointer", padding: "6px 12px", borderRadius: 8, hover: { background: C.bg } }}>
              {year}년 {monthNames[month - 1]}
            </div>
            {/* 범례 */}
            <div style={{ display: "flex", gap: 14, fontSize: 11, flex: 1, justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EA580C" }}></div>
                <span style={{ color: C.textLight }}>진행중</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }}></div>
                <span style={{ color: C.textLight }}>완료</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.textLight }}></div>
                <span style={{ color: C.textLight }}>미완료</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={handlePrevMonth} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E8E4F4", background: "white", cursor: "pointer", fontSize: 16, color: C.textMid }}>‹</button>
              <button onClick={handleNextMonth} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E8E4F4", background: "white", cursor: "pointer", fontSize: 16, color: C.textMid }}>›</button>
            </div>
            {showDatePicker && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "white", borderRadius: 12, padding: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 10, minWidth: 240 }}>
                <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 13 }}>연도 선택</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 16 }}>
                  {[2024,2025,2026,2027,2028,2029,2030,2031].map(y => (
                    <button key={y} onClick={() => { setYear(y); }} style={{ padding: "8px 0", borderRadius: 6, border: y===year ? "2px solid " + C.purple : "1.5px solid #E8E4F4", background: y===year ? C.purpleBg : "white", color: y===year ? C.purple : C.textMid, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{y}</button>
                  ))}
                </div>
                <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 13 }}>월 선택</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {monthNames.map((m, i) => (
                    <button key={i} onClick={() => { setMonth(i+1); setShowDatePicker(false); }} style={{ padding: "8px 0", borderRadius: 6, border: (i+1)===month ? "2px solid " + C.purple : "1.5px solid #E8E4F4", background: (i+1)===month ? C.purpleBg : "white", color: (i+1)===month ? C.purple : C.textMid, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{m}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, rowGap: 8, textAlign: "center" }}>
            {["일","월","화","수","목","금","토"].map(d => <div key={d} style={{ fontSize: 10, color: C.textLight, paddingBottom: 6 }}>{d}</div>)}
            {calendarDays.map((d, i) => {
              const eventColor = eventDates[month]?.[d];
              const colorMap = { red: C.red, purple: C.purple, green: C.green, gray: C.textLight, sky: "#0EA5E9" };
              const bgColorMap = { red: C.redBg, purple: C.purpleBg, green: C.greenBg, gray: "#E5E7EB", sky: "#E0F2FE" };
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: eventColor ? colorMap[eventColor] : C.textMid, fontWeight: eventColor ? 600 : 400, width: 24, height: 24, borderRadius: "50%", background: eventColor ? bgColorMap[eventColor] : "transparent", margin: "0 auto" }}>
                  {d}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <span onClick={() => onNavTo("sub-schedule")} onMouseEnter={() => setHoverDetailList(true)} onMouseLeave={() => setHoverDetailList(false)} style={{ fontSize: 12, color: C.purple, cursor: "pointer", fontWeight: 600, transform: hoverDetailList ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s ease-in-out", display: "inline-block" }}>상세 목록 보기</span>
          </div>
        </div>
      </div>
      {/* Recent docs */}
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>최근 분석된 문서</div>
          <div style={{ display: "flex", gap: 8, position: "relative" }}>
            <input style={{ padding: "7px 12px", border: "1.5px solid #E8E4F4", borderRadius: 8, fontSize: 12, outline: "none", fontFamily: "inherit", width: 160 }} placeholder="문서명 검색" />
            <button onClick={() => setShowDocFilter(!showDocFilter)} style={{ ...S.btnOutline, fontSize: 12, padding: "7px 14px" }}>필터</button>
            {showDocFilter && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "white", borderRadius: 12, padding: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 20, minWidth: 240 }}>
                <div style={{ marginBottom: 12, fontWeight: 700, fontSize: 13 }}>상태별</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "진행 중", value: "진행 중", color: C.purple },
                    { label: "완료", value: "완료", color: C.green },
                    { label: "미완료", value: "미완료", color: C.red }
                  ].map(status => (
                    <label key={status.value} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, cursor: "pointer", padding: "6px 0" }}>
                      <input
                        type="checkbox"
                        checked={selectedStatus === status.value}
                        onChange={() => setSelectedStatus(selectedStatus === status.value ? null : status.value)}
                        style={{ accentColor: status.color, width: 16, height: 16, cursor: "pointer" }}
                      />
                      <span style={{ color: C.textMid }}>{status.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {[
          {
            name: "국가장학금 신청 안내문",
            date: "2026.03.14 · 마감 D-3",
            status: "진행 중",
            color: C.purple,
            bg: C.purpleBg,
            title: "국가장학금 신청",
            deadline: "2026-03-22 17:00",
            ago: "D-3",
            done: 2,
            total: 5,
            summary: "정부에서 지원하는 국가 장학금 신청 프로세스입니다. 소득분위 확인 및 필수 서류 제출이 필요합니다.",
            upload: "2026.03.14 14:23",
            documents: ["소득분위 확인서 제출", "학교 포털 신청서 작성 완료", "주민등록등본 업로드", "가족관계증명서 제출", "재학증명서 제출"]
          },
          {
            name: "졸업예비심사 신청",
            date: "2026.03.10 · 마감 D-8",
            status: "진행 중",
            color: C.purple,
            bg: C.purpleBg,
            title: "졸업예비심사 신청",
            deadline: "2026-03-22 18:00",
            ago: "D-8",
            done: 1,
            total: 3,
            summary: "졸업 자격 심사를 위한 졸업예비심사 신청입니다. 졸업논문 계획서와 지도교수 확인서가 필수입니다.",
            upload: "2026.03.10 14:23",
            documents: ["졸업논문 계획서 초안 작성", "지도교수 확인서 수령", "학교 포털 심사 신청"]
          }
        ].map(doc => (
          <div
            key={doc.name}
            onClick={() => onNavTo("doc-detail", null, doc)}
            style={{
              background: "white",
              border: "1px solid #E8E4F4",
              borderRadius: 10,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(107,79,232,0.1)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
          >
            <span style={{ fontSize: 22 }}>📄</span>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{doc.name}</div><div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{doc.date}</div></div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: doc.bg, color: doc.color }}>{doc.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadPage({ onNavTo }) {
  const [queue, setQueue] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploadConfirm, setUploadConfirm] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [checkedFiles, setCheckedFiles] = useState({});
  const fileInputRef = useRef(null);
  const recentFiles = [
    { id: 1, icon: "📄", name: "국가장학금_신청안내.pdf", date: "2026.03.14", done: false, scheduleTitle: "국가장학금 신청" },
    { id: 2, icon: "📄", name: "근로장학금_신청서.pdf", date: "2026.02.28", done: true, scheduleTitle: "근로장학금 신청" },
    { id: 3, icon: "🖼️", name: "졸업예비심사_공지.jpg", date: "2026.02.10", done: true, scheduleTitle: "졸업예비심사 신청" },
    { id: 4, icon: "📄", name: "복지장학금_안내문.pdf", date: "2026.01.22", done: true, scheduleTitle: null },
    { id: 5, icon: "📝", name: "휴학신청_양식.docx", date: "2026.01.08", done: true, scheduleTitle: null },
  ];
  const addFiles = (files) => {
    const newItems = [...files].map(f => ({ name: f.name, size: f.size > 1048576 ? (f.size/1048576).toFixed(1)+"MB" : (f.size/1024).toFixed(0)+"KB", progress: 0, id: Date.now() + f.name }));
    setQueue(q => [...q, ...newItems]);
    newItems.forEach(item => {
      let w = 0;
      const iv = setInterval(() => {
        w += Math.random() * 18 + 6;
        if (w >= 100) { w = 100; clearInterval(iv); }
        setQueue(q => q.map(i => i.id === item.id ? { ...i, progress: Math.min(w, 100) } : i));
      }, 150);
    });
  };

  const handleFileSelect = (files) => {
    if (files && files.length > 0) {
      setFileToUpload(files);
      setUploadConfirm(true);
    }
  };

  const handleConfirmUpload = () => {
    addFiles(fileToUpload);
    // 팝업은 열린 상태로 유지하여 업로드 진행 상황 표시
  };

  const handleCancelUpload = () => {
    setUploadConfirm(false);
    setFileToUpload(null);
  };

  // 모든 파일 업로드 완료 시 팝업 자동 닫기
  useEffect(() => {
    if (uploadConfirm && queue.length > 0 && queue.every(f => f.progress === 100)) {
      setTimeout(() => {
        setUploadConfirm(false);
        setFileToUpload(null);
      }, 800);
    }
  }, [queue, uploadConfirm]);
  return (
    <div>
      <div style={{ marginBottom: 24 }}><div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>문서 업로드</div><div style={{ fontSize: 14, color: C.textLight }}>분석할 문서를 업로드하면 AI가 서류·마감일을 자동 추출합니다.</div></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
        <div>
          <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFileSelect(e.dataTransfer.files); }}
            style={{ border: `2px dashed ${dragging ? C.purple : C.purpleBorder}`, borderRadius: 16, padding: "60px 40px", textAlign: "center", background: dragging ? C.purpleBg : "white", cursor: "pointer", transition: "all .2s" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>여기에 파일을 드래그 & 드롭하세요</div>
            <div style={{ fontSize: 13, color: C.textLight, lineHeight: 1.6 }}>또는 아래 버튼으로 파일을 선택하세요<br/>PDF, JPG, PNG, DOCX 지원 · 최대 20MB</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 24 }}>
              <label style={{ ...S.btnPrimary, padding: "10px 20px" }}>📁 파일 선택<input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => handleFileSelect(e.target.files)} /></label>
            </div>
            <div style={{ fontSize: 11, color: C.textLight, marginTop: 12 }}>지원 형식: PDF · DOCX · JPG · PNG · HWP</div>
          </div>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {queue.map(f => (
              <div key={f.id} style={{ background: "white", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>📄</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{f.size}</div>
                  <div style={{ height: 3, background: "#EDE9FF", borderRadius: 2, marginTop: 6 }}><div style={{ height: "100%", borderRadius: 2, background: C.purple, width: f.progress + "%", transition: "width .3s" }} /></div>
                </div>
                <input type="checkbox" checked={checkedFiles[f.id] || false} onChange={(e) => { setCheckedFiles(prev => ({ ...prev, [f.id]: e.target.checked })); }} style={{ width: 18, height: 18, cursor: "pointer", accentColor: C.purple }} />
              </div>
            ))}
            {queue.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginTop: 10, justifyContent: "flex-end" }}>
                <button onClick={() => { setQueue([]); if (fileInputRef.current) fileInputRef.current.value = ''; }} style={{ ...S.btnOutline, fontSize: 13 }}>업로드 취소</button>
                <button onClick={() => {}} style={{ ...S.btnPrimary, fontSize: 13, justifyContent: "center" }}>분석하기</button>
              </div>
            )}
          </div>
        </div>
        {/* Recent panel */}
        <div style={{ background: "white", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "16px 18px", borderBottom: `1px solid ${C.purpleBorder}`, fontSize: 13, fontWeight: 700 }}>📋 분석 완료 파일</div>
          <div style={{ padding: 8, maxHeight: 520, overflowY: "auto" }}>
            {recentFiles.map(f => (
              <div key={f.id} onClick={() => f.scheduleTitle && onNavTo("schedule-detail", f.scheduleTitle)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 9, cursor: f.scheduleTitle ? "pointer" : "default", marginBottom: 2, transition: "all 0.2s", background: "transparent", opacity: f.scheduleTitle ? 1 : 0.5, hover: f.scheduleTitle ? { background: C.purpleBg } : {} }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{f.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 업로드 확인 팝업 */}
      {uploadConfirm && fileToUpload && queue.length === 0 && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 28, textAlign: "center", maxWidth: 380, boxShadow: "0 20px 48px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>파일 업로드</div>
            <div style={{ fontSize: 13, color: C.textLight, marginBottom: 24, lineHeight: 1.6 }}>
              {[...fileToUpload].slice(0, 2).map(f => f.name).join(", ")}
              {fileToUpload.length > 2 ? ` 외 ${fileToUpload.length - 2}개` : ""}
              <br/>파일을 업로드 하시겠습니까?
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleCancelUpload} style={{ ...S.btnOutline, flex: 1, fontSize: 13, justifyContent: "center" }}>취소</button>
              <button onClick={handleConfirmUpload} style={{ ...S.btnPrimary, flex: 1, fontSize: 13, justifyContent: "center" }}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* 업로드 진행 중 팝업 */}
      {uploadConfirm && queue.length > 0 && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 28, maxWidth: 420, boxShadow: "0 20px 48px rgba(0,0,0,0.2)", maxHeight: 500, overflowY: "auto" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>파일 업로드 중</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {queue.map(f => (
                <div key={f.id} style={{ background: C.purpleBg, borderRadius: 10, padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>📄</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: C.text }}>{f.name}</div>
                      <div style={{ fontSize: 10, color: C.textLight, marginTop: 2 }}>{f.size}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.purple, minWidth: 40, textAlign: "right" }}>{Math.round(f.progress)}%</div>
                  </div>
                  <div style={{ height: 4, background: "#E5E7EB", borderRadius: 2 }}>
                    <div style={{ height: "100%", borderRadius: 2, background: C.purple, width: f.progress + "%", transition: "width .3s" }} />
                  </div>
                </div>
              ))}
            </div>
            {queue.every(f => f.progress === 100) && (
              <div style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: C.green, fontWeight: 600 }}>✅ 업로드 완료</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SchedulePage({ onNavTo }) {
  const days = [
    [23,24,25,26,27,28,1],[2,3,4,5,6,7,8],[9,10,11,12,13,14,15],
    [16,17,18,19,20,21,22],[23,24,25,26,27,28,29],[30,31]
  ];
  const special = { 17: "incomplete", 19: "today", 22: "ongoing", 27: "completed" };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>일정 관리</div><div style={{ fontSize: 14, color: C.textLight }}>문서별 마감일을 한눈에 확인하세요.</div></div>
        <button style={S.btnPrimary}>📅 캘린더 동기화</button>
      </div>
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>2026년 3월</span>
          <div style={{ display: "flex", gap: 6 }}>
            {["‹","›"].map(a => <button key={a} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E8E4F4", background: "white", cursor: "pointer", fontSize: 16, color: C.textMid }}>{a}</button>)}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, textAlign: "center" }}>
          {["일","월","화","수","목","금","토"].map(d => <div key={d} style={{ fontSize: 11, fontWeight: 600, color: C.textLight, paddingBottom: 8, letterSpacing: "0.05em" }}>{d}</div>)}
          {days.flat().map((d, i) => {
            const sp = special[d];
            const isOther = (i < 6 && d > 20) || (i > 28 && d < 5);
            const eventTitles = { 17: "국가장학금", 22: "졸업예비심사", 27: "근로장학금" };
            const bgColorMap = { incomplete: "#F5F5F5", ongoing: "#FFF7ED", completed: C.greenBg };
            const colorMap = { incomplete: "#999", ongoing: "#EA580C", completed: C.green, today: "#0066CC" };
            return (
              <div key={i} onClick={() => sp && sp !== "today" && onNavTo('schedule-detail', d)} style={{ minHeight: 90, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: 13, borderRadius: 8, cursor: sp && sp !== "today" ? "pointer" : "default", padding: 8,
                color: isOther ? "#CCC" : sp === "today" ? "#0066CC" : colorMap[sp] || C.textMid,
                background: bgColorMap[sp] || "transparent", fontWeight: sp ? 700 : 400, position: "relative", transition: "all 0.2s", opacity: (sp && sp !== "today") ? 1 : 0.8, transform: "none" }}
                onMouseEnter={(e) => { if (sp && sp !== "today") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{d}</span>
                {sp && sp !== "today" && (
                  <span style={{ fontSize: 9, fontWeight: 500, color: colorMap[sp] || C.purple, marginTop: 4, lineHeight: 1.2 }}>
                    {eventTitles[d]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {/* 범례 */}
        <div style={{ display: "flex", gap: 20, padding: "12px 0", borderTop: `1px solid ${C.border}`, marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: "#EA580C" }}></div>
            <span style={{ color: C.textLight }}>진행중</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: C.green }}></div>
            <span style={{ color: C.textLight }}>완료</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: "#999" }}></div>
            <span style={{ color: C.textLight }}>미완료</span>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>마감 일정 목록</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[{ month:"MAR", day:22, title:"국가장학금 신청", items:"· 가족관계증명서 · 재학증명서 · 소득분위 확인서", dday:"D-3", ddayColor:"#EA580C", ddayBg:"#FFF7ED", passed: false },
          { month:"MAR", day:22, title:"졸업예비심사 신청", items:"· 졸업논문 계획서 · 지도교수 확인서", dday:"D-3", ddayColor:"#EA580C", ddayBg:"#FFF7ED" },
          { month:"MAR", day:27, title:"근로장학금 신청", items:"· 재학증명서 · 통장 사본", dday:"D-8", ddayColor: C.green, ddayBg: C.greenBg },
        ].map(item => (
          <div key={item.day} onClick={() => onNavTo("schedule-detail", item.day)} style={{ background: "white", borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", hover: { boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transform: "translateY(-2px)" } }}>
            <div style={{ minWidth: 56, textAlign: "center", background: item.passed ? C.bg : C.purpleBg, borderRadius: 10, padding: "8px 6px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: item.passed ? C.textLight : C.purple, letterSpacing: "0.08em" }}>{item.month}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: item.passed ? C.textLight : C.purple, lineHeight: 1 }}>{item.day}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: C.textMid }}>{item.items}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: item.ddayBg, color: item.ddayColor }}>{item.dday}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckItem({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.textMid, cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={() => setChecked(p => !p)} style={{ accentColor: C.purple, width: 15, height: 15, cursor: "pointer" }} />
      {label}
    </label>
  );
}

function OngoingPage({ onNavTo }) {
  const docsInitial = [
    { title:"국가장학금 신청", upload:"2026.03.14", deadline:"2026-03-22 17:00 · D-3", dc: C.red, db: C.redBg, scheduleDay: 22,
      checks:[{l:"소득분위 확인서 제출"},{l:"학교 포털 신청서 작성 완료"},{l:"주민등록등본 업로드"},{l:"가족관계증명서 제출"},{l:"재학증명서 제출"}], total:5 },
    { title:"졸업예비심사 신청", upload:"2026.03.10", deadline:"2026-03-22 18:00 · D-8", dc:"#EA580C", db:"#FFF7ED", scheduleDay: 22,
      checks:[{l:"졸업논문 계획서 초안 작성"},{l:"지도교수 확인서 수령"},{l:"학교 포털 심사 신청"}], total:3 },
  ];

  const checkStates = Object.fromEntries(docsInitial.map(doc => {
    const initialChecks = Array(doc.total).fill(false);
    // 국가장학금 신청: 처음 2개 기본 선택
    if (doc.title === "국가장학금 신청") {
      initialChecks[0] = true;
      initialChecks[1] = true;
    }
    return [doc.title, initialChecks];
  }));

  return (
    <div>
      <div style={{ marginBottom: 24 }}><div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>진행 중인 문서</div><div style={{ fontSize: 14, color: C.textLight }}>준비 중인 서류를 체크리스트로 관리하세요.</div></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {docsInitial.map(doc => {
          const checked = checkStates[doc.title];
          const doneCount = checked.filter(Boolean).length;
          const percentage = (doneCount / doc.total) * 100;

          return (
            <div key={doc.title} onClick={() => onNavTo("schedule-detail", doc.title)} style={{ ...S.card, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: C.text }}>{doc.title}</div>
                  <div style={{ fontSize: 12, color: C.textLight }}>📎 업로드: {doc.upload} · 분석 완료</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: doc.db, color: doc.dc }}>마감 {doc.deadline}</span>
                  <span style={{ fontSize: 20, color: C.textLight, fontWeight: 300 }}>›</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 12 }}>
                {doc.checks.map((c, idx) => (
                  <div key={c.l} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.textMid }}>
                    <input type="checkbox" checked={checked[idx]} disabled style={{ accentColor: C.purple, width: 15, height: 15, cursor: "not-allowed", opacity: 0.6 }} />
                    <span>{c.l}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: 5, background: "#EDE9FF", borderRadius: 3, marginTop: 14 }}><div style={{ height: "100%", borderRadius: 3, background: C.purple, width: percentage+"%" }} /></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginTop: 5 }}>
                <span>서류 준비 현황</span><span style={{ color: C.purple, fontWeight: 600 }}>{doneCount} / {doc.total} 완료</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExpiredPage({ onNavTo }) {
  const docsInitial = [
    { ago:"19일 전", title:"근로장학금 신청", upload:"2026.02.20", deadline:"2026.02.28", done:5, total:5, checks:[{l:"재학증명서 제출"},{l:"통장 사본 제출"}] },
    { ago:"37일 전", title:"복지장학금 신청", upload:"2026.02.01", deadline:"2026.02.10", done:3, total:5, checks:[{l:"가계소득 증명서"},{l:"부채 증명서"}] },
    { ago:"70일 전", title:"휴학 신청", upload:"2026.01.05", deadline:"2026.01.08", done:3, total:3, checks:[{l:"휴학 신청서 제출"},{l:"학생증 사본 제출"}] },
  ];

  const [docs, setDocs] = useState(docsInitial);
  const [checkStates, setCheckStates] = useState(
    Object.fromEntries(docsInitial.map(doc => [doc.title, Array(doc.checks.length).fill(doc.done === doc.total)]))
  );
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const toggleCheck = (docTitle, idx) => {
    setCheckStates(prev => ({
      ...prev,
      [docTitle]: prev[docTitle].map((val, i) => i === idx ? !val : val)
    }));
  };

  const handleDeleteClick = (docTitle) => {
    setDeleteTarget(docTitle);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setDocs(prev => prev.filter(doc => doc.title !== deleteTarget));
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 2000);
    setDeleteTarget(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}><div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>마감된 문서</div><div style={{ fontSize: 14, color: C.textLight }}>마감이 지난 문서 목록입니다.</div></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {docs.map(doc => {
          const checked = checkStates[doc.title];
          const doneCount = checked.filter(Boolean).length;

          return (
            <div key={doc.title} style={{ ...S.card, opacity: 0.85 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: doneCount === doc.checks.length ? "#F0FDF4" : "#FFE5E5", color: doneCount === doc.checks.length ? C.green : C.red }}>
                  {doneCount === doc.checks.length ? '완료' : '미완료'}
                </span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.textLight }}>{doc.deadline} 17:00</span>
                  <button onClick={() => handleDeleteClick(doc.title)} style={{ ...S.btnOutline, fontSize: 11, padding: "5px 10px", color: C.red, borderColor: C.red }}>🗑️ 삭제</button>
                </div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, margin: "10px 0 4px" }}>{doc.title}</div>
              <div style={{ fontSize: 12, color: C.textLight, marginBottom: 14 }}>📎 업로드: {doc.upload} · 마감: {doc.deadline}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {doc.checks.map((c, idx) => (
                  <div key={c.l} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.textMid }}>
                    <input type="checkbox" checked={checked[idx]} disabled style={{ accentColor: C.purple, width: 15, height: 15, cursor: "not-allowed", opacity: 0.7 }} />
                    <span>{c.l}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: 5, background: "#F0EEF8", borderRadius: 3, marginTop: 14 }}><div style={{ height: "100%", borderRadius: 3, background: C.purple, width: (doneCount/doc.checks.length*100)+"%" }} /></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginTop: 5 }}>
                <span>최종 준비 완료율</span>
                <span style={{ fontWeight: 600, color: doneCount === doc.checks.length ? C.textMid : C.red }}>{doneCount} / {doc.checks.length} · {Math.round(doneCount/doc.checks.length*100)}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 삭제 확인 팝업 */}
      {showDeleteConfirm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 28, textAlign: "center", maxWidth: 320, boxShadow: "0 20px 48px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>삭제하시겠습니까?</div>
            <div style={{ fontSize: 13, color: C.textLight, marginBottom: 24 }}>{deleteTarget}을(를) 삭제합니다</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={handleDeleteCancel} style={{ ...S.btnOutline, fontSize: 13 }}>아니오</button>
              <button onClick={handleDeleteConfirm} style={{ ...S.btnPrimary, fontSize: 13 }}>예</button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 성공 팝업 */}
      {showDeleteSuccess && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 28, textAlign: "center", maxWidth: 320, boxShadow: "0 20px 48px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>삭제되었습니다</div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScheduleDetailPage({ day, title, prevSub, onNavTo }) {
  const [memo, setMemo] = useState("");
  const [checks, setChecks] = useState({});
  const { toast } = useToast();

  // 로드
  useEffect(() => {
    if (day || title) {
      const key = `scheduleDetail_${title || day}`;
      const saved = localStorage.getItem(key);
      console.log("로드:", key, saved);
      if (saved) {
        try {
          const { memo: savedMemo, checks: savedChecks } = JSON.parse(saved);
          setMemo(savedMemo || "");
          setChecks(savedChecks || {});
        } catch (e) {
          console.error("데이터 로드 오류:", e);
        }
      }
    }
  }, [day, title]);

  // 자동 저장
  useEffect(() => {
    if (day || title) {
      const key = `scheduleDetail_${title || day}`;
      const data = JSON.stringify({ memo, checks });
      localStorage.setItem(key, data);
      console.log("저장:", key, data);
    }
  }, [memo, checks, day, title]);

  const scheduleDataByTitle = {
    "국가장학금 신청": { title: "국가장학금 신청", deadline: "2026-03-22 17:00", dday: "D-3", summary: "정부에서 지원하는 국가 장학금 신청 프로세스입니다. 소득분위 확인 및 필수 서류 제출이 필요합니다.", documents: ["소득분위 확인서", "가족관계증명서", "재학증명서", "주민등록등본"], color: "#A91E2E", bg: "#FFE5E5" },
    "졸업예비심사 신청": { title: "졸업예비심사 신청", deadline: "2026-03-22 18:00", dday: "D-8", summary: "졸업 자격 심사를 위한 졸업예비심사 신청입니다. 졸업논문 계획서와 지도교수 확인서가 필수입니다.", documents: ["졸업논문 계획서", "지도교수 확인서", "학교 포털 심사 신청"], color: "#EA580C", bg: "#FFF7ED" },
    "근로장학금 신청": { title: "근로장학금 신청", deadline: "2026-03-27 23:59", dday: "D-8", summary: "학교 근로 장학금 신청입니다. 근로시간 증명서와 통장 사본이 필요합니다.", documents: ["재학증명서", "통장 사본", "신원증 사본"], color: C.green, bg: "#F0FDF4" }
  };

  const scheduleData = {
    22: { title: "국가장학금 신청", deadline: "2026-03-22 17:00", dday: "D-3", summary: "정부에서 지원하는 국가 장학금 신청 프로세스입니다. 소득분위 확인 및 필수 서류 제출이 필요합니다.", documents: ["소득분위 확인서", "가족관계증명서", "재학증명서", "주민등록등본"], color: "#A91E2E", bg: "#FFE5E5" },
    27: { title: "근로장학금 신청", deadline: "2026-03-27 23:59", dday: "D-8", summary: "학교 근로 장학금 신청입니다. 근로시간 증명서와 통장 사본이 필요합니다.", documents: ["재학증명서", "통장 사본", "신원증 사본"], color: C.green, bg: "#F0FDF4" }
  };

  const data = title ? scheduleDataByTitle[title] : scheduleData[day];
  if (!data) return <div>일정을 찾을 수 없습니다</div>;

  const toggleCheck = (idx) => {
    setChecks(p => ({ ...p, [idx]: !p[idx] }));
  };

  const handleSave = () => {
    const key = `scheduleDetail_${day}`;
    const data = JSON.stringify({ memo, checks });
    localStorage.setItem(key, data);
    alert("저장되었습니다!");
  };

  const completedCount = Object.values(checks).filter(Boolean).length;

  return (
    <div>
      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{data.title}</div>
          <div style={{ fontSize: 14, color: C.textLight }}>마감: {data.deadline}</div>
        </div>
        <button onClick={() => onNavTo(prevSub || "sub-schedule")} style={{ ...S.btnOutline, fontSize: 12 }}>← 돌아가기</button>
      </div>

      {/* 디데이 배지 */}
      <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, background: data.bg, color: data.color, marginBottom: 20 }}>{data.dday}</div>

      {/* 내용 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* 왼쪽: 요약 */}
        <div style={{ ...S.card }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📋 일정 요약</div>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{data.summary}</div>
        </div>

        {/* 오른쪽: 필요 서류 */}
        <div style={{ ...S.card }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>📄 필요 서류</div>
            <button onClick={handleSave} style={{ background: C.purple, color: "white", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>저장하기</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.documents.map((doc, idx) => (
              <label key={idx} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
                <input type="checkbox" checked={checks[idx] || false} onChange={() => toggleCheck(idx)} style={{ accentColor: data.color, width: 16, height: 16 }} />
                <span style={{ color: C.textMid }}>{doc}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.textLight }}>
            준비율: <span style={{ fontWeight: 600, color: data.color }}>{completedCount}/{data.documents.length}</span>
          </div>
        </div>
      </div>

      {/* 메모 */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>📝 메모</div>
          <button onClick={handleSave} style={{ ...S.btnPrimary, fontSize: 12, padding: "6px 12px" }}>저장하기</button>
        </div>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="이 일정에 대한 메모를 작성하세요..."
          style={{
            width: "100%",
            minHeight: 120,
            padding: 12,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            fontSize: 13,
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box"
          }}
        />
      </div>
    </div>
  );
}

function NotificationAnnouncementPage({ onNavTo }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>📢 공지사항</div>
          <div style={{ fontSize: 14, color: C.textLight }}>2026-03-19 기능 업데이트 사항</div>
        </div>
        <button onClick={() => onNavTo('sub-home')} style={{ ...S.btnOutline, fontSize: 12 }}>← 돌아가기</button>
      </div>

      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.textLight, marginBottom: 16 }}>2026.03.30 · 공지</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>기능 업데이트 사항</div>

        <div style={{ lineHeight: 1.8, color: C.textMid, fontSize: 13 }}>
          <p style={{ marginBottom: 16 }}>LittleBoss 플랫폼의 새로운 기능 업데이트가 완료되었습니다. 더욱 향상된 사용자 경험을 제공하기 위해 여러 기능이 추가되고 개선되었습니다.</p>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: C.text, marginBottom: 8 }}>🎯 추가된 기능</div>
            <div style={{ paddingLeft: 12, borderLeft: `2px solid ${C.purple}` }}>
              <div>· 대시보드 알림 시스템 개선</div>
              <div>· 문서 분석 결과 상세 보기 기능</div>
              <div>· 일정 관리 캘린더 연동 기능</div>
              <div>· 문서 업로드 진행도 표시</div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: C.text, marginBottom: 8 }}>⚡ 개선된 사항</div>
            <div style={{ paddingLeft: 12, borderLeft: `2px solid ${C.purple}` }}>
              <div>· UI/UX 디자인 개선으로 더 직관적인 인터페이스</div>
              <div>· 알림 속도 및 정확도 향상</div>
              <div>· 모바일 환경에서의 반응성 개선</div>
              <div>· 보안 기능 강화</div>
            </div>
          </div>

          <p style={{ marginBottom: 16 }}>업데이트 사항에 대한 문의가 있으시면 고객지원팀(support@littleboss.com)으로 연락 주시기 바랍니다.</p>
        </div>
      </div>
    </div>
  );
}

function NotificationAnalysisPage({ onNavTo }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>✅ 문서 분석 완료</div>
          <div style={{ fontSize: 14, color: C.textLight }}>업로드하신 문서 분석이 완료되었습니다</div>
        </div>
        <button onClick={() => onNavTo('sub-home')} style={{ ...S.btnOutline, fontSize: 12 }}>← 돌아가기</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ ...S.card }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>📄 분석된 문서</div>
          <div style={{ background: C.purpleBg, borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: C.purple, fontWeight: 600, marginBottom: 4 }}>문서명</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>국가장학금 신청 안내문</div>
          </div>
          <div style={{ background: C.purpleBg, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, color: C.purple, fontWeight: 600, marginBottom: 4 }}>분석 완료 시간</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>2026.03.19 14:23</div>
          </div>
        </div>

        <div style={{ ...S.card }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>🎯 분석 결과</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ padding: 12, background: C.greenBg, borderRadius: 8, borderLeft: `3px solid ${C.green}` }}>
              <div style={{ fontSize: 12, color: C.green, fontWeight: 600, marginBottom: 4 }}>필수 서류</div>
              <div style={{ fontSize: 12, color: C.textMid }}>5개 항목 중 3개 완료</div>
            </div>
            <div style={{ padding: 12, background: C.redBg, borderRadius: 8, borderLeft: `3px solid ${C.red}` }}>
              <div style={{ fontSize: 12, color: C.red, fontWeight: 600, marginBottom: 4 }}>미완료 서류</div>
              <div style={{ fontSize: 12, color: C.textMid }}>가족관계증명서, 재학증명서</div>
            </div>
            <div style={{ padding: 12, background: "#EDE9FF", borderRadius: 8, borderLeft: `3px solid ${C.purple}` }}>
              <div style={{ fontSize: 12, color: C.purple, fontWeight: 600, marginBottom: 4 }}>권장사항</div>
              <div style={{ fontSize: 12, color: C.textMid }}>빠른 제출을 권장합니다</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...S.card }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📋 상세 분석</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { item: "소득분위 확인서", status: "완료", icon: "✅" },
            { item: "가족관계증명서", status: "미제출", icon: "❌" },
            { item: "재학증명서", status: "미제출", icon: "❌" },
            { item: "주민등록등본", status: "완료", icon: "✅" },
            { item: "신청서 작성", status: "완료", icon: "✅" }
          ].map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: item.status === "완료" ? C.greenBg : C.redBg, borderRadius: 8, fontSize: 13 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{item.icon}</span>
                <span style={{ color: C.text, fontWeight: 500 }}>{item.item}</span>
              </span>
              <span style={{ color: item.status === "완료" ? C.green : C.red, fontWeight: 600, fontSize: 12 }}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentDetailPage({ data, prevSub, onNavTo }) {
  const [memo, setMemo] = useState("");
  const [checks, setChecks] = useState({});
  const { toast } = useToast();

  // 로드
  useEffect(() => {
    if (data) {
      const key = `documentDetail_${data.title}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const { memo: savedMemo, checks: savedChecks } = JSON.parse(saved);
          setMemo(savedMemo || "");
          setChecks(savedChecks || {});
        } catch (e) {
          console.error("데이터 로드 오류:", e);
        }
      } else {
        // 처음 로드: data.done개만큼 기본으로 선택
        const initialChecks = {};
        for (let i = 0; i < data.done; i++) {
          initialChecks[i] = true;
        }
        setChecks(initialChecks);
      }
    }
  }, [data]);

  // 자동 저장
  useEffect(() => {
    if (data) {
      const key = `documentDetail_${data.title}`;
      localStorage.setItem(key, JSON.stringify({ memo, checks }));
    }
  }, [memo, checks, data]);

  if (!data) return <div>문서를 찾을 수 없습니다</div>;

  const toggleCheck = (idx) => {
    setChecks(p => ({ ...p, [idx]: !p[idx] }));
  };

  const completedCount = Object.values(checks).filter(Boolean).length;
  const statusColor = completedCount === data.total ? C.green : completedCount > 0 ? "#EA580C" : C.red;

  const handleSave = () => {
    const key = `documentDetail_${data.title}`;
    const saveData = JSON.stringify({ memo, checks });
    localStorage.setItem(key, saveData);
    alert("저장되었습니다!");
  };

  return (
    <div>
      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{data.title}</div>
          <div style={{ fontSize: 14, color: C.textLight }}>마감: {data.deadline} · {data.ago}</div>
        </div>
        <button onClick={() => onNavTo(prevSub || "sub-home")} style={{ ...S.btnOutline, fontSize: 12 }}>← 돌아가기</button>
      </div>

      {/* 진행률 배지 */}
      <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, background: statusColor === C.green ? "#F0FDF4" : statusColor === C.red ? "#FFE5E5" : "#FFF7ED", color: statusColor, marginBottom: 20 }}>{completedCount}/{data.total} 완료</div>

      {/* 내용 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* 왼쪽: 요약 */}
        <div style={{ ...S.card }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📋 문서 요약</div>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, marginBottom: 14 }}>{data.summary}</div>
          <div style={{ fontSize: 12, color: C.textLight }}>📎 업로드: {data.upload}</div>
        </div>

        {/* 오른쪽: 필요 서류 */}
        <div style={{ ...S.card }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>📄 필요 서류</div>
            <button onClick={handleSave} style={{ background: C.purple, color: "white", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>저장하기</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.documents.map((doc, idx) => (
              <label key={idx} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
                <input type="checkbox" checked={checks[idx] || false} onChange={() => toggleCheck(idx)} style={{ accentColor: statusColor, width: 16, height: 16 }} />
                <span style={{ color: C.textMid }}>{doc}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.textLight }}>
            준비율: <span style={{ fontWeight: 600, color: statusColor }}>{completedCount}/{data.documents.length}</span>
          </div>
        </div>
      </div>

      {/* 메모 */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>📝 메모</div>
          <button onClick={handleSave} style={{ ...S.btnPrimary, fontSize: 12, padding: "6px 12px" }}>저장하기</button>
        </div>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="이 문서에 대한 메모를 작성하세요..."
          style={{
            width: "100%",
            minHeight: 120,
            padding: 12,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            fontSize: 13,
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box"
          }}
        />
      </div>
    </div>
  );
}

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label style={{ position: "relative", width: 44, height: 24, cursor: "pointer", display: "inline-block" }}>
      <input type="checkbox" checked={on} onChange={() => setOn(p=>!p)} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{ position: "absolute", inset: 0, borderRadius: 24, background: on ? C.purple : "#DDD", transition: "background .2s" }}>
        <span style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "white", top: 3, left: on ? 23 : 3, transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
      </span>
    </label>
  );
}

function ProfilePage() {
  const [settingsTab, setSettingsTab] = useState("profile");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const tabs = [["profile","👤 프로필"],["notifications","🔔 알림 설정"],["security","🔒 보안"],["calendar","📅 캘린더 연동"]];

  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  const handleSaveConfirm = () => {
    setShowSaveConfirm(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const handleSaveCancel = () => {
    setShowSaveConfirm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && ["image/png", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target?.result);
        setShowImageEditor(true);
        setImagePosition({ x: 0, y: 0 });
        setImageScale(1);
      };
      reader.readAsDataURL(file);
    }
    // 같은 파일을 다시 선택할 수 있도록 input 초기화
    e.target.value = '';
  };

  const handleImageConfirm = () => {
    // Canvas로 원형 이미지 생성 (미리보기와 동일한 계산)
    try {
      const editorSize = 380;
      const previewSize = 140;

      // Canvas를 미리보기 크기(140x140)로 생성
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = previewSize;
      tempCanvas.height = previewSize;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) throw new Error('Canvas context 실패');

      // 2단계: 이미지를 편집 영역 기준으로 그리기
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = function() {
        try {
          const scaledWidth = img.width * imageScale;
          const scaledHeight = img.height * imageScale;

          // Canvas에 직접 그리기 (미리보기와 동일한 방식)
          // 사각형 클리핑으로 범위 벗어나는 부분 자동 처리
          tempCtx.save();
          tempCtx.beginPath();
          tempCtx.rect(0, 0, previewSize, previewSize);
          tempCtx.clip();

          // 배경 흰색
          tempCtx.fillStyle = 'white';
          tempCtx.fillRect(0, 0, previewSize, previewSize);

          // 미리보기와 정확히 동일한 계산
          // 미리보기: width: ${100 * imageScale}% = previewSize * imageScale
          const offsetX = imagePosition.x * (previewSize / editorSize);
          const offsetY = imagePosition.y * (previewSize / editorSize);
          const drawWidth = previewSize * imageScale;
          const drawHeight = (img.height / img.width) * previewSize * imageScale;

          tempCtx.drawImage(
            img,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight
          );
          tempCtx.restore();

          // 원형 마스크 생성
          tempCtx.save();
          tempCtx.globalCompositeOperation = 'destination-in';
          tempCtx.beginPath();
          tempCtx.arc(previewSize / 2, previewSize / 2, previewSize / 2, 0, Math.PI * 2);
          tempCtx.fillStyle = 'white';
          tempCtx.fill();
          tempCtx.restore();

          const result = tempCanvas.toDataURL('image/png');
          setProfileImage(result);
          setShowImageEditor(false);
          setTempImage(null);
        } catch (e) {
          console.error('이미지 그리기 실패:', e);
          setProfileImage(tempImage);
          setShowImageEditor(false);
          setTempImage(null);
        }
      };

      img.onerror = function() {
        console.error('이미지 로드 실패');
        setProfileImage(tempImage);
        setShowImageEditor(false);
        setTempImage(null);
      };

      img.src = tempImage;
    } catch (e) {
      console.error('Canvas 오류:', e);
      setProfileImage(tempImage);
      setShowImageEditor(false);
      setTempImage(null);
    }
  };

  const handleImageCancel = () => {
    setShowImageEditor(false);
    setTempImage(null);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    let newX = e.clientX - dragStartRef.current.x;
    let newY = e.clientY - dragStartRef.current.y;

    // 이미지가 편집 영역을 벗어나지 않도록 제한 (미리보기가 항상 유효한 이미지 부분 보도록)
    const editorSize = 380;
    const maxOffsetX = 0;
    const minOffsetX = -editorSize * (imageScale - 1);
    const maxOffsetY = 0;
    const minOffsetY = -editorSize * (imageScale - 1);

    newX = Math.max(minOffsetX, Math.min(maxOffsetX, newX));
    newY = Math.max(minOffsetY, Math.min(maxOffsetY, newY));

    setImagePosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>내 정보</div><div style={{ fontSize: 14, color: C.textLight }}>계정 정보와 알림 설정을 관리하세요.</div></div>
        <button onClick={handleSave} style={S.btnPrimary}>저장하기</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20, alignItems: "start" }}>
        <div style={{ background: "white", borderRadius: 14, overflow: "hidden" }}>
          {tabs.map(([id, label]) => (
            <div key={id} onClick={() => setSettingsTab(id)} style={{ padding: "13px 18px", fontSize: 13, fontWeight: settingsTab===id ? 600 : 500, cursor: "pointer", borderLeft: `3px solid ${settingsTab===id ? C.purple : "transparent"}`, color: settingsTab===id ? C.purple : C.textMid, background: settingsTab===id ? C.purpleBg : "transparent" }}>{label}</div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: 28 }}>
          {settingsTab === "profile" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: profileImage ? "white" : `linear-gradient(135deg,${C.purple},${C.purpleLight})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 26,
                  fontWeight: 700,
                  overflow: "hidden",
                  position: "relative"
                }}>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "50%"
                      }}
                    />
                  ) : (
                    "이"
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>이가윤</div>
                  <div style={{ fontSize: 12, color: C.textLight, marginBottom: 10 }}>컴퓨터소프트웨어과</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => fileInputRef.current?.click()} style={{ padding: "7px 14px", fontSize: 12, borderRadius: 8, fontWeight: 600, cursor: "pointer", background: C.purpleBg, color: C.purple, border: "none", fontFamily: "inherit" }}>사진 변경</button>
                    <button onClick={() => setProfileImage(null)} style={{ padding: "7px 14px", fontSize: 12, borderRadius: 8, fontWeight: 600, cursor: "pointer", background: "#F5F5F5", color: C.textMid, border: "none", fontFamily: "inherit" }}>삭제</button>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" onChange={handleImageChange} style={{ display: "none" }} />
                </div>
              </div>
              <hr style={{ border: "none", borderTop: `1px solid ${C.purpleBorder}`, margin: "0 0 24px" }} />
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>기본 정보</div>
              {[["이름","홍길동","text"],["이메일","gaun@email.com","email"],["소속","학교 / 회사 이름 (선택)","text"]].map(([lbl,ph,tp]) => (
                <div key={lbl} style={{ marginBottom: 16 }}>
                  <label style={S.label}>{lbl}</label>
                  <input style={S.formInput} type={tp} defaultValue={lbl==="이메일"?"gaun@email.com":""} placeholder={ph} />
                </div>
              ))}
            </div>
          )}
          {settingsTab === "notifications" && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📱 푸시 알림</div>
              {[["마감 임박 알림","마감 7일·3일·1일 전 알림",true],["서류 미완료 리마인더","미준비 서류가 있을 때 알림",true],["문서 분석 완료 알림","업로드 문서 분석이 끝나면 알림",true]].map(([lbl,sub,on]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.purpleBorder}` }}>
                  <div><div style={{ fontSize: 13, fontWeight: 500 }}>{lbl}</div><div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{sub}</div></div>
                  <Toggle defaultOn={on} />
                </div>
              ))}
              <div style={{ fontSize: 15, fontWeight: 700, margin: "24px 0 16px" }}>📧 메일 알림</div>
              {[["메일 알림 받기","이메일로 마감 일정 알림 수신",true],["주간 요약 메일","매주 월요일 이번 주 마감 일정 요약",false]].map(([lbl,sub,on]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.purpleBorder}` }}>
                  <div><div style={{ fontSize: 13, fontWeight: 500 }}>{lbl}</div><div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{sub}</div></div>
                  <Toggle defaultOn={on} />
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <label style={S.label}>알림 수신 이메일</label>
                <input style={S.formInput} type="email" defaultValue="gaun@email.com" />
              </div>
            </div>
          )}
          {settingsTab === "security" && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>비밀번호 변경</div>
              {[["현재 비밀번호","현재 비밀번호"],["새 비밀번호","새 비밀번호 (8자 이상)"],["새 비밀번호 확인","새 비밀번호 재입력"]].map(([lbl,ph]) => (
                <div key={lbl} style={{ marginBottom: 16 }}><label style={S.label}>{lbl}</label><input style={S.formInput} type="password" placeholder={ph} /></div>
              ))}
              <button style={S.btnPrimary}>비밀번호 변경</button>
              <hr style={{ border: "none", borderTop: `1px solid ${C.purpleBorder}`, margin: "24px 0" }} />
              <button style={{ ...S.btnOutline, color: C.red, borderColor: C.red }}>회원 탈퇴</button>
            </div>
          )}
          {settingsTab === "calendar" && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Google 캘린더 연동</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: C.greenBg, borderRadius: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <div><div style={{ fontSize: 13, fontWeight: 600, color: C.green }}>연동 완료</div><div style={{ fontSize: 12, color: C.textLight }}>gaun@gmail.com</div></div>
              </div>
              {[["자동 일정 등록","마감일을 캘린더에 자동 추가",true],["리마인더 자동 설정","마감 3일 전 리마인더 자동 추가",true]].map(([lbl,sub,on]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.purpleBorder}` }}>
                  <div><div style={{ fontSize: 13, fontWeight: 500 }}>{lbl}</div><div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{sub}</div></div>
                  <Toggle defaultOn={on} />
                </div>
              ))}
              <button style={{ ...S.btnOutline, marginTop: 16 }}>연동 해제 후 재연동</button>
            </div>
          )}
        </div>
      </div>

      {/* 사진 편집 모달 */}
      {showImageEditor && tempImage && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1001 }} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          <div style={{ background: "white", borderRadius: 14, padding: 28, maxWidth: 1000, width: "90%", boxShadow: "0 20px 48px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>사진 편집</div>

            {/* 편집 영역 */}
            <div style={{ display: "flex", gap: 40, marginBottom: 20, alignItems: "flex-start" }}>
              {/* 이미지 편집 */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.textLight, marginBottom: 8 }}>이미지 조정</div>
                <div
                  style={{ width: "100%", height: 380, borderRadius: 10, overflow: "hidden", border: `2px dashed ${C.border}`, position: "relative", background: "#F9F9F9", cursor: isDragging ? "grabbing" : "grab" }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    src={tempImage}
                    draggable={false}
                    onMouseDown={handleMouseDown}
                    style={{
                      width: `${100 * imageScale}%`,
                      height: "auto",
                      position: "absolute",
                      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                      cursor: isDragging ? "grabbing" : "grab",
                      userSelect: "none"
                    }}
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.textLight, marginBottom: 8 }}>크기 조정</div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={imageScale}
                    onChange={(e) => setImageScale(parseFloat(e.target.value))}
                    style={{ width: "100%" }}
                  />
                  <div style={{ fontSize: 11, color: C.textLight, marginTop: 4, textAlign: "center" }}>{Math.round(imageScale * 100)}%</div>
                </div>
              </div>

              {/* 미리보기 */}
              <div style={{ textAlign: "center", minWidth: 160 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.textLight, marginBottom: 8 }}>미리보기</div>
                <div style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `3px solid ${C.purple}`,
                  position: "relative",
                  background: "#F9F9F9",
                  margin: "0 auto"
                }}>
                  <img
                    src={tempImage}
                    style={{
                      width: `${100 * imageScale}%`,
                      height: "auto",
                      position: "absolute",
                      left: `${imagePosition.x * (140 / 380)}px`,
                      top: `${imagePosition.y * (140 / 380)}px`,
                      pointerEvents: "none"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={handleImageCancel} style={{ ...S.btnOutline, fontSize: 13 }}>취소</button>
              <button onClick={handleImageConfirm} style={{ ...S.btnPrimary, fontSize: 13 }}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* 저장 확인 팝업 */}
      {showSaveConfirm && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 28, textAlign: "center", maxWidth: 320, boxShadow: "0 20px 48px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>저장하시겠습니까?</div>
            <div style={{ fontSize: 13, color: C.textLight, marginBottom: 24 }}>변경사항을 저장합니다.</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={handleSaveCancel} style={{ ...S.btnOutline, fontSize: 13 }}>취소</button>
              <button onClick={handleSaveConfirm} style={{ ...S.btnPrimary, fontSize: 13 }}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* 저장 완료 팝업 */}
      {showSaveSuccess && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 28, textAlign: "center", maxWidth: 320, boxShadow: "0 20px 48px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>저장되었습니다</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main App ──
export default function App() {
  const params = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(params.get("page") || "login"); // "signup" | "login" | "app"
  const [sub, setSub] = useState(params.get("sub") || "sub-home");
  const [prevSub, setPrevSub] = useState("sub-home");
  const [scheduleDetailDay, setScheduleDetailDay] = useState(null);
  const [scheduleDetailTitle, setScheduleDetailTitle] = useState(null);
  const [docDetailData, setDocDetailData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { msg, show, toast } = useToast();

  const titleMap = { "sub-home":"대시보드","sub-upload":"문서 업로드","sub-schedule":"일정 관리","sub-ongoing":"진행 중인 문서","sub-expired":"마감된 문서","sub-profile":"내 정보", "schedule-detail":"일정 상세", "doc-detail":"문서 상세", "notif-announcement":"공지사항", "notif-analysis":"문서 분석 결과" };

  const handleLogin = (m) => { setPage("app"); setSub("sub-home"); toast(m); };
  const handleLogout = () => { setPage("login"); toast("로그아웃됐어요"); };
  const navTo = (s, detailDay, data) => { if(s === "schedule-detail" || s === "doc-detail") setPrevSub(sub); setSub(s); if(detailDay) { if(typeof detailDay === 'number') setScheduleDetailDay(detailDay); else setScheduleDetailTitle(detailDay); } if(data) setDocDetailData(data); };

  // 히스토리 관리
  useEffect(() => {
    window.history.pushState({ sub, scheduleDetailDay, scheduleDetailTitle, docDetailData }, null, '');

    const handlePopState = (e) => {
      if (e.state) {
        setSub(e.state.sub || "sub-home");
        if (e.state.scheduleDetailDay) setScheduleDetailDay(e.state.scheduleDetailDay);
        if (e.state.scheduleDetailTitle) setScheduleDetailTitle(e.state.scheduleDetailTitle);
        if (e.state.docDetailData) setDocDetailData(e.state.docDetailData);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [sub, scheduleDetailDay, scheduleDetailTitle, docDetailData]);

  if (page === "signup") return <><SignupPage onLogin={handleLogin} goLogin={() => setPage("login")} /><ToastEl msg={msg} show={show} /></>;
  if (page === "login") return <><LoginPage onLogin={handleLogin} goSignup={() => setPage("signup")} /><ToastEl msg={msg} show={show} /></>;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Noto Sans KR', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <Header isLoggedIn={true} onLogout={handleLogout} onLogin={() => setPage("login")} onSignup={() => setPage("signup")} onNavTo={navTo} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div style={{ display: "flex", paddingTop: 58, minHeight: "calc(100vh - 58px)", minWidth: "1200px" }}>
        <Sidebar currentSub={sub} onNavTo={navTo} sidebarOpen={sidebarOpen} />
        <main style={{ marginLeft: sidebarOpen ? 200 : 0, flex: 1, padding: "28px 28px 40px 48px", transition: "marginLeft 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{titleMap[sub]}</div>
          {sub === "sub-home" && <Dashboard onNavTo={navTo} />}
          {sub === "sub-upload" && <UploadPage onNavTo={navTo} />}
          {sub === "sub-schedule" && <SchedulePage onNavTo={navTo} />}
          {sub === "schedule-detail" && <ScheduleDetailPage day={scheduleDetailDay} title={scheduleDetailTitle} prevSub={prevSub} onNavTo={navTo} />}
          {sub === "sub-ongoing" && <OngoingPage onNavTo={navTo} />}
          {sub === "sub-expired" && <ExpiredPage onNavTo={navTo} />}
          {sub === "doc-detail" && <DocumentDetailPage data={docDetailData} prevSub={prevSub} onNavTo={navTo} />}
          {sub === "notif-announcement" && <NotificationAnnouncementPage onNavTo={navTo} />}
          {sub === "notif-analysis" && <NotificationAnalysisPage onNavTo={navTo} />}
          {sub === "sub-profile" && <ProfilePage />}
        </main>
      </div>
      <ToastEl msg={msg} show={show} />
    </div>
  );
}

function ToastEl({ msg, show }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, background: "#1A1025", color: "white", padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", transform: show ? "none" : "translateY(80px)", opacity: show ? 1 : 0, transition: "all .35s cubic-bezier(0.34,1.56,0.64,1)", pointerEvents: "none" }}>
      {msg}
    </div>
  );
}
// Stable version
