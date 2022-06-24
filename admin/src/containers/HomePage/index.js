/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { get, upperFirst } from 'lodash';
import { auth, LoadingIndicatorPage } from 'strapi-helper-plugin';
import PageTitle from '../../components/PageTitle';
import { useModels } from '../../hooks';

import useFetch from './hooks';
import { ALink, Block, Container, LinkWrapper, P, Wave, Separator } from './components';
import BlogPost from './BlogPost';
import SocialLink from './SocialLink';

const FIRST_BLOCK_LINKS = [
  {
    link:
      'https://www.openheavensdaily.com/',
    content: 'Join millions of believers worldwide to kickstart your day with the Open Heaven Devotional\n',
    title: 'Read Open Heaven Devotional\n',
  },
  {
    link: 'https://odmdailyonline.com/',
    content: 'View Our Daily Manna online here',
    title: 'Our Daily Manna Devotional\n',
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    link: 'https://instagram.com/rccg-chapel-of-praise',
  },
  {
    name: 'Mixlr',
    link: 'https://mixlr.com/rccg-chapel-of-praise',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/rccg-chapel-of-praise',
  },
  {
    name: 'Blog',
    link: 'https://strapi.io/blog',
  },
];

const welcomeMessage = `You are now logged into CoP ChurchCRM,`
const recommendationMessage = `we recommend you to go change your password under your profile if this is your first login.`

const joinCommunityTitle = "Join the Community\n"
const joinCommunityContent = "Follow, Like, Share, and join our community on different online platforms."
const HomePage = ({ history: { push } }) => {
  const { error, isLoading, posts } = useFetch();
  // Temporary until we develop the menu API
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useModels();

  const handleClick = e => {
    e.preventDefault();

    push(
      '/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null'
    );
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = contentTypes => contentTypes.filter(c => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 || filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const headerId = hasAlreadyCreatedContentTypes
    ? 'HomePage.greetings'
    : 'app.components.HomePage.welcome';
  const username = get(auth.getUserInfo(), 'firstname', '');
  const linkProps = hasAlreadyCreatedContentTypes
    ? {
        id: 'app.components.HomePage.button.blog',
        href: '/',
        onClick: () => {},
        type: 'blog',
        target: '_blank',
      }
    : {
        id: 'app.components.HomePage.create',
        href: '',
        onClick: handleClick,
        type: 'documentation',
      };

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {title => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <Block>
              <Wave />
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {msg => <h2 id="mainHeader">{msg}</h2>}
              </FormattedMessage>

              <FormattedMessage id="HomePage.welcome.congrats">
                {congrats => {
                  return (
                    <FormattedMessage id="HomePage.welcome.congrats.content">
                      {content => {
                        return (
                          <FormattedMessage id="HomePage.welcome.congrats.content.bold">
                            {boldContent => {
                              return (
                                <P>
                                  <b>{congrats}</b>&nbsp;
                                {welcomeMessage}&nbsp;
                                  <b>{recommendationMessage}</b>
                                </P>
                              );
                            }}
                          </FormattedMessage>
                        );
                      }}
                    </FormattedMessage>
                  );
                }}
              </FormattedMessage>

              {/* {hasAlreadyCreatedContentTypes && (
                <div style={{ marginTop: isLoading ? 60 : 50 }}>
                  {posts.map((post, index) => (
                    <BlogPost
                      {...post}
                      key={post.link}
                      isFirst={index === 0}
                      isLoading={isLoading}
                      error={error}
                    />
                  ))}
                </div>
              )} */}
              {/* <FormattedMessage id={linkProps.id}>
                {msg => (
                  <ALink
                   
                    to={{
                      pathname: "/plugins/content-manager/collectionType/application::member.member/create",
                    }}
                    {...linkProps}
                    style={{ verticalAlign: ' bottom', marginBottom: 5 }}
                  >
                    Add New Member
                  </ALink>
                )}
              </FormattedMessage> */}
              <Separator style={{ marginTop: 37, marginBottom: 36 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {FIRST_BLOCK_LINKS.map((data, index) => {
                  const type = index === 0 ? 'doc' : 'code';

                  return (
                    <LinkWrapper href={data.link} target="_blank" key={data.link} type={type}>

                      <p className="bold" style={{fontSize:15}}>{data.title}</p>

                       <p style={{color: "black !important"}}>{data.content}</p>

                    </LinkWrapper>
                  );
                })}
              </div>
            </Block>
          </div>

          <div className="col-md-12 col-lg-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              {/* <FormattedMessage id="HomePage.community"> <h2>{ joinCommunityTitle}</h2></FormattedMessage>
              <FormattedMessage id="app.components.HomePage.community.content">
                <P style={{ marginTop: 7, marginBottom: 0 }}>{ joinCommunityContent }</P>
              </FormattedMessage> */}
              <div>
                <h2>{joinCommunityTitle}</h2>
                <p style={{ marginTop: 7, marginBottom: 0 }}>{ joinCommunityContent}</p>
              </div>


              <Separator style={{ marginTop: 18 }} />
              <div
                className="row social-wrapper"
                style={{
                  display: 'flex',
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <SocialLink key={key} {...value} />
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
