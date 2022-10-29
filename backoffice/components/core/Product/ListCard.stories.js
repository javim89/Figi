import ListCard from "./ListCard";

export default {
  title: "ListCard",
  component: ListCard,
};

const Template = (args) => <ListCard {...args} />

export const ListCardExample = Template.bind({})

ListCardExample.args = {
  name: "Pollo a la barbacoa",
  price: 1233,
  description: "El mejor pollo a la barbacoa de la region",
  image: "https://picsum.photos/200",
};
