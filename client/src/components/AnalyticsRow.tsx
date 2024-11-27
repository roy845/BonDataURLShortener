type AnalyticsRowProps = {
  field: string;
  value: string | number | undefined;
  isEven: boolean;
};

const AnalyticsRow = ({
  field,
  value,
  isEven,
}: AnalyticsRowProps): JSX.Element => (
  <tr className={isEven ? "bg-white" : "bg-gray-100"}>
    <td className="border border-gray-300 px-4 py-2 text-center">{field}</td>
    <td className="border border-gray-300 px-4 py-2 truncate max-w-xs text-center">
      {field === "Original URL" ? (
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        value
      )}
    </td>
  </tr>
);

export default AnalyticsRow;
