type Props<ItemType> = {
  items: ItemType[];
  renderRow: (item: ItemType) => React.ReactNode;
  renderEmpty: () => React.ReactNode;
};

export function TableBody<ItemType extends object>({
  items,
  renderRow,
  renderEmpty,
}: Props<ItemType>) {
  if (items.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={100}>{renderEmpty()}</td>
        </tr>
      </tbody>
    );
  }

  return <tbody>{items.map(renderRow)}</tbody>;
}
