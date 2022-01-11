import React, {useEffect, useState} from "react";
import {DATA_VIEW_MODE} from "../constants";

const getInitialDataViewMode = () => {
    return localStorage.getItem('dataViewMode') || DATA_VIEW_MODE.TABLE;
}
export const useDataViewMode=(): [string, React.Dispatch<React.SetStateAction<string>>]=>{
    const [dataViewMode, setDataViewMode] = useState<string>(getInitialDataViewMode());
    useEffect(() => {
        localStorage.setItem('dataViewMode', dataViewMode);
    }, [dataViewMode]);
return [dataViewMode, setDataViewMode];
}

