import styled from "styled-components";

const SliderContainer = styled.span`
  .svg-class {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
`;

function SvgIcon(props) {
  const { iconClass = "", fill = "", svgClass = "" } = props;
  return (
    <SliderContainer>
      <svg className={`svg-class ${svgClass}`} aria-hidden="true">
        <use xlinkHref={`#${iconClass}`} fill={fill}></use>
      </svg>
    </SliderContainer>
  );
}

export default SvgIcon;
