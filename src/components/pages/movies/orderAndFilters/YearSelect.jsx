import {useDispatch, useSelector} from "react-redux";
import {selectFilters, setYearsFilter} from "../../../../store/slices/moviesSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import React from "react";

const YearSelect = () => {

    function getValue(year) {
        if (Array.isArray(year)) {
            return `${Math.min(...year)} - ${Math.max(...year)}`;
        }
        return year.toString(); // Всегда возвращаем строку
    }

    let years = [];

    years.push({
        name: "Выберите год",
        value: []
    });

    // Генерация списка годов
    for (let year = 2025; year >= 1910; year--) {
        if (year % 10 === 0 && year !== 2029) {
            let ar = [];
            for (let i = 1; i <= 10; i++) {
                ar.push(year - i);
            }
            years.push({
                name: getValue(ar),
                value: ar
            });
        } else if (year >= 2020) {
            years.push({
                name: year.toString(),
                value: [year]
            });
        }
    }

    const dispatch = useDispatch();

    const filters = useSelector(selectFilters);

    const handleYearsFilterChange = (value) => {
        dispatch(setYearsFilter(value)); // value - это массив
    };

    const value = filters.years || {name: "Выберите год", value: []}
    const onChange = (value) => handleYearsFilterChange(value)

    return (
        <FormControl sx={{minWidth: 120}}>
            <Select
                value={value?.name || "Выберите год"}
                onChange={(e) => {
                    const selectedYear = years.find((year) => year.name === e.target.value);
                    onChange(selectedYear || []);
                }}
                displayEmpty
                renderValue={(selected) => selected}
                variant="outlined"
            >
                {years.map((year, index) => (
                    <MenuItem key={index} value={year.name}> {/* Используем name как значение */}
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            {year.name}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default YearSelect;