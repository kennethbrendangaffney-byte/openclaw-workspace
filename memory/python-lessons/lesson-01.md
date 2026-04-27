# Python & Math — Week 1, Session 1
## Ken's First Python Program

**Date:** Thursday, 30 April 2026  
**Duration:** 30 minutes  
**Goal:** Write and run your first Python program

---

## Before We Start

Open a terminal: `Ctrl + Alt + T`

Check Python is ready:
```bash
python3 --version
```

Expected output: `Python 3.12.3` (or similar)

---

## The Lesson

### Step 1: Interactive Mode (5 min)

```bash
python3
```

You'll see:
```
Python 3.12.3 (main, Nov  6 2024, 18:32:19) [GCC ...]
>>>
```

The `>>>` means Python is listening. Type:

```python
print("Hello, I'm Ken and I'm learning AI")
```

Press Enter. You should see:
```
Hello, I'm Ken and I'm learning AI
```

**You just wrote your first code.**

Try more:
```python
2 + 2
10 * 5
"Hello" + " Ken"
```

Exit when done:
```python
exit()
```

---

### Step 2: Your First Script (10 min)

Create a file:
```bash
nano hello.py
```

Type inside:
```python
print("Hello, I'm Ken and I'm learning AI")
print("Today is my first Python lesson")
print("By September, I'll be ready for my diploma")
```

Save and exit:
- `Ctrl + O` (save)
- `Enter` (confirm filename)
- `Ctrl + X` (exit nano)

Run it:
```bash
python3 hello.py
```

You should see all three lines print.

---

### Step 3: Variables (10 min)

Variables are named boxes that hold values.

Edit your file:
```bash
nano hello.py
```

Replace with:
```python
name = "Ken"
age = 29
goal = "CCT Level 7 AI Diploma"

print("Name:", name)
print("Age:", age)
print("Goal:", goal)
```

Run again:
```bash
python3 hello.py
```

Try changing the values. Run again. See how it updates?

---

### Step 4: Experiment (5 min)

Try this in interactive mode (`python3`):

```python
name = "Ken"
year = 2026
print("In", year + 1, name, "will be in college")
```

What happens? Play around. Make mistakes — that's how you learn.

---

## After the Lesson

**What to remember:**
- `python3` starts interactive mode
- `python3 filename.py` runs a script
- Variables store values: `name = "Ken"`
- `print()` shows output

**Next session (Thursday):** We'll build a calculator using `input()` and variables.

**Questions?** Ask anytime. No question is too basic.

---

*Lesson 1 of 60. You're doing great.*
