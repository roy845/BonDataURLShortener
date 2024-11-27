import TableHeaders from "./TableHeaders";

type DataTableProps<T> = {
  items: T[];
  headers: string[];
  numOfHeaders: number;
  renderRow: (item: T, index: number) => JSX.Element;
};

function DataTable<T>({
  items,
  headers,
  numOfHeaders,
  renderRow,
}: DataTableProps<T>): JSX.Element {
  return (
    <table className="min-w-full border rounded-lg shadow-md bg-white border-gray-200 text-gray-900">
      <thead>
        <TableHeaders numOfHeaders={numOfHeaders} labels={headers} />
      </thead>
      <tbody>{items.map(renderRow)}</tbody>
    </table>
  );
}

export default DataTable;
