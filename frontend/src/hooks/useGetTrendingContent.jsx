import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

function useGetTrendingContent() {
  const { contentType } = useContentStore(); //this will be used to get the content type
  const [trendingContent, setTrendingContent] = useState(null); //this will be used to store the trending content, it will be only one object because at backend we are sending only one object

  useEffect(() => {
    const fetchTrendingContent = async () => {
      // this will hit the backend to get the trending content based on the content type. Tv for tv and movie for movie
      const response = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(response.data.content); //content will be taken from the response
    };
    fetchTrendingContent();
  }, [contentType]); //when the content type changes, the useEffect will be called and the trending content at that moment will be fetched

  return { trendingContent };
}

export default useGetTrendingContent;
