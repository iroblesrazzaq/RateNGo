import { createMocks } from 'node-mocks-http';
import handleReviews from './reviews';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    review: {
      create: jest.fn().mockResolvedValue({ id: 1, restaurantId: 1, foodRating: 4, serviceRating: 5, ambienceRating: 3, comments: 'Great!' }),
    },
  })),
}));

describe('/api/reviews', () => {
  it('creates a new review', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        restaurantId: 1,
        foodRating: 4,
        serviceRating: 5,
        ambienceRating: 3,
        comments: 'Great!',
      },
    });

    await handleReviews(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        restaurantId: 1,
        foodRating: 4,
        serviceRating: 5,
        ambienceRating: 3,
        comments: 'Great!',
      })
    );
  });

  it('returns 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handleReviews(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});