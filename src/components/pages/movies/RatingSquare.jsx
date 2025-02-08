import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

function getColorFromGradient(value) {

    const colorStart = {r: 183, g: 28, b: 28}; // #b71c1c
    const colorMiddle = {r: 255, g: 235, b: 59}; // #ffeb3b
    const colorEnd = {r: 0, g: 200, b: 83}; // #00c853

    let r, g, b;

    if (value <= 5) {
        ({r, g, b} = colorStart);
    } else if (value <= 7) {
        const normalizedValue = (value - 5) / (7 - 5);
        r = Math.round(colorStart.r + (colorMiddle.r - colorStart.r) * normalizedValue);
        g = Math.round(colorStart.g + (colorMiddle.g - colorStart.g) * normalizedValue);
        b = Math.round(colorStart.b + (colorMiddle.b - colorStart.b) * normalizedValue);
    } else if (value <= 9) {
        const normalizedValue = (value - 7) / (10 - 7);
        r = Math.round(colorMiddle.r + (colorEnd.r - colorMiddle.r) * normalizedValue);
        g = Math.round(colorMiddle.g + (colorEnd.g - colorMiddle.g) * normalizedValue);
        b = Math.round(colorMiddle.b + (colorEnd.b - colorMiddle.b) * normalizedValue);
    } else {
        ({r, g, b} = colorEnd);
    }

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const RatingSquare = styled(Box)(({rating}) => {
    return {

        width: '30px',
        height: '30px',
        backgroundColor: `${getColorFromGradient(rating)}`,
        borderRadius: '6px 0 6px 0',
        position: 'absolute',
        top: '1px',
        left: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontWeight: 'bold',
    };
});

export default RatingSquare;