import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 500) => {
    const [debounceValue, setDebounceValue] = useState<T>(value)
    useEffect(() => {
        const cleanValue = value.toString().trim();
        if (cleanValue === "") {
            setDebounceValue(value); // Nếu giá trị chỉ có khoảng trắng, không thực hiện debounce
            return;
        }
        const timer = setTimeout(() => setDebounceValue(value), delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])
    return debounceValue
}

export default useDebounce;