import {useDispatch, useSelector} from "react-redux";
import {selectCountries, selectFilteredCountries, setCountriesFilter} from "../../../../store/slices/moviesSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, ListItemText} from "@mui/material";
import React from "react";

const CountrySelect = () => {
    const dispatch = useDispatch();
    const countries = useSelector(selectCountries);
    const filteredCountries = useSelector(selectFilteredCountries);

    const handleCountriesChange = (event) => {
        const filteredCountryIds = event.target.value;
        const filteredCountries = countries.filter((country) => filteredCountryIds.includes(country.id));
        dispatch(setCountriesFilter(filteredCountries));
    };

    return (
        <FormControl sx={{width: 300}}>

            <Select
                labelId="country-select-label"
                variant="outlined"
                multiple
                value={filteredCountries.map((g) => g.id)}
                onChange={handleCountriesChange}
                displayEmpty
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return "Выберите страны"
                    }
                    return selected.map((id) => countries.find((c) => c.id === id)?.name).join(', ');
                }}
                MenuProps={{
                    disableAutoFocusItem: true,
                    PaperProps: {
                        style: {
                            maxHeight: 300,
                        },
                    },
                }}
                inputProps={{
                    'aria-label': 'Страны',
                }}
                label="Страны"
            >
                {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                        <Checkbox checked={filteredCountries.some((g) => g.id === country.id)}/>
                        <ListItemText primary={country.name}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default CountrySelect;