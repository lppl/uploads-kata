import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button, buttonVariants } from "@/components/ui/button.tsx";
import { Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import * as PropTypes from "prop-types";

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      thumbSrc: PropTypes.string.isRequired,
      downloadUrl: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      temperature: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      fileSize: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const defaultProps = { items: [] };

export type UploadListProps = PropTypes.InferProps<typeof propTypes>;

export function UploadList(props: UploadListProps): JSX.Element {
  return (
    <section>
      <h3 className="text-3xl">Uploads</h3>
      <Table className="text-xl">
        <TableCaption>Your upload.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>File summary</TableHead>
            <TableHead></TableHead>
            <TableHead>Actions</TableHead>
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
                <div>
                  <b>user name</b>: {item.userName}
                </div>
                <div>
                  <b>image size</b>: {item.fileSize}
                </div>
                <div>
                  <b>image dimensions</b>: {item.width}x{item.height}
                </div>
                <div>
                  <b>file extension</b>: {item.extension}
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
    </section>
  );
}

UploadList.propTypes = propTypes;
UploadList.defaultProps = defaultProps;
