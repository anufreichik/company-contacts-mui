import {useEffect, useState} from "react";
import {IUser} from "../types/types";

export const useContacts = () => {
    const [data, setData] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let isMounted=true;
        const getContacts = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=10');
                const result = await response.json();
               if (!response.ok) throw new Error(response.statusText);
                if(isMounted) setData(result.results);
            } catch (e) {
                if(isMounted) setIsError(true);
            } finally {
                if(isMounted) setIsLoading(false);
            }
        }
        getContacts();
        return ()=>{
            isMounted=false;
        }
    }, []);

    return {data, isLoading, isError};
}
