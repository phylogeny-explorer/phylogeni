'use client';

import { Box, Flex, Grid } from '@chakra-ui/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';

import Slide from './Slide';

const delay = 6000;

export interface Item {
  id: string;
  title: string;
  content: string;
  image: string;
  imagePosition?: string;
}

interface Props {
  data: Item[];
}

const Carousel = ({ data }: Props) => {
  const slides = useMemo(
    () => [
      { ...data[data.length - 1], id: 'first' },
      ...data,
      { ...data[0], id: 'last' },
    ],
    [data]
  );

  const [currentIndex, setIndex] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNextSlide = (shouldNotLoopBack?: boolean) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex === slides.length - 1) {
      setIndex(!shouldNotLoopBack ? 1 : currentIndex);
    } else {
      setIndex(nextIndex);
    }
  };

  const goToPreviousSlide = () => {
    const prevIndex = currentIndex - 1;
    setIndex(prevIndex > 0 ? prevIndex : currentIndex);
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === 'Left') return goToNextSlide(true);
      if (eventData.dir === 'Right') return goToPreviousSlide();
      return null;
    },
  });

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      const nextIndex = currentIndex + 1;
      setIndex(nextIndex === slides.length - 1 ? 1 : nextIndex);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, slides]);

  const slideHeightDesktop: number = 464;
  const slideHeightMobile: number = 520;

  return (
    <Box
      position="relative"
      margin="0 auto"
      overflow="hidden"
      maxW="100%"
      h={[slideHeightMobile, slideHeightDesktop]}
    >
      <Box
        position="relative"
        left={{ md: '50%' }}
        transform={{ md: 'translateX(-600px)' }}
      >
        <Grid
          autoFlow="column"
          gap={{ md: 8 }}
          transform={[
            `translateX(-${currentIndex * 100}%)`,
            `translateX(-${currentIndex * 1200}px)`,
          ]}
          transition="ease 1000ms"
          {...swipeHandlers}
        >
          {slides.map((item) => (
            <Slide
              key={item.id}
              slideHeightDesktop={slideHeightDesktop}
              slideHeightMobile={slideHeightMobile}
              {...item}
            />
          ))}
        </Grid>
      </Box>
      <Flex
        justify="center"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        bottom={0}
      >
        {slides.slice(1, -1)?.map((item, index) => (
          <Flex
            key={item.id}
            align="center"
            cursor="pointer"
            w="60px"
            h="34px"
            margin="0 5px"
            onClick={() => setIndex(index + 1)}
          >
            <Box
              h="3px"
              w="full"
              bgColor={currentIndex === index + 1 ? 'teal.500' : 'gray.100'}
              transition="background-color 0.3s ease-in-out"
            />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;
