import Sidebar from "@/components/Sidebar";
import { createBoard } from "@/actions/boards";
import SignOutButton from "@/components/SignOutButton";

export default function Home() {
    return (
        <main className="w-full h-full flex flex-row bg-background">
            <Sidebar />

            <div className="flex flex-col gap-2">
                <SignOutButton />

                <div className="flex flex-col gap-2">
                    <h1>Create board</h1>

                    <form className="flex flex-col text-text" action={createBoard}>
                        <input className="bg-white text-black" type="text" placeholder="Board name" name="boardName" />

                        <label htmlFor="profilePicture">Profile picture</label>
                        <input type="file" accept="image/png,image/jpeg" name="boardPicture" />

                        <input type="submit" value="Create" />
                    </form>
                </div>
            </div>
        </main>
    );
}
