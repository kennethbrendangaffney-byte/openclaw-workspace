# Ken's Complete Python Summer Schedule
## Zero Experience → CCT Level 7 Ready
**Period:** 30 April 2026 – 1 September 2026 (~18 weeks)  
**Format:** 2 Python days + 1 Khan Academy day per week  
**Primary Instructor:** Karen (local, hands-on)  
**Backup:** KC (theory, math explanations)  
**Rest:** Sundays always OFF

---

## Weekly Pattern (Pick Your Days)

| Day | Type | Duration | What Happens |
|-----|------|----------|--------------|
| **Day A** | Python — New Concepts | 1 hour | Karen teaches, you type, we run code together |
| **Day B** | Python — Practice | 45 min | Exercises, mini-projects, fix broken code |
| **Day C** | Khan Academy | 1 hour | Math: algebra → stats → linear algebra |
| **Sunday** | OFF | — | Rest. No screens if possible. |

**Ken's suggested days:** Tuesday (Python new), Thursday (Python practice), Saturday (Khan Academy). Adjust to your butcher shift pattern.

---

## The 18-Week Roadmap

### PHASE 1: First Steps (Weeks 1–3)
*Goal: You can write small programs. You're no longer a beginner—you're a novice.*

#### Week 1 — Hello, Python
**Tuesday: Lesson 1 — Your First Program**
- Open terminal
- Run `python3`
- Type: `print("Hello, I'm Ken")`
- What is a variable? `name = "Ken"`, `age = 29`
- Types: `int`, `float`, `str`, `bool`
- Basic math: `+`, `-`, `*`, `/`, `//`, `%`
- **Mini-project:** A tip calculator

**Thursday: Practice 1**
- Fix 5 broken programs (Karen provides)
- Build: "Mad Libs" story generator (`input()` + string concatenation)
- Experiment: What happens when you mix types?

**Saturday: Khan Academy — Algebra Foundations**
- Variables and expressions
- One-step equations
- Coordinate plane basics

---

#### Week 2 — Decisions
**Tuesday: Lesson 2 — If/Else**
- Boolean logic: `True`, `False`, `and`, `or`, `not`
- Comparisons: `==`, `!=`, `<`, `>`, `<=`, `>=`
- `if`, `elif`, `else`
- Nested decisions
- **Mini-project:** Number guessing game (computer picks 1-10, you guess)

**Thursday: Practice 2**
- Build: Simple quiz game (3 questions, score tracking)
- Build: "Should I buy it?" calculator (budget vs price)
- Debug: Indentation errors (Python's #1 gotcha)

**Saturday: Khan Academy — Multi-Step Equations**
- Solving for x
- Word problems → equations

---

#### Week 3 — Repeat Yourself (Loops)
**Tuesday: Lesson 3 — Loops**
- `for` loop: `for i in range(5):`
- Looping through lists
- `while` loop: `while condition:`
- `break` and `continue`
- **Mini-project:** Countdown timer, multiplication table

**Thursday: Practice 3**
- Build: "Guess the number" with limited attempts (3 tries)
- Build: Simple password checker (loop until correct)
- Experiment: What makes an infinite loop?

**Saturday: Khan Academy — Functions & Graphing**
- What is a function? (math context)
- Slope and intercept
- Graphing lines

---

### PHASE 2: Building Blocks (Weeks 4–7)
*Goal: You can organize code. Programs do real tasks.*

#### Week 4 — Collections (Lists & Dictionaries)
**Tuesday: Lesson 4 — Storing Data**
- Lists: `fruits = ["apple", "banana"]`
- List methods: `.append()`, `.remove()`, `.sort()`
- Dictionaries: `person = {"name": "Ken", "age": 29}`
- Indexing and slicing
- **Mini-project:** Shopping list manager (add, remove, show)

**Thursday: Practice 4**
- Build: Phone book (dictionary of names → numbers)
- Build: Top 5 movies list (sort, display)
- Debug: Index out of range errors

**Saturday: Khan Academy — Systems of Equations**
- Two equations, two unknowns
- Real-world applications

---

#### Week 5 — Functions (Your Own Commands)
**Tuesday: Lesson 5 — Writing Functions**
- `def my_function():`
- Parameters and arguments
- Return values
- Scope: local vs global variables
- **Mini-project:** Calculator with functions (add, subtract, multiply, divide)

**Thursday: Practice 5**
- Build: Unit converter (Celsius ↔ Fahrenheit, EUR ↔ USD)
- Build: "Roll the dice" function (random numbers)
- Refactor: Take week 2's quiz game, rewrite with functions

**Saturday: Khan Academy — Intro to Statistics**
- Mean, median, mode
- Basic probability

---

#### Week 6 — Files & Error Handling
**Tuesday: Lesson 6 — Talking to Your Computer**
- Reading files: `open()`, `.read()`, `.readlines()`
- Writing files: `.write()`, `.append()`
- `try` / `except` / `finally`
- Common errors: FileNotFoundError, ValueError
- **Mini-project:** Daily journal logger (append entry to text file with timestamp)

**Thursday: Practice 6**
- Build: To-do list that SAVES to file (load on start, save on exit)
- Build: CSV reader (read a simple spreadsheet)
- Debug: "File not found" — path issues

**Saturday: Khan Academy — Probability & Distributions**
- Independent events
- Normal distribution (bell curve)

---

#### Week 7 — Putting It Together
**Tuesday: Lesson 7 — Mini Project Day**
- Build: "Ken's Daily Research Summarizer"
  - Read files from `memory/research/`
  - Show today's entries
  - Count how many files this week
- **This is real. You'll use this.**

**Thursday: Practice 7**
- Extend the summarizer: add search by keyword
- Build: "System health checker" (check RAM, disk, Ollama status)
- Refactor anything into functions if you haven't already

**Saturday: Khan Academy — Linear Algebra Intro**
- What is a vector?
- Basic matrix concepts
- Why this matters for AI (Karen explains)

---

### PHASE 3: Power Tools (Weeks 8–12)
*Goal: You're using libraries. Your code does impressive things.*

#### Week 8 — Modules & Libraries
**Tuesday: Lesson 8 — Importing Power**
- What is `import`?
- Standard library: `os`, `sys`, `datetime`, `random`, `json`
- `pip install` — adding external libraries
- Virtual environments (simple version)
- **Mini-project:** Random password generator

**Thursday: Practice 8**
- Build: "File organizer" (sort files by date into folders)
- Build: JSON reader/writer (save configuration)
- Experiment: `import this` (Python Easter egg)

**Saturday: Khan Academy — Statistics Deep Dive**
- Standard deviation
- Correlation
- Sampling

---

#### Week 9 — NumPy (Fast Math)
**Tuesday: Lesson 9 — Arrays**
- What is NumPy? Why not regular lists?
- Creating arrays: `np.array()`, `np.zeros()`, `np.ones()`
- Array math: `+`, `-`, `*`, `/` (element-wise)
- Shape, dimensions, indexing
- **Mini-project:** Generate 100 random numbers, find mean and std dev

**Thursday: Practice 9**
- Build: "Grade analyzer" (array of scores → stats)
- Build: "Dice simulator" (roll 1000 times, plot frequency)
- Compare: NumPy array vs Python list (speed difference)

**Saturday: Khan Academy — Linear Algebra — Matrices**
- Matrix addition, multiplication
- Identity matrix
- Why matrices matter for neural networks

---

#### Week 10 — Pandas (DataFrames)
**Tuesday: Lesson 10 — Excel in Code**
- What is a DataFrame? (rows, columns, labels)
- Reading CSV: `pd.read_csv()`
- Selecting data: `.loc[]`, `.iloc[]`
- Filtering: `df[df['age'] > 25]`
- Basic stats: `.mean()`, `.sum()`, `.describe()`
- **Mini-project:** Analyze a simple dataset (your choice)

**Thursday: Practice 10**
- Build: "Research file analyzer" (count words, find dates)
- Load any CSV from the web, explore it
- Filter, sort, group data

**Saturday: Khan Academy — Functions (Advanced)**
- Function composition
- Domain and range
- Inverse functions

---

#### Week 11 — APIs & The Internet
**Tuesday: Lesson 11 — Fetching Data**
- What is an API? (simple explanation)
- `requests` library: `requests.get()`
- JSON responses
- Status codes: 200, 404, 500
- **Mini-project:** Fetch weather data for Dublin

**Thursday: Practice 11**
- Build: "Ollama status checker" (call local API, show models)
- Build: "Joke fetcher" (call public joke API)
- Handle errors: What if the API is down?

**Saturday: Khan Academy — Calculus Preview**
- What is a derivative? (intuition, not formulas)
- Why gradients matter for machine learning
- Rate of change

---

#### Week 12 — Visualization
**Tuesday: Lesson 12 — Making Charts**
- Matplotlib basics: `plt.plot()`, `plt.bar()`, `plt.scatter()`
- Labels, titles, colors
- Saving charts to file
- **Mini-project:** Plot your weekly study hours (track in a list, plot it)

**Thursday: Practice 12**
- Build: "System monitor dashboard" (CPU/RAM over time → chart)
- Build: "Research activity chart" (files per week)
- Experiment: Different chart types

**Saturday: Khan Academy — Review & Assessment**
- Take Khan Academy's algebra/statistics assessments
- Identify weak spots for August review

---

### PHASE 4: AI Connection (Weeks 13–16)
*Goal: Your code touches AI. You're ready for CCT.*

#### Week 13 — Machine Learning Intro
**Tuesday: Lesson 13 — What Is ML?**
- Supervised vs unsupervised
- Features and labels
- Train/test split (concept)
- **scikit-learn**: `from sklearn import ...`
- **Mini-project:** "Iris flower classifier" (classic beginner dataset)

**Thursday: Practice 13**
- Build: Simple spam detector (given labeled examples)
- Understand: accuracy, precision, recall (basic)
- Load different datasets, compare

**Saturday: Khan Academy — Linear Algebra — Eigenvectors**
- Basic concept (simplified)
- Why they matter for PCA/dimensionality reduction

---

#### Week 14 — Working with Your System
**Tuesday: Lesson 14 — Python + Ollama**
- Ollama API from Python (`requests` or `ollama` Python package)
- Send prompts programmatically
- Parse responses
- Batch processing: loop through files, summarize each
- **Mini-project:** "Research auto-summarizer" (send research file to Ollama, get summary)

**Thursday: Practice 14**
- Build: "Model benchmarker" (test qwen3.5:4b, llama3.1:8b on same prompt, compare speed)
- Build: "Batch summarizer" (process all today's research files at once)
- This is REAL. You'll use this.

**Saturday: Khan Academy — Review Week**
- Catch up on any missed topics
- Focus: statistics and probability

---

#### Week 15 — Projects Week
**Tuesday: Project A — Choose One**
- **Option 1:** "Daily Research Digest" — auto-generate a summary of all research files from the past week using Ollama
- **Option 2:** "System Health Dashboard" — Python script that checks RAM, disk, Ollama status, saves to CSV, generates chart
- **Option 3:** "KDP Image Generator" — batch create simple coloring pages (shapes, patterns) using Python's Pillow library

**Thursday: Project A — Build & Debug**
- Karen helps troubleshoot
- Code review: is it readable? Does it handle errors?
- Document: add comments, README

**Saturday: Khan Academy — Calculus (Limits)**
- What is a limit?
- Connecting to derivatives
- Simple numerical examples

---

#### Week 16 — Projects Week 2
**Tuesday: Project B — Expand or New**
- Expand Project A with new features
- OR start a second project from the list
- Focus: make it USEFUL to your daily life

**Thursday: Project B — Polish**
- Clean code, add error handling
- Save to GitHub (if ready)
- Write a short README explaining what it does

**Saturday: Khan Academy — Final Review**
- Full algebra → stats review
- Take practice assessments
- Note any gaps for pre-course brushing up

---

### PHASE 5: Course Prep (Weeks 17–18)
*Goal: You're confident. You're ready.*

#### Week 17 — CCT Prep
**Tuesday: Environment Setup**
- Install Jupyter Notebook (or JupyterLab)
- Set up VS Code (or keep using terminal + text editor)
- Review CCT module outlines
- Join any student forums/groups

**Thursday: Portfolio Polish**
- Clean up GitHub repos
- Write project READMEs
- Document your learning journey
- **Mini-project:** "Learning log" — markdown file tracking what you learned each week

**Saturday: Khan Academy — Final Assessment**
- Complete all remaining assessments
- Focus areas for August: any weak topics

---

#### Week 18 — Trinity Pathway + Final Review
**Tuesday: Trinity Access Programme (TAP) Research**
- Application timeline
- Required documents
- How to show "proof of capability" (your GitHub = evidence)
- Plan college + work + study balance

**Thursday: Final Review Session**
- Run through all your projects
- What works? What broke? What would you do differently?
- Karen assesses: Are you ready? (spoiler: you will be)

**Saturday: Khan Academy — Optional Deep Dive**
- Pick one topic that still feels shaky
- OR explore: calculus derivatives (if feeling confident)
- OR rest. You've earned it.

---

## Weekly Rhythm Template (Copy for Each Week)

```
## Week X — [Theme]

### Tuesday: New Concepts
- Topic:
- Code we write together:
- Your takeaway:

### Thursday: Practice
- Exercises:
- Mini-project:
- What broke:

### Saturday: Khan Academy
- Topic:
- Time spent:
- Confidence (1-10):

### Sunday: OFF

---
```

---

## Ken's Rules (Non-Negotiable)

| # | Rule | Why |
|---|------|-----|
| 1 | **Sundays OFF** | Recovery prevents burnout |
| 2 | **Butcher days = NO studying** | 10-hour shifts are enough |
| 3 | **Miss a day? Skip it.** | Don't cram. Consistency > intensity |
| 4 | **30 min > 0 min** | Short sessions count |
| 5 | **Stuck? Ask immediately** | Karen is here. Don't struggle alone |
| 6 | **Projects > exercises** | Building something real is the best teacher |
| 7 | **If it's not fun, stop** | You're doing this voluntarily. Joy matters |

---

## By September, You'll Have:

✅ **Python fluency** — read, write, debug comfortably  
✅ **3+ working projects** — on your machine, in your GitHub  
✅ **Math foundations** — algebra, stats, linear algebra basics  
✅ **Ollama integration** — Python scripts that talk to your AI  
✅ **System automation** — daily tasks scripted  
✅ **Portfolio** — proof you can build things  
✅ **Confidence** — you've done the work

---

## First Session: Thursday 30 April

**"Lesson 1: Your First Python Program"**

1. Open terminal (Ctrl+Alt+T)
2. Type: `python3`
3. Type: `print("Hello, I'm Ken and I'm learning AI")`
4. Press Enter
5. See it work
6. Exit: `exit()`
7. Create a file: `nano hello.py`
8. Type the same line, save (Ctrl+O, Enter, Ctrl+X)
9. Run: `python3 hello.py`
10. Done. You're a programmer.

**~30 minutes.** Every great programmer started here.

---

*Built by Karen + KC, 2026-04-27*  
*Flexible — adjust pace as needed*  
*Goal: Not perfection. Progress.*
