import SideBar from "./shell/SideBar";

export default function DashboardLayoout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
        <SideBar />
      <main className="flex-1 overflow-x-auto w-full">
        {children}
        
      </main>
    </div>
  );
}
