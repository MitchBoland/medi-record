import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

// use this call to get any required details for a user.
export default validateRoute(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      uuid: true,
      email: true,
      userDetails: {
        select: {
          firstName: true,
          lastName: true,
          store: true,
          role: true,
        },
      },
    },
    where: {
      OR: [
        {
          userDetails: {
            firstName: {
              startsWith: req.body.firstName,
              mode: "insensitive",
            },
          },
        },
        {
          userDetails: {
            lastName: {
              startsWith: req.body.lastName,
              mode: "insensitive",
            },
          },
        },
        {
          userDetails: {
            store: {
              startsWith: req.body.store,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });

  res.json({ users });
  res.end();
});
