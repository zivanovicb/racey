import styled from "styled-components";
import theme from "../../../theme";

const Fraction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  padding: ${props => (props.index == 0 ? "20px 30px" : "20px 45px")};
  color: white;
  margin-right: 3px;
  .table-heading {
    color: ${theme.blue};
    font-size: 1.375rem;
    font-style: italic;
  }
`;

export default Fraction;
