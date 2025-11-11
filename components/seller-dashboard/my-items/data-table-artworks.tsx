"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchArtWorkRecords, deleteArtWorkRecord } from "@/store/artWorkSlice";
import { Artwork } from "@/types/artwork";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { toast } from "sonner";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons-react";
import { useSortable } from "@dnd-kit/sortable";

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

export function DataTableArtWorksRecords({
  onAdd,
  onEdit,
}: {
  onAdd: () => void;
  onEdit: (record: Artwork) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: RootState) => state.artwork.records);
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  React.useEffect(() => {
    if (!loading && user) dispatch(fetchArtWorkRecords(user.id));
  }, [dispatch, loading, user]);

  const columns = React.useMemo<ColumnDef<Artwork>[]>(
    () => [
      {
        id: "drag",
        header: () => null,
        size: 50,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
      },
      {
        accessorKey: "title",
        header: "Judul Karya",
        size: 170,
        cell: ({ row }) => (
          <Button
            variant="link"
            className="text-foreground w-fit px-0 text-left cursor-pointer"
            onClick={() => onEdit(row.original)}
          >
            {row.original.title}
          </Button>
        ),
      },
      {
        id: "category",
        header: "Kategori",
        size: 150,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.category || "-"}</span>
        ),
      },
      {
        id: "description",
        header: "Deskripsi",
        size: 300,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.description || "-"}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "Harga",
        cell: (info) => info.getValue() as number,
      },
      {
        accessorKey: "supply",
        header: "Jumlah",
        cell: (info) => info.getValue() as number,
      },
      {
        accessorKey: "creator_name",
        header: "Nama Pencipta",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => info.getValue() as string,
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => {
                  try {
                    await dispatch(
                      deleteArtWorkRecord(row.original.id)
                    ).unwrap();
                    toast.success("Rekam medis berhasil dihapus");
                  } catch (error) {
                    const msg =
                      error && typeof error === "object" && "message" in error
                        ? (error as { message: string }).message
                        : typeof error === "string"
                        ? error
                        : "Gagal menghapus artwork";

                    toast.error(msg);
                  }
                }}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [dispatch, onEdit]
  );

  const table = useReactTable({
    data: records || [],
    columns,
    state: { sorting, columnFilters, columnVisibility, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    manualFiltering: false,
    manualSorting: false,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    defaultColumn: { size: 150, minSize: 50, maxSize: 500 },
  });

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex mt-5">
          <TabsTrigger value="outline">My Items</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex items-center justify-between px-4 lg:px-6 gap-4">
        <div className="flex items-center gap-3">
          <Label htmlFor="search-record" className="whitespace-nowrap">
            Judul Karya
          </Label>
          <Input
            id="search-record"
            placeholder="Judul Karya"
            className="max-w-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={onAdd}
          >
            <IconPlus />
            <span className="hidden lg:inline">Tambah</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <Table className="table-fixed w-full">
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          maxWidth: cell.column.columnDef.maxSize,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Tidak ada data karya.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end gap-8 px-4 py-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <select
              id="rows-per-page"
              className="h-8 w-20 border rounded"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
