const updateItem = (updatedItem, items) => {
  const index = items.findIndex(({id}) => id === updatedItem.id);

  if (index === -1) {
    return items;
  }

  return [items.slice(0, index), updatedItem, items.slice(index + 1, items.length - 1)];
};

export { updateItem };
