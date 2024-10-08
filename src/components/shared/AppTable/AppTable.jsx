import React, { useState } from 'react'
import styles from './AppTable.module.css'
import { Pagination } from './Pagination'
export const AppTable = ({ ths, data, tds, handleEdit, handleDelete }) => {
    const perPage = 5;
    const [currPage, setCurrPage] = React.useState(1)
    const [currData, setCurrData] = useState([])
    React.useEffect(() => {
        const end = currPage * perPage;
        const start = end - perPage;
        setCurrData(data?.slice?.(start, end))
    }, [currPage, data])

    return (
        <div>
            <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            {
                                ths?.map((val, ind) => {
                                    return <th id={`th_ ${ind}`}>{val}</th>
                                })
                            }
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currData?.map((obj, index) => {
                                return <tr id={`tr_${index}`}>
                                    {
                                        tds?.map((val, ind) => {
                                            return <td id={`th_ ${ind}`}>{obj[val]}</td>
                                        })
                                    }
                                    <th>
                                        <button onClick={() => handleEdit(obj)}>Edit</button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDelete(obj)}>Delete</button>
                                    </th>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(data.length / perPage)} />

        </div>
    )
}
