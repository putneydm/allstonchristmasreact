const app = document.querySelector("#app");


const data = [
  {
    name: "Baked Salmon",
    ingredients: [
      { name: "Salmon", amount: 1, measurment: "l lb" },
      { name: "Pine Nuts", amount: 1, measurment: "cup" },
      { name: "Butter Lettuce", amount: 2, measurment: "cups" },
      { name: "Yellow Squash", amount: 1, measurment: "med" },
      { name: "Olive Oil", amount: 0.5, measurment: "cup" },
      { name: "Garlic", amount: 3, measurment: "cloves" },
    ],
    steps: [
      "Preheat the oven to 350 degrees.",
      "Spread the olive oil around a glass baking dish.",
      "Add the salmon, garlic, and pine nuts to the dish.",
      "Bake for 15 minutes.",
      "Add the yellow squash and put back in the oven for 30 mins.",
      "Remove from oven and let cool for 15 minutes. Add the lettuce and serve.",
    ] },
  {
    name: "Fish Tacos",
    ingredients: [
      { name: "Whitefish", amount: 1, measurment: "l lb" },
      { name: "Cheese", amount: 1, measurment: "cup" },
      { name: "Iceberg Lettuce", amount: 2, measurment: "cups" },
      { name: "Tomatoes", amount: 2, measurment: "large" },
      { name: "Tortillas", amount: 3, measurment: "med" },
    ],
    steps: [
      "Cook the fish on the grill until hot.",
      "Place the fish on the 3 tortillas.",
      "Top them with lettuce, tomatoes, and cheese.",
    ],
  },
];




const Instructions = ({ title, steps }) =>
<section className="instructions">
  <h2>{title}</h2>
  {steps.map((step, i) =>
    <p key={i}>{step}</p>
  )}
</section>

const Ingredient = ({amount, measurment, name}) =>
  <li>
    <span className="amount">{amount} </span>
    <span className="measurment">{measurment} </span>
    <span className="name">{name}</span>
  </li>

const IngredientsList = ({ list }) =>
  <ul className="ingredients">
    {list.map((ingredient, i) =>
      <Ingredient key={i} {...ingredient} />
  )}
  </ul>

const Summary = ({ list, listToo, title })  => {
  return <div>
    <h2>{title}</h2>
    <p className="summary">{list} Ingredients | {listToo} Steps</p>
  </div>
}

  Summary.propTypes = {
    list: React.PropTypes.number,
    listToo: React.PropTypes.number,
    title: React.PropTypes.string,
  }
  Summary.defaultProps = {
    list:26,
    listToo:34,
    title: "[title here]"
  }

const Recipe = ({ name, ingredients, steps }) =>
  <section id={name.toLowerCase().replace(/ /g, "-")}>
    <h1>{name}</h1>
    <Summary list={ingredients.length} listToo={steps.length} title="thing" />
    <IngredientsList list={ingredients} />
    <Instructions title="Cooking Instructions" steps={steps} />
</section>

const Menu = ({title, recipes}) =>
  <article>
    <header>
      <h1>{title}</h1>
    </header>
    <div className="recipes"> {
      recipes.map((recipe, i) =>
        <Recipe key={i} {...recipe} />
    )}
    </div>
  </article>

  // const Summary = ({ ingredients, steps, title }) => {
  //   return <div>
  //     <h1>{title}</h1>
  //     <p>{list} Ingredients | {els} Steps</p>
  //   </div>
  // }
  //   Summary.propTypes = {
  //     ingredients: React.PropTypes.number.isrequired,
  //     steps: React.PropTypes.number.isrequired,
  //   }
  //   Summary.defaultProps = {
  //     ingredients: 1,
  //     steps: 1,
  //  }

ReactDOM.render(
  <Menu recipes={data} title="Delicious Recipes" />, app
)

// const items = [
//   "1 lb Salmon",
//   "1 cup Pine Nuts",
//   "2 cups Butter Lettuce",
//   "1 Yellow Squash",
//   "1/2 cup Olive Oil",
//   "3 cloves of Garlic",
// ];


// const ingredientsList = ({items}) =>
//   React.createElement("ul", { className: "ingredients" },
//     items.map((ingredient, i) =>
//       React.createElement("li", { key: i }, ingredient)
//   )
// );
//
// const ingredients = React.createFactory(ingredientsList);
//
//
// ReactDOM.render(
//   ingredients({ items }), app);
