import { getAccessToken } from './utils'

const api = import.meta.env.VITE_API

export const fetchOverviewDashboardData = async () => {
  const token = getAccessToken()
  const res = await fetch(`${api}/budget-tracker/overview-report`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
