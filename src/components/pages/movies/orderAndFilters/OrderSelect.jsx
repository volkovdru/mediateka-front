import {useDispatch, useSelector} from "react-redux";
import {selectOrder, selectOrders, setOrder} from "../../../../store/slices/moviesSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import React from "react";

const OrderSelect = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const order = useSelector(selectOrder);

    const handleOrderChange = (order) => {
        dispatch(setOrder(order));
    };

    const onChange = (value) => handleOrderChange(value)
    const value = order || 'Сортировка'

    return (
        <FormControl sx={{width: 200}}>

            <Select
                value={value || "Сортировка"}
                onChange={(e) => {
                    const selectedOrder = e.target.value;
                    onChange(selectedOrder || []);
                }}
                displayEmpty
                renderValue={(selected) => selected?.name || 'Сортировка'}
                variant="outlined"
            >
                {orders.map((order, index) => (
                    <MenuItem key={index} value={order}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            {order.name}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default OrderSelect;