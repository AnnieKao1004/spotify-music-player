export const getHashObjFromUrl = () => {
  const hashStr = window.location.hash.substring(1);
  let hashObj = {};

  if (hashStr) {
    hashObj = hashStr.split("&").reduce((acc, cur) => {
      const parameterSet = cur.split("=");
      acc[parameterSet[0]] = decodeURIComponent(parameterSet[1]);

      return acc;
    }, hashObj);
  }

  return hashObj;
};

export const getSpotify = async (
  token = "",
  endpoint = "",
  params = {},
  withBaseUrl = true
) => {
  const url = new URL(
    withBaseUrl ? `https://api.spotify.com/v1${endpoint}` : endpoint
  );
  url.search = new URLSearchParams(params);
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(url, {
    headers,
  });

  if (response.ok) {
    return await response.json();
  }
};

export const putSpotify = async (
  token,
  endpoint,
  body,
  params,
  withBaseUrl = true
) => {
  const url = new URL(
    withBaseUrl ? `https://api.spotify.com/v1${endpoint}` : endpoint
  );
  url.search = new URLSearchParams(params);
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body,
  });
  if (response.ok) {
    return await response.json();
  }
};
