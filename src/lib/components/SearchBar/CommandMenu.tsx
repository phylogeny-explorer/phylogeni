'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Combobox, createListCollection } from '@ark-ui/react';
import { useRouter } from 'next/navigation';
import {
  Center,
  DialogTrigger,
  Input,
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react';

import { Database } from '~/types/supabase';
import { DialogContent, DialogRoot } from 'components/ui/dialog';

const ComboboxRoot = chakra(Combobox.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
  },
});
const ComboboxControl = chakra(Combobox.Control);
const ComboboxInput = chakra(Combobox.Input, {}, { forwardAsChild: true });
const ComboboxContent = chakra(Combobox.Content, {
  base: {
    borderRadius: 'md',
  },
});
const ComboboxList = chakra(Combobox.List);
const ComboboxItem = chakra(Combobox.Item, {
  base: {
    borderRadius: 'md',
    _hover: {
      bg: 'gray.subtle',
      cursor: 'pointer',
    },
    _selected: {
      bg: 'gray.subtle',
    },
  },
});

interface Item {
  label: string;
  value: string;
  category?: string | null;
}

interface Props {
  trigger: ReactNode;
  disableHotkey?: boolean;
}

export const CommandMenu = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { results, loading, reset } = useSearchItems(inputValue);
  const router = useRouter();

  const collection = useMemo(() => {
    return createListCollection({ items: results });
  }, [results]);

  useHotkey(setOpen, { disable: props.disableHotkey });

  return (
    <DialogRoot
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(event) => setOpen(event.open)}
    >
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent p="2" width={{ base: '100%', sm: 'lg' }}>
        <ComboboxRoot
          open
          disableLayer
          inputBehavior="autohighlight"
          placeholder="Search the tree"
          selectionBehavior="clear"
          loopFocus={false}
          collection={collection}
          onValueChange={(e) => {
            setOpen(false);
            router.push(`tree?node_id=${e.value}`);
            reset();
          }}
          onInputValueChange={({ inputValue }) => setInputValue(inputValue)}
        >
          <ComboboxControl>
            <ComboboxInput asChild>
              <Input />
            </ComboboxInput>
          </ComboboxControl>
          <ComboboxContent
            boxShadow="none"
            px="0"
            py="0"
            overflow="auto"
            maxH="50vh"
            overscrollBehavior="contain"
          >
            <ComboboxList>
              {loading && (
                <Center p="3" minH="40">
                  <Text color="fg.muted" textStyle="sm">
                    Loading...
                  </Text>
                </Center>
              )}
              {!loading && results.length === 0 && (
                <Center p="3" minH="40">
                  <Text color="fg.muted" textStyle="sm">
                    No results found for <Text as="strong">{inputValue}</Text>
                  </Text>
                </Center>
              )}
              {results.map((item) => (
                <ComboboxItem
                  key={item.value}
                  item={item}
                  persistFocus
                  height="auto"
                  px="4"
                  py="3"
                >
                  <Stack gap="0">
                    <Text fontWeight="medium">{item.label}</Text>
                    <Text color="fg.muted">{item.category}</Text>
                  </Stack>
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </ComboboxRoot>
      </DialogContent>
    </DialogRoot>
  );
};

type Clade = Database['public']['Tables']['clades']['Row'];

const useSearchItems = (inputValue: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async (value: string) => {
    setLoading(true);
    const data: Clade[] = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query: value }),
    }).then((res) => res.json());

    // console.log('data', data);

    setItems(
      data.map((item) => ({
        value: item.id,
        label: `${item.extant === false ? '†' : ''}${item.name}`,
        category: item.other_names,
      })) || []
    );
    setLoading(false);
  };

  useEffect(() => {
    if (inputValue) {
      fetchItems(inputValue);
    }
  }, [inputValue]);

  return { results: items, loading, reset: () => setItems([]) };
};

const useHotkey = (
  setOpen: (open: boolean) => void,
  options: { disable?: boolean }
) => {
  const { disable } = options;

  useEffect(() => {
    if (disable) return;

    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform);
    const hotkey = isMac ? 'metaKey' : 'ctrlKey';

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() === 'k' && event[hotkey]) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeydown, true);

    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
    };
  }, [setOpen, disable]);
};
