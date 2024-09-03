import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { restaurantId, foodRating, serviceRating, ambienceRating, comments } = req.body;
    
    try {
      // Validate input
      if (!restaurantId || !foodRating || !serviceRating || !ambienceRating) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      if (![foodRating, serviceRating, ambienceRating].every(rating => rating >= 1 && rating <= 5)) {
        return res.status(400).json({ message: 'Ratings must be between 1 and 5' });
      }

      if (comments && comments.length > 500) {
        return res.status(400).json({ message: 'Comments must be less than 500 characters' });
      }

      const review = await prisma.review.create({
        data: {
          restaurantId: parseInt(restaurantId),
          foodRating: parseInt(foodRating),
          serviceRating: parseInt(serviceRating),
          ambienceRating: parseInt(ambienceRating),
          comments: comments || null
        },
      });
      res.status(201).json(review);
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ message: 'Unable to submit review. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}