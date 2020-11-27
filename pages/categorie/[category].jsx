import Head from "next/head";
import { Header } from "../../public/header.jsx";
import { Footer } from "../../public/footer.jsx";
import { Main } from "../../public/main.jsx";
import { Side } from "../../public/side.jsx";
import { Container } from "../../public/container.jsx";
import { Logo } from "../../public/logo.jsx";

export default function Postpage({ postList }) {
  console.log(postList);
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
        <Side />
      </Container>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
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
  let category = categories.find((el) => el.slug == params.category);
  posts = posts.filter((el) => el.categories[0] == category.id);

  return {
    props: {
      postList: posts,
    },
  };
}

export async function getStaticPaths() {
  let fetched = 0;
  let tot = 0;
  let allElements = [];
  do {
    const response = await fetch(
      "https://iterumnata.000webhostapp.com/wp-json/wp/v2/categories/?offset=" +
        fetched.toString()
    );
    tot = response.headers.get("x-wp-total");
    fetched += 10;
    let data = await response.json();
    allElements = allElements.concat(data);
  } while (fetched < tot);
  const paths = allElements.map((el) => {
    return { params: { category: el.slug } };
  });
  return {
    paths,
    fallback: false,
  };
}
