export const handleError = (error, dispatch, toast) => {
  console.error(error);

  const message = error.response?.data?.message || "Something went wrong";

  toast.error(message);

  dispatch(setError(message));
};
