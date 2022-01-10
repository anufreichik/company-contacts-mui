import {useEffect, useState} from "react";
import {IUser} from "../types/types";

export const useContacts = () => {
    const [data, setData] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getContacts = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=200');
                const result = await response.json();
               if (!response.ok) throw new Error(response.statusText);
                console.log(result.results)
                setData(result.results);
            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getContacts();
    }, []);

    return {data, isLoading, isError};
}
