import { useCallback } from "react";

const useMovie = () => {
  const apiUrl = "https://api.themoviedb.org/3";

  const sendRequest = useCallback(async (request, get = () => {}) => {
    try {
      const response = await fetch(`${apiUrl}${request}`);

      if (!response.ok) {
        throw new Error("Fail to connected");
      }

      const data = await response.json();
// hàm lấy giá trị data để xử lý cho các component
      get(data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return { sendRequest };
};

export default useMovie;
