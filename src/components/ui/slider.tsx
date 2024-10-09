import { Slider as ChakraSlider } from '@chakra-ui/react';
import { forwardRef } from 'react';

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>;
  label?: React.ReactNode;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks: marksProp, label, ...rest } = props;
    const value = props.defaultValue ?? props.value;

    const marks = marksProp?.map((mark) => {
      if (typeof mark === 'number') return { value: mark, label: undefined };
      return mark;
    });

    const hasMarkLabel = !!marks?.some((mark) => mark.label);

    return (
      <ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
        {label && (
          <ChakraSlider.Label fontWeight="medium">{label}</ChakraSlider.Label>
        )}
        <ChakraSlider.Control mb={hasMarkLabel ? '4' : undefined}>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          {value?.map((v: number) => (
            <ChakraSlider.Thumb key={v} index={v}>
              <ChakraSlider.HiddenInput />
            </ChakraSlider.Thumb>
          ))}
        </ChakraSlider.Control>
        {marks?.length && (
          <ChakraSlider.MarkerGroup>
            {marks.map((mark) => {
              const v = typeof mark === 'number' ? mark : mark.value;
              const l = typeof mark === 'number' ? undefined : mark.label;
              return (
                <ChakraSlider.Marker key={v} value={v}>
                  <ChakraSlider.MarkerIndicator />
                  {l}
                </ChakraSlider.Marker>
              );
            })}
          </ChakraSlider.MarkerGroup>
        )}
      </ChakraSlider.Root>
    );
  }
);
