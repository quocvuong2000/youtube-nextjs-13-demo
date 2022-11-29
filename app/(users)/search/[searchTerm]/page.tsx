import React from "react";

type Props = {
  params: {
    searchTerm: string;
  };
};
type SearchResults = {
  organic_results: [
    {
      position: number;
      title: string;
      link: string;
      thumbnail: string;
      snipppet: string;
    }
  ];
};
const search = async (searchTerm: string) => {
  const res = await fetch(
    `https://serpapi.com/search.json?q=${searchTerm}&google_domain=google.com&api_key=${process.env.API_KEY}`
  );
  // throw new Error("Whoops")
  const data: SearchResults = await res.json();
  return data;
};
const SearchResults = async ({ params: { searchTerm } }: Props) => {
  const searchResults = await search(searchTerm);
  return (
    <div>
      <p className="text-gray-500 text-sm">You search for : {searchTerm}</p>
      <ol className="space-y-5 p-5">
        {searchResults.organic_results.map((result) => (
          <li className="list-decimal">
            <p className="font-bold">{result.title}</p>
            <p>{result.snipppet}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SearchResults;
