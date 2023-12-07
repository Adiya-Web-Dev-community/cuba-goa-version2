import React, { useState } from 'react'

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {

    let pageNos = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNos.push(i)
    }

    return (
        <div>
               {
                pageNos.map((pageNo, i) => {
                    return (
                        <button style={{backgroundColor: 'orange'}} key={i+1} onClick={()=>setCurrentPage(pageNo)}>{pageNo}</button>
                    )
                })
            }
        </div>
    )
}

export default Pagination