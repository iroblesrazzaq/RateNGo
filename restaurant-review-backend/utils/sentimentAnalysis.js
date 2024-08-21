// utils/sentimentAnalysis.js
const natural = require('natural');

const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

function analyzeSentiment(text) {
  const tokens = new natural.WordTokenizer().tokenize(text);
  return analyzer.getSentiment(tokens);
}

module.exports = analyzeSentiment;