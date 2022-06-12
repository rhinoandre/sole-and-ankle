import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

// There are 3 variants possible, based on the props:
//   - new-release
//   - on-sale
//   - default
//
// Any shoe released in the last month will be considered
// `new-release`. Any shoe with a `salePrice` will be
// on-sale. In theory, it is possible for a shoe to be
// both on-sale and new-release, but in this case, `on-sale`
// will triumph and be the variant used.
// prettier-ignore
function getVariant(salePrice, releaseDate) {
  return salePrice
    ? 'onSale'
    : isNewShoe(releaseDate)
      ? 'newRelease'
      : undefined
}

const variantTexts = {
  onSale: 'Sale',
  newRelease: 'Just Release',
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  const variant = getVariant(salePrice, releaseDate);

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant && <ReleaseVariant variant={variant}>
          {variantTexts[variant]}
        </ReleaseVariant>}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price sales={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  flex: 1 1 300px;
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${props => props.sales && (
    `text-decoration: line-through;
    color: ${COLORS.gray[700]};`
  )}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const ReleaseVariant = styled.span`
  background-color: ${props => COLORS[props.variant]};
  position: absolute;
  top: 10px;
  right: -5px;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
`;

export default ShoeCard;
