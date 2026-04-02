EyeSense – AI Eye Disease Screening

## 🚀 Overview

EyeSense is an AI-powered healthcare solution that enables early detection of eye-related and systemic conditions using simple smartphone images.

It combines computer vision, heuristic analysis, and backend APIs to provide real-time screening and risk assessment.

---

## 🧠 Problem

Early signs of conditions like anemia, cataract, glaucoma, and infections are often visible in the eye but go undetected due to:

- Lack of accessible screening tools  
- Dependence on clinical equipment  
- Low awareness in early stages  

---

## 💡 Solution

EyeSense analyzes eye images using color-based computer vision heuristics to detect abnormalities and provide early-stage insights.

The system is designed to work even without a trained ML model, ensuring reliability during early deployment and demos.

---

## 🔍 Features

- Multi-condition detection (Anemia, Cataract, Glaucoma, Normal)  
- Real-time image analysis via API  
- ROI-based feature extraction (sclera + lens regions)  
- Confidence scoring system  
- Standalone dataset testing pipeline  
- Fallback heuristic system (no ML dependency)  

---

## 🛠️ Tech Stack

### Current (Phase 1)
- Frontend: React / HTML-CSS-JS  
- Backend: FastAPI (Python)  
- AI / CV: OpenCV, NumPy  
- Testing: Custom dataset pipeline  

### Upcoming (Phase 2 – ML Upgrade)
- Deep Learning: TensorFlow  
- Model Type: CNN-based image classification  
- Goal: Replace heuristic system with trained AI model for higher accuracy  

---
##  How to run file 
## Frontend
- cd frontend 
- npm install 
- npm run dev
  
---

##Backend
- cd backend 
- pip install numpy opencv-python
- pip install python-multipart
- python -m uvicorn main:app --reload

---


## 📂 Project Structure
<img width="274" height="286" alt="image" src="https://github.com/user-attachments/assets/091d546c-3b47-40fc-baff-4373e3e9279c" />



---

## ⚙️ How It Works

1. User uploads an eye image  
2. Backend processes image using OpenCV  
3. Regions of interest (ROI) are extracted  
4. Color channel statistics are analyzed  
5. Heuristic scoring engine predicts condition  
6. API returns condition, confidence, and recommendation  

---

## 🧪 Current Approach (Phase 1)

- Rule-based heuristic model  
- Based on real dataset color diagnostics  
- Optimized for low-quality images  
- No dependency on heavy ML frameworks  

---

## 🚀 Future Scope (Phase 2 – ML Upgrade)

EyeSense will evolve into a fully AI-driven system using:

- Deep Learning models built with TensorFlow  
- CNN-based image classification  
- Larger labeled datasets  
- Improved accuracy and generalization  
- Real-time mobile deployment  

---

## 👥 Team

- Meha Mahajan  
- Masti Choraria  
- Bismun Singh  
- Mayank Kedia  

---

## ⚠️ Disclaimer

This is a prototype system designed for research and demonstration purposes only.  
It is not a certified medical diagnostic tool and should not replace professional medical advice.
