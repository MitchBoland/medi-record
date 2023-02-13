import { validateRoute } from "../../lib/auth";

// use this call to get any required details for a user.
export default validateRoute(async (req, res, user) => {
  res.json({ ...user });
  // @todo do I need the below?
  res.end();
});
