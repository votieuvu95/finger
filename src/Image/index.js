import React, { useState, useEffect, memo } from "react";
import { Main } from "./styled";

export default memo((props) => {
  const { defaultImage, src } = props;
  
  return (
    <Main
      {...props}
      src={ src ? src : defaultImage}
    ></Main>
  );
})