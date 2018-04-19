import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../../theme";
import puntoImg from "../../img/punto.png";
import hondaImg from "../../img/honda.png";
import smartImg from "../../img/smart.png";
import mazdaImg from "../../img/mazda.png";
import benzImg from "../../img/benz.png";
import speedometerIcon from "../../img/speedometer.svg";

const CarWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 210px;
  overflow: hidden;
  background: ${theme.midGrey};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

const CarNum = styled.span`
  position: absolute;
  top: 15px;
  left: 25px;
  color: ${theme.blue};
  font-size: 2.3125rem;
`;

const CarImg = styled.img`
  max-width: 100%;
`;

const images = {
  "1": {
    src: puntoImg,
    style: {
      width: "257px",
      height: "135px"
    }
  },
  "2": {
    src: benzImg,
    style: {
      width: "249px",
      height: "150px"
    }
  },
  "3": {
    src: hondaImg,
    style: {
      width: "192px",
      height: "112px"
    }
  },
  "4": {
    src: mazdaImg,
    style: {
      width: "241px",
      height: "126px"
    }
  },
  "5": {
    src: smartImg,
    style: {
      width: "192px",
      height: "136px"
    }
  }
};
const CarBottomBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  span {
    font-size: 1.1rem;
    letter-spacing: 1px;
    color: white;
  }
`;

const CarTopSpeed = styled.div`
  display: flex;
  span {
    color: ${theme.blue};
  }
  #topspeed-icon {
    width: 29px;
    height: 19px;
    background: url(${speedometerIcon}) no-repeat;
    background-size: cover;
    background-position: center center;
  }
`;
function Car({ image, name, description, id, speed, style }) {
  console.log(id, name);
  return (
    <CarWrapper style={style}>
      <CarNum>#{id}</CarNum>
      <CarImg src={images[id].src} />
      <CarBottomBar>
        <span>{name}</span>

        <CarTopSpeed>
          <div id="topspeed-icon" style={{ marginRight: "10px" }} />
          <span>{speed}</span>
        </CarTopSpeed>
      </CarBottomBar>
    </CarWrapper>
  );
}

Car.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  style: PropTypes.object
};

export default Car;
