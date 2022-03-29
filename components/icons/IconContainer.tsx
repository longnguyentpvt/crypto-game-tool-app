function IconContainer(props : {
  viewBox : string,
  children : any,
  className? : string
}) {
  const {
    viewBox,
    children,
    className
  } = props;

  return (
    <svg
      className={ `sy-svg-icon${ className ? " " + className : "" }` }
      version="1.1"
      viewBox={ viewBox }
      xmlSpace="preserve">
      { children }
    </svg>
  )
}

export default IconContainer;
