import { useCallback, useEffect, useState } from "react";
import useAuthApi from "./useAuthApi";

const useFetch = (path) => {
  const { authFetch } = useAuthApi();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchData = useCallback(() => {
    let isCurrent = true;
    authFetch(`${process.env.REACT_APP_API_URL}${path}`)
      .then((data) => isCurrent && setData(data))
      .catch((error) => isCurrent && setError(String(error)));

    return () => (isCurrent = false);
  }, [path, authFetch]);

  const invalidate = () => {
    console.log("Error invalidate: "+error)
    console.log("Data invalidate: " + data)
      fetchData();

  };

  useEffect(() => {
    console.log("Error useeffect: "+error)
    console.log("Data useeffect: " + data)
  
    return fetchData();
  }, [fetchData]);

  const isLoading = !error && !data;
  return {
    isLoading,
    data,
    error,
    invalidate,
  };
};

export default useFetch;
