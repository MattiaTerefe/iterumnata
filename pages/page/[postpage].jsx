import Head from "next/head";
import { Header } from "../../public/header.jsx";
import { Footer } from "../../public/footer.jsx";
import { Main } from "../../public/main.jsx";
import { Side } from "../../public/side.jsx";
import { Container } from "../../public/container.jsx";
import { Logo } from "../../public/logo.jsx";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Postpage(props) {
  const [loaded, setLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { query } = router.query;
  useEffect(() => setUrl(window.location.href.slice(27)));
  if (!loaded) {
    const offset = Number(url) * 10 - 10;
    console.log(offset);
    const endpoint =
      "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?offset=" +
      offset.toString();
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setPostList(data);
        setLoaded(true);
      });
  }

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
