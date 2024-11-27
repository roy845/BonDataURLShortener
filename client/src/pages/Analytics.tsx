import { useParams } from "react-router-dom";
import { ShortCodeParam } from "../types/types";
import MainLayout from "../components/layout/MainLayout";
import Spinner from "../components/common/Spinner";
import { useAnalytics } from "../hooks/useAnalytics";
import DataTable from "../components/table/DataTable";
import AnalyticsRow from "../components/AnalyticsRow";
import SecondaryHeader from "../components/layout/SecondaryHeader";
import NoDataFound from "../components/NoDataFound";
import ErrorComp from "../components/ErrorComp";

const Analytics = (): JSX.Element => {
  const { short_code } = useParams<ShortCodeParam>();
  const { analytics, error, loading, headers, items } =
    useAnalytics(short_code);

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

  if (!analytics) {
    return (
      <MainLayout title="No Data Found">
        <NoDataFound message="No analytics data available." />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Analytics - ${short_code}`}>
      <div className="overflow-x-auto">
        <SecondaryHeader title={`Analytics - ${short_code}`} />

        <DataTable
          items={items}
          headers={headers}
          numOfHeaders={headers.length}
          renderRow={(item, index) => (
            <AnalyticsRow
              key={index}
              field={item.field}
              value={item.value}
              isEven={index % 2 === 0}
            />
          )}
        />
      </div>
    </MainLayout>
  );
};

export default Analytics;
