import { MacbookScroll } from "@/components/ui/macbook-scroll";


export default function LandingPage() {
  return (
    <div className="z-10 flex flex-col items-center justify-center">
        <span className="text-6xl z-10 font-mono">coauthor.ai</span>
        <MacbookScroll
            title={
                <span>
                  Your next research assistant.
                </span>
              }
            //   badge={
            //     <Link href="https://peerlist.io/manuarora">
            //       <Badge className="h-10 w-10 transform -rotate-12" />
            //     </Link>
            //   }
              src={`/coauth_peri.png`}
              showGradient={true}
        />
    </div>
  );
}
