import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (req.method === "POST") {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
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
    } else {
      res.status(401);
      res.json({ error: "Email or Password is wrong" });
      return;
    }

    res.json(user);
  } else {
    res.status(405);
    res.json({ error: "Wrong method used" });
  }
};
