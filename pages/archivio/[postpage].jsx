import Head from "next/head";
import { Header } from "../../public/header.jsx";
import { Footer } from "../../public/footer.jsx";
import { Main } from "../../public/main.jsx";
import { Side } from "../../public/side.jsx";
import { Container } from "../../public/container.jsx";
import { Logo } from "../../public/logo.jsx";

export default function Postpage({ postList, categories }) {
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
        <Main posts={postList} />
        <Side categories={categories} />
      </Container>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  let offset = Number(params.postpage) * 10;
  const res = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?offset=" +
      offset.toString()
  );
  const data = await res.json();
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
  let categories = await getData("categories");

  return {
    props: {
      categories,
      postList: data,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let fetched = 0;
  let tot = 0;
  let pathsNumber = 0;
  do {
    const response = await fetch(
      "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?offset=" +
        fetched.toString()
    );
    tot = response.headers.get("x-wp-total");
    fetched += 10;
    pathsNumber++;
  } while (fetched < tot);
  let paths = Array.from({ length: pathsNumber }, (item, index) => index);
  paths = paths.map((el) => el.toString());
  paths = paths.map((el) => {
    return { params: { postpage: el } };
  });
  return {
    paths,
    fallback: false,
  };
}
