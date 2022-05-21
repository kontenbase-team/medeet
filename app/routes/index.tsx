import { Link } from "@remix-run/react";
import { Button } from "@vechaiui/react";

export default function Index() {
  return (
    <div className="stack gap-4">
      <h1 className="text-3xl font-bold">Medeet</h1>
      <p>Medium + Twitter</p>
      <Link to="/posts">See All Posts</Link>

      <div className="button-group">
        <Button variant="solid" color="primary">
          Register
        </Button>
        <Button color="primary">Login</Button>
      </div>
    </div>
  );
}
