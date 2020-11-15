import Head from "next/head";
import { Header } from "../public/header.jsx";
import { Footer } from "../public/footer.jsx";
import { useEffect, useState } from "react";
import { Main } from "../public/main.jsx";
import { Side } from "../public/side.jsx";
import { Container } from "../public/container.jsx";
import { useRouter } from "next/router";
import { Logo } from "../public/logo.jsx";
import Link from "next/link";

export default function Home({ pages }) {
  const router = useRouter();
  const { postpage } = router.query;
  const [loaded, setLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const offset = Number(postpage) * 10 - 10;
    const endpoint =
      "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?offset=" +
      offset.toString();
    console.log(endpoint);
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

          <Side />
        </Container>
        <Footer />
      </>
    );
  } else {
    return <h1>PLEASE WAIT</h1>;
  }
}
