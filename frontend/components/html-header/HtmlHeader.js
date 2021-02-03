import React from 'react'
import Head from 'next/head'

const HtmlHeader = ({
	title,
	shortcutIcon,
	description,
	link,
	ogTitle,
	ogDescription,
	ogType,
	ogUrl,
	ogSiteName,
	ogImg,
	ogImgSecureUrl,
	ogImgType,
	fbId,
}) => {
	return (
		<Head>
			<title>{title}</title>
			<link rel="shortcut icon" href={`${shortcutIcon}`} />
			<meta name="description" content={`${description}`} />
			<link rel="canonical" href={`${link}`} />
			<meta property="og:title" content={`${ogTitle}`} />
			<meta property="og:description" content={`${ogDescription}`} />
			<meta property="og:type" content={`${ogType}`} />
			<meta property="og:url" content={`${ogUrl}`} />
			<meta property="og:site_name" content={`${ogSiteName}`} />

			<meta property="og:image" content={`${ogImg}`} />
			<meta property="og:image:secure_url" ccontent={`${ogImgSecureUrl}`} />
			<meta property="og:image:type" content={`${ogImgType}`} />
			<meta property="fb:app_id" content={`${fbId}`} />
		</Head>
	)
}

export default HtmlHeader
