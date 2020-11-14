import Head from "next/head";
import { Header } from "../public/header.jsx";
import { Footer } from "../public/footer.jsx";
import { useEffect, useState } from "react";
import { Main } from "../public/main.jsx";
import { Side } from "../public/side.jsx";
import { Container } from "../public/container.jsx";
import { useRouter } from "next/router";
import { Logo } from "../public/logo.jsx";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  const { postpage } = router.query;

  useEffect(() => {
    const offset = Number(postpage) * 10 - 10;
    const endpoint =
      "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?offset=" +
      offset.toString();
    if (!loaded) {
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setPostList(data);
          setLoaded(true);
        });
    }
  });

  if (loaded) {
    return (
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Document</title>
        </Head>
        <Header>
          <Logo />
        </Header>
        <Container>
          <Main posts={postList} />
          <Side />*{postpage}
        </Container>
        <Footer />
      </>
    );
  } else {
    return <h1>PLEASE WAIT</h1>;
  }
}
/*
export async function getStaticProps() {
  let indexShift = parseInt(params.postpage) * 10 - 10;
  const response = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts?offset=" +
      indexShift.toString()
  );
  const posts = await response.json();


  const router = useRouter();
  const { postpage } = router.query;
  const response = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts?offset=" +
      postpage.toString()
  );
  const posts = await response.json();


  return {
    props: {
      posts,
    },
  };
}
 

export async function getStaticPaths() {
  const response = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts"
  );
  const tot = response.headers.get("x-wp-total");
  const pagesNumber = tot / 10;

  let links = [];
  for (let i = 0; i < pagesNumber; i++) {
    links.concat(i + 1);
  }

  return {
    paths: links.map((el) => {
      return {
        params: {
          postpage: el.toString(),
        },
      };
    }),
    fallback: false,
  };
}
 */
