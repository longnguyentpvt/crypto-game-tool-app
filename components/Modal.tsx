import {
  ReactElement,
  useEffect,
  useState
} from "react";

function Modal(props: {
  show : boolean,
  close? : () => void,
  children : ReactElement | ReactElement[]
}) {
  const [
    modalShow,
    setModalShow
  ] = useState<boolean>(false);
  const [
    display,
    setDisplay
  ] = useState<boolean>(false);

  const {
    show,
    children
  } = props;

  useEffect(() => {
    if (show) {
      setDisplay(true);
      setTimeout(() => {
        setModalShow(true);
      }, 100);
    } else {
      setModalShow(false);
      setTimeout(() => {
        setDisplay(false);
      }, 150);
    }
  }, [
    show
  ]);

  return (
    <div
      className={ `modal fade${ modalShow ? " show" : "" }` }
      style={ { display : display ? " block" : "none" } }>
      <div
        className="modal-dialog">
        <div className="modal-content text-black">
          {
            children
          }
        </div>
      </div>
    </div>
  )
}

export default Modal;
