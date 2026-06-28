import { signOutAction } from "@/actions/content-actions";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="text-sm font-medium text-sand/80 transition-colors hover:text-white"
      >
        Sign out
      </button>
    </form>
  );
}
