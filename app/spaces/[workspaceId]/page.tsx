"use client";

import { redirect, useParams } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import GridLayout from "react-grid-layout";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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
        className="layout absolute"
        layout={layout}
        cols={4}
        rowHeight={30}
        width={1200}
        isResizable = {true}
      >
        <div key="a" style={{ background: '#FFFFFF', borderRadius: 5, textAlign: "center"}}>a</div>
        <div key="b" style={{ background: '#FFFFFF', borderRadius: 5, textAlign: "center" }}>b</div>
        <div key="c" style={{ background: '#FFFFFF', borderRadius: 5, textAlign: "center" }}>c</div>
      </GridLayout>
    );
  }
}

const WorkspacePage = () => {
  const { workspaceId } = useParams();
  const { user } = useUser(); 
  const workspaceMeta = useQuery(api.workspace.getWorkspaceById, { workspaceId: workspaceId.toString() });
  if (workspaceMeta && user?.id !== workspaceMeta?.creator?.userId && !workspaceMeta?.sharedUsers.includes(user?.id || 'user_0'
  )) {
    console.log(user?.id, workspaceMeta?.creator?.userId);
    return redirect('/');
  }

  return ( 
    <>
      <div className="absolute top-5 left-5">
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/spaces">{workspaceMeta?.creator?.name}&apos;s Spaces</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/spaces/${workspaceId}`}>{workspaceMeta?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
      </Breadcrumb>
      </div>
      <MyFirstGrid />
    </>
   );
}
 
export default WorkspacePage;