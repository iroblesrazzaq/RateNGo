import React, { useState, useEffect } from 'react';
import natural from 'natural';
import aposToLexForm from 'apos-to-lex-form';
import SpellCorrector from 'spelling-corrector';
import stopword from 'stopword';

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

function RestaurantDashboard() {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ positive: [], negative: [] });

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      generateSummary();
    }
  }, [reviews]);

  const fetchReviews = () => {
    // Simulating API call
    setReviews([
      { id: 1, rating: 4, comment: 'Great food and excellent service!' },
      { id: 2, rating: 3, comment: 'Good food, but long wait times and noisy environment.' },
      { id: 3, rating: 5, comment: 'Amazing atmosphere and delicious dishes. Highly recommended!' },
      { id: 4, rating: 2, comment: 'Disappointing experience. Food was cold and staff was unfriendly.' },
    ]);
  };

  const preprocessText = (text) => {
    const lexedReview = aposToLexForm(text);
    const casedReview = lexedReview.toLowerCase();
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
    const filteredReview = stopword.removeStopwords(tokenizedReview);
    return filteredReview.map(word => spellCorrector.correct(word));
  };

  const analyzeSentiment = (review) => {
    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const preprocessedReview = preprocessText(review);
    return analyzer.getSentiment(preprocessedReview);
  };

  const generateSummary = () => {
    const positiveAspects = {};
    const negativeAspects = {};

    reviews.forEach(review => {
      const sentiment = analyzeSentiment(review.comment);
      const words = preprocessText(review.comment);

      words.forEach(word => {
        if (sentiment > 0) {
          positiveAspects[word] = (positiveAspects[word] || 0) + 1;
        } else if (sentiment < 0) {
          negativeAspects[word] = (negativeAspects[word] || 0) + 1;
        }
      });
    });

    const topPositive = Object.entries(positiveAspects)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);

    const topNegative = Object.entries(negativeAspects)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);

    setSummary({ positive: topPositive, negative: topNegative });
  };

  return (
    <div>
      <h2>Restaurant Dashboard</h2>
      <h3>Summary of Feedback:</h3>
      <div>
        <h4>Positive Aspects:</h4>
        <ul>
          {summary.positive.map((aspect, index) => (
            <li key={index}>{aspect}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Areas for Improvement:</h4>
        <ul>
          {summary.negative.map((aspect, index) => (
            <li key={index}>{aspect}</li>
          ))}
        </ul>
      </div>
      <h3>Recent Reviews:</h3>
      {reviews.map(review => (
        <div key={review.id}>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default RestaurantDashboard;