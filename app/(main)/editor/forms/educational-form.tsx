import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import {
  educationSchema,
  EducationValues,
  WorkExperienceValues,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontalIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function EducationalForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });
  // Fixed useEffect for Education Form
  useEffect(() => {
    // Create a subscription to watch form changes
    const subscription = form.watch((values) => {
      const { isValid } = form.formState;

      // Only update parent state when form is valid
      if (isValid && values) {
        setResumeData({
          ...resumeData,
          ...values,
          educations: values.educations?.filter(
            (education): education is NonNullable<typeof education> =>
              education !== undefined,
          ),
        });
      }
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-muted-foreground text-sm">
          Add your education details
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, idx) => (
            <EducationItem
              key={field.id}
              form={form}
              index={idx}
              remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                  marks: "",
                });
              }}
            >
              Add education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

function EducationItem({ form, index, remove }: EducationItemProps) {
  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontalIcon className="text-muted-foreground size-5 cursor-grab" />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.marks`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marks or CGPA</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
            <FormDescription>For example: 8.50/9.00 CGPA</FormDescription>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="destructive"
          type="button"
          onClick={() => {
            remove(index);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
