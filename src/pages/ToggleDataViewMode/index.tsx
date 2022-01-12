import React from 'react';
import {useCallback} from 'react';
import ToggleButton from "@mui/material/ToggleButton";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import {styled} from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {DATA_VIEW_MODE} from "../../constants";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    '& .MuiToggleButtonGroup-grouped': {
        marginBottom: theme.spacing(2),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

interface IProps{
    dataViewMode:string;
    setDataViewMode :   React.Dispatch<React.SetStateAction<string>>;
}
const ToggleDataViewMode:React.FC<IProps>=({dataViewMode, setDataViewMode})=> {
    const handleChangeViewMode =useCallback( (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setDataViewMode(nextView);
    },[setDataViewMode]);


    return (
        <StyledToggleButtonGroup
            size='small'
            orientation="horizontal"
            value={dataViewMode}
            exclusive
            onChange={handleChangeViewMode}
        >
            <ToggleButton value={DATA_VIEW_MODE.TABLE}
                          aria-label={DATA_VIEW_MODE.TABLE}
            data-testid='toggle-data-viewmode-table'
            >
                <ViewListIcon/>
            </ToggleButton>
            <ToggleButton value={DATA_VIEW_MODE.GRID}
                          aria-label={DATA_VIEW_MODE.GRID}
                          data-testid='toggle-data-viewmode-grid'
            >
                <ViewModuleIcon/>
            </ToggleButton>
        </StyledToggleButtonGroup>
    );
}

export default ToggleDataViewMode;
