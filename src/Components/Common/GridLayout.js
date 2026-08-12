import React from "react";
import ArrowIcon from "./ArrowIcon";

// import "./GridLayout.css"; // Import CSS for styling

const GridLayout = ({ data }) => {
  const rows = 3;
  const columns = 3;

  return (
    <div className="d-flex justify-content-center gap-4">
      <div className="d-flex flex-column gap-2"
      // style={{ transform: "scaleX(-1)" }}
      >
        <div
          style={{ marginLeft: "70px", marginRight: "90px" }}
          className="d-flex justify-content-between">
          <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(180deg)" }} />
          <span>90 cm</span>
          <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" />
        </div>
        <div className="d-flex">
          {data?.curtain_operation?.operationType == "right" && <div className="d-flex flex-column justify-content-between align-items-center">
            <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(270deg)" }} width={80}
              height={60}
            />
            <span>90 cm</span>
            <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(90deg)" }}
              width={80}
              height={60}
            />
          </div>}
          {data?.curtain_operation?.operationType == "left" &&
            <>
              < div style={{ height: "100px", width: "1px", border: "1px solid black", margintop: "50px", position: "relative" }}>
                <div style={{ height: "24px", width: "24px", borderRadius: "50%", backgroundColor: "black", margintop: "50px", position: "absolute", right: "-12px", top: "80px" }}>
                </div>
                <div style={{ position: "absolute", right: "8px", top: "6px" }}>
                  <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(270deg)" }} width={50}
                    height={30}
                  />
                  <span className="my-4">{data?.blind_chain_length} cm</span>
                  <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(90deg)" }}
                    width={50}
                    height={30}
                  />
                </div>
              </div>
              <div style={{ height: "1px", width: "60px", border: "1px solid black", margintop: "50px" }}></div>
            </>
          }


          <div
            style={{ height: "200px", width: "200px", border: "2px solid black", margintop: "50px", position: "relative" }}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column mt-2">
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="orange" style={{ transform: "rotate(270deg)" }} width={50}
                  height={80}
                />
                <span className="my-2">{data?.blind_drop_left} cm</span>
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="orange" style={{ transform: "rotate(90deg)" }}
                  width={50}
                  height={30}
                />
              </div>
              <div className="d-flex flex-column mt-2">
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="orange" style={{ transform: "rotate(270deg)" }} width={50}
                  height={80}
                />
                <span className="my-2">{data?.blind_drop_middle} cm</span>
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="orange" style={{ transform: "rotate(90deg)" }}
                  width={50}
                  height={30}
                />
              </div>
              <div className="d-flex flex-column mt-2">
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="orange" style={{ transform: "rotate(270deg)" }} width={50}
                  height={80}
                />
                <span className="my-2">{data?.blind_drop_right} cm</span>
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="orange" style={{ transform: "rotate(90deg)" }}
                  width={50}
                  height={30}
                />
              </div>
            </div>
            <div
              style={{ marginLeft: "70px", marginRight: "90px", position: "absolute", top: "1px", left: "-60px" }}
              className="d-flex justify-content-between">
              <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(180deg)" }} />
              <span>{data?.blind_width_top} cm</span>
              <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" />
            </div>
            <div
              style={{ marginLeft: "70px", marginRight: "90px", position: "absolute", bottom: "50%", left: "-60px" }}
              className="d-flex justify-content-between">
              <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(180deg)" }} />
              <span>{data?.blind_width_middle} cm</span>
              <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" />
            </div>
            <div
              style={{ marginLeft: "70px", marginRight: "90px", position: "absolute", bottom: "1px", left: "-60px" }}
              className="d-flex justify-content-between">
              <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(180deg)" }} />
              <span>{data?.blind_width_bottom} cm</span>
              <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" />
            </div>
          </div>
          {data?.curtain_operation?.operationType == "right" && <>
            <div style={{ height: "1px", width: "60px", border: "1px solid black", margintop: "50px" }}></div>
            <div style={{ height: "100px", width: "1px", border: "1px solid black", margintop: "50px", position: "relative" }}>
              <div style={{ height: "24px", width: "24px", borderRadius: "50%", backgroundColor: "black", margintop: "50px", position: "absolute", right: "-12px", top: "80px" }}>
              </div>
              <div style={{ position: "absolute", right: "8px", top: "6px" }}>
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(270deg)" }} width={50}
                  height={30}
                />
                <span className="my-4">{data?.blind_chain_length} cm</span>
                <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(90deg)" }}
                  width={50}
                  height={30}
                />
              </div>
            </div>
          </>}
          {data?.curtain_operation?.operationType == "left" && <div className="d-flex flex-column justify-content-between align-items-center">
            <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(270deg)" }} width={80}
              height={60}
            />
            <span>90 cm</span>
            <ArrowIcon fromX={50} fromY={100} toX={300} toY={100} arrowWidth={5} color="black" style={{ transform: "rotate(90deg)" }}
              width={80}
              height={60}
            />
          </div>}
        </div>
      </div>
    </div >
  );
};

GridLayout.defaultProps = {
  cellSize: 90, // Default cell size in cm
  margin: 10,   // Default margin in cm
};

export default GridLayout;
