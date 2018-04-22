import styled from "styled-components";

const FractionImg = styled.img`
  width: 52px;
  height: 28px;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.shown ? "1" : "0")};
  @media screen and (max-width: 1200px) {
    width: 62px;
    height: 43px;
  }
`;

export default FractionImg;
