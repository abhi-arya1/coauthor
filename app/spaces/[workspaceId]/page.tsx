"use client";

import { useParams } from "next/navigation";
import React from "react";

import GridLayout from "react-grid-layout";

class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2, minW: 2, maxW: 4, isResizable: true},
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 ,},
      { i: "c", x: 4, y: 0, w: 1, h: 2 },
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={4}
        rowHeight={30}
        width={1650}
        isResizable = {true}
      >
        <div key="a" style={{ background: '#092327', borderRadius: 5, textAlign: "center"}}>a</div>
        <div key="b" style={{ background: '#092327', borderRadius: 5, textAlign: "center" }}>b</div>
        <div key="c" style={{ background: '#092327', borderRadius: 5, textAlign: "center" }}>c</div>
      </GridLayout>
    );
  }
}

const WorkspacePage = () => {
  const { workspaceId } = useParams();
  return ( 
      <div>
          Hello World, we&apos;re at {workspaceId}
          <MyFirstGrid />
      </div>
   );
}
 
export default WorkspacePage;