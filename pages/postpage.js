/*import Head from "next/head";
import { Header } from "../public/header.jsx";
import { Footer } from "../public/footer.jsx";
import { Main } from "../public/main.jsx";
import { Side } from "../public/side.jsx";
import { Container } from "../public/container.jsx";
import { Logo } from "../public/logo.jsx";
import { useRouter } from "next/router";

export default function Postpag({ page, postList }) {
  const router = useRouter();
  const { postpage } = router.query;
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

/*
export async function getStaticProps({ params }) {
  const offset = Number(params.postpage) * 10 - 10;
  const res = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?offset=" + offset
  );
  const postList = await res.json();

  return {
    props: {
      page: params.postpage,
      postList,
    },
  };
}

export async function getStaticPaths() {
  let links = [];
  const response = await fetch(
    "https://iterumnata.000webhostapp.com/wp-json/wp/v2/posts/?per_page=1"
  );
  const pagesNumber = Math.ceil(response.headers.get("x-wp-total") / 10);
  for (let i = 0; i < pagesNumber; i++) {
    links.concat(i + 1);
  }
  console.log(links);

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
