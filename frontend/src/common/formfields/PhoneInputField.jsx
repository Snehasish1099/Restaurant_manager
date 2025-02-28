import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

const PhoneInputField = (props) => {

    /**
   * clickEnter for enter button
   * @param e
   */
    const clickEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // Do code here
            props.clickEnter();
        }
    };

    return (
        <PhoneInput
            country={props.defaultCountry}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder} 
            containerClass={props.extraCls}
            inputClass={props.inputCls}
            dropdownClass={props.dropDownCls}
            buttonClass={props.drpBtnCls}
            specialLabel={props.label}
            onKeyDown={clickEnter}
            enableSearch={props.enableSearch}
            searchClass={props.searchClass}
            name={props.phoneName}
            disabled={props.disabled}
            
        />
    )
}

export default PhoneInputField