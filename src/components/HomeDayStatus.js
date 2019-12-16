import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

const BalloonTriangle = styled.View`
  width: 0;
  height: 0;
  border-left-color: transparent;
  border-left-width: 15;
  border-bottom-width: 15;
  border-bottom-color: #ededed;
  border-right-width: 15;
  border-right-color: transparent;
`;
const BalloonArea = styled.View`
  width: 90%;
  padding: 20%;
  background-color: #ededed;
  border-radius: 10px;
  min-height: 100px;
`;

export default props => {
  return (
    <>
      <BalloonTriangle></BalloonTriangle>
      <BalloonArea></BalloonArea>
    </>
  );
};
