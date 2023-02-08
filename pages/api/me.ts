import { validateRoute } from "../../lib/auth";

// use this call to get any required details for a user.
export default validateRoute(async (req, res, user) => {
  res.json({ ...user });
  // @todo do I need the below?
  res.end();
});

// Demo of how to add additional data to the user
/**
 * export default validateRoute(async (req, res, user) => {
  const playListsCount = await prisma.playlist.count({
    where: { userId: user.id },
  });

  const userDetails = await prisma.user.findUnique({
    where: { userId: user.id },
    select: { stockList: true, favouriteStock: true },
  });
  res.json({ ...user, playListsCount, userDetails });
  res.end();
});
*/
