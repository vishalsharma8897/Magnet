import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading as true
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDataFromApi(url)
            .then((res) => {
                setData(res); // Set data when the request is successful
            })
            .catch((err) => {
                setError("Something went wrong!");
            })
            .finally(() => {
                setLoading(false); // Set loading to false after success or error
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
