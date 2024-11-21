from flask import Flask, request, jsonify
import cv2
import pytesseract
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' 


def extract_passport_info(image_path):
    image = cv2.imread(image_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    text = pytesseract.image_to_string(gray)

    name = None
    passport_number = None
    expiration_date = None

    name_match_passport = re.search(r'Given Name\(s\)\s*([A-Z]+)', text)
    if name_match_passport:
        given_name = name_match_passport.group(1).strip()
        name = f"{given_name}"

    passport_pattern = r'([A-Z][1-9][0-9]\s?[0-9]{4}[1-9])'
    passport_number_match = re.search(passport_pattern, text)
    
    if passport_number_match:
        passport_number = passport_number_match.group(1).strip()
    
    exp_date_match_passport = re.search(r'Date of Expiry\s*(\d{2}/\d{2}/\d{4})', text)
    if exp_date_match_passport:
        expiration_date = exp_date_match_passport.group(1).strip()


    return {
        'name':name,
        'passport_number':passport_number,
        'date_of_expiry': expiration_date,
    }





def extract_driving_license_info(image_path):
    
    image = cv2.imread(image_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    text = pytesseract.image_to_string(gray)

    name = None
    document_number = None
    expiration_date = None

    name_match = re.search(r'Name\s*\.*?\s*([A-Z\s]+.*?)\s*\n', text)

    if name_match:
        name = name_match.group(1).strip()

    doc_num_match = re.search(r'\b.*?([A-Z]{2}(O|[0-9])[0-9]\s[0-9]{11})\b', text)
    if doc_num_match:
        document_number = doc_num_match.group(1).strip()
        match = re.search(r'\b([A-Z]{2}\d{2})\b', document_number)
        if match:
            extracted_value = match.group(1)
        else:
            print("No match found")

    exp_date_match = re.search(r'Valid Till\s*:\s*(\d{2}-\d{2}-\d{4})', text)
    if exp_date_match:
        expiration_date = exp_date_match.group(1).strip()
    
        
    return {
        'name': name,
        'driving_license_number': document_number,
        'expiration_date': expiration_date,
    }

@app.route('/upload/driving_license', methods=['POST'])
def upload_driving_license_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    file_path = f'./uploads/{file.filename}'
    file.save(file_path)

    extracted_info = extract_driving_license_info(file_path)

    return jsonify(extracted_info)


@app.route('/upload/passport', methods=['POST'])
def upload_passport_file():
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    file_path = f'./uploads/{file.filename}'
    file.save(file_path)

    extracted_info = extract_passport_info(file_path)

    return jsonify(extracted_info)

if __name__ == '__main__':
    app.run(debug=True)
