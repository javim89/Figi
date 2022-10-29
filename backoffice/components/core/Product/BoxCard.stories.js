import React from 'react';

import BoxCard from "./BoxCard";

export default {
  title: "BoxCard",
  component: BoxCard,
};

const Template = (args) => <BoxCard {...args} />

export const BoxCardExample = Template.bind({})

BoxCardExample.args = {
  name: "Pollo a la barbacoa",
  price: 1233,
  description: "El mejor pollo a la barbacoa de la region",
  image: "https://picsum.photos/200",
};
