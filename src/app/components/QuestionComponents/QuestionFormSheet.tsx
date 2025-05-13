"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateQuestion } from "@/Hooks/useCreateQuestion";
import { useUpdateQuestion } from "@/Hooks/useUpdateQuestion";

import Question from "@/lib/types";

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: Question | null;
}

const validationSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  type: Yup.string().oneOf(["text", "number", "multiple choice"]).required(),
  options: Yup.array().when("type", {
    is: "multiple choice",
    then: (schema) => schema.of(Yup.string().required()).min(1),
  }),
});

export const QuestionFormSheet = ({ open, onClose, initialData }: Props) => {
  const isEdit = !!initialData;
  const createMutation = useCreateQuestion();
  const updateMutation = useUpdateQuestion();

  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!open) {
      createMutation.reset();
      updateMutation.reset();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit" : "Create"} Question</SheetTitle>
        </SheetHeader>
        <Formik
          initialValues={{
            question: initialData?.question || "",
            type: initialData?.type || "text",
            options: initialData?.options || [""],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const payload = {
              ...values,
              options:
                values.type === "multiple choice" ? values.options : undefined,
            };

            if (isEdit && initialData?.id) {
              updateMutation.mutate(
                { id: initialData.id, data: payload },
                {
                  onSuccess: () => {
                    resetForm();
                    onClose();
                  },
                }
              );
            } else {
              createMutation.mutate(payload, {
                onSuccess: () => {
                  resetForm();
                  onClose();
                },
              });
            }
          }}
        >
          {({ values, errors, touched }) => (
            <Form className="space-y-4 mt-4">
              <div>
                <Field
                  name="question"
                  as={Input}
                  placeholder="Enter your question"
                />
                {errors.question && touched.question && (
                  <div className="text-red-500 text-sm">{errors.question}</div>
                )}
              </div>

              <div>
                <Field
                  as="select"
                  name="type"
                  className="w-full p-2 border rounded"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="multiple choice">Multiple Choice</option>
                </Field>
              </div>

              {values.type === "multiple choice" && (
                <FieldArray name="options">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      {values.options?.map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Field
                            name={`options.${index}`}
                            as={Input}
                            placeholder={`Option ${index + 1}`}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => push("")}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}
                </FieldArray>
              )}

              <Button type="submit" className="w-full">
                {isPending
                  ? isEdit
                    ? "Updating"
                    : "Creating"
                  : isEdit
                  ? "Update"
                  : "Create"}{" "}
                Question
              </Button>
            </Form>
          )}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};
