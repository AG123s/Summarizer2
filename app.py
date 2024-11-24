# Install required libraries first:
# pip install flask transformers gunicorn

from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load the summarization pipeline
summarizer = pipeline("summarization")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        # Get the input text from the form
        text = request.form["text"]
        if len(text.strip()) == 0:
            return jsonify({"error": "Text cannot be empty."})
        
        # Perform summarization
        summary = summarizer(text, max_length=100, min_length=30, do_sample=False)
        return jsonify({"summary": summary[0]['summary_text']})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
