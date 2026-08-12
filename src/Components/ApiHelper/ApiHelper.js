import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// Api Url's for the API's

// export const serverUrl = "https://chooseyourfabric.in/api/v1/";
export const serverUrl = "https://tailoringnew.fandf.in/api/v1/";

// main url :"https://a6a2-2401-4900-1c7b-b773-3400-1b5f-6411-9d4a.ngrok.io"
// export const serverUrl = "http://213.210.21.175:6789/api/v1/";
// Api's Function
export function PostData(url, data) {
  // body..
  //
  var headers = {
    "Content-Type": "application/json",
    "X-localization": "en",
    "allow-access-origin": "*",
  };
  return axios
    .post(serverUrl + url, data, { headers: headers })
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      //return error.data;
      //console.log(error.response);
      let errorStatus = JSON.parse(JSON.stringify(error.response));
      //console.log(errorStatus.data);
      return errorStatus;
    });
}

export const PostDataWithToken = (url, data) => {
  const cancelToken = axios.CancelToken.source();
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  var headers = {
    Authorization: "Bearer " + tokens,
    "Accept-Language": "en",
  };
  return axios
    .post(
      serverUrl + url,
      data,
      { headers: headers },
      { cancelToken: cancelToken.token }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        return errorStatus;
      }
    });
};



export const GetDataWithToken = (url, mainUrl) => {

  // const history = unstable_HistoryRouter();
  const cancelToken = axios.CancelToken.source();
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  let config = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Accept-Language": "en",
    },
    params: {},
  };
  return axios
    .get(mainUrl ? mainUrl : serverUrl + url, config, { cancelToken: cancelToken.token })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        console.log(errorStatus?.data?.message);
        if (errorStatus?.data?.message === "matching token failed") {
          window.location.href = "/";
        }
        return errorStatus;
      }
    });
};

export function PutDataWithToken(url, data) {
  const cancelToken = axios.CancelToken.source();
  // body..
  //
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + tokens,
    Accept: "application/json",
  };
  return axios
    .put(
      serverUrl + url,
      data,
      { headers: headers },
      { cancelToken: cancelToken.token }
    )
    .then((response) => {
      //console.log(res);
      //console.log(res.data);
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        return errorStatus;
      }
    });
}

export const DeleteDataWithToken = (url) => {
  const cancelToken = axios.CancelToken.source();
  let tokens = "";
  if (Cookies.get("FandFToken")) {
    tokens = Cookies.get("FandFToken");
  }
  let config = {
    headers: {
      Authorization: "Bearer " + tokens,
      "Accept-Language": "en",
    },
    params: {},
  };
  return axios
    .delete(serverUrl + url, config, { cancelToken: cancelToken.token })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        return errorStatus;
      }
    });
};

export const GetData = (url) => {
  let config = {
    headers: {
      "Accept-Language": "en",
    },
    params: {},
  };
  return axios
    .get(serverUrl + url, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        let errorStatus = JSON.parse(JSON.stringify(error.response));
        return errorStatus;
      }
    });
};

export const DownloadReportFunction = (url, setLoading, label, serverUrl) => {
  setLoading(true);
  axios({
    url: url || serverUrl,
    method: "GET",
    responseType: "blob", // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${label}.xls`); //or any other extension
    document.body.appendChild(link);
    link.click();
    setLoading(false);
  });
};