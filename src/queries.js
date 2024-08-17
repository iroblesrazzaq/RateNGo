import { HttpError } from 'wasp/server'

export const getUser = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true
    }
  });

  if (!user) throw new HttpError(404, 'No user with id ' + id);

  return user;
}

export const getRestaurant = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const restaurant = await context.entities.Restaurant.findUnique({
    where: { id },
    include: { owner: true, Review: true, QRCode: true }
  });

  if (!restaurant) { throw new HttpError(404, 'No restaurant with id ' + id) }

  return restaurant;
}

export const getReviews = async ({ restaurantId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Review.findMany({
    where: { restaurantId },
    include: { user: true }
  });
}

export const getQRCode = async ({ restaurantId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const qrCode = await context.entities.QRCode.findUnique({
    where: { restaurantId },
    include: { restaurant: true }
  });

  if (!qrCode) { throw new HttpError(404, 'QR Code not found for restaurant with id ' + restaurantId) }

  return qrCode;
}