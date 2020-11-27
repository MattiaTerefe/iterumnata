import Head from "next/head";
import { Header } from "../public/header.jsx";
import { Footer } from "../public/footer.jsx";
import { Main } from "../public/main.jsx";
import { Side } from "../public/side.jsx";
import { Container } from "../public/container.jsx";
import { Logo } from "../public/logo.jsx";

export default function Home({ posts, categories }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Iterum Nata</title>
      </Head>
      <Header>
        <Logo />
      </Header>
      <Container>
        <Main posts={posts} />
        <Side categories={categories} />
      </Container>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const getData = async (type) => {
    let fetched = 0;
    let tot = 0;
    let allElements = [];
    do {
      const response = await fetch(
        "https://iterumnata.000webhostapp.com/wp-json/wp/v2/" +
          type +
          "/?per_page=100&offset=" +
          fetched.toString()
      );
      tot = response.headers.get("x-wp-total");
      let data = await response.json();
      allElements = allElements.concat(data);
      fetched += 100;
    } while (fetched < tot);
    return allElements;
  };

  let posts = await getData("posts");
  let categories = await getData("categories");
  return {
    props: {
      categories,
      posts,
      revalidate: 1,
    },
  };
}
