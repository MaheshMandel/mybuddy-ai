'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, ChangeEventHandler, useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import qs from 'query-string';
export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');

  const [value, setValue] = useState(name || '');
  const debounceValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    // Step 1: Create the query object with `name` and `categoryId`
    const query = {
      name: debounceValue, // The value from the `debounceValue` state variable
      categoryId: categoryId, // The value from the `categoryId` variable (assumed to be declared somewhere in the component's scope)
    };

    // Step 2: Convert the `query` object to a query string and append it to the current URL
    const url = qs.stringifyUrl(
      {
        url: window.location.href, // The current URL of the page
        query, // The `query` object created in Step 1
      },
      {
        skipEmptyString: true, // Skip any query parameters with empty string values
        skipNull: true, // Skip any query parameters with null values
      }
    );

    // Step 3: Use the `router` (assumed to be imported from a routing library like react-router or Next.js) to push the new URL to the browser's history
    router.push(url);
  }, [debounceValue, router, categoryId]);

  // Explanation of each step:
  // 1: A query object is created with two properties: name and categoryId. The name property takes its value from the debounceValue state variable, and the categoryId property takes its value from the categoryId variable (assumed to be declared somewhere in the component's scope).

  // 2: The qs.stringifyUrl function (assumed to be provided by the qs library) is used to convert the query object into a query string and append it to the current URL of the page (window.location.href). The options { skipEmptyString: true, skipNull: true } are provided to skip any query parameters with empty string or null values, making the resulting URL cleaner.

  // 3: The router.push(url) method is called to navigate to the newly constructed URL using the router object. The router object is assumed to be imported from a routing library like react-router or Next.js.

  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground' />
      {/* only after finish typing the url will change */}
      <Input
        onChange={onChange}
        value={value}
        placeholder='Search...'
        className='pl-10 bg-primary/10'
      />
    </div>
  );
};
