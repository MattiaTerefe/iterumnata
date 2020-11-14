import Head from "next/head";
import { Header } from "../public/header.jsx";
import { Footer } from "../public/footer.jsx";
import { Main } from "../public/main.jsx";
import { Side } from "../public/side.jsx";
import { Container } from "../public/container.jsx";
import { Logo } from "../public/logo.jsx";

export default function Home({ posts }) {
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
        <Main posts={posts} />
        <Side />
      </Container>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  let posts = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts"
  );
  posts = await posts.json();
  return {
    props: {
      posts: posts,
    },
  };
}
