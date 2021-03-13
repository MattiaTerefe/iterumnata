import Link from "next/link";

export const Categories = (props) => {
  return (
    <div className="cats">
      <h3>Archivio per categorie:</h3>
      <ul>
        {props.categories.map((el) => (
          <Link href={"/categorie/" + el.slug}>
            <a>
              <li>{el.name}</li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};
