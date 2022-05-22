import { LinkButton } from "~/components";

export default function Index() {
  return (
    <div className="stack gap-4">
      <div className="prose-config">
        <h1>Medeet</h1>
        <p>Medium + Twitter = Medeet</p>
      </div>

      <div className="button-group">
        <LinkButton to="/login" variant="outline">
          Login
        </LinkButton>
        <LinkButton to="/register">Register</LinkButton>
      </div>
    </div>
  );
}
