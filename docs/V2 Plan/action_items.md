## 🚀 **PHASE 1 — FOUNDATION**

### 🧱 **1. Content System**

**Goal:** Build a complete and validated IBDP Mathematics content base.
**Subtasks:**

- [x] Populate 2000+ IBDP Math questions (AA/AI HL/SL)
- [ ] Implement automated tagging system
- [x] Set up manual QC workflow
- [ ] Automate content validation pipeline

---

### 📊 **2. Student Progress Tracking**

**Goal:** Capture and visualize real learning data.
**Subtasks:**

- [ ] Track attempts, accuracy, and time per question
- [ ] Compute tag mastery levels
- [ ] Implement R/Y/G adaptation logic
- [ ] Build student progress dashboard (visualize mastery per tag/topic)

---

### ⚙️ **3. Infrastructure**

**Goal:** Strengthen analytics and backend structure.
**Subtasks:**

- [x] Supabase + Auth + Storage setup
- [x] Next.js + Shadcn/UI + Tailwind + KaTeX
- [x] Add enhanced analytics using Recharts
- [x] Build admin view for content effectiveness metrics

---

## 🧠 **PHASE 2 — INTELLIGENCE**

### 🧩 **4. Recommendation Engine**

**Goal:** Deliver smart question and lesson suggestions.
**Subtasks:**

- [ ] Implement IRT model (difficulty & ability calibration)
- [ ] Add retention decay model (knowledge forgetting curve)
- [ ] Implement review interval model (spaced repetition)
- [ ] Build API for next-question recommendation
- [ ] Explainable logic for teacher insights (why AI recommended X)

---

### 🧮 **5. Advanced Analytics**

**Goal:** Understand learning behavior deeply.
**Subtasks:**

- [ ] Build cognitive insights dashboard (stamina, focus, learning pattern)
- [ ] Track engagement trends across students
- [ ] Add question difficulty calibration from real data

---

## 🤖 **PHASE 3 — AI INTEGRATION**

### 💬 **6. AI Tutor System**

**Goal:** Deliver context-aware, on-demand AI tutoring.
**Subtasks:**

- [ ] Build chat interface (per-lesson context)
- [ ] Integrate OpenAI/Claude APIs
- [ ] Add context-based prompt engineering
- [ ] Log tutoring insights into student model

---

### 🧠 **7. AI Content Generation**

**Goal:** Automate new content creation & curation.
**Subtasks:**

- [ ] AI question generator for weak tags
- [ ] Theory simplifier (student-level rephrasing)
- [ ] Content quality flagging system
- [ ] Human-in-loop review workflow

---

### 🧭 **8. Personalization Engine**

**Goal:** Adapt curriculum dynamically for each student.
**Subtasks:**

- [ ] Build adaptive learning path generator
- [ ] Real-time path adjustments from performance data
- [ ] Integrate teacher approval / intervention workflow

---

## ⚙️ **PHASE 4 — SUPPORT SYSTEMS (Continuous)**

**Goal:** Tie all analytics, dashboards, and data services together.
**Subtasks:**

- [x] Python ML microservices setup (FastAPI)
- [ ] Integration with Supabase event listeners
- [ ] Deploy monitoring and model versioning
- [ ] Periodic difficulty recalibration

---

## 🔥 **IMMEDIATE SPRINT (This Week)**

1. Finalize automated tagging logic
2. Implement progress tracking schema (attempts, accuracy, time)
3. Prototype RYG logic + test data sync
4. Basic teacher dashboard with tag-based progress view
