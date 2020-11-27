import { PostPreview } from "./postPreview.jsx";

export const Main = (props) => {
  const posts = props.posts.map((el) => (
    <PostPreview
      slug={el.slug}
      title={el.title.rendered}
      excerpt={el.excerpt.rendered}
    />
  ));

  return <main className="l-main">{posts}</main>;
};
