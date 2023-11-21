import { SignOutButton } from "@/components/ui/SignOutButton";

export default function Account() {
    return (
        <div>
            <div className="flex flex-col items-start gap-12">
                <h1 className="text-gold">Account</h1>

                <SignOutButton />
            </div>
        </div>
    );
}
