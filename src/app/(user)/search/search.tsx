'use client';

import { Input, Text } from '@chakra-ui/react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { RiSearchLine } from 'react-icons/ri';
import { useDebouncedCallback } from 'use-debounce';

import { InputGroup } from '~/components/ui/input-group';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Text mb="8px">Search by name</Text>
      <InputGroup endElement={<RiSearchLine />}>
        <Input
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('q')?.toString()}
        />
      </InputGroup>
    </div>
  );
}
