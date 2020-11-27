import next from "next";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

export const PostPreview = (props) => {
  return (
    <div className="post-preview">
      <Link href={"/articolo/" + props.slug}>
        <h2 className="post-link">{ReactHtmlParser(props.title)}</h2>
      </Link>
      <p>{ReactHtmlParser(props.excerpt)}</p>
    </div>
  );
};
