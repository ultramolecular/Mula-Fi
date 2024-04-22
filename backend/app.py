from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
import re

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

app = Flask(__name__)
CORS(app)

# landing page route for the API
@app.route("/", methods=["GET"])
def home():
    return jsonify(
        "Welcome to the MulaFI backend"
    )

@app.route("/get-investment-feedback", methods=["POST"])
def get_investment_feedback():
    data = request.json
    prompt = f"Using the following user's experience and investment plan information, simulate results as if "\
             f"the user actually put x% into stocks, y% into bonds, and z% into savings. The user has the "\
             f"following goals: {data['goals']}, with an initial portfolio size of: ${data['portfolio_size']}, "\
             f"can contribute ${data['monthly_contribution']} monthly.\nThe prospective investment plan the user "\
             f"has chosen is the following: {data['stocks']}% stocks, {data['bonds']}% bonds, {data['savings']}% savings. "\
             f"Simulate results for a 1-year period, 5-year period, and 10-year period using historic finance statistics, "\
             f"and then provide useful feedback as if you were an actual professional accountant for the user and their "\
             f"investment plan based on their experience level ({data['experience']}). Speak in first-person, but refer to yourself as \"we\", not \"I\",  and refer to the "\
             f"user as 'you' to make it a more immersive experience for the user."

    response = client.chat.completions.create(
        messages = [
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="gpt-3.5-turbo"
    )

    advice = response.choices[0].message.content.strip()
    return jsonify({"advice": advice})


@app.route("/test-get-endpoint/<first_name>", methods=["GET"])
def test_endpoint(first_name=None):
    return jsonify(
        f"Hello {first_name}! This is a test get endpoint!"
    )

@app.route("/test-post-endpoint", methods=["POST"])
def test_post_endpoint():
    user = request.form['name']
    return jsonify(
        "Hello {user} This is a test post endpoint!"
    )


def lambda_handler(event, context):
    return awsgi.response(app, event, context, base64_content_types={"image/png"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
