import Head from "next/head";
import { Header } from "../../public/header.jsx";
import { Footer } from "../../public/footer.jsx";
import { Main } from "../../public/main.jsx";
import { Side } from "../../public/side.jsx";
import { Container } from "../../public/container.jsx";
import { Logo } from "../../public/logo.jsx";

export default function Postpage({ postList }) {
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
  let offset = Number(params.postpage) * 10;
  const res = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?offset=" +
      offset.toString()
  );
  const data = await res.json();
  return {
    props: {
      postList: data,
    },
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

/*const res = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/"
  );
  const data = await res.json();
  const tot = res.headers.get("x-wp-total");
  const paths = Math.ceil(tot / 10);
  */
