const data = [
  {
    id: 0,
    text: "First",
    tags: ["Work"],
  },
  {
    id: 1,
    text: "Second",
    tags: ["Home"],
  },
  {
    id: 2,
    text: "Third",
    tags: [],
  },
];

function filterByText(item, filter) {
  return filter.text
    ? item.text.toLowerCase().includes(filter.text.toLowerCase())
    : true;
}

function filterByTag(item, filter) {
  return filter.tags
    ? filter.tags.every((tag) => item.tags.includes(tag))
    : true;
}

function filterItems(items, filter) {
  return items.filter(
    (item) => filterByText(item, filter) && filterByTag(item, filter)
  );
}

function removeItem(items, itemId) {
    const index = items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
    }
}

function changeElement(items, newItem) {
    const index = items.findIndex((item) => item.id === newItem.id);
    if (index === -1) {
        throw new Error('Вы пытаетесь изменить несуществующий элемент');
    }
    items[index] = newItem;
}