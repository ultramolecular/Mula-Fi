from flask import Flask, jsonify, request
from flask_cors import CORS
import re



app = Flask(__name__)
CORS(app)



# landing page route for the API
@app.route("/", methods=["GET"])
def home():
    return jsonify(
        "Welcome to the MulaFI backend"
    )


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
    app.run(debug=True)
