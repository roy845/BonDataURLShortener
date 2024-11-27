import MainLayout from "../components/layout/MainLayout";
import Spinner from "../components/common/Spinner";
import useAllShortCodes from "../hooks/useAllShortCodes";
import DataTable from "../components/table/DataTable";
import ShortCodeRow from "../components/ShortCodeRow";
import SecondaryHeader from "../components/layout/SecondaryHeader";
import ErrorComp from "../components/ErrorComp";
import NoDataFound from "../components/NoDataFound";
import { Utils } from "../utils/utils";

const AllShortCodes = (): JSX.Element => {
  const { error, loading, shortCodes, headers } = useAllShortCodes();

  if (loading) {
    return (
      <MainLayout title="Loading">
        <Spinner />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Error">
        <ErrorComp error={error} />
      </MainLayout>
    );
  }

  if (Utils.hasNoData(shortCodes)) {
    return (
      <MainLayout title="No Data Found">
        <NoDataFound message="No short codes available." />;
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Short Codes">
      <div className="overflow-x-auto">
        <SecondaryHeader title="All Short Codes" />

        <DataTable
          items={shortCodes}
          headers={headers}
          numOfHeaders={headers.length}
          renderRow={(item, index) => (
            <ShortCodeRow code={item} index={index} />
          )}
        />
      </div>
    </MainLayout>
  );
};

export default AllShortCodes;
