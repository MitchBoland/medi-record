import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

// use this call to get any required details for a user.
export default validateRoute(async (req, res) => {
  const customers = await prisma.customer.findMany({
    select: {
      firstName: true,
      lastName: true,
      email: true,
      uuid: true,
      address: true,
      prescriptions: true,
      comments: true,
      phone: true,
    },
    where: {
      OR: [
        {
          firstName: {
            startsWith: req.body.name,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            startsWith: req.body.name,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  res.json({ customers });
  res.end();
});
