import React from "react";

const NoContentPage = (props) => {
  return (
    <div className={`flex flex-col justify-center items-center ${props.noContentMainDiv}`}>
      {props.noContentImg && 
        <img className="h-[8.5rem]" src={props.noContentImg} height={props.height} width={props.width} alt="noContent"/>
      }

      <div className="py-[2%]">
        <p className={`text-center text-xl ${props.noContent1stText}`}>{props.text1}</p>
        <p className={`text-center text-sm ${props.noContent2ndText}`}>{props.text2}</p>
      </div>
    </div>
  );
}

export default NoContentPage;
