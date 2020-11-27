import ReactHtmlParser from "react-html-parser";

export const SinglePost = (props) => {
  return (
    <main className="l-main">
      <article className="post">
        <h2>{ReactHtmlParser(props.post.title.rendered)}</h2>
        <p>{ReactHtmlParser(props.post.content.rendered)}</p>
      </article>
    </main>
  );
};
