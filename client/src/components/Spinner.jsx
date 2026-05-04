import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Spinner = ({ color }) => {
  return (
    <div className='flex justify-center my-auto mx-auto'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color={color}
        ariaLabel='ball-triangle-loading'
        visible={true}
      />
    </div>
  );
};

export default Spinner;
