export const userAdminStatusFetcher = async (url: string) => {
  try {
    const response = await fetch(url, { credentials: 'include' });
    return await response.json();
  } catch (error) {
    alert(error);
  }
};
