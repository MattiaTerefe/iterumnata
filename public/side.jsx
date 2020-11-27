import { Categories } from "./categories.jsx";

export const Side = (props) => (
  <aside className="l-side">
    <Categories categories={props.categories} />
  </aside>
);
