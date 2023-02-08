interface UserDetails {
  stockList: string[];
  favouriteStock: string;
}

export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  playListsCount: number;
  userDetails: UserDetails;
};
