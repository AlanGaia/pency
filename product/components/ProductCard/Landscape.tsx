import React from "react";
import {Box, Text, Flex, FlexProps, Stack} from "@chakra-ui/core";

import Image from "~/ui/feedback/Image";
import {Product} from "~/product/types";
import {usePrice} from "~/i18n/hooks";

interface Props extends Omit<FlexProps, "onClick"> {
  product: Product;
  onClick: (product: Product) => void;
  isRaised?: boolean;
}

const LandscapeProductCard: React.FC<Props> = ({isRaised = false, product, onClick, ...props}) => {
  const p = usePrice();
  const {image, title, price, available, description} = product;

  function handleClick() {
    available && onClick(product);
  }

  return (
    <Flex
      alignItems="flex-start"
      boxShadow={isRaised ? "lg" : "none"}
      cursor={available ? "pointer" : "not-allowed"}
      data-test-id="product"
      direction="row-reverse"
      justifyContent="space-between"
      opacity={available ? 1 : 0.5}
      position="relative"
      rounded="md"
      transition="transform 0.2s"
      onClick={handleClick}
      {...props}
    >
      <Image
        height={{base: 16, sm: 20}}
        rounded="md"
        src={image || "/assets/fallback.jpg"}
        width={{base: 16, sm: 20}}
      />
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
        padding={isRaised ? {base: 2, sm: 4} : 0}
        paddingTop={0}
        width="100%"
      >
        <Stack marginBottom={2} spacing={{base: 1, sm: 2}}>
          <Text
            display="block"
            fontSize={{base: "md", sm: "md"}}
            fontWeight={500}
            lineHeight="normal"
          >
            {title}
          </Text>
          <Text color="gray.500" display="block" fontSize="sm" lineHeight="normal">
            {description?.length > 30 ? description.slice(0, 27).concat("...") : description}
          </Text>
        </Stack>
        <Flex alignItems="center">
          <Text
            color={available ? "green.500" : "yellow.500"}
            flex={1}
            fontSize={{base: "xs", sm: "sm"}}
            fontWeight={500}
            lineHeight={1}
          >
            {available ? p(price) : `Sin stock`}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LandscapeProductCard;