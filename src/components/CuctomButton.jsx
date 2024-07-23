import React from "react";

const CustomButton =({title,containerStyles, iconRight,type,onClick})=>{
    return(
        <button
          onclick={onClick}
          type={type || "button"}
          className={`inline-flex items-center ${contanierStyles}`}>
            {title}
            {iconRight && <div className="ml-2">{iconRight}</div>}
          </button>
    );
};

export default CustomButton;