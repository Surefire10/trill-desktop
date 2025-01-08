import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SideBar({ open, setOpen }: SidebarProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen} modal>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
