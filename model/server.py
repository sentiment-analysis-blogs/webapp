from flask import Flask,jsonify
from fn import senti_score
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/api/analyze/<path:text>')

@cross_origin()

def analyze(text):
    value,score = senti_score(text)
    return jsonify({'Sentiment' : value, 'Score' : score , 'message': text}) 

if __name__=='__main__':
    app.run(debug=True, use_reloader=False)