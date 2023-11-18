import Sidebar from "@/components/Sidebar";
import SignOutButton from "@/components/SignOutButton";
import { CreateBoardForm } from "@/components/CreateBoardForm";

export default function Home() {
    return (
        <main className="w-full h-full flex flex-row bg-background">
            <Sidebar />

            <div className="mx-60 grow">
                <SignOutButton />

                <h1 className="text-2xl">Create board</h1>

                <CreateBoardForm />
            </div>
        </main>
    );
}
