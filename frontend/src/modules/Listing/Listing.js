import React, { useEffect, useState } from 'react';

import { CiUser } from 'react-icons/ci';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { IoCloseCircleOutline, IoSearch } from 'react-icons/io5';

import {
  StyledContainer,
  StyledHeader,
  StyledInputActions,
  StyledInputIcon,
  StyledInputWrapper,
  StyledListing,
  StyledListingItemsWrapper,
  StyledPagination,
  StyledSearchResultSummary,
  StyledTitle,
} from './Listing.styled';

import Table from '#/components/Table';
import { SORT_DIRECTION } from '#/constants/pagination';
import useDebounce from '#/hooks/useDebounce';
import useQueryState from '#/hooks/useQueryState';
import WithErrorBoundary from '#/hooks/withErrorBoundary';
import useListing from '#/services/useListing';
import { formatNumber } from '#/utils/common';

const Landing = () => {
  const [queryState, setQueryState] = useQueryState({
    page: 0,
    limit: 15,
    searchText: '',
    sortKey: 'id',
    sortDir: SORT_DIRECTION.ASC,
  });
  const [searchText, setSearchText] = useState('');
  const debouncSearchText = useDebounce(searchText, 1000);

  const { isLoading, data } = useListing({
    ...queryState,
  });

  const handleClearSearchText = () => {
    setSearchText('');
    setQueryState({ searchText: '', page: 1 });
  };

  const handleOnSortBy = (sortKey) => {
    setQueryState({
      sortKey,
      sortDir: queryState.sortDir === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC,
    });
  };

  useEffect(() => {
    setQueryState({ searchText: debouncSearchText, page: 1 });
  }, [debouncSearchText]);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          <CiUser />
          Search Users
        </StyledTitle>
        <StyledInputWrapper>
          <StyledInputIcon>
            <IoSearch />
          </StyledInputIcon>
          <input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
          <StyledInputActions>
            {searchText && <IoCloseCircleOutline size={20} onClick={handleClearSearchText} />}
          </StyledInputActions>
        </StyledInputWrapper>
        <StyledSearchResultSummary>
          {isLoading ? (
            'Searching users'
          ) : (
            <div>
              Total <span>{formatNumber(data?.count || 0)}</span> {queryState.searchText && 'matching'} users found
            </div>
          )}
        </StyledSearchResultSummary>
      </StyledHeader>
      <StyledListing>
        <StyledListingItemsWrapper>
          <Table data={data?.data || []} total={data?.count || 0} onSortBy={handleOnSortBy} />
          <StyledPagination>
            <button
              type="button"
              aria-label="Previous page"
              disabled={!data?.hasPrev}
              onClick={() => setQueryState({ page: Math.max(+queryState.page - 1, 1) })}
            >
              <FaAngleLeft size={18} />
            </button>
            <span>
              {queryState?.page}/{data?.pages}
            </span>
            <button
              type="button"
              aria-label="Next page"
              disabled={!data?.hasNext}
              onClick={() => setQueryState({ page: Math.min(+queryState.page + 1, data.pages) })}
            >
              <FaAngleRight size={18} />
            </button>
          </StyledPagination>
        </StyledListingItemsWrapper>
      </StyledListing>
    </StyledContainer>
  );
};

export default WithErrorBoundary(Landing);
