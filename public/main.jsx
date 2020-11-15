import { PostPreview } from "./postPreview.jsx";
import Link from "next/link";

export const Main = (props) => {
  const posts = props.posts.map((el) => (
    <PostPreview
      slug={el.slug}
      title={el.title.rendered}
      excerpt={el.excerpt.rendered}
    />
  ));

  return (
    <main className="l-main">
      {posts}
      <Link href="/page/1">
        <a>hey</a>
      </Link>
    </main>
  );
};
