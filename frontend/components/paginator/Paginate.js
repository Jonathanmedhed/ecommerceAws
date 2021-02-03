import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	return (
		pages > 1 && (
			<div className="paginator">
				{[...Array(pages).keys()].map((x) => (
					<Link
						key={x + 1}
						to={
							!isAdmin
								? keyword
									? `/products/search/${keyword}/page/${x + 1}`
									: `/products/page/${x + 1}`
								: `/admin/product-list/${x + 1}`
						}
					>
						<div className={x + 1 === page ? 'page-highlighted' : 'page'}>{x + 1}</div>
					</Link>
				))}
			</div>
		)
	)
}

export default Paginate
