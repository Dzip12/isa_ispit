'use client';
import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Button, Spinner} from "reactstrap";
import {CiEdit, CiTrash} from "react-icons/ci";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import AllUserDialogs from "@/elements/User/AllUserDialogs";
import {deleteItem} from "@/core/httpClient";

export const tableColumns = [
    {
        name: 'First Name',
        selector: (row) => `${row.firstName}`,
        sortable: false
    },
    {
        name: 'Last Name',
        selector: (row) => `${row.lastName}`,
        sortable: false
    },
    {
        name: 'Email',
        selector: (row) => `${row.email}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <Button className="btn btn-light mb-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        })
                    }}>
                        <CiEdit />
                    </Button>
                    <Button className="btn btn-light" variant="outline-light" onClick={async () => {
                        await deleteItem(`/user/delete/${row.id}`);
                        dispatch({
                            type: listAction.RELOAD
                        });
                    }}>
                        <CiTrash />
                    </Button>
                </>
            );
        },
        sortable: false
    },
]


//////////////////////////////////////////////////////
export default function UserList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {state} = useListActions();

    const {getData, loading, data} = useListData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload)
        {
            getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
        }
    }, [state])

    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return(
        <>
            {data != null && <DataTable data={data.users}
                       columns={tableColumns}
                       striped={true}
                       noHeader={true}
                       pagination
                       paginationServer
                       progressPending={loading}
                       paginationTotalRows={data.totalElements}
                       onChangePage={handlePageChange}
                       onChangeRowsPerPage={handlePerRowsChange}
                       progressComponent={<Spinner color="danger">Ucitavanje...</Spinner>}
                       highlightOnHover
            />}
            <AllUserDialogs />
        </>
    );
}