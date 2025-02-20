import React from 'react';
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {resetFilters} from "../../../../store/slices/moviesSlice";

const ResetFilterButton = () => {

    const dispatch = useDispatch();

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <Button variant="outlined" onClick={handleResetFilters}>
            Сбросить фильтр
        </Button>
    );
};

export default ResetFilterButton;