import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { AiFillInstagram } from '@react-icons/all-files/ai/AiFillInstagram';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { Circle, HStack, Icon } from '@chakra-ui/react';

function RenderIcon({ name }) {
  function getIcon(prop) {
    switch (prop) {
      case 'facebook':
        return FaFacebookF;
      case 'instagram':
        return AiFillInstagram;
      case 'linkedin':
        return FaLinkedinIn;
      case 'youtube':
        return FaYoutube;
      case 'twitter':
        return FaTwitter;
      default:
        return FaFacebookF;
    }
  }
  return <Icon as={getIcon(name)} w="16px" h="16px" />;
}

function SocialLink({ name, url }) {
  if (url && url.length > 0) {
    return (
      <a href={url} aria-label={name} target="_blank" rel="noopener noreferrer">
        <Circle size="34px" bg="gray.100" color="gray.700" _hover={{ bg: 'gray.200' }}>
          <RenderIcon name={name} />
        </Circle>
      </a>
    );
  }
  return null;
}

function SocialLinks() {
  const data = useStaticQuery(graphql`
    query SocialLinksQuery {
      allSite {
        nodes {
          siteMetadata {
            title
            socialLinks {
              facebook
              instagram
              linkedin
              youtube
              twitter
            }
          }
        }
      }
    }
  `);

  const socialUrls = data?.allSite?.nodes[0]?.siteMetadata?.socialLinks;
  const socialLinks = [
    { name: 'facebook', url: socialUrls?.facebook },
    { name: 'instagram', url: socialUrls?.instagram },
    { name: 'linkedin', url: socialUrls?.linkedin },
    { name: 'youtube', url: socialUrls?.youtube },
    { name: 'twitter', url: socialUrls?.twitter },
  ];

  return (
    <HStack spacing="14px">
      {socialLinks.map(link => (
        <SocialLink key={`icon-${link.name}`} name={link.name} url={link.url} />
      ))}
    </HStack>
  );
}

SocialLink.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

RenderIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

SocialLinks.defaultProps = {
  facebook: ``,
  instagram: ``,
  linkedin: ``,
  youtube: ``,
  twitter: ``,
};

export default SocialLinks;
