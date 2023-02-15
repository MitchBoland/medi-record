import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, undefined, body);
};

export const signout = () => {
  return fetcher(`/signout`);
};

export const signinAuth = (body: { email: string; password: string }) => {
  return fetcher(`/signin`, undefined, body);
};

export const signupAuth = (body: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return fetcher(`/signup`, undefined, body);
};

export const searchCustomers = (body: { name: string }) => {
  return fetcher(`/customer`, "GET", body);
};

export const searchStaff = (body: {
  firstName: string;
  lastName: string;
  store: string;
}) => {
  return fetcher(`/staff`, "GET", body);
};
