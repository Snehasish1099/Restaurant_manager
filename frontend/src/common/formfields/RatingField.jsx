import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react'

const labels = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', };

const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const RatingField = (props) => {
    const [value, setValue] = useState(props.value);
    const [hover, setHover] = useState(-1);

    return (
        <Box
            sx={{
                // width: 168,
                display: 'flex',
                alignItems: 'center',
                color: "rgba(67, 67, 67, 0.6)",
            }}
            className={props.ratingCls}
        >

            <Rating
                name={props.name}
                value={props.value ? props.value : value}
                precision={props.precision}
                size={props.size}
                disabled={props.disabled}
                max={props.max}
                highlightSelectedOnly={false}
                getLabelText={getLabelText}
                onChange={props.onChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                readOnly={props.readOnly}
            />

            {(props.value || value !== null) && (
                <Box sx={{ ml: "3px", fontSize: 13, display: "flex", fontFamily: "Roboto-Regular", mt: "3px" }}>
                    <p className={`mr-1 text-xs text-black`}>{labels[hover !== 0 && hover]}</p>
                </Box>
            )}
        </Box>
    );
}


RatingField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    precision: PropTypes.number,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    max: PropTypes.string,
    highlightSelectedOnly: PropTypes.bool,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
};

export default RatingField