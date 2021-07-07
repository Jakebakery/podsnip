import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Upload from './upload/upload.js'
import Feed from '../components/feed/feed.js'
import Link from 'next/Link'
import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router'
import ReactPaginate from 'react-paginate'

export default function Home(props) {

  // Get a reference to the storage service, which is used to create references in your storage bucket


  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  /*
    Posts fetching happens after page navigation, 
    so we need to switch Loading state on Router events.
  */
  useEffect(() => { //After the component is mounted set router event handlers
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    }
  }, [])

  //When new page selected in paggination, we take current path and query parrams.
  // Then add or modify page parram and then navigate to the new route.
  const pagginationHandler = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = props.router.query;
    currentQuery.page = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });

  };

  let content = null;
  if (isLoading)
    content = <div>Loading...</div>;
  else {
    //Generating posts list
    content = (
      <ul>
        {props.posts.map(post => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={''}
        breakClassName={'break-me'}
        activeClassName={'active'}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}

        initialPage={props.currentPage - 1}
        pageCount={props.pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={0}
        onPageChange={pagginationHandler}
      />
      <Feed feedData={props}>
      </Feed>
      <Link className={styles.uploadButton} href="/upload/upload">
        <a>Upload</a>
      </Link>
    </div>
  )
}

Home.getInitialProps = async ({ query }) => {
  const page = query.page || 1; //if page empty we request the first page
  const posts = await fetch(`https://localhost:3000/fetch/page=${page}`);
  return {
    totalCount: posts.data._meta.totalCount,
    pageCount: posts.data._meta.pageCount,
    currentPage: posts.data._meta.currentPage,
    perPage: posts.data._meta.perPage,
    posts: posts.data.result,
  };
}