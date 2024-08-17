import { HttpError } from 'wasp/server'

export const createReview = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Review.create({
    data: {
      restaurantId: args.restaurantId,
      userId: context.user.id,
      ratings: args.ratings,
      comments: args.comments
    }
  });
}

export const createRestaurant = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Restaurant.create({
    data: {
      name: args.name,
      description: args.description,
      cuisineType: args.cuisineType,
      ownerId: context.user.id
    }
  });
}

export const generateQRCode = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const restaurant = await context.entities.Restaurant.findUnique({
    where: { id: args.restaurantId },
    include: { QRCode: true }
  });

  if (!restaurant) { throw new HttpError(404, 'Restaurant not found') };

  const newQRCode = await context.entities.QRCode.create({
    data: {
      restaurantId: args.restaurantId,
      code: generateUniqueCode(),
      expirationDate: calculateExpirationDate()
    }
  });

  return newQRCode;
}