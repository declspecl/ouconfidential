import Sidebar from "@/components/Sidebar";
import SignOutButton from "@/components/SignOutButton";

export default function Home() {
    return (
        <main className="bg-background">
            <Sidebar />

            <SignOutButton />
        </main>
    );
}
