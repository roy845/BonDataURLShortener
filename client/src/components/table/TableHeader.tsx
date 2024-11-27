type TableHeaderProps = {
  label: string;
};

const TableHeader = ({ label }: TableHeaderProps): JSX.Element => {
  return (
    <th className="py-2 px-4 text-center font-semibold text-gray-700">
      {label}
    </th>
  );
};

export default TableHeader;
