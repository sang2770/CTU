import { useEffect, useState } from "react";
import useDebounce from "../utils/debounce";

function useSearchDebounce(contentSearch: string, api:string) {
    const debouncedSearchTerm = useDebounce(contentSearch, 1000);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const trimmedTerm = debouncedSearchTerm.trim();
        if (trimmedTerm) {
            // Gọi API hoặc thực hiện tìm kiếm với debouncedSearchTerm
            console.log("Thực hiện tìm kiếm với từ khóa:", trimmedTerm);
            
            const fetchData = async () => {
                try {
                    // const response = await generalApi.get(`${api}=${trimmedTerm}`);
                    // setResults(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        } else {
            setResults([]); // Nếu từ khóa tìm kiếm chỉ có khoảng trắng, reset kết quả tìm kiếm
        }
    }, [debouncedSearchTerm]);

    return results
}

export default useSearchDebounce;