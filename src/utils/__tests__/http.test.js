import { CALL_API } from "redux-api-middleware";
import {
  BLOB_DATA,
  BODY_JSON,
  QUERY_PARAMS
} from "middleware/request";
import callApi, {
  getRequestUrl,
  getRequestTransport,
  defaultOptions,
  GET,
  HEAD,
  POST
} from "./../http";

const FAKE_REQUEST = "FAKE_REQUEST";
const FAKE_SUCCESS = "FAKE_SUCCESS";
const FAKE_FAILURE = "FAKE_FAILURE";

const FAKE_TYPES = [
  FAKE_REQUEST,
  FAKE_SUCCESS,
  FAKE_FAILURE
];

// const FAKE_ENDPOINT = "/test";
const FAKE_ENDPOINT2 = "http://test.com/test";

const FAKE_OPTIONS = {
  endpoint: FAKE_ENDPOINT2,
  method:   POST,
  types:    FAKE_TYPES,
  data:     { test: "test" }
};

describe("callApi()", () => {
  describe("getRequestUrl()", () => {
    it("should return external endpoint", () => {
      const endpoint = getRequestUrl(FAKE_ENDPOINT2);

      expect(endpoint).toBe(FAKE_ENDPOINT2);
    });
  });

  describe("getRequestTransport()", () => {
    it("should return default transport", () => {
      const transport = getRequestTransport(FAKE_OPTIONS);

      expect(transport).toBe(BODY_JSON);
    });

    it(`should return ${QUERY_PARAMS} transport`, () => {
      const transport = getRequestTransport({ ...FAKE_OPTIONS, method: GET });
      const transport2 = getRequestTransport({ ...FAKE_OPTIONS, method: HEAD });

      expect(transport).toBe(QUERY_PARAMS);
      expect(transport2).toBe(QUERY_PARAMS);
    });

    it(`should return ${BLOB_DATA} transport`, () => {
      const blob = new Blob(["test text"], { type: "text/plain" });
      const transport = getRequestTransport({ ...FAKE_OPTIONS, data: { blob } });

      expect(transport).toBe(BLOB_DATA);
    });
  });

  it("should return options", () => {
    const result = callApi(FAKE_OPTIONS);
    const { endpoint, ...rest } = FAKE_OPTIONS;

    expect(result).toEqual({
      [CALL_API]: {
        endpoint:  getRequestUrl(endpoint),
        ...defaultOptions,
        ...rest,
        TRANSPORT: getRequestTransport(FAKE_OPTIONS)
      }
    });
  });
});
