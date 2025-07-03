from flask import Flask,render_template,request,jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# Set the static folder and URL path
app = Flask(__name__, static_folder='frontend/public', static_url_path='/static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Define your routes and other application logic here
@app.route('/')
@cross_origin()
def index():
    best_model = joblib.load("best_matching_color_model.pkl")
    top_color = request.args.get("top")
    bottom_color = request.args.get("bottom")

    # Create a dictionary to map color names to encoded values
    color_encoding = {
        "Black": 0,
        "White": 1,
        "Cream": 2,
        "Brown": 3,
        "Blue": 4,
        "Grey": 5,
        "Green": 6,
        "Badge": 7,
        "Pink": 8,
        "Light green": 9,
        "Light Blue": 10,
        "Yellow":11,
        "Orange":12,
        "Red":13
    }

    # Function to predict color matching
    def predict_color_matching(top_color, bottom_color):
        # Encode the input colors
        top_color_encoded = color_encoding.get(top_color, -1)
        bottom_color_encoded = color_encoding.get(bottom_color, -1)

        # Check if the colors are valid
        if top_color_encoded == -1 or bottom_color_encoded == -1:
            return "Invalid Colors"

        # Make a prediction using the trained model
        prediction = best_model.predict([[top_color_encoded, bottom_color_encoded]])

        # Map prediction to "Matching" or "Not Matching"
        return "Matching" if prediction[0] == "Matching" else "Not Matching"

    # Example usage:
    result = predict_color_matching(top_color, bottom_color)
    print(f"The colors {top_color} and {bottom_color} are {result}.")
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001)