import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (!q) {
      setResults([]);
      setError('');
      return;
    }

    let cancelled = false;
    const runSearch = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await api.get(`/search?q=${encodeURIComponent(q)}`);
        if (!cancelled) setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Search failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    runSearch();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) {
      setSearchParams({});
      setResults([]);
      setError('');
      return;
    }
    setSearchParams({ q: nextQuery });
  };

  return (
    <div className='space-y-5'>
      <form onSubmit={handleSearch} className='flex flex-col gap-3 md:flex-row'>
        <input
          className='w-full rounded-xl border border-slate-300 bg-white px-4 py-2 outline-none focus:border-slate-500'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search members, requests, or resources'
        />
        <button className='rounded-xl bg-slate-900 px-5 py-2 text-white'>Search</button>
      </form>

      {loading && <div className='rounded-3xl border border-slate-200 bg-white p-5 text-slate-600 shadow-sm'>Searching...</div>}
      {error && <div className='rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700 shadow-sm'>{error}</div>}

      {!loading && !error && results.length === 0 && query && (
        <div className='rounded-3xl border border-dashed border-slate-300 bg-white p-5 text-slate-600 shadow-sm'>
          No matches found for “{query}”.
        </div>
      )}

      <div className='space-y-4'>
        {results.map((item, index) => (
          <Link key={`${item.type}-${item.id || index}`} to={item.path || '#'} className='block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:shadow-md'>
            <p className='text-sm uppercase tracking-wide text-slate-500'>{item.type}</p>
            <p className='mt-2 text-lg font-semibold text-slate-900'>{item.title}</p>
            <p className='mt-2 text-slate-600'>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GlobalSearch;
