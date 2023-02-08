import useSWR from "swr";
import fetcher from "./fetcher";
import { User } from "../components/types/types";

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);
  return {
    user: data as User,
    isLoading: !data && !error,
    isError: error,
  };
};
