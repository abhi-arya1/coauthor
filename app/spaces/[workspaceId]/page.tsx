"use client";

import { useParams } from "next/navigation";

const WorkspacePage = () => {
    const { workspaceId } = useParams();
    return ( 
        <div>
            Hello World, we&apos;re at {workspaceId}
        </div>
     );
}
 
export default WorkspacePage;