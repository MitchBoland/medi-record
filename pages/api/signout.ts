import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    /* remove cookies from request header */
    res.setHeader("Set-Cookie", [
      cookie.serialize("MEDI_RECORD_ACCESS_TOKEN", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);

    res.status(200);
    res.json({});
    res.end();
  } else {
    res.status(405);
    res.json({ error: "Wrong method used" });
  }
};
