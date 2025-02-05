export const handlefun = (isSuccess: boolean, isLink: boolean): any => {
  if (isSuccess) {
    return { message: "Login successful!" };
  } else {
    return { message: "Login failed!", redirect: "/gbutton" };
  }
};
