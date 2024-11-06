Document-Capture-OCR-Text-Scanner :

Document-Capture-OCR-Text-Scanner is a robust tool designed to extract text from images, focusing specifically on Indian passports and driving licenses. With an intuitive interface and seamless data extraction, it simplifies the process of OCR (Optical Character Recognition) for Indian government-issued documents.

Key Features
Image-to-Text Extraction: Efficiently extracts data from images of Indian passports and driving licenses using OCR technology.
User-Friendly Interface: Built with React and styled using Tailwind CSS, ensuring a smooth and responsive experience.

Technology Stack
Backend
Flask: Handles the backend API for managing OCR operations.
Tesseract: Powers the OCR engine for text extraction from images.
Regex: Ensures accurate extraction and parsing of specific information from the OCR output.

Frontend
React: Used for building the user interface, ensuring a dynamic and responsive experience.
Tailwind CSS: Provides styling for a clean, modern look and feel.

Installation Guide
To get started with OCR-Text-Scanner, follow the steps below:

1. Clone the Repository
Clone the repository to your local machine using:
git clone https://github.com/arif05khan/Document-Capture-OCR-Text-Scanner.git
cd Document-Capture-OCR-Text-Scanner

2. Install Backend Dependencies
Navigate to the backend directory and install the necessary packages:
cd backend
pip install -r requirements.txt

4. Start the Backend Server
Launch the Flask server:
python server.py

4. Install Frontend Dependencies
Go to the frontend directory and install the required packages:
cd frontend
npm install

6. Run the Frontend Application
Start the React app:
npm start

6. Open the Application
Access the application by visiting http://localhost:3000 in your web browser.

Screenshots
1. UI - Upload Page
A simple UI to upload the document image for OCR processing.
![1st WhatsApp Image 2024-11-06 at 16 57 39_be99caa4](https://github.com/user-attachments/assets/46d2e36c-1e80-43c6-b7cd-d0e6e8878832)

2. Upload document
![2nd pic](https://github.com/user-attachments/assets/7a096bb5-1e09-49e8-a56f-dbb2071c0190)

![3rd pic ](https://github.com/user-attachments/assets/3abd0837-87fe-4583-a755-1c537c718918)

3. Extracted Data
After uploading, the extracted data such as name, document number, and dates are displayed.
![4th pic](https://github.com/user-attachments/assets/cb3b635a-561e-4a05-af00-4a166b16ccd0)


3. Data Validation
The user can review and confirm the parsed details.

