import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import CreateCabinForm from "./CreateCabinForm";

export default function CreateCabinModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create a new cabin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add cabin information</DialogTitle>
          <DialogDescription>
            Please fill in the form below to add a new cabin.
          </DialogDescription>
        </DialogHeader>

        <CreateCabinForm />
      </DialogContent>
    </Dialog>
  );
}
