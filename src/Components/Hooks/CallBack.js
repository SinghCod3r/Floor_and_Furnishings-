import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { serverUrl } from "../ApiHelper/ApiHelper";
import Cookies from "js-cookie";

const DefaultUrl = serverUrl;
const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: [],
    isLoading: true,
    error: false,
  });
  const cancelTokenSource = axios.CancelToken.source();

  const fecthData = useCallback(async () => {
    let tokens = "";
    if (Cookies.get("FandFToken")) {
      tokens = Cookies.get("FandFToken");
    }
    let config = {
      headers: {
        Authorization: "Bearer " + tokens,
        "Accept-Language": "en",
      },
    };
    try {
      const response = await axios.get(DefaultUrl + url, config, {
        cancelToken: cancelTokenSource.token,
      });

      const data = await response.data;
      if (data) {
        setFetchedData({
          data: data.results ? data.results : data.data,
          isLoading: false,
          error: false,
        });
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log("fetching data aborted");
      } else {
        console.log("error occured", e);
      }
      setFetchedData({
        data: [],
        isLoading: false,
        error: true,
      });
    }
  }, [url]);

  useEffect(() => {
    fecthData();
    // return () => cancelTokenSource.cancel();
  }, [url, fecthData]);
  const { data, isLoading, error } = fetchedData;
  return { data, isLoading, error };
};
export default useFetch;
