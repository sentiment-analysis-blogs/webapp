import flair
import sys
flair_sentiment = flair.models.TextClassifier.load('en-sentiment')
def senti_score(n):
    s = flair.data.Sentence(n)
    flair_sentiment.predict(s)
    value = s.labels[0].value
    score = s.labels[0].score
    return value,score