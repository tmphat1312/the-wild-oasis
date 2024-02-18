// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/Button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/Form";
// import { Input } from "@/components/ui/Input";
// import {
//   SettingsFormValues,
//   settingsFormSchema,
// } from "@/schemas/UpdateSettingsForm";
// import { useUpdateSettings } from "./useUpdateSettings";
// import ConfirmAction from "@/components/ui/ConfirmAction";

// interface UpdateSettingsFormProps {
//   currentSettings: SettingsFormValues | undefined;
// }

// export default function UpdateSettingsForm({
//   currentSettings,
// }: UpdateSettingsFormProps) {
//   const form = useForm({
//     resolver: zodResolver(settingsFormSchema),
//     defaultValues: currentSettings,
//     mode: "onBlur",
//   });
//   const { isUpdating, updateSettings } = useUpdateSettings();

//   function onSubmit(values: SettingsFormValues) {
//     updateSettings({ newSettings: values });
//     form.reset(values, {
//       keepDefaultValues: false,
//       keepValues: false,
//       keepDirty: false,
//     });
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="p-8 space-y-6 rounded-md shadow-sm bg-background"
//       >
//         <FormField
//           disabled={isUpdating}
//           control={form.control}
//           name="min_booking_length"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Minimum nights/booking</FormLabel>
//               <FormControl>
//                 <Input {...field} type="number" min={1} max={365} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           disabled={isUpdating}
//           control={form.control}
//           name="max_booking_length"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Maximum nights/booking</FormLabel>
//               <FormControl>
//                 <Input {...field} type="number" min={1} max={365} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           disabled={isUpdating}
//           control={form.control}
//           name="max_guests_per_booking"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Maximum guests/booking</FormLabel>
//               <FormControl>
//                 <Input {...field} type="number" min={1} max={100} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           disabled={isUpdating}
//           control={form.control}
//           name="breakfast_price"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Breakfast price</FormLabel>
//               <FormControl>
//                 <Input {...field} type="number" min={0} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="space-x-4 text-end">
//           <Button
//             type="submit"
//             disabled={isUpdating || !form.formState.isDirty}
//           >
//             Save settings
//           </Button>
//           <ConfirmAction
//             Opener={
//               <Button type="reset" variant="destructive">
//                 Discard changes
//               </Button>
//             }
//             disabled={isUpdating || !form.formState.isDirty}
//             title="Discard changes?"
//             description="Are you sure you want to discard your changes?"
//             onConfirm={() => form.reset(currentSettings)}
//           />
//         </div>
//       </form>
//     </Form>
//   );
// }

export default function UpdateSettingsForm() {
  return <div>UpdateSettingsForm</div>;
}
