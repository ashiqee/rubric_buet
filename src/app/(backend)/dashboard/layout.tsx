import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { RubricNavbar } from "@/components/RubricNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex flex-col flex-1 h-full  overflow-auto">
          <div >
            <RubricNavbar />
            <div className="border-l flex-1 border-b overflow-y-auto h-[87vh] p-5  border-t rounded-l-lg">

            {children}
            </div>
          </div>

          <footer className="w-full  flex items-center justify-center py-3">
            <Link
              className="flex items-center gap-1 text-current"
              href="#"
              title="heroui.com homepage"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">BUET</p>
            </Link>
          </footer>
        </main>
      </div>
   
  );
}
