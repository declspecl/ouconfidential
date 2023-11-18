import Sidebar from "@/components/Sidebar";
import SignOutButton from "@/components/SignOutButton";
import { CreateBoardForm } from "@/components/CreateBoardForm";

export default function Home() {
    return (
        <main className="w-full h-full flex flex-row bg-background">
            <Sidebar />

            <div className="flex flex-col gap-2">
                <SignOutButton />

                <div className="flex flex-col gap-2">
                    <h1>Create board</h1>

                    <CreateBoardForm />
                </div>
            </div>
        </main>
    );
}
