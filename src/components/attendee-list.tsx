import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import  dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useEffect, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')


export function AttendeeList() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [attendees, setAttendees] = useState([])

    const totalPages = Math.ceil(attendees.length / 10)

    useEffect(() => {
        fetch('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
        .then(response => response.json())
        .then(data => {
            setAttendees(data.attendees)
        })
    }, [page])



function onSearchInputchanged(event : ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
}

function goToFirstPage() {
    setPage(1)
}

function goToLastPage() {
    setPage(totalPages)
}


function goToNextPage() {
    setPage(page + 1)

}

function goToPreviousPage() {
    setPage(page - 1)
}





    return (

        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 ">
                <h1 className="text-2xl">Participantes</h1>

                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg  flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputchanged} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Buscar participante..."></input>

                </div>

                {search}

            </div>

            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{width: 48}}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>

                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participantes</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do Check-in</TableHeader>
                        <TableHeader style={{width: 64}}></TableHeader>
                    </tr>
                </thead>

                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                        return (
                            <TableRow key={attendee.id}>
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
  
                                <TableCell>
                                    {attendee.id}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-col gap-1 ">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>

                                <TableCell >
                                    {dayjs().to(attendee.createdAt)}
                                </TableCell>

                                <TableCell>
                                    {dayjs().to(attendee.checkedInAt)}
                                </TableCell>

                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        )
                    }
                    )
                    }
                </tbody>

                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando 10 de {attendees.length}
                        </TableCell>

                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>
                                    Página {page} de {totalPages}
                                </span>


                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>

                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>

                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>

                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>


                                </div>
                            </div>
                        </TableCell>
                    </tr>

                </tfoot>

            </Table>

        </div>

    )

}