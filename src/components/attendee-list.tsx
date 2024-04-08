import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import  dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')


export function AttendeeList() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)



    function onSearchInputchanged(event : ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
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
                            Mostrando 10 de 228 items
                        </TableCell>

                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>
                                    Página 1 de 23
                                </span>


                                <div className="flex gap-1.5">
                                    <IconButton>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>

                                    <IconButton>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>

                                    <IconButton>
                                        <ChevronRight className="size-4" />
                                    </IconButton>

                                    <IconButton>
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