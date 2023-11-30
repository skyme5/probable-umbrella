import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '#/utils/axiosClient';

const queryUsers = async ({ cursor, searchText, limit, sortKey, sortDir }) => {
  const data = await axiosClient.get('/users', {
    params: { cursor, searchText, limit, sortKey, sortDir },
  });

  return data?.data;
};

const useListing = ({ page, searchText, limit, sortKey, sortDir }) => {
  return useQuery({
    queryKey: [page, searchText, limit, sortKey, sortDir],
    queryFn: () => queryUsers({ cursor: page, searchText, limit, sortKey, sortDir }),
  });
};

export default useListing;
