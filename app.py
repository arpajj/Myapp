from flask import Flask, request, jsonify, render_template, send_from_directory
from transformers import BartForConditionalGeneration, BartTokenizer
import torch, os
import helper as help

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico')

# Load Vision-to-Caption model
predictor = help.Predictor()
vision_to_caption_model = predictor.setup("C:/Users/admitos/Desktop/ThesisUU/pretrained_models/MSCOCO/Transformer/dii_trG_rn-003.pt")
print("1) Vision-to-Caption Model Loaded Successfully!")

# Load Caption-to-Story model
# caption_to_story_model = BartForConditionalGeneration.from_pretrained('facebook/bart-large')
# tokenizer = BartTokenizer.from_pretrained('facebook/bart-large')
# caption_to_story_model.load_state_dict(torch.load('C:/Users/admitos/Desktop/ThesisUU/Phase_2/trained_models/BART/trained_bart_e9.pt', map_location=help.D))
# caption_to_story_model.eval()
# print("2) Caption-to-Story Model Loaded Successfully!")

@app.route('/generate-story', methods=['POST'])
def generate_story():
    if 'images' not in request.files:
        return jsonify({"error": "No images provided"}), 400

    # Process images
    images = request.files.getlist('images')
    story_captions = []
    for i, image in enumerate(images):
        img_path = f"./tmp/{image.filename}"
        if not os.path.exists('./tmp'):
            os.makedirs('./tmp')  # Create the tmp folder if it doesn't exist
        image.save(img_path)
        print(f"Calling prediction on step {i+1}")
        caption = predictor.predict(img_path, vision_to_caption_model, help.USE_BEAM_SEARCH)
        story_captions.append(caption)

    # Generate story
    input_text = ' </s> '.join(story_captions)
    torch.cuda.empty_cache()
    print(input_text)
    # input_ids = tokenizer(input_text, return_tensors="pt").input_ids
    # with torch.no_grad():
    #     summary_ids = caption_to_story_model.generate(input_ids.to(help.D), max_length=200, num_beams=1, early_stopping=False, do_sample=True, top_p=0.9) ### nucleus sampling
    #     #summary_ids = caption_to_story_model.generate(input_ids, max_length=200, top_p=0.9)
    #     story = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return jsonify({"story": input_text})
    #return jsonify({"story": input_text})

if __name__ == '__main__':
    #app.run(debug=True)
    #app.run(debug=False)
    app.run(host='0.0.0.0', port=5000, debug=False)
