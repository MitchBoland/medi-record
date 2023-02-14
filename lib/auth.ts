// helpers used to help with authentication
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { MEDI_RECORD_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, process.env.REACT_APP_SALT);
        user = await prisma.user.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            userDetails: {
              select: {
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        });

        if (!user) {
          throw new Error("Not Valid User");
        }
      } catch (e) {
        res.status(401);
        res.json({ error: "Not Authorised" });
        return;
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorised" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, process.env.REACT_APP_SALT);
  return user;
};
