import { JSXElement } from "@typescript-eslint/types/dist/ast-spec";
import { ReactElement } from "react";

function GamingContentBorder(props : {
  name : string,
  subDescription : string,
  children : ReactElement<any, any>
}) {
  const {
    name,
    subDescription,
    children
  } = props;

  return (
    <>
      <div className="border-background-content mx-auto list-game-border">
        <div className="content-border position-relative">
          <div className="content-background">
            <div className="d-flex flex-column h-100">
              <div className="bg-head" />
              <div
                className="bg-body flex-fill"
                style={ { minHeight : "0" } } />
              <div className="bg-bottom" />
            </div>
          </div>

          <div className="content-body">
            <div className="py-4">
              { children }
            </div>
          </div>

          <div className="border-heading d-none d-xl-block">
            <div className="h4 mb-2">
              { name }
            </div>
            <div>
              { subDescription }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamingContentBorder;
