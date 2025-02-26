import React from "react";

const NoContentPage = (props) => {
  return (
    <div className={`flex flex-col justify-center items-center ${props.noContentMainDiv}`}>
      {props.noContentImg && 
        <img src={props.noContentImg} height={props.height} width={props.width} alt="noContent"/>
      }

      <div className="py-3">
        <p className={`text-center text-xl font-[Roboto-Medium] ${props.noContent1stText}`}>{props.text1}</p>
        <p className={`text-center text-sm font-[Roboto-Regular] ${props.noContent2ndText}`}>{props.text2}</p>
      </div>
      <div className="py-3">{props.button}</div>
    </div>
  );
}

export default NoContentPage;
