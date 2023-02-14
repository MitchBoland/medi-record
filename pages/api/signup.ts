import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { firstName, lastName, email, password } = req.body;

  if (req.method === "POST") {
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, salt),
          userDetails: {
            create: {
              firstName,
              lastName,
            },
          },
        },
      });
    } catch (e) {
      res.status(401);
      res.json({ error: "User already exists" });
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      process.env.REACT_APP_SALT,
      { expiresIn: "8h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("MEDI_RECORD_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60, // 8 hours
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.json(user);
  } else {
    res.status(405);
    res.json({ error: "Wrong method used" });
  }
};
