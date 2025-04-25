
import { SignedIn, SignedOut, SignOutButton, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <Button variant={"outline"}>
            Sign In 
          </Button>
        </SignInButton>
      </SignedOut>

      <UserButton />

      <SignedIn>
        <SignOutButton>
        <Button>
            Sign Out 
          </Button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
}
