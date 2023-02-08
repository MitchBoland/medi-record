import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const signout = () => {
  return fetcher(`/signout`);
};

export const signinAuth = (body: { email: string; password: string }) => {
  return fetcher(`/signin`, body);
};

export const signupAuth = (body: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return fetcher(`/signup`, body);
};
