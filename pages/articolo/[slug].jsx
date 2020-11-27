import Head from "next/head";
import { Header } from "../../public/header.jsx";
import { Footer } from "../../public/footer.jsx";
import { Main } from "../../public/main.jsx";
import { Side } from "../../public/side.jsx";
import { Container } from "../../public/container.jsx";
import { Logo } from "../../public/logo.jsx";
import { SinglePost } from "../../public/post.jsx";

export default function Post({ post, categories }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </Head>
      <Header>
        <Logo />
      </Header>
      <Container>
        <SinglePost post={post} />
        <Side categories={categories} />
      </Container>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  let fetched = 0;
  let tot = 0;
  let posts = [];
  do {
    const response = await fetch(
      "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?per_page=100&offset=" +
        fetched.toString()
    );
    tot = response.headers.get("x-wp-total");
    let data = await response.json();
    posts = posts.concat(data);
    fetched += 100;
  } while (fetched < tot);
  posts = posts.map((el) => {
    return {
      params: {
        slug: el.slug,
      },
    };
  });

  return {
    paths: posts,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const getData = async (type) => {
    let fetched = 0;
    let tot = 0;
    let posts = [];
    do {
      const response = await fetch(
        "https://iterumnata.000webhostapp.com/wp-json/wp/v2/" +
          type +
          "/?per_page=100&offset=" +
          fetched.toString()
      );
      tot = response.headers.get("x-wp-total");
      let data = await response.json();
      posts = posts.concat(data);
      fetched += 100;
    } while (fetched < tot);
    return posts;
  };

  let posts = await getData("posts");
  let categories = await getData("categories");
  // let pages = await getData("pages");
  //let users = await getData("users")
  //let tags = await getData("tags")

  return {
    props: {
      categories,
      post: posts.find((el) => el.slug == params.slug),
    },
  };
}
