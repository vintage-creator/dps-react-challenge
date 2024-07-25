import { useEffect, useState, useCallback } from 'react';
import { fetchUsers } from './api';
import { debounce } from './utils';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
}

interface UserWithHighlight extends User {
  isOldest?: boolean;
}

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithHighlight[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('');
  const [highlightOldest, setHighlightOldest] = useState<boolean>(false);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      const usersData: any[] = await fetchUsers();
      const formattedUsers = usersData.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: new Date(user.birthDate).toISOString().split('T')[0],
        city: user.address.city,
      }));
      const uniqueCities: string[] = Array.from(new Set(formattedUsers.map((user) => user.city)));
      setCities(uniqueCities);
      setUsers(formattedUsers);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter((user) =>
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(nameFilter.toLowerCase())
    );

    if (cityFilter) {
      filtered = filtered.filter((user) => user.city === cityFilter);
    }

    if (highlightOldest) {
      const oldestUsersMap = new Map<number, UserWithHighlight>();

      filtered.forEach((user) => {
        const usersInCity = filtered.filter((u) => u.city === user.city);
        usersInCity.sort((a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime());
        const oldest = usersInCity.slice(0, 1);

        oldest.forEach((oldestUser) => {
          oldestUsersMap.set(oldestUser.id, oldestUser);
        });
      });

      filtered = filtered.map((user) => ({
        ...user,
        isOldest: oldestUsersMap.has(user.id),
      }));
    }

    setFilteredUsers(filtered as UserWithHighlight[]);
  }, [nameFilter, cityFilter, highlightOldest, users]);

  const debouncedSetNameFilter = useCallback(
    debounce((value: string) => {
      setNameFilter(value);
    }, 1000),
    []
  );

  return {
    users,
    filteredUsers,
    nameFilter,
    setNameFilter: debouncedSetNameFilter,
    cityFilter,
    setCityFilter,
    highlightOldest,
    setHighlightOldest,
    cities,
    loading,
    error,
    getUsers,
  };
};
