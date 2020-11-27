import next from "next";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

export const PostPreview = (props) => {
  return (
    <div className="post-preview">
      <Link href={"/articoli/" + props.slug}>
        <h2>{ReactHtmlParser(props.title)}</h2>
      </Link>
      <p>{ReactHtmlParser(props.excerpt)}</p>
    </div>
  );
};
