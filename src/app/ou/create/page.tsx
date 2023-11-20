import { CreateBoardForm } from "@/components/pages/CreateBoardForm";

export default function CreateBoard() {
    return (
        <div className="flex flex-col gap-12">
            <div>
                <h1 className="text-gold">Create Board</h1>

                <h4>Use this form to create a board</h4>
            </div>

            <CreateBoardForm />
        </div>
    );
}
