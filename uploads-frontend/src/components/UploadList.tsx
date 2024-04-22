import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import PropTypes from "prop-types";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import { Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils.ts";

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      userEmail: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      thumbSrc: PropTypes.string.isRequired,
      downloadUrl: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      temperature: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const defaultProps = { items: [] };

export type UploadListProps = PropTypes.InferProps<typeof propTypes>;

export function UploadList(props: UploadListProps): JSX.Element {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>User</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.items.map((item) => (
          <TableRow key={item.downloadUrl}>
            <TableCell>
              <img
                className="size-32"
                src={item.thumbSrc}
                alt={item.fileName}
              />
            </TableCell>
            <TableCell className="flex flex-col">
              <h4 className="text-xl font-semibold tracking-tight">
                {item.fileName}
              </h4>
              <div>
                <b>user name</b>: {item.userName}
              </div>
              <div>
                <b>user email</b>: {item.userEmail}
              </div>
              <div>
                <b>temperature</b>: {item.temperature ?? "??"}
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="flex flex-col space-y-4">
              <a className={cn(buttonVariants())} href={item.downloadUrl}>
                <Download size={16} className="mr-2" /> Download
              </a>
              <Button variant="destructive">
                <Trash2 size={16} className="mr-2" /> Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

UploadList.propTypes = propTypes;
UploadList.defaultProps = defaultProps;
