// @flow

import { CALL_API } from "redux-api-middleware";

export const QUERY_PARAMS = "QUERY_PARAMS";
export const BODY_JSON = "BODY_JSON";
export const BLOB_DATA = "BLOB_DATA";

export type CallApiOptions = {
  endpoint: string,
  method: string,
  headers?: any,
  data?: Object
}

type Action = any;
type Options = {
  [keys: string]: any
};

type Transport = {
  [keys: string]: Function
}

export const hasQuery = (url: string): boolean => url.includes("?");

export const queryString = (object: {[keys: string]: any} = {}) => (Object.keys(object).length
  ? `?${Object.keys(object).map(key => [key, object[key]].map(encodeURIComponent).join("=")).join("&")}` : "");

export const TRANSPORTS = {
  [QUERY_PARAMS]: (options: Options) => {
    const { endpoint, data, ...rest } = options;
    const query = queryString(data);

    return {
      ...rest,
      endpoint: endpoint + (!hasQuery(endpoint) ? query
        : query && `&${query.slice(1, query.length)}`)
    };
  },
  [BODY_JSON]: (options: Options) => {
    const { headers, data, ...rest } = options;

    return {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify({ ...data })
    };
  },
  [BLOB_DATA]: (options: Options) => {
    let blob = new FormData();
    const { data, ...rest } = options;
    const body = { ...data };

    return {
      ...rest,
      body: Object.keys(body).forEach((field) => {
        blob = body[field] instanceof Blob
          ? blob.append(field, body[field], body[field].name)
          : blob.append(`data[${field}]`, body[field]);
      })
    };
  }
};

export const configureMiddleware = (transports: Transport) => () => (next: Dispatch<*>) => (action: Action) => {
  const options = action[CALL_API];

  if (options && options.TRANSPORT) {
    const result = transports[options.TRANSPORT](options);
    if (result) {
      action[CALL_API] = result;
    }

    delete action[CALL_API].TRANSPORT;
  }
  return next(action);
};

export default configureMiddleware(TRANSPORTS);
