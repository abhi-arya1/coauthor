import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface BoxParams {
    page: Page, 
    workspaceId: string 
}

const WebBox = ({ page, workspaceId }: BoxParams) => {
    return ( 
        <Card className="w-[350px] p-2">
        <CardHeader>
        <CardTitle>{page.title}</CardTitle>
        <CardDescription className="overflow-hidden">{page.abstract}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
            <Button onClick={() => {window.open(page.url)}}>
                View Site
            </Button>
            <Button className="rounded-full p-2">
                <Star />
            </Button>
        </CardFooter>
        </Card> 
    );
}
 
export default WebBox;