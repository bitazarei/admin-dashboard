import SideBar from "./shell/SideBar";

export default function DashboardLayoout({
    children,
}: {
    children: React.ReactNode;
}) {
    return(
        <div className="flex">
            <SideBar />
            <main>{children}</main>
        </div>
    )
}