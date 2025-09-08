# 📨 Phishing Email Threat Analyzer

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML/CSS](https://img.shields.io/badge/HTML-CSS-blue.svg)](#)
[![Security](https://img.shields.io/badge/Status-Completed-brightgreen.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Threat Intelligence](https://img.shields.io/badge/Threat%20Intelligence-OSINT-orange.svg)](#)

> **"Phishing Email Analysis & Threat Intelligence"** — A browser extension for real-time phishing detection using OSINT and open threat intelligence APIs.

---

## 📜 Overview
Phishing remains one of the **most common and dangerous** cyber threats, often bypassing traditional spam filters.  
This project is a **browser extension** that:
- Extracts **email metadata** (sender, subject, links, attachments)
- Cross-checks with **Threat Intelligence APIs**
- Detects malicious links & attachments
- Provides **instant alerts** in a privacy-focused manner

---

## 🎯 Features
- **Real-Time Analysis** — Detects phishing indicators instantly
- **Link & Attachment Scanning** — Identifies malicious/suspicious content
- **OSINT Integration** — Uses open APIs (VirusTotal, AbuseIPdb, etc.)
- **Privacy Focused** — Minimal data sharing, local processing
- **Threat Scoring** — Classifies emails as Safe, Suspicious, or Dangerous
- **Detailed Reports** — Shows sender spoofing, domain age, and reputation

---

## 📂 Project Structure
```bash
Phishing-Email-Threat-Analyzer/
│
├── popup.html # Main extension popup UI
├── popup.js # Logic for analysis, API calls
├── style.css # Extension styling
├── manifest.json # Chrome/Edge extension manifest
├── README.md # Documentation
└── assets/ # Icons & images
```
---

## ⚙️ Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/Phishing-Email-Threat-Analyzer.git
cd Phishing-Email-Threat-Analyzer
```
### 2️⃣ Load the Extension in Chrome/Edge
1. Open chrome://extensions/

2. Enable Developer Mode

3. Click Load unpacked

4. Select the project folder

--- 

## 🖼️ Workflow Diagram
```mermaid
flowchart TD
    A[User Opens Email] --> B[Extension Extracts Metadata]
    B --> C[Threat Intelligence API Check]
    C --> D[Analyze Sender, Links, Attachments]
    D --> E[Calculate Threat Score]
    E -->|Safe| F[Show Green Alert]
    E -->|Suspicious| G[Show Yellow Alert]
    E -->|Danger| H[Show Red Alert]
```
---

## 📊 Sample Threat Detection

Suspicious Email Example
```yaml
Sender: support@paypal-security.com
Domain Age: 12 days
Malicious Links: 1
Attachments: 0
Threat Score: 85% (Danger)
```
⚠ Detected as dangerous — phishing attempt!

---
## 📌 Academic Context

> Title: Phishing Email Analysis and Threat Intelligence

### Team Members:

Akhilesh Palve

Shubham Dorik 

Guide: Prof. Rahul Bembade

Department: Computer Science & Engineering, MITSOE, Loni Kalbhor
