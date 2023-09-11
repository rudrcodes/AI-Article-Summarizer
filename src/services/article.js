import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import env
const KEY = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", KEY);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleURL)}&length=4`,
    }),
  }),
});

// TODO:
//* encodeURIComponent is a JavaScript function that is used to encode a URI component by replacing certain characters with their respective percent-encoded equivalents. This function is commonly used when you need to include data in a URL as query parameters or when constructing URLs dynamically.

// * Keep in mind that encodeURIComponent encodes characters necessary to make a valid URI, such as reserved characters like ?, &, =, and non-alphanumeric characters. This function is useful to ensure that data passed in URLs is properly formatted and does not break the URL structure.









// This fires the hook immediatley at the start
// export const { useGetSummaryQuery } = articleApi;

// The "lazy" keyword allows us to fire the hook on demand
export const { useLazyGetSummaryQuery } = articleApi;
