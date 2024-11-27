import MainLayout from "../components/layout/MainLayout";
import Spinner from "../components/common/Spinner";
import useAllShortCodes from "../hooks/useAllShortCodes";
import DataTable from "../components/table/DataTable";
import ShortCodeRow from "../components/ShortCodeRow";
import SecondaryHeader from "../components/layout/SecondaryHeader";
import ErrorComp from "../components/ErrorComp";
import { Utils } from "../utils/utils";
import { FaTrash } from "react-icons/fa";
import Tooltip from "../components/common/Tooltip";
import ConfirmResetModal from "../components/modal/ConfirmResetModal";
import NoResultsFound from "../components/NoResultsFound";
import SearchInput from "../components/SearchInput";

const AllShortCodes = (): JSX.Element => {
  const {
    error,
    loading,
    shortCodes,
    headers,
    deleteShortCode,
    confirmText,
    confirmationKeyword,
    handleDeleteAll,
    isModalOpen,
    setConfirmText,
    setModalOpen,
    searchKeyword,
    setSearchKeyword,
  } = useAllShortCodes();

  return (
    <MainLayout title="Short Codes">
      <div className="overflow-x-auto">
        <SecondaryHeader title="All Short Codes" />
        <div className="flex items-center gap-4 mb-4">
          <SearchInput
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />

          {!Utils.hasNoData(shortCodes) && !loading && (
            <Tooltip message="Delete All">
              <FaTrash
                className="mr-2 cursor-pointer text-red-600"
                size={20}
                onClick={() => setModalOpen(true)}
              />
            </Tooltip>
          )}
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorComp error={error} />
        ) : Utils.hasNoData(shortCodes) ? (
          <NoResultsFound message="No short codes found." />
        ) : (
          <>
            <strong>Total Items: </strong>
            {shortCodes.length}
            <DataTable
              items={shortCodes}
              headers={headers}
              numOfHeaders={headers.length}
              renderRow={(item, index) => (
                <ShortCodeRow
                  code={item}
                  index={index}
                  deleteShortCode={deleteShortCode}
                />
              )}
            />
          </>
        )}
      </div>

      <ConfirmResetModal
        isOpen={isModalOpen}
        confirmText={confirmText}
        confirmationKeyword={confirmationKeyword}
        isConfirmEnabled={confirmText === confirmationKeyword}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteAll}
        onTextChange={(text) => setConfirmText(text)}
      />
    </MainLayout>
  );
};

export default AllShortCodes;
