from flask import request, jsonify
from config import app, db
from models import Contact
import uuid

@app.route("/upload/audio", methods=["POST"])
def uploadAudio():

  # Get params
  audio_file = request.files.get('audio_data')
  if audio_file is None:
    return jsonify({"error": "No audio_data file provided"}), 400

  file_type = request.form.get("type", "mp3")
  
  # You may want to create a uuid for your filenames
  filename = f"{uuid.uuid4()}.{file_type}"
  
  # Save it on your local disk
  target_path = f"./audio/{filename}"
  audio_file.save(target_path)

  return jsonify({
    "message": "File uploaded successfully",
    "file_path": target_path
  }), 200

if __name__ == "__main__": 
    with app.app_context():
        db.create_all()
    app.run(debug=True, host="0.0.0.0", port=5000)