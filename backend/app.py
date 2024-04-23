from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
import re

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app)


# landing page route for the API
@app.route("/", methods=["GET"])
def home():
    return jsonify("Welcome to the MulaFI backend")


@app.route("/get-investment-feedback-novice", methods=["POST"])
def get_investment_feedback_novice():
    data = request.json
    prompt = (
        f"Assume that the user making this request is a novice in investing. Using that context and the following investment plan information, simulate results as if "
        f"the user actually put x% into stocks, y% into bonds, and z% into savings. The user has the "
        f"following goals: {data['goals']}, with an initial portfolio size of: ${data['portfolio_size']}, "
        f"can contribute ${data['monthly_contribution']} monthly.\nThe prospective investment plan the user "
        f"has chosen is the following: {data['stocks']}% stocks, {data['bonds']}% bonds, {data['savings']}% savings. "
        f"Simulate results for a 1-year period, 5-year period, and 10-year period using historic finance statistics, "
        f"and then provide useful feedback as if you were an actual professional accountant for the user and their "
        f"investment plan based on their experience level ({data['experience']}). Speak in first-person, but refer to yourself as \"we\", not \"I\",  and refer to the "
        f"user as 'you' to make it a more immersive experience for the user."
    )

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}], model="gpt-3.5-turbo"
    )

    advice = response.choices[0].message.content.strip()
    return jsonify({"advice": advice})


@app.route("/get-investment-feedback-intermediate", methods=["POST"])
def get_investment_feedback_intermediate():
    data = request.json
    prompt = (
        f"Assume that the user making this request is an intermediate level investor. Using that context and the simulate results as if "
        f"the user actually put x% into mutual funds, x% into individual stocks (assume that individual stocks are randomly selected from the top 10 traded stocks), "
        f"x% into bonds, and x% into savings. The user has the "
        f"following goals: {data['goals']}, with an initial portfolio size of: ${data['portfolio_size']}, "
        f"can contribute ${data['monthly_contribution']} monthly.\nThe prospective investment plan the user "
        f"has chosen is the following: {data['mutualFunds']}% mutualFunds, {data['individualStocks']}% individual stocks, {data['bonds']}% bonds, {data['savings']}% in savings(at a {data['interestRate']}% interest rate). "
        f"Simulate results for a 1-year period, 5-year period, and 10-year period using historic finance statistics, "
        f"and then provide useful feedback as if you were an actual professional accountant for the user and their "
        f"investment plan. Be sure to give specific advice, referring back to the percentages that the user inputted. Remember that the user is an intermediate investor - use language and terms that reflect that experience level. Speak in first-person, but refer to yourself as \"we\", not \"I\",  and refer to the "
        f"user as 'you' to make it a more immersive experience for the user."
    )

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}], model="gpt-3.5-turbo"
    )

    advice = response.choices[0].message.content.strip()
    return jsonify({"advice": advice})


@app.route("/get-investment-feedback-advanced", methods=["POST"])
def get_investment_feedback_advanced():
    data = request.json
    prompt = (
        f"Assume that the user making this request is an advanced investor. Using that context and the simulate results as if "
        f"the user actually put x% into mutual funds, x% into individual stocks (assume that individual stocks are randomly selected from the top 10 traded stocks). The user has the "
        f"x% into short term bonds (less than 5 years), x% into long terms bonds (greater than 5 years), x% into savings, x% into a long term CD (greater than 1 year) and x% into a short term CD (less than 1 year). The user has the"
        f"following goals: {data['goals']}, with an initial portfolio size of: ${data['portfolio_size']}, "
        f"can contribute ${data['monthly_contribution']} monthly.\nThe prospective investment plan the user "
        f"has chosen is the following: {data['mutualFunds']}% mutualFunds, {data['individualStocks']}% individual stocks, {data['shortTermBonds']}% short - term bonds, {data['longTermBonds']}% long - term bonds,"
        f"{data['savings']}% in savings(at a {data['interestRate']}% interest rate), {data['shortTermCD']}% short -term CD, {data['longTermCD']}% long - term CD. "
        f"Simulate results for a 1-year period, 5-year period, and 10-year period using historic finance statistics, "
        f"and then provide useful feedback as if you were an actual professional accountant for the user and their "
        f"investment plan. Be sure to give specific advice, referring back to the percentages that the user inputted. Remember that the user is an advanced investor - use language and terms that reflect that experience level.. Speak in first-person, but refer to yourself as \"we\", not \"I\",  and refer to the "
        f"user as 'you' to make it a more immersive experience for the user."
    )

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}], model="gpt-3.5-turbo"
    )

    advice = response.choices[0].message.content.strip()
    return jsonify({"advice": advice})


@app.route("/test-get-endpoint/<first_name>", methods=["GET"])
def test_endpoint(first_name=None):
    return jsonify(f"Hello {first_name}! This is a test get endpoint!")


@app.route("/test-post-endpoint", methods=["POST"])
def test_post_endpoint():
    user = request.form["name"]
    return jsonify("Hello {user} This is a test post endpoint!")


def lambda_handler(event, context):
    return awsgi.response(app, event, context, base64_content_types={"image/png"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
