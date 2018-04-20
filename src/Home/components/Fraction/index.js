import styled from "styled-components";
import theme from "../../../theme";

const Fraction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  padding: ${props =>
    props.index === 0
      ? props.isCar
        ? "17px 10px"
        : "20px 30px"
      : props.isCar
        ? "20px 29px"
        : "20px 45px"};
  color: white;
  margin-right: 3px;
  margin-bottom: 5px;
  .table-heading {
    color: ${theme.blue};
    font-size: 1.375rem;
    font-style: italic;
  }
`;

export default Fraction;
