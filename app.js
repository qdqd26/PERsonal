:root {
  --bg: #090719;
  --bg2: #120b2e;
  --panel: rgba(255, 255, 255, 0.105);
  --panel-strong: rgba(255, 255, 255, 0.18);
  --line: rgba(255, 255, 255, 0.18);
  --line-strong: rgba(255, 255, 255, 0.32);
  --text: #ffffff;
  --muted: #cfc7ff;
  --soft: rgba(255, 255, 255, 0.66);
  --purple: #7b61ff;
  --pink: #ff5ca8;
  --blue: #46d9ff;
  --green: #78f2c2;
  --yellow: #ffe66d;
  --danger: #ff6c8e;
  --radius-xl: 34px;
  --radius-lg: 26px;
  --shadow: 0 28px 90px rgba(0, 0, 0, 0.44);
  --shadow-soft: 0 18px 55px rgba(0, 0, 0, 0.26);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  min-height: 100vh;
  margin: 0;
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background:
    radial-gradient(circle at 12% 8%, rgba(255, 92, 168, 0.32), transparent 28%),
    radial-gradient(circle at 88% 6%, rgba(70, 217, 255, 0.28), transparent 28%),
    radial-gradient(circle at 50% 110%, rgba(120, 242, 194, 0.15), transparent 35%),
    linear-gradient(145deg, #090719 0%, #17103b 48%, #050712 100%);
  background-attachment: fixed;
  overflow-x: hidden;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(circle at 50% 14%, black, transparent 72%);
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 50% 0%, transparent 0 38%, rgba(0,0,0,0.28) 100%);
  mix-blend-mode: multiply;
}

.ambient {
  position: fixed;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  filter: blur(72px);
  opacity: .48;
  pointer-events: none;
  animation: drift 11s ease-in-out infinite alternate;
}
.ambient-pink { left: -130px; top: 160px; background: rgba(255,92,168,.5); }
.ambient-blue { right: -120px; top: 42px; background: rgba(70,217,255,.42); animation-delay: -3s; }
.ambient-green { left: 42%; bottom: -170px; background: rgba(120,242,194,.26); animation-delay: -6s; }

@keyframes drift { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(22px,-18px,0) scale(1.08); } }
@keyframes float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-18px) scale(1.03); } }
@keyframes pulse { 0%,100% { opacity: .55; transform: scale(1); } 50% { opacity: .98; transform: scale(1.06); } }
@keyframes sparkMove { 0%,100% { transform: translateY(0) rotate(10deg); opacity: .7; } 50% { transform: translateY(-18px) rotate(-8deg); opacity: 1; } }

button, input, select { font: inherit; }
a { color: inherit; }
.app-shell {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 28px));
  margin: 0 auto;
  padding: 24px 0 80px;
}
.glass-card, .premium-card {
  border: 1px solid var(--line);
  background: linear-gradient(138deg, rgba(255,255,255,0.15), rgba(255,255,255,0.062));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-radius: var(--radius-xl);
}
.premium-card {
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow), inset 0 1px 0 rgba(255,255,255,.16);
}
.premium-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255,255,255,.2), transparent 28%, transparent 70%, rgba(120,242,194,.12)),
    radial-gradient(circle at 22% 18%, rgba(255,92,168,.2), transparent 30%),
    radial-gradient(circle at 86% 20%, rgba(70,217,255,.18), transparent 28%);
  pointer-events: none;
}
.soft-border { border-color: rgba(255,255,255,.14); }

.topbar {
  min-height: 70px;
  padding: 12px 14px;
  margin-bottom: 18px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
}
.brand-mark {
  width: 46px;
  height: 46px;
  border-radius: 17px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--pink), var(--purple) 48%, var(--blue));
  box-shadow: 0 0 32px rgba(255,92,168,.38);
  font-weight: 1000;
}
.topbar strong { display: block; letter-spacing: -.03em; }
.topbar p { margin: 2px 0 0; color: var(--muted); font-size: .82rem; }
.topbar-link {
  padding: 11px 16px;
  border-radius: 999px;
  text-decoration: none;
  background: rgba(255,255,255,.11);
  border: 1px solid rgba(255,255,255,.18);
  color: #fff;
  font-weight: 800;
}

.hero {
  min-height: 520px;
  padding: clamp(26px, 5.2vw, 62px);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 28px;
  align-items: center;
}
.hero > * { position: relative; z-index: 1; }
.eyebrow {
  margin: 0 0 12px;
  color: var(--green);
  font-size: .76rem;
  letter-spacing: .17em;
  text-transform: uppercase;
  font-weight: 900;
}
.hero h1 {
  margin: 0;
  font-size: clamp(3.15rem, 7.4vw, 6.7rem);
  line-height: .94;
  letter-spacing: -.07em;
}
.hero h1 span {
  background: linear-gradient(90deg, #fff, #f6dcff 35%, #9eefff 70%, #baffdf);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-subtitle {
  max-width: 690px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 2vw, 1.17rem);
  line-height: 1.82;
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.ghost-link, .primary-button, .secondary-button, .chip, .select-with-link a, .official-strip a, .topbar-link {
  transition: transform .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease, filter .18s ease;
}
.ghost-link, .select-with-link a, .official-strip a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  white-space: nowrap;
}
.ghost-link:first-child { background: linear-gradient(135deg, rgba(255,92,168,.26), rgba(123,97,255,.18)); }
.ghost-link:hover, .select-with-link a:hover, .official-strip a:hover, .secondary-button:hover, .chip:hover, .topbar-link:hover {
  transform: translateY(-2px);
  border-color: rgba(255,255,255,.46);
  background: rgba(255,255,255,.16);
}
.hero-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}
.hero-metrics span {
  padding: 10px 13px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.075);
  color: var(--muted);
}
.hero-metrics b { color: #fff; font-size: 1.08em; }

.aura-console {
  position: relative;
  min-height: 400px;
}
.aura-stage {
  position: absolute;
  inset: 4% 2% 12% 2%;
  display: grid;
  place-items: center;
  border-radius: 42px;
  border: 1px solid rgba(255,255,255,.12);
  background:
    radial-gradient(circle at 35% 45%, rgba(255,92,168,.18), transparent 30%),
    radial-gradient(circle at 64% 43%, rgba(70,217,255,.18), transparent 30%),
    rgba(255,255,255,.045);
  overflow: hidden;
}
.aura-stage::before {
  content: "";
  position: absolute;
  inset: 34px;
  border-radius: 50%;
  border: 1px dashed rgba(255,255,255,.18);
}
.orb {
  position: absolute;
  width: min(42vw, 230px);
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  filter: drop-shadow(0 0 70px rgba(255,255,255,.18));
  animation: float 5.4s ease-in-out infinite;
  mix-blend-mode: screen;
}
.orb span { font-size: 3.6rem; font-weight: 1000; color: rgba(255,255,255,.9); text-shadow: 0 0 30px rgba(255,255,255,.35); }
.orb-a { left: 12%; top: 26%; background: radial-gradient(circle at 35% 28%, #fff, #ffb4dd 12%, #ff5ca8 44%, rgba(123,97,255,.2) 74%, transparent); }
.orb-b { right: 12%; top: 32%; background: radial-gradient(circle at 35% 28%, #fff, #bff5ff 12%, #46d9ff 46%, rgba(120,242,194,.2) 76%, transparent); animation-delay: -1.8s; }
.aura-ring {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.28);
  box-shadow: 0 0 70px rgba(123,97,255,.32), inset 0 0 50px rgba(255,255,255,.08);
  animation: pulse 4.8s ease-in-out infinite;
}
.ring-two { width: 390px; height: 390px; border-color: rgba(120,242,194,.18); animation-delay: -2s; }
.aura-spark {
  position: absolute;
  width: 12px;
  height: 82px;
  border-radius: 999px;
  background: linear-gradient(to bottom, transparent, var(--yellow), transparent);
  filter: drop-shadow(0 0 18px rgba(255,230,109,.95));
  animation: sparkMove 3.4s ease-in-out infinite;
}
.s1 { left: 48%; top: 31%; transform: rotate(22deg); }
.s2 { left: 55%; top: 54%; transform: rotate(-40deg); animation-delay: -1.4s; }
.console-card {
  position: absolute;
  z-index: 3;
  padding: 13px 16px;
  border-radius: 18px;
  background: rgba(5,3,18,.54);
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: 0 18px 50px rgba(0,0,0,.3);
  color: #fff;
  font-weight: 850;
  backdrop-filter: blur(16px);
}
.c1 { left: 0; top: 26px; }
.c2 { right: 0; bottom: 42px; }
.c3 { left: 12%; bottom: 0; color: var(--yellow); }

.form-grid { display: grid; gap: 18px; margin-top: 20px; }
.section-card { padding: clamp(20px, 3vw, 30px); position: relative; overflow: hidden; }
.step-card::after {
  content: "";
  position: absolute;
  inset: auto -12% -40% auto;
  width: 260px;
  height: 260px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(70,217,255,.12), transparent 64%);
  pointer-events: none;
}
.featured-step { border-color: rgba(255,255,255,.24); box-shadow: var(--shadow); }
.compact-step { background: linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.055)); }
.step-heading { display: flex; gap: 15px; align-items: flex-start; margin-bottom: 22px; position: relative; z-index: 1; }
.step-index {
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--pink), var(--purple) 55%, var(--blue));
  box-shadow: 0 0 35px rgba(255,92,168,.28);
  font-weight: 1000;
}
h2, h3, p { margin-top: 0; }
.step-heading h2 { margin: 0 0 8px; font-size: clamp(1.35rem, 2.8vw, 2.05rem); letter-spacing: -.04em; }
.step-heading p { margin: 0; color: var(--muted); line-height: 1.62; }
.official-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  padding: 12px;
  border-radius: 22px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  position: relative;
  z-index: 1;
}
.official-strip span { color: var(--muted); font-size: .88rem; font-weight: 800; }
.people-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; position: relative; z-index: 1; }
.person-card {
  padding: 20px;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(255,255,255,.13), rgba(255,255,255,.065)),
    radial-gradient(circle at 20% 0%, rgba(255,92,168,.09), transparent 36%);
  border: 1px solid rgba(255,255,255,.16);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
}
.person-card[data-person="B"] { background: linear-gradient(135deg, rgba(255,255,255,.13), rgba(255,255,255,.065)), radial-gradient(circle at 80% 0%, rgba(70,217,255,.11), transparent 36%); }
.person-header { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 16px; }
.person-header h3 { margin: 7px 0 0; letter-spacing: -.03em; }
.person-badge {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background: rgba(255,255,255,.12);
  color: var(--yellow);
  font-weight: 1000;
}
.field-label { display: block; margin: 14px 0 8px; color: rgba(255,255,255,.75); font-size: .9rem; font-weight: 850; }
.name-input, select {
  width: 100%;
  min-height: 46px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 16px;
  background: rgba(5, 3, 18, .42);
  color: #fff;
  padding: 0 14px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
}
.name-input { max-width: 160px; }
select:focus, .name-input:focus { border-color: rgba(120,242,194,.5); box-shadow: 0 0 0 4px rgba(120,242,194,.1); }
.select-with-link { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; align-items: center; }
.select-with-link a { min-height: 46px; font-size: .9rem; padding: 0 14px; }
.chip-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; position: relative; z-index: 1; }
.chip {
  min-height: 112px;
  text-align: left;
  padding: 18px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.035));
  color: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.chip::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  right: -50px;
  bottom: -70px;
  background: radial-gradient(circle, rgba(255,230,109,.18), transparent 68%);
}
.chip strong { display: block; margin-bottom: 8px; font-size: 1.04rem; }
.chip span { display: block; color: var(--muted); line-height: 1.5; font-size: .92rem; }
.chip.active {
  border-color: rgba(120,242,194,.76);
  background: linear-gradient(135deg, rgba(120,242,194,.19), rgba(123,97,255,.12));
  box-shadow: 0 0 38px rgba(120,242,194,.16), inset 0 1px 0 rgba(255,255,255,.12);
}
.primary-button {
  min-height: 64px;
  width: 100%;
  border: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--yellow), var(--pink) 48%, var(--blue));
  color: #120b2e;
  font-size: 1.08rem;
  font-weight: 1000;
  cursor: pointer;
  box-shadow: 0 18px 60px rgba(255,92,168,.25);
}
.primary-button:hover { transform: translateY(-2px); filter: saturate(1.15); }

.hidden { display: none !important; }
.result-section { margin-top: 22px; display: grid; gap: 18px; }
.result-hero {
  min-height: 460px;
  padding: clamp(26px, 5vw, 56px);
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  gap: 24px;
}
.result-premium::after {
  content: "";
  position: absolute;
  width: 560px;
  height: 560px;
  right: -180px;
  top: -160px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255,230,109,.12), transparent 64%);
}
.result-text { position: relative; z-index: 1; }
.result-text h2 {
  margin: 0;
  max-width: 780px;
  font-size: clamp(2.5rem, 6.4vw, 5.8rem);
  line-height: .95;
  letter-spacing: -.065em;
}
.score-line { display: flex; align-items: flex-end; gap: 14px; margin: 24px 0 18px; }
.score-line span {
  font-size: clamp(4rem, 10vw, 8rem);
  line-height: .82;
  font-weight: 1000;
  background: linear-gradient(90deg, var(--yellow), var(--pink), var(--blue));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.score-line small { margin-bottom: 9px; color: var(--muted); font-weight: 900; }
.keyword-list { display: flex; flex-wrap: wrap; gap: 10px; }
.keyword-list span {
  padding: 9px 13px;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.14);
  color: #fff;
  font-weight: 850;
}
.summary-text { max-width: 740px; margin: 18px 0 0; color: var(--muted); font-size: 1.08rem; line-height: 1.85; }
.score-orbit {
  position: relative;
  min-height: 340px;
  border-radius: 40px;
  background: rgba(255,255,255,.045);
  border: 1px solid rgba(255,255,255,.11);
  overflow: hidden;
  z-index: 1;
}
.mini-orb {
  position: absolute;
  width: 185px;
  aspect-ratio: 1;
  border-radius: 50%;
  top: 86px;
  mix-blend-mode: screen;
}
.mini-a { left: 17%; background: radial-gradient(circle at 36% 24%, #fff, #ff9cd1 12%, #ff5ca8 46%, transparent 76%); }
.mini-b { right: 17%; background: radial-gradient(circle at 36% 24%, #fff, #baf4ff 12%, #46d9ff 46%, transparent 76%); }
.orbit-line {
  position: absolute;
  inset: 48px;
  border-radius: 50%;
  border: 1px dashed rgba(255,255,255,.22);
}
.spark {
  position: absolute;
  left: 49%;
  top: 44%;
  width: 24px;
  height: 86px;
  border-radius: 999px;
  background: linear-gradient(to bottom, transparent, #ffe66d, transparent);
  filter: drop-shadow(0 0 25px rgba(255,230,109,.9));
  transform: rotate(28deg);
  animation: sparkMove 3s ease-in-out infinite;
}
.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.result-card, .algorithm-card, .share-panel { padding: clamp(20px, 3vw, 28px); }
.card-title-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.card-title-row h3, .algorithm-card h3, .share-panel h3 { margin: 0; font-size: 1.26rem; letter-spacing: -.03em; }
.card-title-row span { color: var(--green); font-size: .75rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 900; }
.bars { display: grid; gap: 16px; }
.bar-top { display: flex; justify-content: space-between; color: #fff; font-weight: 850; margin-bottom: 8px; }
.bar-track {
  height: 12px;
  border-radius: 999px;
  background: rgba(255,255,255,.1);
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
}
.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pink), var(--purple), var(--blue), var(--green));
  box-shadow: 0 0 20px rgba(70,217,255,.4);
}
.difference-list { display: grid; gap: 12px; }
.diff-item {
  padding: 15px;
  border-radius: 20px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.12);
}
.diff-item strong { display: flex; justify-content: space-between; gap: 10px; color: #fff; }
.diff-item strong span:last-child { color: var(--yellow); }
.diff-item p { margin: 10px 0 0; color: var(--muted); line-height: 1.6; }
.diff-item em { display: block; margin-top: 9px; color: rgba(255,255,255,.84); font-style: normal; }
.insight-section {
  padding: clamp(20px, 3vw, 30px);
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.045));
  border: 1px solid rgba(255,255,255,.14);
}
.section-title-row { display: grid; gap: 5px; margin-bottom: 16px; }
.section-title-row h3 { margin: 0; font-size: clamp(1.6rem, 3vw, 2.35rem); letter-spacing: -.05em; }
.section-title-row p:last-child { margin: 0; color: var(--muted); line-height: 1.5; }
.report-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.story-card {
  position: relative;
  padding: 22px;
  min-height: 190px;
  border-radius: 28px;
  border: 1px solid rgba(255,255,255,.15);
  background:
    radial-gradient(circle at 15% 0%, rgba(255,92,168,.13), transparent 38%),
    linear-gradient(135deg, rgba(255,255,255,.105), rgba(255,255,255,.052));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1);
  overflow: hidden;
}
.story-card::after {
  content: "";
  position: absolute;
  width: 140px;
  height: 140px;
  right: -60px;
  bottom: -70px;
  background: radial-gradient(circle, rgba(70,217,255,.2), transparent 70%);
}
.story-card h3 { margin: 0 0 12px; font-size: 1.15rem; letter-spacing: -.03em; }
.story-card p { margin: 0; color: var(--muted); line-height: 1.74; }
.story-card .micro-tag {
  display: inline-flex;
  margin-bottom: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,230,109,.12);
  color: var(--yellow);
  border: 1px solid rgba(255,230,109,.18);
  font-size: .78rem;
  font-weight: 900;
}
.algorithm-card p, .share-panel p { color: var(--muted); line-height: 1.72; margin-bottom: 0; }
.share-panel { display: grid; gap: 18px; }
.share-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.secondary-button {
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.2);
  background: rgba(255,255,255,.09);
  color: #fff;
  cursor: pointer;
  font-weight: 850;
}
#posterCanvas {
  width: min(100%, 360px);
  height: auto;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,.14);
  box-shadow: var(--shadow-soft);
}

@media (max-width: 880px) {
  .topbar { grid-template-columns: auto 1fr; }
  .topbar-link { display: none; }
  .hero, .result-hero { grid-template-columns: 1fr; }
  .aura-console { min-height: 340px; }
  .people-grid, .result-grid, .report-cards { grid-template-columns: 1fr; }
  .chip-grid { grid-template-columns: 1fr; }
  .select-with-link { grid-template-columns: 1fr; }
  .select-with-link a { width: 100%; }
  .name-input { max-width: 130px; }
}

@media (max-width: 540px) {
  .app-shell { width: min(100% - 18px, 1180px); padding-top: 10px; }
  .hero, .section-card, .result-hero, .result-card, .algorithm-card, .share-panel, .insight-section { border-radius: 26px; }
  .hero h1 { font-size: clamp(2.9rem, 15vw, 4.2rem); }
  .step-heading { gap: 12px; }
  .step-index { width: 42px; height: 42px; flex-basis: 42px; }
  .official-strip a { width: 100%; }
  .aura-console { min-height: 310px; }
  .console-card { font-size: .82rem; }
  .orb { width: 190px; }
  .orb-a { left: 6%; }
  .orb-b { right: 6%; }
  .score-orbit { min-height: 270px; }
  .mini-orb { width: 140px; top: 72px; }
}
