import { FC, Fragment, useMemo } from 'react';
import classNames from 'classnames';
import PaginationPerpageDropDown  from './PaginationPerpageDropDown';
import useQueryParams from '@/hooks/useQueryParams';

export interface TablePaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationProps {
  pageInfo: TablePaginationInfo;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
}

const PaginationCompoment: FC<PaginationProps> = ({
  pageInfo,
  onNextPage,
  onPreviousPage,
  onGoToPage,
}) => {
  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  } = pageInfo;
  const fromItemNumber = useMemo(
    () => (currentPage - 1) * pageSize + 1,
    [currentPage, pageSize]
  );

  const toItemNumber = useMemo(() => {
    const calculated = currentPage * pageSize;
    return calculated > totalItems ? totalItems : calculated;
  }, [currentPage, pageSize, totalItems]);

  const { updateParams, params } = useQueryParams();

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="flex items-center gap-2">
        <span className="text-12 leading-[18px] text-graydark">DISPLAY</span>
        <PaginationPerpageDropDown
          mode="single"
          value={pageSize}
          onChange={(value: any) =>
            updateParams({
              limit: value,
            })
          }
          options={[
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '30', value: 30 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
          ]}
          loading={false}
          disabled={false}
          searchable={false}
          placeholder="Limit"
          className="w-[100px]"
        />
      </div>
      <p className="text-12 leading-[18px] text-graydark">
        Displaying items from {fromItemNumber} to {toItemNumber} of total{' '}
        {totalItems} items.
      </p>

      <div className="flex mt-5 md:mt-0 justify-center md:justify-start items-center lg:text-14 text-12 leading-[21px] font-medium">
        <button
          className={classNames('mr-3', {
            'text-black2': hasPreviousPage,
            'text-[#97A6B7] pointer-events-none': !hasPreviousPage,
          })}
          onClick={onPreviousPage}
        >
          Previous
        </button>

        {Number.isInteger(totalPages) &&
          totalPages > 0 &&
          new Array(totalPages)?.fill(1).map((_, index) => {
            const page = index + 1;

            // Smart ellipsis handling
            if (
              page !== 1 &&
              page !== totalPages &&
              ((page > currentPage && page - currentPage > 2) ||
                (page < currentPage && currentPage - page > 2))
            ) {
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span
                    key={index}
                    className="mr-3 w-8 h-8 flex justify-center items-center rounded-md"
                  >
                    ...
                  </span>
                );
              }
              return <Fragment key={index}></Fragment>;
            }

            return (
              <button
                key={index}
                className={classNames(
                  'mr-3 w-8 h-8 flex justify-center items-center rounded-md',
                  {
                    'bg-vorpblue text-white': page === currentPage,
                  }
                )}
                onClick={() => onGoToPage(page)}
              >
                {page}
              </button>
            );
          })}

        <button
          className={classNames({
            'text-black2': hasNextPage,
            'text-[#97A6B7] pointer-events-none': !hasNextPage,
          })}
          onClick={onNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationCompoment;
